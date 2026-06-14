<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  // @ts-ignore - qrcode-generator has no types
  import qrcode from 'qrcode-generator';
  
  let text = $state('');
  let qrDataUrl = $state('');
  let size = $state(256);
  let error = $state('');
  
  function generateQR() {
    error = '';
    qrDataUrl = '';
    
    if (!text) return;
    
    try {
      // Create QR code
      const qr = qrcode(0, 'M');
      qr.addData(text);
      qr.make();
      
      // Generate canvas
      const moduleCount = qr.getModuleCount();
      const cellSize = Math.floor(size / moduleCount);
      const margin = Math.floor((size - cellSize * moduleCount) / 2);
      
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        
        // Draw QR modules
        ctx.fillStyle = '#000000';
        for (let row = 0; row < moduleCount; row++) {
          for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
              ctx.fillRect(
                margin + col * cellSize,
                margin + row * cellSize,
                cellSize,
                cellSize
              );
            }
          }
        }
        
        qrDataUrl = canvas.toDataURL('image/png');
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to generate QR code';
    }
  }
  
  function downloadQR() {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qrcode.png';
    link.click();
  }
  
  function clearAll() {
    text = '';
    qrDataUrl = '';
    error = '';
  }
  
  $effect(() => {
    if (text) {
      generateQR();
    } else {
      qrDataUrl = '';
    }
  });
</script>

<ToolLayout title="QR Code Generator" description="Generate QR codes from text or URLs instantly. Runs entirely in your browser." category="Security">
  <div class="space-y-6">
    <!-- Input -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
      <textarea 
        bind:value={text}
        class="textarea-field"
        rows={3}
        placeholder="Enter text or URL to encode..."
      ></textarea>
    </div>
    
    <!-- Size -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Size: {size}x{size}px
      </label>
      <input 
        type="range" 
        min="128" 
        max="512" 
        step="32"
        bind:value={size}
        class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>128px</span>
        <span>512px</span>
      </div>
    </div>
    
    <!-- QR Code Preview -->
    {#if qrDataUrl}
      <div class="flex flex-col items-center gap-4">
        <div class="p-4 bg-white rounded-lg shadow-inner">
          <img src={qrDataUrl} alt="QR Code" class="max-w-full" style="width: {size}px; height: {size}px;" />
        </div>
        <div class="flex gap-2">
          <button onclick={downloadQR} class="btn-primary">
            Download PNG
          </button>
          <button onclick={clearAll} class="btn-secondary">
            Clear
          </button>
        </div>
      </div>
    {:else}
      <div class="flex flex-col items-center gap-4 py-12 text-gray-400">
        <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
        <p>Enter text above to generate a QR code</p>
      </div>
    {/if}
    
    <!-- Error -->
    {#if error}
      <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p class="text-red-600 dark:text-red-400 text-sm font-medium">Error: {error}</p>
      </div>
    {/if}
    
    <p class="text-xs text-gray-500 dark:text-gray-400">
      This tool runs entirely in your browser. Your data never leaves your device.
    </p>
  </div>
</ToolLayout>
