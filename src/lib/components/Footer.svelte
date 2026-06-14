<script lang="ts">
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'JSON Formatter', href: '/tools/json-formatter' },
    { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
    { name: 'URL Encoder', href: '/tools/url-encoder' },
    { name: 'Password Generator', href: '/tools/password-generator' },
    { name: 'QR Code Generator', href: '/tools/qr-code-generator' },
    { name: 'Word Counter', href: '/tools/word-counter' }
  ];
  
  const categories = [
    { name: 'Developer Tools', href: '/tools/developer' },
    { name: 'Text Tools', href: '/tools/text' },
    { name: 'Security Tools', href: '/tools/security' },
    { name: 'Image Tools', href: '/tools/image' }
  ];
</script>

<footer class="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Brand -->
      <div class="col-span-1 md:col-span-2">
        <a href="/" class="flex items-center gap-2 mb-4">
          <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white">NexusTools</span>
        </a>
        <p class="text-gray-600 dark:text-gray-400 text-sm max-w-md">
          Free online developer tools for everyday tasks. Format JSON, encode strings, generate passwords, and more. Fast, private, and free to use.
        </p>
      </div>
      
      <!-- Quick Links -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Popular Tools</h3>
        <ul class="space-y-2">
          {#each quickLinks as link}
            <li>
              <a href={link.href} class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Categories -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Categories</h3>
        <ul class="space-y-2">
          {#each categories as category}
            <li>
              <a href={category.href} class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {category.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    
    <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          © {currentYear} NexusTools. All rights reserved.
        </p>
        <div class="flex flex-wrap gap-4 md:gap-6">
          <a href="/terms" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Terms of Service
          </a>
          <a href="/privacy" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Privacy Policy
          </a>
          <a href="/cookies" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Cookie Policy
          </a>
          <a href="/contact" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Contact
          </a>
          <a href="/about" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            About
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>
