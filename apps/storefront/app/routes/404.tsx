import { Container } from '@app/components/common/container';
import type { MetaFunction } from '@remix-run/node';
import { getMergedPageMeta } from '@libs/util/page';
import Hero from '@app/components/sections/Hero';
import { Link } from '@remix-run/react';
import { HomeIcon, BookOpenIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export const meta: MetaFunction = getMergedPageMeta;

export default function NotFound() {
  return (
    <>
      <Container className="!px-0 py-0 sm:!p-16">
        <Hero
          className="min-h-[400px] !max-w-full bg-accent-50 sm:rounded-3xl p-6 sm:p-10 md:p-[88px] md:px-[88px]"
          content={
            <div className="text-center w-full space-y-9">
              <h4 className="text-lg md:text-2xl font-italiana tracking-wider">CASE FILE</h4>
              <h1 className="text-4xl md:text-8xl font-italiana tracking-wider [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
                404: Page Not Found
              </h1>
              <p className="text-lg text-primary-700">
                Missing Page Report
              </p>
            </div>
          }
        />
      </Container>

      <Container className="pt-0 max-w-2xl mx-auto pb-44">
        <hr className="w-1/2 border-t-2 border-primary-700 mx-auto my-16" />
        <div className="prose prose-lg max-w-prose mx-auto">
          <div className="bg-primary-50 p-8 rounded-lg shadow-inner mb-12">
            <p className="text-primary-700 mb-4">
              <span className="font-semibold">Status:</span> Ongoing Investigation
            </p>
            <p className="text-primary-700 mb-4">
              <span className="font-semibold">Details:</span> The page you're looking for seems to have vanished without a trace. Our top detective is on the case.
            </p>
            <p className="text-primary-700">
              <span className="font-semibold">Last Seen:</span> In the vast library of vintage crime fiction
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Explore Our Archives</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/" 
                className="flex items-center justify-center p-6 bg-primary-50 rounded-lg 
                         hover:bg-primary-100 transition-colors gap-3
                         text-primary-700 group"
              >
                <HomeIcon className="h-6 w-6 group-hover:text-primary-600" />
                <span>Return Home</span>
              </Link>
              <Link 
                to="/about-us" 
                className="flex items-center justify-center p-6 bg-primary-50 rounded-lg 
                         hover:bg-primary-100 transition-colors gap-3
                         text-primary-700 group"
              >
                <InformationCircleIcon className="h-6 w-6 group-hover:text-primary-600" />
                <span>About Us</span>
              </Link>
              <Link 
                to="/products" 
                className="flex items-center justify-center p-6 bg-primary-50 rounded-lg 
                         hover:bg-primary-100 transition-colors gap-3
                         text-primary-700 group"
              >
                <BookOpenIcon className="h-6 w-6 group-hover:text-primary-600" />
                <span>Browse Books</span>
              </Link>
            </div>
          </div>

          <div className="text-center mt-16 pt-16 border-t border-primary-700/20">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="mb-6">
              Our detective team is ready to assist you in finding what you're looking for.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-primary-700 text-primary-50 py-3 rounded hover:bg-primary-600 transition-colors min-w-[200px]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
} 