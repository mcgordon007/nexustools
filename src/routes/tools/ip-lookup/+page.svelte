<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let ip = $state('');
  let result = $state<{ ip: string; city?: string; country?: string; region?: string; org?: string; timezone?: string } | null>(null);
  let loading = $state(false);
  let error = $state('');
  
  async function lookup() {
    if (!ip) return;
    
    // Validate IP format
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$|^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    if (!ipRegex.test(ip.trim())) {
      error = 'Please enter a valid IPv4 or IPv6 address.';
      return;
    }
    
    loading = true;
    error = '';
    result = null;
    
    try {
      // Use ipapi.co which supports HTTPS and CORS (free tier: 30,000 requests/month)
      const res = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await res.json();
      
      if (data.error) {
        error = data.reason || 'Failed to lookup IP address.';
      } else {
        result = { 
          ip: data.ip, 
          city: data.city, 
          country: data.country_name,
          region: data.region,
          org: data.org,
          timezone: data.timezone
        };
      }
    } catch {
      error = 'Network error. Please try again later.';
    }
    loading = false;
  }
</script>

<ToolLayout title="IP Address Lookup" description="Look up information about IP addresses." category="Security" footerText="This tool uses a third-party API (ipapi.co) to look up IP geolocation information. The IP address you enter will be sent to the API for lookup.">
  <div class="space-y-4">
    <div class="flex gap-2">
      <input type="text" bind:value={ip} class="input-field" placeholder="e.g., 8.8.8.8" />
      <button onclick={lookup} disabled={loading} class="btn-primary disabled:opacity-50">
        {#if loading}Looking up...{:else}Lookup{/if}
      </button>
    </div>
    
    {#if error}
      <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p class="text-red-600 dark:text-red-400 text-sm">{error}</p>
      </div>
    {/if}
    
    {#if result}
      <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2">
        <div class="grid grid-cols-2 gap-2">
          <div><span class="font-medium text-gray-600 dark:text-gray-400">IP:</span></div>
          <div class="font-mono">{result.ip}</div>
        </div>
        {#if result.city}
          <div class="grid grid-cols-2 gap-2">
            <div><span class="font-medium text-gray-600 dark:text-gray-400">City:</span></div>
            <div>{result.city}</div>
          </div>
        {/if}
        {#if result.region}
          <div class="grid grid-cols-2 gap-2">
            <div><span class="font-medium text-gray-600 dark:text-gray-400">Region:</span></div>
            <div>{result.region}</div>
          </div>
        {/if}
        {#if result.country}
          <div class="grid grid-cols-2 gap-2">
            <div><span class="font-medium text-gray-600 dark:text-gray-400">Country:</span></div>
            <div>{result.country}</div>
          </div>
        {/if}
        {#if result.org}
          <div class="grid grid-cols-2 gap-2">
            <div><span class="font-medium text-gray-600 dark:text-gray-400">ISP:</span></div>
            <div>{result.org}</div>
          </div>
        {/if}
        {#if result.timezone}
          <div class="grid grid-cols-2 gap-2">
            <div><span class="font-medium text-gray-600 dark:text-gray-400">Timezone:</span></div>
            <div>{result.timezone}</div>
          </div>
        {/if}
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        Note: This tool uses a third-party API (ipapi.co) to look up IP information.
      </p>
    {/if}
  </div>
</ToolLayout>
