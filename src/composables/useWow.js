import { onMounted, onUnmounted } from 'vue'
import WOW from 'wow.js'

export function useWow() {
  let wow = null

  onMounted(() => {
    wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animate__animated',
      offset: 80,
      mobile: true,
      live: true
    })
    wow.init()
  })

  onUnmounted(() => {
    wow = null
  })
}