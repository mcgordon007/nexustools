<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let output = $state('');
  let order = $state<'asc' | 'desc'>('asc');
  
  function sort() {
    const lines = input.split('\n');
    lines.sort();
    if (order === 'desc') lines.reverse();
    output = lines.join('\n');
  }
</script>

<ToolLayout title="Text Sorter" description="Sort lines of text alphabetically." category="Text">
  <div class="space-y-4">
    <div class="flex gap-2">
      <button onclick={() => { order = 'asc'; sort(); }} class="btn-secondary" class:bg-primary-600={order === 'asc'} class:text-white={order === 'asc'}>A-Z</button>
      <button onclick={() => { order = 'desc'; sort(); }} class="btn-secondary" class:bg-primary-600={order === 'desc'} class:text-white={order === 'desc'}>Z-A</button>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
        <textarea bind:value={input} class="textarea-field h-64" placeholder="Enter lines..."></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sorted</label>
        <textarea readonly value={output} class="textarea-field h-64 bg-gray-50 dark:bg-gray-900"></textarea>
      </div>
    </div>
  </div>
</ToolLayout>
