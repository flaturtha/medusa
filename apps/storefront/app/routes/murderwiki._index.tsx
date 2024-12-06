import { Container } from '@app/components/common/container';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { getMergedPageMeta } from '@libs/util/page';
import Hero from '@app/components/sections/Hero';
import { Link } from '@remix-run/react';
import { BookOpenIcon, ClockIcon } from '@heroicons/react/24/outline';

export const loader = async (args: LoaderFunctionArgs) => {
  return {};
};

export const meta: MetaFunction<typeof loader> = getMergedPageMeta;

// This would eventually come from a CMS or database
const articles = [
  {
    id: 'how-we-process-vintage-mysteries',
    title: 'How We Process Vintage Mysteries',
    excerpt: 'A behind-the-scenes look at how we restore, preserve, and prepare vintage mystery books for our collection.',
    date: 'February 15, 2024',
    readTime: '8 min read',
    category: 'Behind the Scenes',
    slug: 'how-we-process-vintage-mysteries'
  },
  {
    id: 'golden-age-detective-fiction',
    title: 'The Golden Age of Detective Fiction',
    excerpt: 'Explore the rich history of detective fiction from the 1920s to 1940s, a period that defined the genre.',
    date: 'February 10, 2024',
    readTime: '12 min read',
    category: 'History',
    slug: 'golden-age-detective-fiction'
  },
  {
    id: 'collecting-pulp-magazines',
    title: 'A Guide to Collecting Pulp Magazines',
    excerpt: 'Tips and insights for collectors interested in vintage pulp magazines, from identification to storage.',
    date: 'February 1, 2024',
    readTime: '10 min read',
    category: 'Collecting',
    slug: 'collecting-pulp-magazines'
  }
];

export default function MurderWikiIndex() {
  return (
    <>
      <Container className="!px-0 py-0 sm:!p-16">
        <Hero
          className="min-h-[400px] !max-w-full bg-accent-50 sm:rounded-3xl p-6 sm:p-10 md:p-[88px] md:px-[88px]"
          content={
            <div className="text-center w-full space-y-9">
              <h4 className="text-lg md:text-2xl font-italiana tracking-wider">KNOWLEDGE BASE</h4>
              <h1 className="text-4xl md:text-8xl font-italiana tracking-wider [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
                MurderWiki
              </h1>
              <p className="text-lg text-primary-700">
                Exploring the world of vintage mystery fiction
              </p>
            </div>
          }
        />
      </Container>

      <Container className="pt-0 max-w-4xl mx-auto pb-44">
        <hr className="w-1/2 border-t-2 border-primary-700 mx-auto my-16" />
        
        <div className="grid gap-12">
          {articles.map((article) => (
            <article key={article.id} className="group">
              <Link to={`/murderwiki/${article.slug}`} className="block">
                <div className="bg-primary-50 p-8 rounded-lg transition-all duration-200 hover:shadow-lg">
                  <div className="flex items-center gap-4 text-sm text-primary-600 mb-4">
                    <span className="bg-primary-100 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" />
                      {article.readTime}
                    </div>
                    <span>{article.date}</span>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary-600 transition-colors">
                    {article.title}
                  </h2>
                  
                  <p className="text-primary-700 mb-4">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary-600 group-hover:text-primary-700 transition-colors">
                    <span>Read more</span>
                    <BookOpenIcon className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-16 pt-16 border-t border-primary-700/20">
          <h2 className="text-2xl font-semibold mb-4">Want to Learn More?</h2>
          <p className="mb-6">
            Check back regularly for new articles about vintage mystery fiction, book preservation, and collecting.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-primary-700 text-primary-50 py-3 rounded hover:bg-primary-600 transition-colors min-w-[200px]"
          >
            Contact Us
          </Link>
        </div>
      </Container>
    </>
  );
} 