import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'joet3wd5',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-02-15',
  useCdn: true
});

export default client; 