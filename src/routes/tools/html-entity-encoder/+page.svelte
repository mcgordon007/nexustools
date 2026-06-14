<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let output = $state('');
  let mode = $state<'encode' | 'decode'>('encode');
  
  function process() {
    if (mode === 'encode') {
      output = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    } else {
      output = input
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
    }
  }
  
  $effect(() => {
    if (input) process();
  });
</script>

<ToolLayout title="HTML Entity Encoder" description="Encode and decode HTML entities." category="Developer">
  <div class="space-y-4">
    <div class="flex gap-2">
      <button onclick={() => { mode = 'encode'; process(); }} class="btn-secondary" class:bg-primary-600={mode === 'encode'} class:text-white={mode === 'encode'}>Encode</button>
      <button onclick={() => { mode = 'decode'; process(); }} class="btn-secondary" class:bg-primary-600={mode === 'decode'} class:text-white={mode === 'decode'}>Decode</button>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
        <textarea bind:value={input} class="textarea-field h-48" placeholder="Enter text..."></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
        <textarea readonly value={output} class="textarea-field h-48 bg-gray-50 dark:bg-gray-900"></textarea>
      </div>
    </div>
  </div>
</ToolLayout>
