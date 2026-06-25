export default function ReviewResult({ data, onReset }) {
  if (data.error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-red-900 mb-4">⚠️ Error</h2>
        <p className="text-red-800 mb-2">
          <strong>Stage:</strong> {data.stage || 'unknown'}
        </p>
        <p className="text-red-800 mb-6">
          <strong>Message:</strong> {data.message}
        </p>
        <button
          onClick={onReset}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <p className="text-green-800 font-semibold">✅ Review Completed</p>
        <p className="text-green-700 text-sm mt-1">
          {data.message || 'Your call has been analyzed and the review has been sent.'}
        </p>
      </div>

      {/* Review Details */}
      {data.score !== undefined && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Score */}
            <div className="bg-gradient-to-br from-solar-50 to-solar-100 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Overall Score</p>
              <p className="text-5xl font-bold text-solar-600">{data.score}</p>
              <p className="text-xs text-gray-500 mt-2">out of 100</p>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-2 font-semibold">Summary</p>
              <p className="text-gray-800 text-sm leading-relaxed">
                {data.summary || 'Review analysis complete'}
              </p>
            </div>
          </div>

          {/* Review ID */}
          {data.reviewId && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-xs text-blue-600 font-semibold">Review ID</p>
              <p className="text-blue-900 text-sm font-mono">{data.reviewId}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onReset}
              className="flex-1 bg-solar-600 hover:bg-solar-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Review Another Call
            </button>
            <a
              href="https://notion.so"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition text-center"
            >
              View in Notion
            </a>
          </div>
        </div>
      )}

      {/* Generic Success */}
      {data.success && data.score === undefined && (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-lg text-gray-800 mb-4">
            Call review has been completed and saved.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            An email confirmation has been sent to your email address.
          </p>
          <button
            onClick={onReset}
            className="bg-solar-600 hover:bg-solar-700 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Review Another Call
          </button>
        </div>
      )}
    </div>
  )
}
