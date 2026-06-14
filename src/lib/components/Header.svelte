<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
  
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Developer Tools', href: '/tools/developer' },
    { name: 'Text Tools', href: '/tools/text' },
    { name: 'Security Tools', href: '/tools/security' },
    { name: 'Image Tools', href: '/tools/image' }
  ];
  
  let mobileMenuOpen = $state(false);
  
  function closeMenu() {
    mobileMenuOpen = false;
  }
</script>

<svelte:window onclick={() => { if (mobileMenuOpen) closeMenu(); }} onkeydown={(e) => { if (e.key === 'Escape' && mobileMenuOpen) closeMenu(); }} />

<header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" onclick={(e) => e.stopPropagation()}>
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group" onclick={closeMenu}>
        <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          NexusTools
        </span>
      </a>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-1">
        {#each navItems as item}
          <a 
            href={item.href} 
            class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {item.name}
          </a>
        {/each}
      </div>
      
      <!-- Right side -->
      <div class="flex items-center gap-2">
        <ThemeToggle />
        
        <!-- Mobile menu button -->
        <button 
          class="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          onclick={(e) => { e.stopPropagation(); mobileMenuOpen = !mobileMenuOpen; }}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if mobileMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    {#if mobileMenuOpen}
      <div class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col gap-1">
          {#each navItems as item}
            <a 
              href={item.href} 
              class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onclick={closeMenu}
            >
              {item.name}
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </nav>
</header>
