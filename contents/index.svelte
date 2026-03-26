<script lang="ts">
  import type { PlasmoCSConfig } from "plasmo"
  import enhancementsCss from "data-text:~lib/styles/enhancements.scss"
  import { pageTitleService } from "~lib/services/page-title"
  import { itemResultsService } from "~lib/services/item-results"
  import { onMount } from "svelte"

  export const config: PlasmoCSConfig = {
    matches: ["https://www.pathofexile.com/trade*"]
  }

  onMount(() => {
    if (!document.body) {
      return
    }

    const styleEl = document.createElement("style")
    styleEl.id = "bt-enhancement-styles"
    styleEl.textContent = enhancementsCss
    document.head.appendChild(styleEl)

    pageTitleService.initialize()
    void itemResultsService.initialize()

    const handleMessage = (request: { query?: string; itemId?: string }) => {
      if (request.query !== "scroll-to-item" || !request.itemId) {
        return
      }

      const el = document.querySelector<HTMLElement>(`.row[data-id="${request.itemId}"]`)
      if (!el) {
        return
      }

      el.scrollIntoView({ block: "center", behavior: "smooth" })
      el.classList.add("bt-pinned-glow")
      window.setTimeout(() => el.classList.remove("bt-pinned-glow"), 2000)
    }

    chrome.runtime.onMessage.addListener(handleMessage)

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
      document.getElementById("bt-enhancement-styles")?.remove()
    }
  })
</script>
