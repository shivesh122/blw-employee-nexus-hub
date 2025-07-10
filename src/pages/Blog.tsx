
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featured_image_url: string | null;
  published_at: string;
  author_id: string;
  tags: string[] | null;
  profiles: {
    first_name: string;
    last_name: string;
  };
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          excerpt,
          slug,
          featured_image_url,
          published_at,
          author_id,
          tags,
          profiles!posts_author_id_fkey (
            first_name,
            last_name
          )
        `)
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
          <p className="mt-4 text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover insights, tutorials, and stories from our community of writers.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold mb-4">No posts yet</h3>
          <p className="text-muted-foreground mb-6">
            Be the first to share your story with the community.
          </p>
          <Button asChild>
            <Link to="/auth">Get Started</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {post.featured_image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.published_at)}</span>
                  <User className="h-4 w-4 ml-2" />
                  <span>{post.profiles.first_name} {post.profiles.last_name}</span>
                </div>
                <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                  <Link to={`/post/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                {post.excerpt && (
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 flex-wrap">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags && post.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  <Button asChild size="sm" variant="ghost">
                    <Link to={`/post/${post.slug}`}>
                      Read More
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
