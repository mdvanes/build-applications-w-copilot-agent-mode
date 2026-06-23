const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const API_HOST = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const API_BASE_URL = `${API_HOST}/api`

export const normalizeResourceResponse = (payload, primaryKey) => {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  if (payload[primaryKey] && Array.isArray(payload[primaryKey])) return payload[primaryKey]
  if (payload.results && Array.isArray(payload.results)) return payload.results
  if (payload.items && Array.isArray(payload.items)) return payload.items
  if (payload.data && Array.isArray(payload.data)) return payload.data
  return []
}

export const fetchResource = async (resource, primaryKey) => {
  const response = await fetch(`${API_BASE_URL}/${resource}`)
  if (!response.ok) {
    throw new Error(`Failed to load ${resource}: ${response.status} ${response.statusText}`)
  }

  const payload = await response.json()
  return normalizeResourceResponse(payload, primaryKey)
}
