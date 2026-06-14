<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  const tools = [
    { name: 'JSON Formatter', description: 'Format, beautify, and validate JSON data', href: '/tools/json-formatter' },
    { name: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings', href: '/tools/base64-encoder' },
    { name: 'URL Encoder/Decoder', description: 'Encode and decode URLs', href: '/tools/url-encoder' },
    { name: 'Hash Generator', description: 'Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes', href: '/tools/hash-generator' },
    { name: 'UUID Generator', description: 'Generate random UUIDs/GUIDs', href: '/tools/uuid-generator' },
    { name: 'JWT Decoder', description: 'Decode and inspect JWT tokens', href: '/tools/jwt-decoder' },
    { name: 'Regex Tester', description: 'Test regular expressions', href: '/tools/regex-tester' },
    { name: 'HTML Entity Encoder', description: 'Encode and decode HTML entities', href: '/tools/html-entity-encoder' },
    { name: 'YAML to JSON Converter', description: 'Convert YAML to JSON', href: '/tools/yaml-json-converter' },
    { name: 'Diff Checker', description: 'Compare two texts', href: '/tools/diff-checker' },
    { name: 'Cron Job Generator', description: 'Generate cron expressions', href: '/tools/cron-generator' },
    { name: 'Code Beautifier', description: 'Beautify code', href: '/tools/code-beautifier' }
  ];
</script>

<SEO title="Developer Tools" description="Free online developer tools: JSON formatter, Base64 encoder, URL encoder, hash generator, and more." url="https://88669988.xyz/tools/developer" />

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Developer Tools</h1>
    <p class="text-gray-600 dark:text-gray-400 mt-2">Essential tools for developers. Format JSON, encode strings, generate hashes, and more.</p>
  </div>
  
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each tools as tool}
      <a href={tool.href} class="card group hover:border-primary-500 border border-transparent">
        <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{tool.name}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{tool.description}</p>
      </a>
    {/each}
  </div>
</div>
