import { Container } from '@app/components/common/container';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { getMergedPageMeta } from '@libs/util/page';
import Hero from '@app/components/sections/Hero';

export const loader = async (args: LoaderFunctionArgs) => {
  return {};
};

export const meta: MetaFunction<typeof loader> = getMergedPageMeta;

export default function FAQ() {
  return (
    <>
      <Container className="!px-0 py-0 sm:!p-16">
        <Hero
          className="min-h-[400px] !max-w-full bg-accent-50 sm:rounded-3xl p-6 sm:p-10 md:p-[88px] md:px-[88px]"
          content={
            <div className="text-center w-full space-y-9">
              <h4 className="text-lg md:text-2xl font-italiana tracking-wider">HELP CENTER</h4>
              <h1 className="text-4xl md:text-8xl font-italiana tracking-wider [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
                Frequently Asked Questions
              </h1>
            </div>
          }
        />
      </Container>

      <Container className="pt-0 max-w-2xl mx-auto pb-44">
        <hr className="w-1/2 border-t-2 border-primary-700 mx-auto my-16" />
        <div className="prose prose-lg max-w-prose mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. What makes your books special?</h2>
            <p>
              Our collection focuses on carefully curated vintage murder mystery and detective fiction, with an emphasis on rare and hard-to-find titles from the golden age of pulp fiction. Each book is thoroughly inspected for quality and authenticity, ensuring you receive a genuine piece of literary history. While some books may show their age through natural patina, we believe this adds to their character and historical value.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How do you handle shipping and packaging?</h2>
            <p>
              We take exceptional care in packaging your vintage books. Each book is individually wrapped in acid-free paper, then carefully cushioned with bubble wrap and placed in a sturdy box with additional padding. We understand these are collectibles, and we ship accordingly. All orders are insured and tracked, with domestic shipping typically taking 3-5 business days and international shipping 7-14 business days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. What is your return policy?</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you receive a book that doesn't match its description or is damaged during shipping, we offer a full refund within 30 days of delivery. Simply contact us with photos of the issue, and we'll provide return shipping instructions. Please note that due to the unique nature of vintage books, we cannot accept returns for minor imperfections that are typical of books of this age.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Do you offer international shipping?</h2>
            <p>
              Yes, we ship worldwide! International shipping costs are calculated based on destination and package weight. All international orders are fully tracked and insured. Please note that import duties and taxes are the responsibility of the buyer and are not included in our shipping costs. Delivery times may vary depending on your location and local customs processing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. How do you grade book conditions?</h2>
            <p>
              We use a detailed grading system that considers factors such as binding integrity, page quality, cover wear, and overall preservation. Each listing includes specific condition notes and multiple photos. Our grades range from "Poor" to "Fine," with most of our books falling into the "Good" to "Very Good" range, typical for vintage publications. We always err on the side of caution in our descriptions to ensure customer satisfaction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Can I request specific titles?</h2>
            <p>
              Absolutely! We maintain a want list for our customers and actively search for specific titles. If there's a particular book you're looking for, let us know through our contact form. We have extensive connections in the vintage book community and regularly acquire new inventory. While we can't guarantee we'll find every requested title, we'll do our best to help you track down that special book.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Do you offer gift wrapping?</h2>
            <p>
              Yes, we offer complimentary gift wrapping services for all orders. Our vintage-inspired wrapping paper and custom bookplates add a special touch to any gift. Just select the gift wrap option during checkout and include any personal message you'd like us to add to the accompanying card. We can also ship directly to gift recipients with a gift receipt that doesn't show pricing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. What payment methods do you accept?</h2>
            <p>
              We accept all major credit cards (Visa, MasterCard, American Express, Discover) through our secure payment processor, Stripe. We also accept PayPal for added convenience and security. All transactions are encrypted and processed through secure servers. For special arrangements or large purchases, we can discuss other payment options - just reach out to our customer service team.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. How often do you add new books?</h2>
            <p>
              We update our inventory weekly with new acquisitions. The best way to stay informed about new additions is to subscribe to our newsletter, which announces new arrivals and special collections. You can also follow us on social media, where we regularly post about incoming books and share interesting stories about our latest finds.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Do you buy or trade books?</h2>
            <p>
              Yes, we're always interested in acquiring quality vintage mystery and detective fiction. If you have books you'd like to sell or trade, please contact us with details about your collection, including titles, authors, editions, and conditions. We offer fair market values and can arrange for secure shipping. We're particularly interested in pre-1960 mystery fiction, pulp magazines, and rare editions.
            </p>
          </section>

          <div className="text-center mt-16 pt-16 border-t border-primary-700/20">
            <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
            <p className="mb-6">
              We're here to help! Reach out to our team for personalized assistance.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-primary-700 text-primary-50 py-3 rounded hover:bg-primary-600 transition-colors min-w-[200px]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </Container>
    </>
  );
} 