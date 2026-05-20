import { useState, useEffect, useRef } from 'react'

export function useCountUp(target, duration = 1800, delay = 0) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now()
      const step = (timestamp) => {
        const elapsed = timestamp - start
        const progress = Math.min(elapsed / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step)
        }
      }
      rafRef.current = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, delay])

  return count
}
