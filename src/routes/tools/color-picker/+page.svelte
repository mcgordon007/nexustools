<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let hex = $state('#0ea5e9');
  let rgb = $derived({ r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) });
  let hsl = $derived(rgbToHsl(rgb.r, rgb.g, rgb.b));
  
  function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }
  
  function copyValue(value: string) {
    navigator.clipboard.writeText(value);
  }
</script>

<ToolLayout title="Color Picker" description="Pick colors and get HEX, RGB, HSL values." category="Security">
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <input type="color" bind:value={hex} class="w-32 h-32 rounded-lg cursor-pointer" />
      <div class="w-32 h-32 rounded-lg border border-gray-200 dark:border-gray-700" style="background-color: {hex}"></div>
    </div>
    
    <div class="grid md:grid-cols-3 gap-4">
      <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">HEX</div>
        <div class="flex items-center gap-2">
          <code class="font-mono text-lg">{hex}</code>
          <button onclick={() => copyValue(hex)} class="btn-secondary text-sm">Copy</button>
        </div>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">RGB</div>
        <div class="flex items-center gap-2">
          <code class="font-mono text-lg">rgb({rgb.r}, {rgb.g}, {rgb.b})</code>
          <button onclick={() => copyValue(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} class="btn-secondary text-sm">Copy</button>
        </div>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">HSL</div>
        <div class="flex items-center gap-2">
          <code class="font-mono text-lg">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</code>
          <button onclick={() => copyValue(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} class="btn-secondary text-sm">Copy</button>
        </div>
      </div>
    </div>
  </div>
</ToolLayout>
