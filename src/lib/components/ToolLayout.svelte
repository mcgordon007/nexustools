<script lang="ts">
  import type { Snippet } from 'svelte';
  import { page } from '$app/state';
  import SEO from './SEO.svelte';
  
  interface Props {
    title: string;
    description: string;
    category?: string;
    keywords?: string;
    footerText?: string;
    children: Snippet;
  }
  
  let { title, description, category = 'Developer', keywords, footerText, children }: Props = $props();
  
  const defaultKeywords = `${title}, online tool, free tool, developer tool, ${category.toLowerCase()} tool`;
  const url = `https://88669988.xyz${page.url.pathname}`;
</script>

<SEO 
  title={title}
  description={description}
  keywords={keywords || defaultKeywords}
  url={url}
/>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- Tool Header -->
  <div class="mb-8">
    <div class="flex items-center gap-2 mb-2">
      <a href="/" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
        Home
      </a>
      <span class="text-gray-400">/</span>
      <a href="/tools/{category.toLowerCase()}" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
        {category} Tools
      </a>
      <span class="text-gray-400">/</span>
      <span class="text-sm text-gray-700 dark:text-gray-300">{title}</span>
    </div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
    <p class="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
  </div>
  
  <!-- Tool Content -->
  <div class="card">
    {@render children()}
  </div>
  
  <!-- Tool Footer -->
  <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">About {title}</h2>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      {footerText || `This tool runs entirely in your browser. Your data is never sent to any server. It's fast, private, and free to use.`}
    </p>
  </div>
</div>
