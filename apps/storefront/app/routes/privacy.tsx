import { Container } from '@app/components/common/container';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { getMergedPageMeta } from '@libs/util/page';
import Hero from '@app/components/sections/Hero';

export const loader = async (args: LoaderFunctionArgs) => {
  return {};
};

export const meta: MetaFunction<typeof loader> = getMergedPageMeta;

export default function Privacy() {
  return (
    <>
      <Container className="!px-0 py-0 sm:!p-16">
        <Hero
          className="min-h-[400px] !max-w-full bg-accent-50 sm:rounded-3xl p-6 sm:p-10 md:p-[88px] md:px-[88px]"
          content={
            <div className="text-center w-full space-y-9">
              <h4 className="text-lg md:text-2xl font-italiana tracking-wider">LEGAL</h4>
              <h1 className="text-4xl md:text-8xl font-italiana tracking-wider [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
                Privacy Policy
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
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Email address when you subscribe to our newsletter</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Send you our newsletter and updates about our products</li>
              <li>Respond to your requests or questions</li>
              <li>Improve our services and develop new features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:privacy@talesofmurder.press" className="text-blue-600 hover:underline">
                privacy@talesofmurder.press
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by
              posting the new privacy policy on this page and updating the "Last updated" date.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
} 