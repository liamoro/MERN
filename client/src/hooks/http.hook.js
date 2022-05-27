import {useState, useCallback} from 'react'

const useHttp = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback( async (url, method = 'Get', body = null, headers = {}) => {
    setLoading(true)
    if (body) {
      body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }
    try {
      const response = await fetch( url, { method, body, headers })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'MyERR::: Something go wrong!')
      }
      setLoading(false)

      return data

    } catch (err) {
      setLoading(false)
      setError(err.message)
      throw err
    }

  }, [])

  const clearError = () => setError(null)

  return {loading, request, error, clearError}
}

export default useHttp