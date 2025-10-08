import { ref, computed } from 'vue'
import { getWeatherByCity } from '@/services/weatherApi'
import { useSearch } from '@/composables/useSearch'

const { addRecentSearch } = useSearch()

export function useWeather() {
    const currentWeather = ref(null)
    const loading = ref(false)
    const error = ref('')

    /**
     * Recherche la météo pour une ville
     */
    const searchWeather = async (city) => {
        if (!city || !city.trim()) {
            error.value = 'Veuillez entrer un nom de ville'
            return
        }

        loading.value = true
        error.value = ''

        try {
            currentWeather.value = await getWeatherByCity(city)
            //Enregistrer la recherche dans l'historique
            addRecentSearch(currentWeather.value)
        } catch (err) {
            error.value = err.message
            currentWeather.value = null
        } finally {
            loading.value = false
        }
    }

 


    /**
     * Réinitialise l'état
     */
    const reset = () => {
        currentWeather.value = null
        error.value = ''
        loading.value = false
    }

    // Computed properties
    const hasWeather = computed(() => currentWeather.value !== null)

  
    return {
        // State
        currentWeather,
        loading,
        error,

        // Computed
        hasWeather,

        // Methods
        searchWeather,
        reset,
    }
}