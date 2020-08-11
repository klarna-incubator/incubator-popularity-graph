import { useEffect, useRef } from 'react'

export default function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      tick()
      return () => clearInterval(id)
    }
  }, [delay])
}
