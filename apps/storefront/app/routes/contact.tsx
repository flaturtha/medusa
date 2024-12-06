import { Container } from '@app/components/common/container';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getMergedPageMeta } from '@libs/util/page';
import Hero from '@app/components/sections/Hero';
import { useState } from 'react';
import { useLoaderData, useNavigation } from '@remix-run/react';

export const loader = async (args: LoaderFunctionArgs) => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  return json({
    mathProblem: {
      num1,
      num2,
      answer: num1 + num2
    }
  });
};

export const meta: MetaFunction<typeof loader> = getMergedPageMeta;

export default function Contact() {
  const { mathProblem } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState<{ name: string; email: string; message: string }>({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xkgnragj', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmittedMessage({
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          message: formData.get('message') as string,
        });
        setSubmitted(true);
        form.reset();
      } else {
        setSubmissionError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmissionError("Failed to send message. Please try again.");
    }
  };

  if (submitted) {
    return (
      <>
        <Container className="!px-0 py-0 sm:!p-16">
          <Hero
            className="min-h-[400px] !max-w-full bg-accent-50 sm:rounded-3xl p-6 sm:p-10 md:p-[88px] md:px-[88px]"
            content={
              <div className="text-center w-full space-y-9">
                <h4 className="text-lg md:text-2xl font-italiana tracking-wider">MESSAGE SENT</h4>
                <h1 className="text-4xl md:text-8xl font-italiana tracking-wider [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
                  Thank You
                </h1>
              </div>
            }
          />
        </Container>

        <Container className="pt-0 max-w-2xl mx-auto pb-44">
          <hr className="w-1/2 border-t-2 border-primary-700 mx-auto my-16" />
          <div className="prose prose-lg max-w-prose mx-auto">
            <div className="mb-8 p-6 bg-primary-50 rounded-lg border border-primary-100">
              <p className="text-primary-700 mb-4">You said:</p>
              <div className="pl-4 border-l-2 border-primary-200">
                <p className="text-primary-600 whitespace-pre-wrap">{submittedMessage.message}</p>
              </div>
            </div>
            <p className="text-center mb-6">
              We'll get back to you as soon as possible.
            </p>
            <div className="text-center">
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-primary-700 text-primary-50 px-6 py-2 rounded hover:bg-primary-600 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container className="!px-0 py-0 sm:!p-16">
        <Hero
          className="min-h-[400px] !max-w-full bg-accent-50 sm:rounded-3xl p-6 sm:p-10 md:p-[88px] md:px-[88px]"
          content={
            <div className="text-center w-full space-y-9">
              <h4 className="text-lg md:text-2xl font-italiana tracking-wider hidden">CONTACT</h4>
              <h1 className="text-4xl md:text-8xl font-italiana tracking-wider [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
                Send Us A Crow&middot;Mail
              </h1>
              <p className="text-center text-gray-600 mb-8">
            We'd love to hear from you. Please fill out the form below or use our contact information.
          </p>
            </div>
          }
        />
      </Container>

      <Container className="pt-0 max-w-4xl mx-auto pb-44">
        <hr className="w-1/2 border-t-2 border-primary-700 mx-auto my-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="_replyto" value="atticus@crowmail.co" />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-700">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full p-2 border border-primary-200 rounded focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-2 border border-primary-200 rounded focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-700">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full p-2 border border-primary-200 rounded focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-700">
                  What is {mathProblem.num1} + {mathProblem.num2}?
                </label>
                <input
                  type="text"
                  name="math"
                  required
                  className="w-full p-2 border border-primary-200 rounded focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
                <input type="hidden" name="expectedAnswer" value={mathProblem.answer} />
              </div>

              <input
                type="text"
                name="_gotcha"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {submissionError && (
                <div className="text-red-500 text-sm">
                  {submissionError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-700 text-primary-50 py-2 rounded hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="bg-primary-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span>📧</span>
                <a href="mailto:atticus@crowmail.co" className="hover:underline">
                  atticus@crowmail.co
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span>📍</span>
                <span>675 Town Square Blvd, Building 1A, Suite 200, PMG 530, Garland, TX 75040</span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Response Time</h3>
              <p className="text-primary-600">We typically respond within 1-2 business days.</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
} 