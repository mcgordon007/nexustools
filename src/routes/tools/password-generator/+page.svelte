<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let password = $state('');
  let length = $state(16);
  let includeUppercase = $state(true);
  let includeLowercase = $state(true);
  let includeNumbers = $state(true);
  let includeSymbols = $state(false);
  let passwordStrength = $state<'weak' | 'medium' | 'strong' | 'very-strong'>('medium');
  
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  function generatePassword() {
    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    if (chars.length === 0) {
      password = '';
      return;
    }
    
    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    
    password = result;
    calculateStrength();
  }
  
  function calculateStrength() {
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUppercase) score++;
    if (includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    
    if (score <= 3) passwordStrength = 'weak';
    else if (score <= 5) passwordStrength = 'medium';
    else if (score <= 6) passwordStrength = 'strong';
    else passwordStrength = 'very-strong';
  }
  
  function copyPassword() {
    navigator.clipboard.writeText(password);
  }
  
  $effect(() => {
    calculateStrength();
  });
  
  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
    'very-strong': 'bg-primary-500'
  };
</script>

<ToolLayout title="Password Generator" description="Generate secure random passwords with customizable options." category="Security">
  <div class="space-y-6">
    <!-- Generated Password -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Generated Password</label>
      <div class="flex gap-2">
        <input 
          type="text" 
          readonly 
          value={password}
          class="input-field font-mono text-lg"
          placeholder="Click Generate to create a password"
        />
        <button onclick={copyPassword} disabled={!password} class="btn-secondary disabled:opacity-50">
          Copy
        </button>
      </div>
    </div>
    
    <!-- Strength Indicator -->
    {#if password}
      <div>
        <div class="flex justify-between mb-1">
          <span class="text-sm text-gray-600 dark:text-gray-400">Strength</span>
          <span class="text-sm font-medium capitalize">{passwordStrength.replace('-', ' ')}</span>
        </div>
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div class="h-full {strengthColors[passwordStrength]} transition-all duration-300" style="width: {passwordStrength === 'weak' ? '25%' : passwordStrength === 'medium' ? '50%' : passwordStrength === 'strong' ? '75%' : '100%'}"></div>
        </div>
      </div>
    {/if}
    
    <!-- Options -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Length -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Length: {length}
        </label>
        <input 
          type="range" 
          min="4" 
          max="64" 
          bind:value={length}
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>4</span>
          <span>64</span>
        </div>
      </div>
      
      <!-- Character Types -->
      <div class="space-y-3">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Character Types</label>
        <div class="space-y-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" bind:checked={includeUppercase} class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" bind:checked={includeLowercase} class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Lowercase (a-z)</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" bind:checked={includeNumbers} class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Numbers (0-9)</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" bind:checked={includeSymbols} class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Symbols (!@#$%...)</span>
          </label>
        </div>
      </div>
    </div>
    
    <!-- Generate Button -->
    <button onclick={generatePassword} class="btn-primary w-full py-3 text-lg">
      Generate Password
    </button>
  </div>
</ToolLayout>
