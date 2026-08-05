import BlogListingClient from '@/src/components/blog/blog-listing-client';
import { BlogPost } from '@/src/interface/interface';
import getMarkDownData from '@/src/utils/getMarkDownData';

const BlogList = () => {
  const posts = getMarkDownData<BlogPost>('src/data/blog', false, 'order');

  return <BlogListingClient posts={posts} />;
};

export default BlogList;
