const API_BASE = 'https://localhost:7007/api/FindChest';

export const getListMaps = async (row, column, typeCount) => {
  const params = new URLSearchParams();
  if (row) params.append('row', row);
  if (column) params.append('column', column);
  if (typeCount) params.append('typeCount', typeCount);

  const res = await fetch(`${API_BASE}/listmap?${params.toString()}`);
  if (!res.ok) throw new Error('Unable to connect. Please try later');
  return res.json();
};

export const getMapById = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Unable to connect. Please try later');
  return res.json();
};

export const createMap = async (data) => {
  const res = await fetch(`${API_BASE}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Unable to connect. Please try later');
  return res.json();
};

export const updateMinFuel = async (id) => {
  const res = await fetch(`${API_BASE}/updateminfuel/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id)
  });
  if (!res.ok) throw new Error('Unable to connect. Please try later');
  return res.json();
};