<script lang="ts">
  import ToolLayout from '$lib/components/ToolLayout.svelte';
  
  let input = $state('');
  let output = $state('');
  let key = $state('');
  let mode = $state<'encrypt' | 'decrypt'>('encrypt');
  let error = $state('');
  
  // Derive a 256-bit key from password using PBKDF2
  async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }
  
  async function processAES() {
    error = '';
    output = '';
    
    if (!input || !key) {
      error = 'Please enter both text and secret key.';
      return;
    }
    
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      
      if (mode === 'encrypt') {
        // Generate random salt and IV
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        
        const cryptoKey = await deriveKey(key, salt);
        const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, cryptoKey, data);
        
        // Combine salt + iv + encrypted
        const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
        combined.set(salt, 0);
        combined.set(iv, salt.length);
        combined.set(new Uint8Array(encrypted), salt.length + iv.length);
        
        output = btoa(String.fromCharCode(...combined));
      } else {
        // Decode base64
        const combined = new Uint8Array(atob(input).split('').map(c => c.charCodeAt(0)));
        
        // Extract salt, iv, and encrypted data
        const salt = combined.slice(0, 16);
        const iv = combined.slice(16, 28);
        const encrypted = combined.slice(28);
        
        const cryptoKey = await deriveKey(key, salt);
        const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, cryptoKey, encrypted);
        
        output = new TextDecoder().decode(decrypted);
      }
    } catch (e) {
      error = mode === 'encrypt' 
        ? 'Encryption failed. Please try again.' 
        : 'Decryption failed. Check your key and input.';
    }
  }
</script>

<ToolLayout title="AES Encryption" description="Encrypt and decrypt text with AES-256 encryption." category="Security">
  <div class="space-y-4">
    <div class="flex gap-2">
      <button onclick={() => { mode = 'encrypt'; output = ''; error = ''; }} class="btn-secondary" class:bg-primary-600={mode === 'encrypt'} class:text-white={mode === 'encrypt'}>Encrypt</button>
      <button onclick={() => { mode = 'decrypt'; output = ''; error = ''; }} class="btn-secondary" class:bg-primary-600={mode === 'decrypt'} class:text-white={mode === 'decrypt'}>Decrypt</button>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Secret Key</label>
      <input type="password" bind:value={key} class="input-field" placeholder="Enter any password..." />
      <p class="text-xs text-gray-500 mt-1">Your password can be any length. It will be securely derived into an encryption key.</p>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{mode === 'encrypt' ? 'Plain Text' : 'Encrypted Text'}</label>
        <textarea bind:value={input} class="textarea-field h-48" placeholder={mode === 'encrypt' ? 'Enter text to encrypt...' : 'Enter encrypted text...'}></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{mode === 'encrypt' ? 'Encrypted' : 'Decrypted'}</label>
        <textarea readonly value={output} class="textarea-field h-48 bg-gray-50 dark:bg-gray-900"></textarea>
      </div>
    </div>
    
    {#if error}
      <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p class="text-red-600 dark:text-red-400 text-sm">{error}</p>
      </div>
    {/if}
    
    <button onclick={processAES} class="btn-primary">{mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}</button>
  </div>
</ToolLayout>
