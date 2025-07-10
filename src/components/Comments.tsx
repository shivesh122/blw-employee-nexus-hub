
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Reply, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  author_id: string;
  parent_id: string | null;
  profiles: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  };
}

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
    subscribeToComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          author_id,
          parent_id,
          profiles!comments_author_id_fkey (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const subscribeToComments = () => {
    const channel = supabase
      .channel('comments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const submitComment = async (content: string, parentId: string | null = null) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post a comment",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('comments').insert({
        post_id: postId,
        content: content.trim(),
        author_id: user.id,
        parent_id: parentId
      });

      if (error) throw error;

      if (parentId) {
        setReplyContent('');
        setReplyTo(null);
      } else {
        setNewComment('');
      }

      toast({
        title: "Success",
        description: "Comment posted successfully"
      });
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Comment deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <Card key={comment.id} className={`${isReply ? 'ml-8 mt-4' : 'mb-4'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.profiles.avatar_url || undefined} />
              <AvatarFallback>
                {comment.profiles.first_name[0]}{comment.profiles.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">
                {comment.profiles.first_name} {comment.profiles.last_name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(comment.created_at)}
              </p>
            </div>
          </div>
          {user && (user.id === comment.author_id) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteComment(comment.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-3">{comment.content}</p>
        {!isReply && user && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
            >
              <Reply className="h-4 w-4 mr-1" />
              Reply
            </Button>
          </div>
        )}
        
        {replyTo === comment.id && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="mb-2"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => submitComment(replyContent, comment.id)}
                disabled={submitting || !replyContent.trim()}
              >
                {submitting ? 'Posting...' : 'Post Reply'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setReplyTo(null);
                  setReplyContent('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return <div className="text-center py-8">Loading comments...</div>;
  }

  const topLevelComments = comments.filter(c => !c.parent_id);
  const replies = comments.filter(c => c.parent_id);

  return (
    <div>
      {user && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-4"
            />
            <Button
              onClick={() => submitComment(newComment)}
              disabled={submitting || !newComment.trim()}
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </CardContent>
        </Card>
      )}

      {!user && (
        <Card className="mb-6">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              Please sign in to join the discussion.
            </p>
          </CardContent>
        </Card>
      )}

      <div>
        {topLevelComments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No comments yet. Be the first to start the conversation!
          </p>
        ) : (
          topLevelComments.map(comment => (
            <div key={comment.id}>
              {renderComment(comment)}
              {replies
                .filter(reply => reply.parent_id === comment.id)
                .map(reply => renderComment(reply, true))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
