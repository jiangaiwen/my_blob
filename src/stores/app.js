import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAppStore = defineStore('app', () => {
  const wallPaper = ref('')
  const siteStats = ref({
    articles: 12,
    views: 15842,
    categories: 5,
    tags: 28
  })

  async function fetchWallPaper() {
    try {
      const index = Math.floor(Math.random() * 8)
      const response = await axios.get(`https://bing.biturl.top?format=json&resolution=UHD&index=${index}`)
      if (response.data && response.data.url) {
        wallPaper.value = response.data.url
      } else {
        wallPaper.value = 'https://source.unsplash.com/1920x1080/?nature'
      }
    } catch (error) {
      wallPaper.value = 'https://source.unsplash.com/1920x1080/?nature'
    }
  }

  return {
    wallPaper,
    siteStats,
    fetchWallPaper
  }
})
