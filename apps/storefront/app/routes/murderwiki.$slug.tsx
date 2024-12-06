import { Container } from '@app/components/common/container';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getMergedPageMeta } from '@libs/util/page';
import Hero from '@app/components/sections/Hero';
import { Link, useLoaderData } from '@remix-run/react';
import { ClockIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { getProductContent } from '../services/sanity.server';

// This would eventually come from a CMS or database
const articles = {
  'how-we-process-vintage-mysteries': {
    title: 'How We Process Vintage Mysteries',
    date: 'February 15, 2024',
    readTime: '8 min read',
    category: 'Behind the Scenes',
    heroImage: 'https://placehold.co/1200x600/e9c6b0/1C1C1E?text=Book+Restoration+Process',
    excerpt: 'A behind-the-scenes look at how we restore, preserve, and prepare vintage mystery books for our collection.',
    content: `
      <div class="article-content">
        <figure class="mb-12">
          <img 
            src="https://placehold.co/1200x600/e9c6b0/1C1C1E?text=Book+Restoration+Process" 
            alt="Vintage book restoration process" 
            class="w-full rounded-lg shadow-lg"
          />
          <figcaption class="text-center text-sm text-primary-600 mt-4">
            Our restoration workspace where each book begins its journey
          </figcaption>
        </figure>

        <h2>The Journey of a Vintage Mystery</h2>
        <p class="lead">When a vintage mystery book arrives at Tales of Murder, it begins a careful journey through our preservation process. Each book is unique, with its own history and specific needs, but our general process follows these key steps:</p>

        <h3>1. Initial Assessment</h3>
        <p>Every book undergoes a thorough initial examination. We check the binding, paper quality, and overall condition. This helps us determine the appropriate preservation approach and identify any immediate concerns that need addressing.</p>

        <h3>2. Cleaning and Stabilization</h3>
        <p>Using specialized tools and techniques, we carefully clean each book, removing dust and debris. Any loose pages are secured, and fragile areas are stabilized. We use acid-free materials and reversible techniques to ensure we're not causing any long-term damage.</p>

        <div class="bg-primary-50 p-8 rounded-lg my-12">
          <h4 class="text-xl font-semibold mb-4">Did You Know?</h4>
          <p>Many vintage mystery books from the pulp era were printed on highly acidic paper, which can deteriorate rapidly if not properly preserved. Our preservation techniques help slow this process significantly.</p>
        </div>

        <h3>3. Documentation</h3>
        <p>We photograph and document the book's condition, unique features, and any publisher's marks or inscriptions. This documentation helps preserve the book's history and provides valuable information for collectors.</p>

        <h3>4. Storage and Climate Control</h3>
        <p>Books are stored in a controlled environment with specific temperature and humidity levels. We use acid-free boxes and materials to prevent deterioration and protect books from environmental factors.</p>

        <h3>5. Digital Cataloging</h3>
        <p>Each book is carefully cataloged in our database with detailed descriptions, condition notes, and provenance information when available. This helps us maintain accurate records and assists collectors in finding specific titles.</p>
      </div>
    `
  },

  'golden-age-detective-fiction': {
    title: 'The Golden Age of Detective Fiction',
    date: 'February 10, 2024',
    readTime: '12 min read',
    category: 'History',
    heroImage: 'https://placehold.co/1200x600/e9c6b0/1C1C1E?text=Golden+Age+Mystery+Books',
    excerpt: 'Explore the rich history of detective fiction from the 1920s to 1940s, a period that defined the genre.',
    content: `
      <div class="article-content">
        <figure class="mb-12">
          <img 
            src="https://placehold.co/1200x600/e9c6b0/1C1C1E?text=Golden+Age+Mystery+Books" 
            alt="Collection of Golden Age mystery novels" 
            class="w-full rounded-lg shadow-lg"
          />
          <figcaption class="text-center text-sm text-primary-600 mt-4">
            Classic mysteries from the Golden Age of Detective Fiction
          </figcaption>
        </figure>

        <h2>The Birth of Modern Mystery</h2>
        <p class="lead">The period between World Wars I and II is widely considered the Golden Age of Detective Fiction. This era saw the emergence of complex puzzle plots, ingenious murder methods, and the establishment of many conventions we still see in mystery writing today.</p>

        <div class="bg-primary-50 p-8 rounded-lg my-12">
          <h4 class="text-xl font-semibold mb-4">Key Features of Golden Age Mysteries</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Fair-play plotting where readers have access to all clues</li>
            <li>Country house settings and closed-circle mysteries</li>
            <li>Amateur detectives with unique quirks and methods</li>
            <li>Focus on puzzle-solving over action or violence</li>
          </ul>
        </div>

        <h3>The Queens of Crime</h3>
        <p>The Golden Age was dominated by female writers who set new standards for the genre. Agatha Christie, Dorothy L. Sayers, Ngaio Marsh, and Margery Allingham became known as the "Queens of Crime," each bringing their unique style to detective fiction.</p>

        <h3>The Rules of the Game</h3>
        <p>In 1928, Ronald Knox published his "Ten Commandments" of detective fiction, codifying the rules that many Golden Age writers followed. These included prohibitions against supernatural solutions, undisclosed twins, and the detective turning out to be the criminal.</p>

        <h2>Legacy and Influence</h2>
        <p>The Golden Age's influence extends far beyond its time. Modern mystery writers continue to draw inspiration from this era's emphasis on clever plotting, fair-play detection, and memorable characters. The period's best works remain in print and continue to captivate new generations of readers.</p>
      </div>
    `
  },

  'collecting-pulp-magazines': {
    title: 'A Guide to Collecting Pulp Magazines',
    date: 'February 1, 2024',
    readTime: '10 min read',
    category: 'Collecting',
    heroImage: 'https://placehold.co/1200x600/e9c6b0/1C1C1E?text=Vintage+Pulp+Magazines',
    excerpt: 'Tips and insights for collectors interested in vintage pulp magazines, from identification to storage.',
    content: `
      <div class="article-content">
        <figure class="mb-12">
          <img 
            src="https://placehold.co/1200x600/e9c6b0/1C1C1E?text=Vintage+Pulp+Magazines" 
            alt="Collection of vintage pulp magazines" 
            class="w-full rounded-lg shadow-lg"
          />
          <figcaption class="text-center text-sm text-primary-600 mt-4">
            A selection of well-preserved pulp magazines from the 1930s and 1940s
          </figcaption>
        </figure>

        <h2>Starting Your Pulp Collection</h2>
        <p class="lead">Pulp magazines represent a unique piece of publishing history, offering a window into popular fiction of the early 20th century. For collectors, these publications present both challenges and rewards.</p>

        <h3>What Makes Pulps Special</h3>
        <p>Pulp magazines, named for their cheap wood pulp paper, were the paperbacks of their day. They featured bold cover art, sensational stories, and introduced many now-famous authors to the reading public. Their very fragility makes surviving copies particularly precious.</p>

        <div class="bg-primary-50 p-8 rounded-lg my-12">
          <h4 class="text-xl font-semibold mb-4">Condition Factors to Consider</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Paper quality and brittleness</li>
            <li>Cover preservation</li>
            <li>Spine integrity</li>
            <li>Page completeness</li>
            <li>Color vibrancy of cover art</li>
          </ul>
        </div>

        <h3>Where to Find Pulps</h3>
        <p>While yard sales and estate sales occasionally yield treasures, most serious collectors work with specialized dealers and attend pulp conventions. Online marketplaces can be good sources but require careful verification of condition and authenticity.</p>

        <h2>Preservation Tips</h2>
        <p>Proper storage is crucial for pulp magazines. Use acid-free backing boards and mylar sleeves. Store magazines vertically, away from direct sunlight, and in a climate-controlled environment. Handle with clean, dry hands and support the spine when reading.</p>

        <div class="bg-primary-50 p-8 rounded-lg my-12">
          <h4 class="text-xl font-semibold mb-4">Investment Potential</h4>
          <p>While collecting should primarily be driven by passion, many pulp magazines have shown significant appreciation in value. First appearances of major characters or early works by famous authors can be particularly valuable.</p>
        </div>
      </div>
    `
  }
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const article = articles[params.slug as keyof typeof articles];
  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }

  const fullText = await getProductContent(params.slug);
  
  return json({ 
    article,
    fullText 
  });
};

