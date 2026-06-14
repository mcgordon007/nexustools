<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let width = $state(300);
  let height = $state(200);
  let text = $state('Placeholder');
  let bgColor = $state('#cccccc');
  let textColor = $state('#333333');
  let outputUrl = $state('');
  
  function generate() {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = textColor;
      ctx.font = `${Math.min(width, height) / 8}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2);
      
      outputUrl = canvas.toDataURL('image/png');
    }
  }
  
  function download() {
    const link = document.createElement('a');
    link.href = outputUrl;
    link.download = 'placeholder.png';
    link.click();
  }
  
  $effect(() => {
    generate();
  });
</script>

<ToolLayout title="Placeholder Image" description="Generate placeholder images." category="Image">
  <div class="space-y-4">
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Width (px)</label>
        <input type="number" bind:value={width} class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (px)</label>
        <input type="number" bind:value={height} class="input-field" />
      </div>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text</label>
      <input type="text" bind:value={text} class="input-field" />
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Background Color</label>
        <input type="color" bind:value={bgColor} class="w-full h-10 rounded cursor-pointer" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Color</label>
        <input type="color" bind:value={textColor} class="w-full h-10 rounded cursor-pointer" />
      </div>
    </div>
    
    {#if outputUrl}
      <div class="space-y-4">
        <img src={outputUrl} alt="Placeholder" class="rounded-lg border border-gray-200 dark:border-gray-700" />
        <button onclick={download} class="btn-secondary">Download</button>
      </div>
    {/if}
  </div>
</ToolLayout>
