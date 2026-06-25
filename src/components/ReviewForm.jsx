import { useState } from 'react'

export default function ReviewForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    agent: '',
    client: '',
    partner: '',
    transcript: ''
  })

  const [transcriptLength, setTranscriptLength] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'transcript') {
      setTranscriptLength(value.length)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.transcript.trim()) {
      alert('Please enter a call transcript')
      return
    }

    onSubmit(formData)
  }

  const isComplete = formData.agent.trim() && formData.client.trim() && formData.transcript.trim()

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      {/* Agent */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Agent Name *
        </label>
        <input
          type="text"
          name="agent"
          value={formData.agent}
          onChange={handleChange}
          placeholder="e.g., John Smith"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent outline-none transition"
          required
        />
      </div>

      {/* Client */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Client / Company *
        </label>
        <input
          type="text"
          name="client"
          value={formData.client}
          onChange={handleChange}
          placeholder="e.g., Acme Corp"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent outline-none transition"
          required
        />
      </div>

      {/* Partner */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Partner
        </label>
        <input
          type="text"
          name="partner"
          value={formData.partner}
          onChange={handleChange}
          placeholder="e.g., Solar Partners UK (optional)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent outline-none transition"
        />
      </div>

      {/* Transcript */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold text-gray-700">
            Call Transcript *
          </label>
          <span className="text-xs text-gray-500">
            {transcriptLength} characters
          </span>
        </div>
        <textarea
          name="transcript"
          value={formData.transcript}
          onChange={handleChange}
          placeholder="Paste the full call transcript here. Format: Agent: [text] Client: [text]"
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent outline-none transition resize-none"
          required
        />
        <p className="text-xs text-gray-500 mt-2">
          Include agent and client dialogue for accurate analysis
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isComplete}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
          isComplete
            ? 'bg-solar-600 hover:bg-solar-700 text-white cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Review Call
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your data is sent to our AI review system and stored securely.
      </p>
    </form>
  )
}
