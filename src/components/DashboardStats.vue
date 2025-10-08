<template>
    <div class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Tableau de bord</h2>

        <!-- Message si aucun favori -->
        <div v-if="!hasFavorites" class="card text-center py-12">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">Aucun favori</h3>
            <p class="text-gray-600">Ajoutez des villes à vos favoris pour voir les statistiques ici.</p>
        </div>

        <!-- Dashboard complet -->
        <template v-else>
            <!-- Statistiques principales -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <!-- Nombre de villes favorites -->
                <div class="gradient-bg rounded-2xl shadow-xl p-4 md:p-6 text-white">
                    <div class="flex items-center justify-between mb-3 md:mb-4">
                        <h3 class="text-sm md:text-lg font-semibold">Villes favorites</h3>
                        <svg class="w-6 h-6 md:w-8 md:h-8 opacity-80 fill-current" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="text-3xl md:text-4xl font-bold">{{ favoritesCount }}</div>
                    <p class="text-xs md:text-sm opacity-80 mt-1">villes enregistrées</p>
                </div>

                <!-- Température moyenne -->
                <div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl p-4 md:p-6 text-white">
                    <div class="flex items-center justify-between mb-3 md:mb-4">
                        <h3 class="text-sm md:text-lg font-semibold">Temp. moyenne</h3>
                        <svg class="w-6 h-6 md:w-8 md:h-8 opacity-80" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <div class="text-3xl md:text-4xl font-bold">{{ averageTemp }}°C</div>
                    <p class="text-xs md:text-sm opacity-80 mt-1">sur {{ favoritesCount }} villes</p>
                </div>

                <!-- Humidité moyenne -->
                <div class="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl p-4 md:p-6 text-white">
                    <div class="flex items-center justify-between mb-3 md:mb-4">
                        <h3 class="text-sm md:text-lg font-semibold">Hum. moyenne</h3>
                        <svg class="w-6 h-6 md:w-8 md:h-8 opacity-80" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                    </div>
                    <div class="text-3xl md:text-4xl font-bold">{{ averageHumidity }}%</div>
                    <p class="text-xs md:text-sm opacity-80 mt-1">d'humidité</p>
                </div>

                <!-- Condition la plus fréquente -->
                <div class="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl p-4 md:p-6 text-white">
                    <div class="flex items-center justify-between mb-3 md:mb-4">
                        <h3 class="text-sm md:text-lg font-semibold">Météo fréquente</h3>
                        <svg class="w-6 h-6 md:w-8 md:h-8 opacity-80" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                        </svg>
                    </div>
                    <div class="text-lg md:text-2xl font-bold capitalize">{{ mostFrequentCondition.description }}</div>
                    <p class="text-xs md:text-sm opacity-80 mt-1">{{ mostFrequentCondition.count }} ville(s)</p>
                </div>
            </div>

            <!-- Villes récemment consultées -->
            <div class="card">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg md:text-2xl font-bold text-gray-800">Villes récemment consultées</h3>
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="space-y-2 md:space-y-3">
                    <div v-for="(fav, index) in recentCities" :key="fav.name"
                        class="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div class="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                            <div
                                class="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                                {{ index + 1 }}
                            </div>
                            <img :src="`https://openweathermap.org/img/wn/${fav.icon}@2x.png`" :alt="fav.description"
                                class="w-10 h-10 md:w-12 md:h-12 flex-shrink-0" />
                            <div class="min-w-0 flex-1">
                                <h4 class="font-bold text-base md:text-lg text-gray-800 truncate">{{ fav.name }}</h4>
                                <p class="text-xs md:text-sm text-gray-600 capitalize truncate">{{ fav.description }}
                                </p>
                            </div>
                        </div>
                        <div class="text-right flex-shrink-0 ml-2">
                            <div class="text-xl md:text-2xl font-bold text-gray-800">{{ fav.temp }}°C</div>
                            <div class="text-xs text-gray-600">{{ getTimeAgo(fav.addedAt) }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Conditions météo les plus fréquentes -->
            <div class="card">
                <h3 class="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Conditions météo par fréquence</h3>
                <div class="space-y-3 md:space-y-4">
                    <div v-for="condition in weatherConditions" :key="condition.description" class="relative">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                                <img :src="`https://openweathermap.org/img/wn/${condition.icon}@2x.png`"
                                    :alt="condition.description" class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
                                <span class="font-semibold text-gray-800 capitalize text-sm md:text-base truncate">
                                    {{ condition.description }}
                                </span>
                            </div>
                            <span class="text-sm md:text-base font-bold text-gray-700 ml-2 flex-shrink-0">
                                {{ condition.count }} ville{{ condition.count > 1 ? 's' : '' }}
                            </span>
                        </div>
                        <!-- Barre de progression -->
                        <div class="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
                            <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500"
                                :style="{ width: `${(condition.count / favoritesCount) * 100}%` }"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">
                            {{ Math.round((condition.count / favoritesCount) * 100) }}% des villes
                        </div>
                    </div>
                </div>
            </div>

            <!-- Graphique avec Chart.js (Optionnel) -->
            <div class="card">
                <h3 class="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Répartition des températures</h3>
                <canvas ref="chartCanvas" class="max-h-64 md:max-h-80"></canvas>
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps({
    favorites: {
        type: Array,
        default: () => [],
    },
    favoritesCount: {
        type: Number,
        default: 0,
    },
    averageTemp: {
        type: Number,
        default: 0,
    },
    averageHumidity: {
        type: Number,
        default: 0,
    },
    hasFavorites: {
        type: Boolean,
        default: false,
    },
    recentSearch: {
        type: Array,
        default: () => [],
    },
})

const chartCanvas = ref(null)
let chartInstance = null

// Villes récemment consultées (triées par date d'ajout)
const recentCities = computed(() => {
    return [...props.recentSearch]
        .sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0))
        .slice(0, 5)
})

