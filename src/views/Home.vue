<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Barre de recherche -->
        <div class="max-w-2xl mx-auto mb-8">
            <WeatherSearch :loading="loading" :error="error" @search="handleSearch" />
        </div>

        <!-- Carte météo actuelle -->
        <div v-if="hasWeather" class="max-w-4xl mx-auto mb-8">
            <WeatherCard :weather="currentWeather" :is-favorite="isFavorite(currentWeather.name)"
                @toggle-favorite="handleToggleFavorite" />
        </div>

        <!-- Liste des favoris -->
        <div class="max-w-4xl mx-auto">
            <FavoritesList :favorites="favorites" @remove-favorite="removeFavorite" @select-city="handleSearch"
                @clear-all="handleClearAll" />
        </div>
    </div>
</template>

<script setup>
//import { computed } from 'vue'
import WeatherSearch from '@/components/WeatherSearch.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import FavoritesList from '@/components/FavoritesList.vue'
import { useWeather } from '@/composables/useWeather'
import { useFavorites } from '@/composables/useFavorites'
import Swal from 'sweetalert2'

// Composables
const { currentWeather, loading, error, searchWeather, hasWeather } = useWeather()
const { favorites, addFavorite, removeFavorite, isFavorite, clearFavorites } = useFavorites()

// Handlers
const handleSearch = async (city) => {
    await searchWeather(city)
}

const handleToggleFavorite = (weather) => {
    if (isFavorite(weather.name)) {
        removeFavorite(weather.name)
    } else {
        addFavorite(weather)
    }
}

const handleClearAll = () => {

    Swal.fire({
        title: "Attention !",
        text: "Voulez-vous vraiment supprimer tous vos favoris ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimer",
        cancelButtonText: "Non, annuler"
    }).then((result) => {
        if (result.isConfirmed) {            
            clearFavorites()
        }
    });


}
</script>