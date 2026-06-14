<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let token = $state('');
  let decoded = $state<{ header: object; payload: object } | null>(null);
  let error = $state('');
  
  // Decode Base64URL with Unicode support
  function decodeBase64Url(str: string): string {
    // Convert Base64URL to Base64
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    // Decode with Unicode support
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  }
  
  function decodeJWT() {
    error = '';
    decoded = null;
    
    if (!token) return;
    
    try {
      const parts = token.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. A JWT must have 3 parts separated by dots.');
      }
      
      const header = JSON.parse(decodeBase64Url(parts[0]));
      const payload = JSON.parse(decodeBase64Url(parts[1]));
      
      decoded = { header, payload };
    } catch (e) {
      error = e instanceof Error ? e.message : 'Invalid JWT';
    }
  }
  
  function copyJSON(obj: object) {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
  }
</script>

<ToolLayout title="JWT Decoder" description="Decode and inspect JWT tokens." category="Developer">
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JWT Token</label>
      <textarea bind:value={token} class="textarea-field h-24" placeholder="Paste your JWT token here..."></textarea>
    </div>
    
    <button onclick={decodeJWT} class="btn-primary">Decode JWT</button>
    
    {#if error}
      <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p class="text-red-600 dark:text-red-400 text-sm">{error}</p>
      </div>
    {/if}
    
    {#if decoded}
      <div class="space-y-4">
        <div>
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Header</h3>
            <button onclick={() => copyJSON(decoded.header)} class="btn-secondary text-sm">Copy</button>
          </div>
          <pre class="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto text-sm">{JSON.stringify(decoded.header, null, 2)}</pre>
        </div>
        <div>
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Payload</h3>
            <button onclick={() => copyJSON(decoded.payload)} class="btn-secondary text-sm">Copy</button>
          </div>
          <pre class="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto text-sm">{JSON.stringify(decoded.payload, null, 2)}</pre>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          Note: This tool only decodes the token. It does not verify the signature.
        </p>
      </div>
    {/if}
  </div>
</ToolLayout>
