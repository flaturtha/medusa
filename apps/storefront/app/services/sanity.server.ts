import { createClient } from '@sanity/client';

interface SanityBlock {
  _type: string;
  style: string;
  text: {
    content: string;
    _type: string;
    marks: string[];
  }[];
}

interface ProcessedBlock {
  type: string;
  style: string;
  text: string;
}

interface SanityProduct {
  _id: string;
  title: string;
  slug: string;
  fullText: SanityBlock[];
}

let client: ReturnType<typeof createClient>;

// Only create the client on the server side
if (typeof window === 'undefined') {
  client = createClient({
    projectId: process.env.SANITY_PROJECT_ID || 'joet3wd5',
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: '2024-02-15',
    useCdn: true
  });
}

export async function getProductContent(slug: string) {
  if (!client) {
    console.error('Sanity client is not initialized');
    return null;
  }

  // Clean the slug by removing leading/trailing slashes
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  
  try {
    // First, let's list all products to see what we have
    const allProducts = await client.fetch(
      `*[_type == "product"]{
        title,
        "slug": slug.current,
        _id
      }`
    );
    
    console.log("All Sanity products:", JSON.stringify(allProducts, null, 2));
    console.log("Looking for product with handle:", cleanSlug);
    
    // Try to find the product by title first
    const query = `*[_type == "product" && title == "Into the Heart of Australia"][0]{
      _id,
      title,
      "slug": slug.current,
      fullText[]{
        _key,
        _type,
        style,
        children[]{
          _key,
          _type,
          marks,
          text
        },
        markDefs
      }
    }`;
    
    console.log("Running Sanity query:", {
      query,
      params: { slug: cleanSlug }
    });

    const data = await client.fetch(query);

    // Process the nested structure to extract text content
    const processedFullText = data?.fullText?.map((block: any): ProcessedBlock => {
      // Extract text from children array - each child is a span with text
      const textContent = block.children
        ?.filter((child: any) => child._type === 'span')
        ?.map((child: any) => child.text)
        ?.join(' ');
      
      return {
        type: block._type,
        style: block.style || 'normal',
        text: textContent || ''
      };
    }) || [];

    console.log("Processed fullText:", JSON.stringify(processedFullText, null, 2));

    // If we found nothing, try a more permissive query
    if (!data) {
      console.log("No exact match found, trying fuzzy match...");
      const fuzzyQuery = `*[_type == "product" && (title match "Into the Heart of Australia" || slug.current match "${cleanSlug}")][0]{
        _id,
        title,
        "slug": slug.current,
        fullText[]{
          _key,
          _type,
          style,
          children[]{
            _key,
            _type,
            marks,
            text
          },
          markDefs
        }
      }`;
      const fuzzyData = await client.fetch(fuzzyQuery);
      console.log("Fuzzy match results:", JSON.stringify(fuzzyData, null, 2));
      
      if (fuzzyData) {
        const fuzzyProcessedText = fuzzyData.fullText?.map((block: any): ProcessedBlock => {
          const textContent = block.children
            ?.filter((child: any) => child._type === 'span')
            ?.map((child: any) => child.text)
            ?.join(' ');
          
          return {
            type: block._type,
            style: block.style || 'normal',
            text: textContent || ''
          };
        }) || [];
        return fuzzyProcessedText;
      }
    }

    console.log("Raw Sanity response:", JSON.stringify(data, null, 2));
    console.log("Sanity query parameters:", { slug: cleanSlug });
    console.log("Sanity response details:", {
      found: !!data,
      title: data?.title,
      slug: data?.slug,
      hasFullText: !!processedFullText,
      fullTextLength: processedFullText?.length,
      _id: data?._id
    });

    return processedFullText;
  } catch (error) {
    console.error("Error fetching Sanity content:", error);
    return null;
  }
} 