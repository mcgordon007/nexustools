<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
  title="Page Not Found"
  description="The page you are looking for does not exist."
  url="https://88669988.xyz"
/>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
  <div class="mb-8">
    <div class="text-8xl font-bold text-primary-600 dark:text-primary-400 mb-4">404</div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
      Sorry, the page you are looking for doesn't exist or has been moved.
    </p>
  </div>
  
  <div class="flex flex-col sm:flex-row gap-4 justify-center">
    <a href="/" class="btn-primary">
      Go to Homepage
    </a>
    <a href="/tools/developer" class="btn-secondary">
      Browse Tools
    </a>
  </div>
  
  <div class="mt-16">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Popular Tools</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <a href="/tools/json-formatter" class="card hover:border-primary-500 dark:hover:border-primary-500 text-left">
        <h3 class="font-semibold text-gray-900 dark:text-white">JSON Formatter</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Format and validate JSON</p>
      </a>
      <a href="/tools/base64-encoder" class="card hover:border-primary-500 dark:hover:border-primary-500 text-left">
        <h3 class="font-semibold text-gray-900 dark:text-white">Base64 Encoder</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Encode and decode Base64</p>
      </a>
      <a href="/tools/password-generator" class="card hover:border-primary-500 dark:hover:border-primary-500 text-left">
        <h3 class="font-semibold text-gray-900 dark:text-white">Password Generator</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Generate secure passwords</p>
      </a>
    </div>
  </div>
</div>
