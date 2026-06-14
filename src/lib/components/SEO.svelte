<script lang="ts">
  interface Props {
    title: string;
    description: string;
    keywords?: string;
    url?: string;
    type?: 'website' | 'article';
    image?: string;
  }
  
  let { 
    title, 
    description, 
    keywords = 'online tools, developer tools, free tools',
    url = 'https://88669988.xyz',
    type = 'website',
    image = 'https://88669988.xyz/og-image.jpg'
  }: Props = $props();
  
  const fullTitle = title === 'NexusTools' ? title : `${title} - NexusTools`;
  
  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": fullTitle,
    "description": description,
    "url": url,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "NexusTools",
      "url": "https://88669988.xyz"
    }
  };
</script>

<svelte:head>
  <!-- Basic Meta -->
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <link rel="canonical" href={url} />
  
  <!-- Open Graph -->
  <meta property="og:type" content={type} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:site_name" content="NexusTools" />
  <meta property="og:image" content={image} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="en_US" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  
  <!-- JSON-LD Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>
