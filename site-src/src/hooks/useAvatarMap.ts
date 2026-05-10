import { useState, useEffect } from 'react'

export function useAvatarMap(): Record<string, string> {
  const [avatarMap, setAvatarMap] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/assets/avatar-map.json')
      .then(r => r.json())
      .then(setAvatarMap)
      .catch(() => {})
  }, [])

  return avatarMap
}
