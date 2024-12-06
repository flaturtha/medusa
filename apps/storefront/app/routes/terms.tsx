import { Container } from '@app/components/common/container';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { getMergedPageMeta } from '@libs/util/page';
import Hero from '@app/components/sections/Hero';

export const loader = async (args: LoaderFunctionArgs) => {
  return {};
};

export const meta: MetaFunction<typeof loader> = getMergedPageMeta;

export default function Terms() {
  return (
    <>
      <Container className="!px-0 py-0 sm:!p-16">
        <Hero
          className="min-h-[400px] !max-w-full bg-accent-50 sm:rounded-3xl p-6 sm:p-10 md:p-[88px] md:px-[88px]"
          content={
            <div className="text-center w-full space-y-9">
              <h4 className="text-lg md:text-2xl font-italiana tracking-wider">LEGAL</h4>
              <h1 className="text-4xl md:text-8xl font-italiana tracking-wider [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
                Terms of Service
              </h1>
              <p className="text-lg mb-6 text-primary-50 bg-primary-700 inline-block px-4 py-1 rounded-full">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          }
        />
      </Container>

      <Container className="pt-0 max-w-2xl mx-auto pb-44">
        <hr className="w-1/2 border-t-2 border-primary-700 mx-auto my-16" />
        <div className="prose prose-lg max-w-prose mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website at talesofmurder.press, you agree to be bound by these terms of
              service and agree that you are responsible for compliance with any applicable local laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials (information or software) on
              Tales of Murder&apos;s website for personal, non-commercial transitory viewing only.
            </p>
            <p className="mt-4">This license shall automatically terminate if you violate any of these restrictions and may be terminated by Tales of Murder at any time.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
            <p>
              The materials on Tales of Murder&apos;s website are provided on an &apos;as is&apos; basis.
              Tales of Murder makes no warranties, expressed or implied, and hereby disclaims and negates
              all other warranties including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or non-infringement of intellectual property
              or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
            <p>
              In no event shall Tales of Murder or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business interruption)
              arising out of the use or inability to use the materials on Tales of Murder&apos;s website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:{' '}
              <a href="mailto:terms@talesofmurder.press" className="text-blue-600 hover:underline">
                terms@talesofmurder.press
              </a>
            </p>
          </section>
        </div>
      </Container>
    </>
  );
} 