<template>
  <div v-if="weather" class="gradient-bg rounded-2xl shadow-2xl p-8 text-white">
    <!-- En-tête -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h3 class="text-4xl font-bold">{{ weather.name }}</h3>
        <p class="text-xl opacity-90">{{ weather.country }}</p>
      </div>
      <button
        @click="toggleFavorite"
        class="bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition"
        :title="isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
      >
        <svg class="w-6 h-6" :class="{ 'fill-current': isFavorite }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>
    </div>

    <!-- Température principale -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-4">
        <img 
          :src="`https://openweathermap.org/img/wn/${weather.icon}@4x.png`"
          :alt="weather.description"
          class="w-32 h-32"
        />
        <div>
          <div class="text-6xl font-bold">{{ weather.temp }}°C</div>
          <div class="text-xl opacity-90 capitalize">{{ weather.description }}</div>
        </div>
      </div>
    </div>

    <!-- Détails météo -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Ressenti -->
      <div class="bg-white text-black bg-opacity-20 rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <span class="text-sm">Ressenti</span>
        </div>
        <div class="text-2xl font-bold">{{ weather.feels_like }}°C</div>
      </div>

      <!-- Humidité -->
      <div class="bg-white text-black bg-opacity-20 rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
          </svg>
          <span class="text-sm">Humidité</span>
        </div>
        <div class="text-2xl font-bold">{{ weather.humidity }}%</div>
      </div>

      <!-- Vent -->
      <div class="bg-white text-black bg-opacity-20 rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
          <span class="text-sm">Vent</span>
        </div>
        <div class="text-2xl font-bold">{{ weather.wind_speed }} m/s</div>
      </div>

      <!-- Pression -->
      <div class="bg-white text-black bg-opacity-20 rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span class="text-sm">Pression</span>
        </div>
        <div class="text-2xl font-bold">{{ weather.pressure }} hPa</div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggleFavorite'])

const toggleFavorite = () => {
  emit('toggleFavorite', props.weather)
}
</script>