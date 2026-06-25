import { useState } from 'react'
import ReviewForm from './components/ReviewForm'
import ReviewResult from './components/ReviewResult'
import Loading from './components/Loading'

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(
        'https://springlead.oph.st/webhook/solar-call-review-v4',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to submit review')
        return
      }

      setResult(data)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError('Network error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Solar Claims</h1>
          <p className="text-xl text-gray-600">Call Review Platform</p>
          <p className="text-sm text-gray-500 mt-2">AI-powered coaching for sales excellence</p>
        </div>

        {/* Result */}
        {result && (
          <div className="mb-8">
            <ReviewResult data={result} onReset={() => setResult(null)} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-semibold">Error</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && <Loading />}

        {/* Form */}
        {!result && !loading && <ReviewForm onSubmit={handleSubmit} />}
      </div>
    </div>
  )
}
