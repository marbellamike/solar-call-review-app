import { useState } from 'react'

export default function ReviewForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    agent: '',
    client: '',
    solarCompany: '',
    calls: [{ transcript: '' }]
  })

  const [transcriptLengths, setTranscriptLengths] = useState([0])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTranscriptChange = (index, value) => {
    const newCalls = [...formData.calls]
    newCalls[index].transcript = value
    setFormData(prev => ({ ...prev, calls: newCalls }))

    const newLengths = [...transcriptLengths]
    newLengths[index] = value.length
    setTranscriptLengths(newLengths)
  }

  const addCall = () => {
    setFormData(prev => ({
      ...prev,
      calls: [...prev.calls, { transcript: '' }]
    }))
    setTranscriptLengths([...transcriptLengths, 0])
  }

  const removeCall = (index) => {
    if (formData.calls.length > 1) {
      setFormData(prev => ({
        ...prev,
        calls: prev.calls.filter((_, i) => i !== index)
      }))
      setTranscriptLengths(transcriptLengths.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.agent.trim() || !formData.client.trim() || !formData.solarCompany.trim()) {
      alert('Please fill in Agent, Client, and Solar Company')
      return
    }

    const hasTranscript = formData.calls.some(call => call.transcript.trim())
    if (!hasTranscript) {
      alert('Please enter at least one call transcript')
      return
    }

    // Combine all transcripts with call markers
    const combinedTranscript = formData.calls
      .map((call, idx) => `--- CALL ${idx + 1} ---\n${call.transcript}`)
      .join('\n\n')

    onSubmit({
      ...formData,
      transcript: combinedTranscript
    })
  }

  const isComplete = formData.agent.trim() && formData.client.trim() && formData.solarCompany.trim() && formData.calls.some(c => c.transcript.trim())

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

      {/* Solar Company */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Solar Company Name *
        </label>
        <input
          type="text"
          name="solarCompany"
          value={formData.solarCompany}
          onChange={handleChange}
          placeholder="e.g., Beechdale Energy, SunPower UK"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent outline-none transition"
          required
        />
      </div>

      {/* Transcripts */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Call Transcripts * ({formData.calls.length} {formData.calls.length === 1 ? 'call' : 'calls'})
          </label>
          <p className="text-xs text-gray-600 mb-4">
            Add multiple calls from the same prospect/client for comprehensive review
          </p>
        </div>

        {formData.calls.map((call, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-gray-700">
                Call {index + 1}
              </label>
              {formData.calls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCall(index)}
                  className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded transition"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-600"></span>
              <span className="text-xs text-gray-500">
                {transcriptLengths[index] || 0} characters
              </span>
            </div>

            <textarea
              value={call.transcript}
              onChange={(e) => handleTranscriptChange(index, e.target.value)}
              placeholder="Paste the call transcript here. Format: Agent: [text] Client: [text]"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addCall}
          className="w-full py-2 px-4 border-2 border-dashed border-solar-300 hover:border-solar-500 text-solar-600 hover:text-solar-700 font-semibold rounded-lg transition"
        >
          + Add Another Call
        </button>
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
