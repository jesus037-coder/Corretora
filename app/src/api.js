const API = '';

async function request(path, opts = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(API + path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro desconhecido');
  return data;
}

export function login(email, senha) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  });
}

export function register(data) {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function fetchClientes() {
  return request('/api/clientes');
}

export function fetchAnos() {
  return request('/api/anos');
}

export function fetchDashboard(ano, cliente) {
  const params = new URLSearchParams({ ano });
  if (cliente) params.set('cliente', cliente);
  return request('/api/dashboard?' + params);
}

export function fetchMetas(cliente) {
  const params = new URLSearchParams();
  if (cliente) params.set('cliente', cliente);
  return request('/api/metas?' + params);
}

export function createMeta(data) {
  return request('/api/metas', { method: 'POST', body: JSON.stringify(data) });
}

export function fetchDirpf(ano, cliente) {
  const params = new URLSearchParams({ ano });
  if (cliente) params.set('cliente', cliente);
  return request('/api/dirpf?' + params);
}

export function fetchComprasVendas(ano, cliente) {
  const params = new URLSearchParams({ ano });
  if (cliente) params.set('cliente', cliente);
  return request('/api/compras-vendas?' + params);
}

export function createMovimentacao(data) {
  return request('/api/movimentacoes', { method: 'POST', body: JSON.stringify(data) });
}

export function updateMovimentacao(id, data) {
  return request('/api/movimentacoes/' + id, { method: 'PUT', body: JSON.stringify(data) });
}

export function saveLimite(segmento, pct) {
  return request('/api/limites', { method: 'PUT', body: JSON.stringify({ segmento, pct }) });
}
