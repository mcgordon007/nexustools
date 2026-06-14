<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  const tools = [
    { name: 'Password Generator', description: 'Generate secure random passwords', href: '/tools/password-generator' },
    { name: 'QR Code Generator', description: 'Generate QR codes', href: '/tools/qr-code-generator' },
    { name: 'Color Picker', description: 'Pick colors and get HEX, RGB, HSL', href: '/tools/color-picker' },
    { name: 'IP Address Lookup', description: 'Look up IP addresses', href: '/tools/ip-lookup' },
    { name: 'AES Encryption', description: 'Encrypt and decrypt text', href: '/tools/aes-encryption' }
  ];
</script>

<SEO title="Security Tools" description="Free online security tools: password generator, QR code generator, color picker, and more." url="https://88669988.xyz/tools/security" />

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Security Tools</h1>
    <p class="text-gray-600 dark:text-gray-400 mt-2">Generate secure passwords, QR codes, and encrypt your data.</p>
  </div>
  
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each tools as tool}
      <a href={tool.href} class="card group hover:border-primary-500 border border-transparent">
        <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600">{tool.name}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{tool.description}</p>
      </a>
    {/each}
  </div>
</div>
