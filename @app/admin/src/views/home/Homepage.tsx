import BlogPosts from './BlogPosts';
import Testimonials from './Testimonials';
import Websites from './Websites';

const Homepage = () => {
  return (
    <main>
      <div className='space-y-32'>
        <Websites />
        <BlogPosts />
        <Testimonials />
      </div>
    </main>
  );
};

export default Homepage;
