<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let pattern = $state('');
  let testString = $state('');
  let flags = $state('g');
  let matches = $state<RegExpMatchArray | null>(null);
  let error = $state('');
  
  function testRegex() {
    error = '';
    matches = null;
    
    if (!pattern || !testString) return;
    
    try {
      const regex = new RegExp(pattern, flags);
      matches = testString.match(regex);
    } catch (e) {
      error = e instanceof Error ? e.message : 'Invalid regex';
    }
  }
</script>

<ToolLayout title="Regex Tester" description="Test and debug regular expressions in real-time." category="Developer">
  <div class="space-y-4">
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pattern</label>
        <input type="text" bind:value={pattern} class="input-field font-mono" placeholder="/pattern/" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Flags</label>
        <input type="text" bind:value={flags} class="input-field" placeholder="g" />
      </div>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Test String</label>
      <textarea bind:value={testString} class="textarea-field h-32" placeholder="Enter test string..."></textarea>
    </div>
    
    <button onclick={testRegex} class="btn-primary">Test Regex</button>
    
    {#if error}
      <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p class="text-red-600 dark:text-red-400 text-sm">{error}</p>
      </div>
    {/if}
    
    {#if matches}
      <div>
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Matches ({matches.length})</h3>
        <div class="space-y-2">
          {#each matches as match, i}
            <div class="p-2 bg-gray-100 dark:bg-gray-900 rounded font-mono text-sm">{match}</div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</ToolLayout>
