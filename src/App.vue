<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
    <!-- Navigation -->
    <nav class="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition">
            <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
            </svg>
            <h1 class="text-xl md:text-2xl font-bold">WeatherApp</h1>
          </router-link>
          
          <!-- Menu Desktop -->
          <div class="hidden md:flex gap-4">
            <router-link
              :to="{name: 'home'}"
              class="px-4 py-2 rounded-lg transition"
              :class="$route.name === 'home' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'"
            >
              Accueil
            </router-link>
            <router-link
              :to="{name : 'dashboard'}"
              class="px-4 py-2 rounded-lg transition flex items-center gap-2"
              :class="$route.name === 'dashboard' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <span>Dashboard</span>
            </router-link>
          </div>

          <!-- Bouton Menu Mobile -->
          <button 
            @click="toggleMenu"
            class="md:hidden p-2 rounded-lg hover:bg-blue-700 transition"
            aria-label="Menu"
          >
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Menu Mobile Déroulant -->
        <transition name="slide">
          <div v-if="isMenuOpen" class="md:hidden mt-4 pb-2 space-y-2">
            <router-link
              :to="{name: 'home'}"
              @click="closeMenu"
              class="block px-4 py-3 rounded-lg transition"
              :class="$route.name === 'home' ? 'bg-white text-blue-600' : 'bg-blue-700 hover:bg-blue-800'"
            >
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <span class="font-medium">Accueil</span>
              </div>
            </router-link>
            <router-link
              :to="{name : 'dashboard'}"
              @click="closeMenu"
              class="block px-4 py-3 rounded-lg transition"
              :class="$route.name === 'dashboard' ? 'bg-white text-blue-600' : 'bg-blue-700 hover:bg-blue-800'"
            >
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span class="font-medium">Dashboard</span>
              </div>
            </router-link>
          </div>
        </transition>
      </div>
    </nav>

    <!-- Contenu principal -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-6 mt-12">
      <div class="container mx-auto px-4 text-center">
        <p class="text-xs md:text-sm">© 2025 WeatherApp - Données météo en temps réel</p>
        <p class="text-xs mt-2 text-gray-400">Propulsé par OpenWeather API</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isMenuOpen = ref(false)
const router = useRouter()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Fermer le menu lors du changement de route
router.afterEach(() => {
  closeMenu()
})
</script>

<style scoped>
/* Animations fade pour les transitions de page */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animations slide pour le menu mobile */
.slide-enter-active {
  animation: slide-down 0.3s ease-out;
}

.slide-leave-active {
  animation: slide-up 0.3s ease-in;
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>