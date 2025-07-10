
-- Create user roles enum
CREATE TYPE user_role AS ENUM ('admin', 'author', 'user');

-- Update profiles table to include role and additional fields
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS website TEXT;

-- Update the role column default to 'user' instead of 'admin'
ALTER TABLE profiles 
ALTER COLUMN role SET DEFAULT 'user'::user_role;

-- Create posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT UNIQUE NOT NULL,
  featured_image_url TEXT,
  published BOOLEAN DEFAULT false,
  author_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE,
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[]
);

-- Create comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create post_views table for analytics
CREATE TABLE post_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  viewer_ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;

-- Posts policies
CREATE POLICY "Anyone can view published posts" ON posts
  FOR SELECT USING (published = true);

CREATE POLICY "Authors can view their own posts" ON posts
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Admins can view all posts" ON posts
  FOR SELECT USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Authors can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id AND get_user_role(auth.uid()) IN ('author', 'admin'));

CREATE POLICY "Authors can update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Admins can update all posts" ON posts
  FOR UPDATE USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Authors can delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Admins can delete all posts" ON posts
  FOR DELETE USING (get_user_role(auth.uid()) = 'admin');

-- Comments policies
CREATE POLICY "Anyone can view comments on published posts" ON comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM posts 
      WHERE posts.id = comments.post_id 
      AND posts.published = true
    )
  );

CREATE POLICY "Authors can view comments on their posts" ON comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM posts 
      WHERE posts.id = comments.post_id 
      AND posts.author_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Admins can delete all comments" ON comments
  FOR DELETE USING (get_user_role(auth.uid()) = 'admin');

-- Post views policies (for analytics)
CREATE POLICY "Anyone can insert post views" ON post_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all post views" ON post_views
  FOR SELECT USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Authors can view their post views" ON post_views
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM posts 
      WHERE posts.id = post_views.post_id 
      AND posts.author_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_author_id ON comments(author_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_post_views_post_id ON post_views(post_id);

-- Enable realtime for comments
ALTER TABLE comments REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE comments;

-- Create function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate slug
CREATE OR REPLACE FUNCTION set_post_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.title);
    
    -- Handle duplicate slugs
    WHILE EXISTS (SELECT 1 FROM posts WHERE slug = NEW.slug AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)) LOOP
      NEW.slug := NEW.slug || '-' || extract(epoch from now())::text;
    END LOOP;
  END IF;
  
  NEW.updated_at := now();
  
  -- Set published_at when publishing
  IF NEW.published = true AND OLD.published = false THEN
    NEW.published_at := now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_post_slug_trigger
  BEFORE INSERT OR UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION set_post_slug();
