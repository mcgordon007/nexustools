<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let minute = $state('0');
  let hour = $state('*');
  let dayOfMonth = $state('*');
  let month = $state('*');
  let dayOfWeek = $state('*');
  let cronExpression = $derived(`${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`);
  
  const descriptions: Record<string, string> = {
    '0 * * * *': 'Every hour',
    '0 0 * * *': 'Every day at midnight',
    '0 9 * * 1-5': 'Weekdays at 9 AM',
    '0 0 1 * *': 'First day of every month',
    '*/15 * * * *': 'Every 15 minutes'
  };
</script>

<ToolLayout title="Cron Job Generator" description="Generate cron expressions easily." category="Developer">
  <div class="space-y-6">
    <div class="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <code class="text-xl font-mono">{cronExpression}</code>
      {#if descriptions[cronExpression]}
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">{descriptions[cronExpression]}</p>
      {/if}
    </div>
    
    <div class="grid md:grid-cols-5 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minute (0-59)</label>
        <input type="text" bind:value={minute} class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hour (0-23)</label>
        <input type="text" bind:value={hour} class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Day (1-31)</label>
        <input type="text" bind:value={dayOfMonth} class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Month (1-12)</label>
        <input type="text" bind:value={month} class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weekday (0-6)</label>
        <input type="text" bind:value={dayOfWeek} class="input-field" />
      </div>
    </div>
    
    <div>
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Common Presets</h3>
      <div class="flex flex-wrap gap-2">
        <button onclick={() => { minute = '0'; hour = '*'; dayOfMonth = '*'; month = '*'; dayOfWeek = '*'; }} class="btn-secondary text-sm">Every hour</button>
        <button onclick={() => { minute = '0'; hour = '0'; dayOfMonth = '*'; month = '*'; dayOfWeek = '*'; }} class="btn-secondary text-sm">Daily at midnight</button>
        <button onclick={() => { minute = '0'; hour = '9'; dayOfMonth = '*'; month = '*'; dayOfWeek = '1-5'; }} class="btn-secondary text-sm">Weekdays 9 AM</button>
        <button onclick={() => { minute = '*/15'; hour = '*'; dayOfMonth = '*'; month = '*'; dayOfWeek = '*'; }} class="btn-secondary text-sm">Every 15 min</button>
      </div>
    </div>
  </div>
</ToolLayout>
