<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  const tools = [
    { name: 'Image Resizer', description: 'Resize images to custom dimensions', href: '/tools/image-resizer' },
    { name: 'Image Compressor', description: 'Compress images', href: '/tools/image-compressor' },
    { name: 'Image to Base64', description: 'Convert images to Base64', href: '/tools/image-to-base64' },
    { name: 'Favicon Generator', description: 'Generate favicons', href: '/tools/favicon-generator' },
    { name: 'Placeholder Image', description: 'Generate placeholder images', href: '/tools/placeholder-image' }
  ];
</script>

<SEO title="Image Tools" description="Free online image tools: image resizer, compressor, Base64 converter, and more." url="https://88669988.xyz/tools/image" />

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Image Tools</h1>
    <p class="text-gray-600 dark:text-gray-400 mt-2">Resize, compress, and convert images with these handy tools.</p>
  </div>
  
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each tools as tool}
      <a href={tool.href} class="card group hover:border-primary-500 border border-transparent">
        <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600">{tool.name}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{tool.description}</p>
      </a>
    {/each}
  </div>
</div>
