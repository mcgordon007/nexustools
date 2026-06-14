<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let output = $state('');
  let mode = $state<'text2morse' | 'morse2text'>('text2morse');
  
  const morseCode: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
  };
  
  const reverseMorse: Record<string, string> = Object.fromEntries(
    Object.entries(morseCode).map(([k, v]) => [v, k])
  );
  
  function translate() {
    if (mode === 'text2morse') {
      output = input.toUpperCase().split('').map(c => morseCode[c] || c).join(' ');
    } else {
      output = input.split(' ').map(c => reverseMorse[c] || c).join('');
    }
  }
  
  $effect(() => {
    if (input) translate();
  });
</script>

<ToolLayout title="Morse Code Translator" description="Translate text to and from Morse code." category="Text">
  <div class="space-y-4">
    <div class="flex gap-2">
      <button onclick={() => { mode = 'text2morse'; translate(); }} class="btn-secondary" class:bg-primary-600={mode === 'text2morse'} class:text-white={mode === 'text2morse'}>Text to Morse</button>
      <button onclick={() => { mode = 'morse2text'; translate(); }} class="btn-secondary" class:bg-primary-600={mode === 'morse2text'} class:text-white={mode === 'morse2text'}>Morse to Text</button>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{mode === 'text2morse' ? 'Text' : 'Morse Code'}</label>
        <textarea bind:value={input} class="textarea-field h-48" placeholder={mode === 'text2morse' ? 'Enter text...' : 'Enter morse code...'}></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{mode === 'text2morse' ? 'Morse Code' : 'Text'}</label>
        <textarea readonly value={output} class="textarea-field h-48 bg-gray-50 dark:bg-gray-900"></textarea>
      </div>
    </div>
  </div>
</ToolLayout>
