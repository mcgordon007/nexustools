<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let text = $state('');
  
  interface Stats {
    characters: number;
    charactersNoSpaces: number;
    words: number;
    sentences: number;
    paragraphs: number;
    lines: number;
  }
  
  let stats = $derived<Stats>({
    get characters() { return text.length; },
    get charactersNoSpaces() { return text.replace(/\s/g, '').length; },
    get words() { return text.trim() ? text.trim().split(/\s+/).length : 0; },
    get sentences() { return text.trim() ? (text.match(/[.!?]+/g) || []).length : 0; },
    get paragraphs() { return text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0; },
    get lines() { return text.trim() ? text.split('\n').length : 0; }
  });
  
  function clearAll() {
    text = '';
  }
  
  function copyStats() {
    const statsText = `Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Lines: ${stats.lines}`;
    navigator.clipboard.writeText(statsText);
  }
</script>

<ToolLayout title="Word Counter" description="Count words, characters, sentences, and paragraphs in your text." category="Text">
  <div class="space-y-6">
    <!-- Stats Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.characters}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Characters</div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.charactersNoSpaces}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">No Spaces</div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.words}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Words</div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.sentences}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.paragraphs}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Paragraphs</div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.lines}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Lines</div>
      </div>
    </div>
    
    <!-- Controls -->
    <div class="flex gap-2">
      <button onclick={copyStats} disabled={!text} class="btn-secondary disabled:opacity-50">
        Copy Stats
      </button>
      <button onclick={clearAll} class="btn-secondary">
        Clear
      </button>
    </div>
    
    <!-- Text Input -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Text</label>
      <textarea 
        bind:value={text}
        class="textarea-field h-80"
        placeholder="Start typing or paste your text here..."
      ></textarea>
    </div>
  </div>
</ToolLayout>
