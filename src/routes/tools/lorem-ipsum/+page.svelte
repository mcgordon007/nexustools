<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let paragraphs = $state(3);
  let words = $state(50);
  let output = $state('');
  
  const loremWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'];
  
  function generate() {
    const result: string[] = [];
    for (let p = 0; p < paragraphs; p++) {
      const para: string[] = [];
      for (let w = 0; w < words; w++) {
        para.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      para[0] = para[0].charAt(0).toUpperCase() + para[0].slice(1);
      result.push(para.join(' ') + '.');
    }
    output = result.join('\n\n');
  }
  
  function copyOutput() {
    navigator.clipboard.writeText(output);
  }
</script>

<ToolLayout title="Lorem Ipsum Generator" description="Generate placeholder text for designs." category="Text">
  <div class="space-y-4">
    <div class="flex gap-4 items-center">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Paragraphs</label>
        <input type="number" bind:value={paragraphs} min="1" max="20" class="input-field w-24" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Words per paragraph</label>
        <input type="number" bind:value={words} min="10" max="200" class="input-field w-24" />
      </div>
      <button onclick={generate} class="btn-primary mt-6">Generate</button>
      <button onclick={copyOutput} disabled={!output} class="btn-secondary mt-6 disabled:opacity-50">Copy</button>
    </div>
    
    {#if output}
      <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg whitespace-pre-wrap text-gray-700 dark:text-gray-300">
        {output}
      </div>
    {/if}
  </div>
</ToolLayout>
