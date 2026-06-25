export default function Loading() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-12 text-center">
      <div className="flex justify-center mb-6">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-solar-600 rounded-full"></div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyzing Call</h3>
      <p className="text-gray-600">
        Our AI is reviewing the transcript and building coaching feedback...
      </p>
      <p className="text-xs text-gray-500 mt-4">This typically takes 10-30 seconds</p>
    </div>
  )
}
