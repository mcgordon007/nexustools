<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let language = $state('javascript');
  let output = $state('');
  
  function beautify() {
    try {
      if (language === 'javascript' || language === 'json') {
        output = JSON.stringify(JSON.parse(input), null, 2);
      } else {
        output = input;
      }
    } catch {
      output = input;
    }
  }
</script>

<ToolLayout title="Code Beautifier" description="Beautify and format code in multiple languages." category="Developer">
  <div class="space-y-4">
    <div class="flex gap-2">
      <select bind:value={language} class="input-field w-40">
        <option value="javascript">JavaScript</option>
        <option value="json">JSON</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>
      <button onclick={beautify} class="btn-primary">Beautify</button>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Code</label>
        <textarea bind:value={input} class="textarea-field h-64" placeholder="Paste your code..."></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
        <textarea readonly value={output} class="textarea-field h-64 bg-gray-50 dark:bg-gray-900"></textarea>
      </div>
    </div>
  </div>
</ToolLayout>
