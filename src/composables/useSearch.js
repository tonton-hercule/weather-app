import { ref, computed, onMounted } from 'vue'

const STORAGE_KEY = 'recent_search'

export function useSearch() {
    const recentSearch = ref([])

    /**
     * Charge les recherches récentes depuis localStorage
     */
    const loadRecentSearch = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                recentSearch.value = JSON.parse(stored)
            }
        } catch (error) {
            console.error('Erreur lors du chargement de l\'historique de recherche:', error)
            recentSearch.value = []
        }
    }

    /**
     * Sauvegarde les recherches dans localStorage
     */
    const saveRecentSearch = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearch.value))
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des recherches:', error)
        }
    }

    /**
     * Ajoute une nouvelle recherche récente avec la date d'ajout
     */
    const addRecentSearch = (weather) => {
        recentSearch.value.push({
                ...weather,
                addedAt: Date.now(),
            })
            saveRecentSearch()
            return true
    }

    // Computed properties
    const hasRecentSearch = computed(() => recentSearch.value.length > 0)

    //Nombre de recherche récente
    const recentSearchCount = computed(() => recentSearch.value.length)

    //Calcul de la temperature et humidité
    const averageTemp = computed(() => {
        if (!hasRecentSearch.value) return 0
        const sum = recentSearch.value.reduce((acc, f) => acc + f.temp, 0)
        return Math.round(sum / recentSearch.value.length)
    })
    const averageHumidity = computed(() => {
        if (!hasRecentSearch.value) return 0
        const sum = recentSearch.value.reduce((acc, f) => acc + f.humidity, 0)
        return Math.round(sum / recentSearch.value.length)
    })


    // Charger au montage
    onMounted(() => {
        loadRecentSearch()
    })


    return {
        // State
        recentSearch,

        // Computed
        hasRecentSearch,
        recentSearchCount,
        averageTemp,
        averageHumidity,

        // Methods
        addRecentSearch,
        loadRecentSearch,
    }
}