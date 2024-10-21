export default async function fetchColors() {
  const res = await fetch(`http://localhost:1337/api/colors`);
  if (!res.ok) {
    throw new Error(`Error al obtener colores: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data;
}
