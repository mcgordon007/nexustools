<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  const tools = [
    { name: 'Word Counter', description: 'Count words, characters, sentences', href: '/tools/word-counter' },
    { name: 'Case Converter', description: 'Convert text between cases', href: '/tools/case-converter' },
    { name: 'Lorem Ipsum Generator', description: 'Generate placeholder text', href: '/tools/lorem-ipsum' },
    { name: 'Remove Duplicates', description: 'Remove duplicate lines', href: '/tools/remove-duplicates' },
    { name: 'Text Reverser', description: 'Reverse text', href: '/tools/text-reverser' },
    { name: 'Character Counter', description: 'Count characters', href: '/tools/character-counter' },
    { name: 'Text Sorter', description: 'Sort lines alphabetically', href: '/tools/text-sorter' },
    { name: 'Morse Code Translator', description: 'Translate Morse code', href: '/tools/morse-code' }
  ];
</script>

<SEO title="Text Tools" description="Free online text tools: word counter, case converter, lorem ipsum generator, and more." url="https://88669988.xyz/tools/text" />

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Text Tools</h1>
    <p class="text-gray-600 dark:text-gray-400 mt-2">Manipulate and analyze text with these handy tools.</p>
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
