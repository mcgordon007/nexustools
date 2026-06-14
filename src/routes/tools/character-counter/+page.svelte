<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let includeSpaces = $state(true);
  let count = $derived(input ? (includeSpaces ? input.length : input.replace(/\s/g, '').length) : 0);
</script>

<ToolLayout title="Character Counter" description="Count characters with and without spaces." category="Text">
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <input type="checkbox" bind:checked={includeSpaces} class="w-4 h-4" />
      <span class="text-sm text-gray-700 dark:text-gray-300">Include spaces</span>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text</label>
      <textarea bind:value={input} class="textarea-field h-48" placeholder="Enter text..."></textarea>
    </div>
    
    <div class="text-4xl font-bold text-primary-600 dark:text-primary-400">
      {count} characters
    </div>
  </div>
</ToolLayout>
