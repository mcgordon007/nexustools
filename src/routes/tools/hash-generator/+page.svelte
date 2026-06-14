<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let output = $state('');
  let algorithm = $state('sha256');
  
  async function generateHash() {
    if (!input) return;
    
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    
    let hashBuffer: ArrayBuffer;
    
    switch (algorithm) {
      case 'sha1':
        hashBuffer = await crypto.subtle.digest('SHA-1', data);
        break;
      case 'sha256':
        hashBuffer = await crypto.subtle.digest('SHA-256', data);
        break;
      case 'sha384':
        hashBuffer = await crypto.subtle.digest('SHA-384', data);
        break;
      case 'sha512':
        hashBuffer = await crypto.subtle.digest('SHA-512', data);
        break;
      default:
        hashBuffer = await crypto.subtle.digest('SHA-256', data);
    }
    
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    output = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  function copyOutput() {
    navigator.clipboard.writeText(output);
  }
</script>

<ToolLayout title="Hash Generator" description="Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from text." category="Developer">
  <div class="space-y-4">
    <div class="flex gap-2">
      <select bind:value={algorithm} class="input-field w-40">
        <option value="sha1">SHA-1</option>
        <option value="sha256">SHA-256</option>
        <option value="sha384">SHA-384</option>
        <option value="sha512">SHA-512</option>
      </select>
      <button onclick={generateHash} class="btn-primary">Generate Hash</button>
      <button onclick={copyOutput} disabled={!output} class="btn-secondary disabled:opacity-50">Copy</button>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
      <textarea bind:value={input} class="textarea-field h-32" placeholder="Enter text to hash..."></textarea>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hash Output</label>
      <input type="text" readonly value={output} class="input-field font-mono" placeholder="Hash will appear here..." />
    </div>
  </div>
</ToolLayout>
