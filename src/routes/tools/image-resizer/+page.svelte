<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let file: File | null = $state(null);
  let width = $state(800);
  let height = $state(600);
  let outputUrl = $state('');
  
  function handleFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      file = target.files[0];
    }
  }
  
  function resize() {
    if (!file) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        outputUrl = canvas.toDataURL('image/png');
      }
    };
    img.src = URL.createObjectURL(file);
  }
  
  function download() {
    const link = document.createElement('a');
    link.href = outputUrl;
    link.download = 'resized-image.png';
    link.click();
  }
</script>

<ToolLayout title="Image Resizer" description="Resize images to custom dimensions." category="Image">
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Image</label>
      <input type="file" accept="image/*" onchange={handleFile} class="input-field" />
    </div>
    
    <div class="flex gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Width (px)</label>
        <input type="number" bind:value={width} class="input-field w-32" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (px)</label>
        <input type="number" bind:value={height} class="input-field w-32" />
      </div>
    </div>
    
    <button onclick={resize} disabled={!file} class="btn-primary disabled:opacity-50">Resize</button>
    
    {#if outputUrl}
      <div class="space-y-4">
        <img src={outputUrl} alt="Resized" class="max-w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        <button onclick={download} class="btn-secondary">Download</button>
      </div>
    {/if}
  </div>
</ToolLayout>
