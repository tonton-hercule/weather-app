<template>
  <div class="container mx-auto px-4 py-8">
    <DashboardStats
      :favorites="favorites"
      :favorites-count="favoritesCount"
      :average-temp="averageTemp"
      :average-humidity="averageHumidity"
      :has-favorites="hasFavorites"
      :recent-search="recentSearch"
    />
  </div>
</template>

<script setup>
import DashboardStats from '@/components/DashboardStats.vue'
import { useFavorites } from '@/composables/useFavorites'
import { useSearch } from '@/composables/useSearch'

const { recentSearch } = useSearch();

const { 
  favorites, 
  favoritesCount, 
  averageTemp, 
  averageHumidity, 
  hasFavorites 
} = useFavorites()
</script>