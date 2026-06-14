<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let output = $state('');
  let caseType = $state<'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab'>('upper');
  
  function convert() {
    switch (caseType) {
      case 'upper':
        output = input.toUpperCase();
        break;
      case 'lower':
        output = input.toLowerCase();
        break;
      case 'title':
        output = input.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case 'sentence':
        output = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        break;
      case 'camel':
        output = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase());
        break;
      case 'snake':
        output = input.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        break;
      case 'kebab':
        output = input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        break;
    }
  }
  
  $effect(() => {
    if (input) convert();
  });
</script>

<ToolLayout title="Case Converter" description="Convert text between different cases." category="Text">
  <div class="space-y-4">
    <div class="flex flex-wrap gap-2">
      <button onclick={() => { caseType = 'upper'; convert(); }} class="btn-secondary" class:bg-primary-600={caseType === 'upper'} class:text-white={caseType === 'upper'}>UPPER</button>
      <button onclick={() => { caseType = 'lower'; convert(); }} class="btn-secondary" class:bg-primary-600={caseType === 'lower'} class:text-white={caseType === 'lower'}>lower</button>
      <button onclick={() => { caseType = 'title'; convert(); }} class="btn-secondary" class:bg-primary-600={caseType === 'title'} class:text-white={caseType === 'title'}>Title Case</button>
      <button onclick={() => { caseType = 'sentence'; convert(); }} class="btn-secondary" class:bg-primary-600={caseType === 'sentence'} class:text-white={caseType === 'sentence'}>Sentence case</button>
      <button onclick={() => { caseType = 'camel'; convert(); }} class="btn-secondary" class:bg-primary-600={caseType === 'camel'} class:text-white={caseType === 'camel'}>camelCase</button>
      <button onclick={() => { caseType = 'snake'; convert(); }} class="btn-secondary" class:bg-primary-600={caseType === 'snake'} class:text-white={caseType === 'snake'}>snake_case</button>
      <button onclick={() => { caseType = 'kebab'; convert(); }} class="btn-secondary" class:bg-primary-600={caseType === 'kebab'} class:text-white={caseType === 'kebab'}>kebab-case</button>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
        <textarea bind:value={input} class="textarea-field h-48" placeholder="Enter text..."></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
        <textarea readonly value={output} class="textarea-field h-48 bg-gray-50 dark:bg-gray-900"></textarea>
      </div>
    </div>
  </div>
</ToolLayout>
