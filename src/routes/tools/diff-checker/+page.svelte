<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let text1 = $state('');
  let text2 = $state('');
  let diff = $state<{ line: number; type: 'add' | 'remove' | 'same'; content: string }[]>([]);
  
  function compare() {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    diff = [];
    
    const maxLen = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLen; i++) {
      const l1 = lines1[i] || '';
      const l2 = lines2[i] || '';
      
      if (l1 === l2) {
        diff.push({ line: i + 1, type: 'same', content: l1 });
      } else {
        if (l1) diff.push({ line: i + 1, type: 'remove', content: l1 });
        if (l2) diff.push({ line: i + 1, type: 'add', content: l2 });
      }
    }
  }
</script>

<ToolLayout title="Diff Checker" description="Compare two texts and highlight differences." category="Developer">
  <div class="space-y-4">
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text 1</label>
        <textarea bind:value={text1} class="textarea-field h-48" placeholder="Original text..."></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text 2</label>
        <textarea bind:value={text2} class="textarea-field h-48" placeholder="Modified text..."></textarea>
      </div>
    </div>
    
    <button onclick={compare} class="btn-primary">Compare</button>
    
    {#if diff.length > 0}
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {#each diff as d}
          <div class="flex font-mono text-sm {d.type === 'remove' ? 'bg-red-100 dark:bg-red-900/30' : d.type === 'add' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-white dark:bg-gray-800'}">
            <span class="w-12 text-right pr-2 text-gray-500 border-r border-gray-200 dark:border-gray-700">{d.line}</span>
            <span class="pl-2 flex-1 whitespace-pre">{d.content || ' '}</span>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</ToolLayout>
