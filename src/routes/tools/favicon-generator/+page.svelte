<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let file: File | null = $state(null);
  let sizes = $state([16, 32, 48, 64, 128, 256]);
  let outputs: { size: number; url: string }[] = $state([]);
  
  function handleFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      file = target.files[0];
    }
  }
  
  function generate() {
    if (!file) return;
    
    outputs = [];
    const img = new Image();
    img.onload = () => {
      for (const size of sizes) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, size, size);
          outputs.push({ size, url: canvas.toDataURL('image/png') });
        }
      }
    };
    img.src = URL.createObjectURL(file);
  }
  
  function download(url: string, size: number) {
    const link = document.createElement('a');
    link.href = url;
    link.download = `favicon-${size}x${size}.png`;
    link.click();
  }
</script>

<ToolLayout title="Favicon Generator" description="Generate favicons from images." category="Image">
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Image (PNG, JPG, SVG)</label>
      <input type="file" accept="image/*" onchange={handleFile} class="input-field" />
    </div>
    
    <button onclick={generate} disabled={!file} class="btn-primary disabled:opacity-50">Generate Favicons</button>
    
    {#if outputs.length > 0}
      <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
        {#each outputs as output}
          <div class="text-center">
            <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-2">
              <img src={output.url} alt={`${output.size}x${output.size}`} class="mx-auto" style="width: {Math.max(output.size / 4, 32)}px; height: {Math.max(output.size / 4, 32)}px;" />
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">{output.size}x{output.size}</div>
            <button onclick={() => download(output.url, output.size)} class="btn-secondary text-sm mt-2">Download</button>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</ToolLayout>
