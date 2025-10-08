<template>
  <div v-if="favorites.length > 0" class="space-y-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-gray-800">Vos favoris ({{ favorites.length }})</h2>
      <button
        v-if="favorites.length > 0"
        @click="$emit('clearAll')"
        class="text-red-600 hover:text-red-800 text-sm font-medium transition"
      >
        Tout supprimer
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="fav in favorites"
        :key="fav.name"
        class="card cursor-pointer hover:scale-105 transition-transform"
        @click="$emit('selectCity', fav.name)"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-bold text-gray-800">{{ fav.name }}</h3>
            <p class="text-gray-600">{{ fav.country }}</p>
          </div>
          <button
            @click.stop="$emit('removeFavorite', fav.name)"
            class="text-red-500 hover:text-red-700 transition"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
        
        <div class="flex items-center justify-between">
          <div class="text-3xl font-bold text-gray-800">{{ fav.temp }}°C</div>
          <img 
            :src="`https://openweathermap.org/img/wn/${fav.icon}@2x.png`"
            :alt="fav.description"
            class="w-16 h-16"
          />
        </div>
        
        <p class="text-gray-600 mt-2 capitalize">{{ fav.description }}</p>
        
        <div class="flex justify-between mt-3 text-sm text-gray-500">
          <span>💧 {{ fav.humidity }}%</span>
          <span>💨 {{ fav.wind_speed }} m/s</span>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="card text-center py-12">
    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    </svg>
    <h3 class="text-2xl font-bold text-gray-800 mb-2">Aucun favori</h3>
    <p class="text-gray-600">Recherchez une ville et ajoutez-la à vos favoris ❤️</p>
  </div>
</template>

<script setup>
defineProps({
  favorites: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['removeFavorite', 'selectCity', 'clearAll'])
</script>