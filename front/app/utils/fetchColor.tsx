export default async function fetchColor(colorName: string) {
  const res = await fetch(
    `http://localhost:1337/api/colors?filters[name][$eq]=${colorName}` // Usamos el filtro correcto para buscar por 'name'
  );

  if (!res.ok) {
    throw new Error(`Error al obtener color: ${res.statusText}`);
  }

  const data = await res.json();

  // Retornar el primer color encontrado o null si no existe
  return data.data[0] || null;
}
