let accessToken = localStorage.getItem('tripmania_token');

export function setAccessToken(token) {
  accessToken = token;
  if (token) localStorage.setItem('tripmania_token', token);
  else localStorage.removeItem('tripmania_token');
}

export async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  const response = await fetch(`/api${path}`, { ...options, headers });
  const data = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Unable to complete that request.');
  return data;
}
