<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let output = $state('');
  let error = $state('');
  let indentSize = $state(2);
  
  function formatJSON() {
    error = '';
    try {
      const parsed = JSON.parse(input);
      output = JSON.stringify(parsed, null, indentSize);
    } catch (e) {
      error = e instanceof Error ? e.message : 'Invalid JSON';
      output = '';
    }
  }
  
  function minifyJSON() {
    error = '';
    try {
      const parsed = JSON.parse(input);
      output = JSON.stringify(parsed);
    } catch (e) {
      error = e instanceof Error ? e.message : 'Invalid JSON';
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
</script>

<ToolLayout title="JSON Formatter" description="Format, beautify, and validate JSON data with syntax highlighting." category="Developer">
  <div class="space-y-4">
    <!-- Controls -->
    <div class="flex flex-wrap gap-2">
      <button onclick={formatJSON} class="btn-primary">
        Format JSON
      </button>
      <button onclick={minifyJSON} class="btn-secondary">
        Minify
      </button>
      <button onclick={copyOutput} disabled={!output} class="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed">
        Copy Output
      </button>
      <button onclick={clearAll} class="btn-secondary">
        Clear
      </button>
      <div class="flex items-center gap-2 ml-auto">
        <label for="indent" class="text-sm text-gray-600 dark:text-gray-400">Indent:</label>
        <select id="indent" bind:value={indentSize} class="input-field w-20">
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value="tab">Tab</option>
        </select>
      </div>
    </div>
    
    <!-- Input/Output -->
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input JSON</label>
        <textarea 
          bind:value={input}
          class="textarea-field h-96"
          placeholder="Enter JSON here..."
        ></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
        <textarea 
          readonly
          value={output}
          class="textarea-field h-96 bg-gray-50 dark:bg-gray-900"
          placeholder="Formatted JSON will appear here..."
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
