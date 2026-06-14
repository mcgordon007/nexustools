<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let uuids = $state<string[]>([]);
  let count = $state(1);
  let version = $state<'v4' | 'v1'>('v4');
  
  function generateUUIDs() {
    uuids = [];
    for (let i = 0; i < count; i++) {
      if (version === 'v4') {
        uuids.push(crypto.randomUUID());
      } else {
        // Simple v1-like UUID (not RFC compliant, for demo only)
        const timestamp = Date.now().toString(16).padStart(12, '0');
        const random = crypto.getRandomValues(new Uint8Array(4));
        const randomHex = Array.from(random).map(b => b.toString(16).padStart(2, '0')).join('');
        uuids.push(`${timestamp.slice(0, 8)}-${timestamp.slice(8, 12)}-1xxx-${randomHex.slice(0, 4)}-${randomHex.slice(4)}000000`.slice(0, 36));
      }
    }
  }
  
  function copyUUID(uuid: string) {
    navigator.clipboard.writeText(uuid);
  }
  
  function copyAll() {
    navigator.clipboard.writeText(uuids.join('\n'));
  }
</script>

<ToolLayout title="UUID Generator" description="Generate random UUIDs/GUIDs instantly." category="Developer">
  <div class="space-y-4">
    <div class="flex gap-2 items-center">
      <select bind:value={version} class="input-field w-24">
        <option value="v4">v4</option>
        <option value="v1">v1</option>
      </select>
      <input type="number" bind:value={count} min="1" max="100" class="input-field w-24" />
      <span class="text-gray-600 dark:text-gray-400">UUIDs</span>
      <button onclick={generateUUIDs} class="btn-primary">Generate</button>
      {#if uuids.length > 0}
        <button onclick={copyAll} class="btn-secondary">Copy All</button>
      {/if}
    </div>
    
    {#if uuids.length > 0}
      <div class="space-y-2">
        {#each uuids as uuid}
          <div class="flex items-center gap-2">
            <code class="flex-1 p-2 bg-gray-100 dark:bg-gray-900 rounded font-mono text-sm">{uuid}</code>
            <button onclick={() => copyUUID(uuid)} class="btn-secondary text-sm">Copy</button>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</ToolLayout>
