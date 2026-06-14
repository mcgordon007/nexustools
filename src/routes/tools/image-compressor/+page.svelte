<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let file: File | null = $state(null);
  let quality = $state(0.8);
  let outputUrl = $state('');
  let originalSize = $state(0);
  let newSize = $state(0);
  
  function handleFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      file = target.files[0];
      originalSize = file.size;
    }
  }
  
  function compress() {
    if (!file) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            newSize = blob.size;
            outputUrl = URL.createObjectURL(blob);
          }
        }, 'image/jpeg', quality);
      }
    };
    img.src = URL.createObjectURL(file);
  }
  
  function download() {
    const link = document.createElement('a');
    link.href = outputUrl;
    link.download = 'compressed-image.jpg';
    link.click();
  }
</script>

<ToolLayout title="Image Compressor" description="Compress images without losing quality." category="Image">
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Image</label>
      <input type="file" accept="image/*" onchange={handleFile} class="input-field" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quality: {Math.round(quality * 100)}%</label>
      <input type="range" min="0.1" max="1" step="0.1" bind:value={quality} class="w-full" />
    </div>
    
    <button onclick={compress} disabled={!file} class="btn-primary disabled:opacity-50">Compress</button>
    
    {#if outputUrl}
      <div class="space-y-4">
        <div class="flex gap-4">
          <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div class="text-sm text-gray-600 dark:text-gray-400">Original</div>
            <div class="font-bold">{(originalSize / 1024).toFixed(1)} KB</div>
          </div>
          <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div class="text-sm text-gray-600 dark:text-gray-400">Compressed</div>
            <div class="font-bold">{(newSize / 1024).toFixed(1)} KB</div>
          </div>
          <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div class="text-sm text-green-600 dark:text-green-400">Saved</div>
            <div class="font-bold text-green-600 dark:text-green-400">{Math.round((1 - newSize / originalSize) * 100)}%</div>
          </div>
        </div>
        <img src={outputUrl} alt="Compressed" class="max-w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        <button onclick={download} class="btn-secondary">Download</button>
      </div>
    {/if}
  </div>
</ToolLayout>
