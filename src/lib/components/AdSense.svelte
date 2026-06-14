<script lang="ts">
  interface Props {
    slot: string;
    format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid';
    style?: string;
    responsive?: boolean;
  }
  
  let { 
    slot, 
    format = 'auto', 
    style = 'display:block',
    responsive = true 
  }: Props = $props();
  
  let adContainer: HTMLDivElement;
  
  import { onMount } from 'svelte';
  
  onMount(() => {
    try {
      // @ts-ignore - adsbygoogle is injected by AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not loaded (e.g., ad blocker)
    }
  });
</script>

<div class="ad-container my-4">
  <ins class="adsbygoogle"
    style={style}
    data-ad-client="ca-pub-2485720330662082"
    data-ad-slot={slot}
    data-ad-format={format}
    data-full-width-responsive={responsive ? 'true' : 'false'}
  ></ins>
</div>
