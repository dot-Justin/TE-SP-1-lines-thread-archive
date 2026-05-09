import { useState, useEffect } from 'react'

export function useUrlMap(): Record<string, string> {
  const [urlMap, setUrlMap] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/assets/url-map.json')
      .then(r => r.json())
      .then(setUrlMap)
      .catch(() => {
        // url-map.json doesn't exist yet (prep-assets not run) - fall back to external URLs
      })
  }, [])

  return urlMap
}
