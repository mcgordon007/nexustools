<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let output = $state('');
  let mode = $state<'yaml2json' | 'json2yaml'>('yaml2json');
  let error = $state('');
  
  // Simple YAML to JSON converter (basic implementation)
  function convert() {
    error = '';
    try {
      if (mode === 'yaml2json') {
        // Very basic YAML parsing - for demo purposes
        const lines = input.split('\n');
        const result: Record<string, string> = {};
        for (const line of lines) {
          const match = line.match(/^(\s*)([^:]+):\s*(.*)$/);
          if (match) {
            result[match[2].trim()] = match[3].trim();
          }
        }
        output = JSON.stringify(result, null, 2);
      } else {
        // JSON to YAML
        const obj = JSON.parse(input);
        output = Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join('\n');
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Conversion error';
    }
  }
</script>

<ToolLayout title="YAML to JSON Converter" description="Convert YAML to JSON and vice versa." category="Developer">
  <div class="space-y-4">
    <div class="flex gap-2">
      <button onclick={() => { mode = 'yaml2json'; convert(); }} class="btn-secondary" class:bg-primary-600={mode === 'yaml2json'} class:text-white={mode === 'yaml2json'}>YAML to JSON</button>
      <button onclick={() => { mode = 'json2yaml'; convert(); }} class="btn-secondary" class:bg-primary-600={mode === 'json2yaml'} class:text-white={mode === 'json2yaml'}>JSON to YAML</button>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{mode === 'yaml2json' ? 'YAML' : 'JSON'}</label>
        <textarea bind:value={input} class="textarea-field h-64" placeholder={mode === 'yaml2json' ? 'key: value' : '{"key": "value"}'}></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{mode === 'yaml2json' ? 'JSON' : 'YAML'}</label>
        <textarea readonly value={output} class="textarea-field h-64 bg-gray-50 dark:bg-gray-900"></textarea>
      </div>
    </div>
    
    {#if error}
      <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p class="text-red-600 dark:text-red-400 text-sm">{error}</p>
      </div>
    {/if}
  </div>
</ToolLayout>
