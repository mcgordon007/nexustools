<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let file: File | null = $state(null);
  let output = $state('');
  
  function handleFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      file = target.files[0];
      convertToBase64(file);
    }
  }
  
  function convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      output = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  
  function copyOutput() {
    navigator.clipboard.writeText(output);
  }
</script>

<ToolLayout title="Image to Base64" description="Convert images to Base64 strings." category="Image">
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Image</label>
      <input type="file" accept="image/*" onchange={handleFile} class="input-field" />
    </div>
    
    {#if output}
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</label>
          <img src={output} alt="Preview" class="max-w-xs rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Base64 String</label>
          <textarea readonly value={output} class="textarea-field h-32 text-xs"></textarea>
        </div>
        <button onclick={copyOutput} class="btn-secondary">Copy Base64</button>
      </div>
    {/if}
  </div>
</ToolLayout>
