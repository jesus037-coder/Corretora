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
