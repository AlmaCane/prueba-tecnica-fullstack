export default async function fetchColor(colorName: string) {
  const res = await fetch(
    `http://localhost:1337/api/colors?filters[name][$eq]=${colorName}`
  );

  if (!res.ok) {
    throw new Error(`Error al obtener color: ${res.statusText}`);
  }

  const data = await res.json();

  return data.data[0] || null;
}
