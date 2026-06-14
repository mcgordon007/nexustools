<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let output = $state('');
  let mode = $state<'encode' | 'decode'>('encode');
  let error = $state('');
  
  function processURL() {
    error = '';
    try {
      if (mode === 'encode') {
        output = encodeURIComponent(input);
      } else {
        output = decodeURIComponent(input);
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Invalid input';
      output = '';
    }
  }
  
  function copyOutput() {
    navigator.clipboard.writeText(output);
  }
  
  function clearAll() {
    input = '';
    output = '';
    error = '';
  }
  
  $effect(() => {
    if (input) {
      processURL();
    }
  });
</script>

<ToolLayout title="URL Encoder/Decoder" description="Encode and decode URLs for safe transmission." category="Developer">
  <div class="space-y-4">
    <!-- Mode Toggle -->
    <div class="flex gap-2">
      <button 
        onclick={() => { mode = 'encode'; processURL(); }}
        class="btn-primary"
        class:bg-primary-600={mode === 'encode'}
        class:bg-gray-200={mode !== 'encode'}
        class:dark:bg-gray-700={mode !== 'encode'}
        class:text-white={mode === 'encode'}
        class:text-gray-900={mode !== 'encode'}
        class:dark:text-gray-100={mode !== 'encode'}
      >
        Encode
      </button>
      <button 
        onclick={() => { mode = 'decode'; processURL(); }}
        class="btn-primary"
        class:bg-primary-600={mode === 'decode'}
        class:bg-gray-200={mode !== 'decode'}
        class:dark:bg-gray-700={mode !== 'decode'}
        class:text-white={mode === 'decode'}
        class:text-gray-900={mode !== 'decode'}
        class:dark:text-gray-100={mode !== 'decode'}
      >
        Decode
      </button>
      <button onclick={copyOutput} disabled={!output} class="btn-secondary disabled:opacity-50 ml-auto">
        Copy Output
      </button>
      <button onclick={clearAll} class="btn-secondary">
        Clear
      </button>
    </div>
    
    <!-- Input/Output -->
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {mode === 'encode' ? 'Text to Encode' : 'URL to Decode'}
        </label>
        <textarea 
          bind:value={input}
          class="textarea-field h-64"
          placeholder={mode === 'encode' ? 'Enter URL or text to encode...' : 'Enter encoded URL to decode...'}
        ></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {mode === 'encode' ? 'Encoded URL' : 'Decoded Text'}
        </label>
        <textarea 
          readonly
          value={output}
          class="textarea-field h-64 bg-gray-50 dark:bg-gray-900"
          placeholder="Result will appear here..."
        ></textarea>
      </div>
    </div>
    
    <!-- Error -->
    {#if error}
      <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p class="text-red-600 dark:text-red-400 text-sm font-medium">Error: {error}</p>
      </div>
    {/if}
  </div>
</ToolLayout>
