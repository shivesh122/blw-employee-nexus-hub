
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Comments from '@/components/Comments';

interface PostData {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featured_image_url: string | null;
  published_at: string;
  author_id: string;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  profiles: {
    first_name: string;
    last_name: string;
    bio: string | null;
    avatar_url: string | null;
  };
}

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (slug) {
      fetchPost();
      trackView();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          content,
          excerpt,
          slug,
          featured_image_url,
          published_at,
          author_id,
          tags,
          meta_title,
          meta_description,
          profiles!posts_author_id_fkey (
            first_name,
            last_name,
            bio,
            avatar_url
          )
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        throw error;
      }
      setPost(data);

      // Update page meta tags
      if (data.meta_title) {
        document.title = data.meta_title;
      } else {
        document.title = data.title;
      }

      if (data.meta_description) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', data.meta_description);
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: "Error",
        description: "Failed to load post",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const trackView = async () => {
    if (!post?.id) return;
    
    try {
      await supabase.from('post_views').insert({
        post_id: post.id,
        viewer_ip: '', // Could be populated by edge function
        user_agent: navigator.userAgent
      });
    } catch (error) {
      // Silently fail - view tracking is not critical
      console.error('Error tracking view:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link to="/blog">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        {post.featured_image_url && (
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              {post.profiles.avatar_url && (
                <img
                  src={post.profiles.avatar_url}
                  alt={`${post.profiles.first_name} ${post.profiles.last_name}`}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <User className="h-4 w-4" />
              <span>{post.profiles.first_name} {post.profiles.last_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.published_at)}</span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {post.excerpt && (
            <p className="text-lg text-muted-foreground italic">
              {post.excerpt}
            </p>
          )}
        </header>

        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {post.profiles.bio && (
          <Card className="mb-8">
            <CardHeader>
              <h3 className="text-lg font-semibold">About the Author</h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                {post.profiles.avatar_url && (
                  <img
                    src={post.profiles.avatar_url}
                    alt={`${post.profiles.first_name} ${post.profiles.last_name}`}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <h4 className="font-semibold">
                    {post.profiles.first_name} {post.profiles.last_name}
                  </h4>
                  <p className="text-muted-foreground">{post.profiles.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="border-t pt-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Comments
          </h3>
          <Comments postId={post.id} />
        </div>
      </article>
    </div>
  );
};

export default Post;
