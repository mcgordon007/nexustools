<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let output = $state('');
  let mode = $state<'chars' | 'words' | 'lines'>('chars');
  
  function reverse() {
    if (mode === 'chars') {
      output = input.split('').reverse().join('');
    } else if (mode === 'words') {
      output = input.split(' ').reverse().join(' ');
    } else {
      output = input.split('\n').reverse().join('\n');
    }
  }
  
  $effect(() => {
    if (input) reverse();
  });
</script>

<ToolLayout title="Text Reverser" description="Reverse text characters or words." category="Text">
  <div class="space-y-4">
    <div class="flex gap-2">
      <button onclick={() => { mode = 'chars'; reverse(); }} class="btn-secondary" class:bg-primary-600={mode === 'chars'} class:text-white={mode === 'chars'}>Characters</button>
      <button onclick={() => { mode = 'words'; reverse(); }} class="btn-secondary" class:bg-primary-600={mode === 'words'} class:text-white={mode === 'words'}>Words</button>
      <button onclick={() => { mode = 'lines'; reverse(); }} class="btn-secondary" class:bg-primary-600={mode === 'lines'} class:text-white={mode === 'lines'}>Lines</button>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
        <textarea bind:value={input} class="textarea-field h-48" placeholder="Enter text..."></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reversed</label>
        <textarea readonly value={output} class="textarea-field h-48 bg-gray-50 dark:bg-gray-900"></textarea>
      </div>
    </div>
  </div>
</ToolLayout>