// Condition météo la plus fréquente
const mostFrequentCondition = computed(() => {
    if (props.favorites.length === 0) {
        return { description: 'N/A', count: 0 }
    }

    const conditions = {}
    props.favorites.forEach(fav => {
        const desc = fav.description
        conditions[desc] = (conditions[desc] || 0) + 1
    })

    const sorted = Object.entries(conditions).sort((a, b) => b[1] - a[1])
    return {
        description: sorted[0][0],
        count: sorted[0][1]
    }
})

// Toutes les conditions météo avec leur fréquence
const weatherConditions = computed(() => {
    const conditions = {}
    const icons = {}

    props.favorites.forEach(fav => {
        const desc = fav.description
        conditions[desc] = (conditions[desc] || 0) + 1
        if (!icons[desc]) {
            icons[desc] = fav.icon
        }
    })

    return Object.entries(conditions)
        .map(([description, count]) => ({
            description,
            count,
            icon: icons[description]
        }))
        .sort((a, b) => b.count - a.count)
})

// Calculer le temps écoulé
const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'Récemment'

    const seconds = Math.floor((Date.now() - timestamp) / 1000)

    if (seconds < 60) return 'À l\'instant'
    if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} min`
    if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)} h`
    if (seconds < 604800) return `Il y a ${Math.floor(seconds / 86400)} j`
    return `Il y a ${Math.floor(seconds / 604800)} sem`
}

// Initialiser le graphique Chart.js
const initChart = async () => {
    if (!props.hasFavorites || !chartCanvas.value) return

    // Importer Chart.js dynamiquement
    try {
        const Chart = (await import('chart.js/auto')).default

        // Détruire l'ancien graphique s'il existe
        if (chartInstance) {
            chartInstance.destroy()
        }

        const ctx = chartCanvas.value.getContext('2d')

        const labels = props.favorites.map(f => f.name)
        const temperatures = props.favorites.map(f => f.temp)
        const humidity = props.favorites.map(f => f.humidity)

        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Température (°C)',
                        data: temperatures,
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 2,
                        borderRadius: 8,
                    },
                    {
                        label: 'Humidité (%)',
                        data: humidity,
                        backgroundColor: 'rgba(139, 92, 246, 0.7)',
                        borderColor: 'rgba(139, 92, 246, 1)',
                        borderWidth: 2,
                        borderRadius: 8,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        cornerRadius: 8,
                    }
                }
            }
        })
    } catch (error) {
        console.error('Erreur lors du chargement de Chart.js:', error)
    }
}

// Initialiser le graphique au montage et lors des changements
onMounted(() => {
    if (props.hasFavorites) {
        initChart()
    }
})

watch(() => props.favorites, () => {
    if (props.hasFavorites) {
        setTimeout(() => initChart(), 100)
    }
}, { deep: true })
</script>