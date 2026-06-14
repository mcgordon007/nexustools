<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let output = $state('');
  
  function removeDuplicates() {
    const lines = input.split('\n');
    const unique = [...new Set(lines)];
    output = unique.join('\n');
  }
</script>

<ToolLayout title="Remove Duplicates" description="Remove duplicate lines from text." category="Text">
  <div class="space-y-4">
    <button onclick={removeDuplicates} class="btn-primary">Remove Duplicates</button>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input (with duplicates)</label>
        <textarea bind:value={input} class="textarea-field h-64" placeholder="Enter lines..."></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output (unique lines)</label>
        <textarea readonly value={output} class="textarea-field h-64 bg-gray-50 dark:bg-gray-900"></textarea>
      </div>
    </div>
  </div>
</ToolLayout>
