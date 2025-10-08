# 🌤️ Cyberspector - Application Météo (WeatherApp)

Une application web **intuitive et responsive** pour consulter la météo, développée avec **Vue.js 3** et **Vite**.  
Ce projet a été réalisé dans le cadre d’un **test technique** et permet de :

- Rechercher la météo d’une ville.
- Gérer une liste de favoris.
- Afficher un tableau de bord avec des statistiques pertinentes.

---

## 🚀 Démo en ligne

➡️ https://weather-app-cs.vercel.app/ (#)

---

## 📑 Sommaire
- [Fonctionnalités](#-fonctionnalités-)
- [Technologies utilisées](#-technologies-utilisées-)
- [Installation et Lancement](#-installation-et-lancement-)
- [Configuration](#-configuration-)
- [Déploiement](#-déploiement-)

---

## ✨ Fonctionnalités

✅ **Recherche Météo** — Consultez la météo actuelle et les prévisions pour n’importe quelle ville du monde.  
⭐ **Gestion des Favoris** — Ajoutez ou supprimez vos villes préférées.  
💾 **Persistance Locale** — Les favoris sont sauvegardés dans le **localStorage** du navigateur.  
📊 **Dashboard Intuitif** — Visualisez des statistiques : nombre de favoris, dernières villes consultées, etc.  
📱 **Design Responsive** — Interface adaptée à toutes les tailles d’écran (mobile, tablette, desktop).  
⚠️ **Gestion des Erreurs** — Affichage de messages clairs en cas d’erreur (ville non trouvée, problème réseau...).

---

## 🛠️ Technologies utilisées

| Catégorie | Outil / Librairie |
|------------|-------------------|
| Framework | [Vue.js 3](https://vuejs.org/) (API de Composition) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Routing | [Vue Router](https://router.vuejs.org/) |
| Client HTTP | [Axios](https://axios-http.com/) |
| API Externe | [OpenWeather API](https://openweathermap.org/api) |
| Stockage local | localStorage |
| Visualisation de données | [Chart.js](https://www.chartjs.org/) |

---

## 🧩 Installation et Lancement

### 🔧 Prérequis
- [Node.js](https://nodejs.org/) **v16+**
- Un éditeur de code (VS Code recommandé)
- Une clé API gratuite obtenue sur [OpenWeather](https://openweathermap.org/api)

---

### ⚙️ Étapes d’installation

Clonez le dépôt GitHub :

```bash
git clone https://github.com/tonton-hercule/weather-app.git

Accédez au dossier du projet :

cd weather-app

Installez les dépendances :

npm install

Lancez le serveur de développement :

npm run dev

L’application sera accessible sur http://localhost:5173

🔑 Configuration

Pour que l’application communique avec OpenWeather, vous devez fournir votre clé API.

Créez un fichier .env à la racine du projet.

Copiez le contenu du fichier .env.example (s’il existe) ou ajoutez cette ligne :

VITE_OPENWEATHER_API_KEY=VOTRE_CLÉ_API_PERSONNELLE_ICI
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5


Remplacez VOTRE_CLÉ_API_PERSONNELLE_ICI par la clé obtenue sur le site OpenWeather.
```

## 🌍 Déploiement

Le projet est configuré pour un déploiement continu sur Vercel.

Chaque push sur la branche master déclenche automatiquement un nouveau déploiement afin que la version en ligne reste toujours à jour.

🔐 Les variables d’environnement (comme VITE_OPENWEATHER_API_KEY et VITE_WEATHER_API_URL) doivent être définies directement dans la configuration du projet sur la plateforme de déploiement.