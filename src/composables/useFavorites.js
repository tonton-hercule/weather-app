import Swal from 'sweetalert2'
import { ref, computed, onMounted } from 'vue'

const STORAGE_KEY = 'weather_favorites'

export function useFavorites() {
    const favorites = ref([])

    /**
     * Charge les favoris depuis localStorage
     */
    const loadFavorites = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                favorites.value = JSON.parse(stored)
            }
        } catch (error) {
            console.error('Erreur lors du chargement des favoris:', error)
            favorites.value = []
        }
    }

    /**
     * Sauvegarde les favoris dans localStorage
     */
    const saveFavorites = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des favoris:', error)
        }
    }

    /**
     * Ajoute une ville aux favoris avec la date d'ajout
     */
    const addFavorite = (weather) => {
        if (!isFavorite(weather.name)) {
            favorites.value.push({
                ...weather,
                addedAt: Date.now(),
            })
            saveFavorites()
            return true
        }
        return false
    }

    /**
     * Retire une ville des favoris
     */
    const removeFavorite = (cityName) => {
        favorites.value = favorites.value.filter(f => f.name !== cityName)
        saveFavorites()
    }

    /**
     * Fonction pour vérifier si une ville est dans les favoris
     */
    const isFavorite = (cityName) => {
        return favorites.value.some(f => f.name === cityName)
    }

    /**
     * Vide tous les favoris
     */
    const clearFavorites = () => {
        favorites.value = []
        saveFavorites()
        Swal.fire({
            title: "Succès!",
            text: "Favoris supprimés avec succès",
            icon: "success"
        });
    }

    // Computed properties
    const hasFavorites = computed(() => favorites.value.length > 0)

    //Nombre de favoris
    const favoritesCount = computed(() => favorites.value.length)

    //Calcul de la temperature et humidité
    const averageTemp = computed(() => {
        if (!hasFavorites.value) return 0
        const sum = favorites.value.reduce((acc, f) => acc + f.temp, 0)
        return Math.round(sum / favorites.value.length)
    })
    const averageHumidity = computed(() => {
        if (!hasFavorites.value) return 0
        const sum = favorites.value.reduce((acc, f) => acc + f.humidity, 0)
        return Math.round(sum / favorites.value.length)
    })

    // Charger au montage
    onMounted(() => {
        loadFavorites()
    })

    return {
        // State
        favorites,

        // Computed
        hasFavorites,
        favoritesCount,
        averageTemp,
        averageHumidity,

        // Methods
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
        loadFavorites,
    }
}