export const meta: MetaFunction<typeof loader> = getMergedPageMeta;

export default function ArticlePage() {
  const { article, fullText } = useLoaderData<typeof loader>();

  // Add console.log to debug
  console.log("Rendering ArticlePage with:", { article, fullText });

  return (
    <>
      <Container className="!px-0 py-0 sm:!p-16">
        <Hero
          className="min-h-[400px] !max-w-full bg-accent-50 sm:rounded-3xl p-6 sm:p-10 md:p-[88px] md:px-[88px]"
          content={
            <div className="text-center w-full space-y-9">
              <div className="flex items-center justify-center gap-4 text-sm text-primary-600">
                <span className="bg-primary-100 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  {article.readTime}
                </div>
                <span>{article.date}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-italiana tracking-wider [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
                {article.title}
              </h1>
            </div>
          }
        />
      </Container>

      <Container className="pt-0 max-w-3xl mx-auto pb-44">
        <hr className="w-1/2 border-t-2 border-primary-700 mx-auto my-16" />
        
        <div className="prose prose-lg max-w-none">
          {/* Conditionally render either Sanity content or article content */}
          {fullText ? (
            fullText.map((block, index) => (
              <div key={index}>
                {renderBlock(block)}
              </div>
            ))
          ) : (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          )}
        </div>

        <div className="mt-16 pt-16 border-t border-primary-700/20">
          <Link 
            to="/murderwiki"
            className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-600 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to MurderWiki</span>
          </Link>
        </div>
      </Container>
    </>
  );
} 