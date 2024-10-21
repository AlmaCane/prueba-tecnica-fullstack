export default async function fetchServices(colorId: string) {
  const res = await fetch(
    `http://localhost:1337/api/servicios?filters[color][id][$eq]=${colorId}`
  );

  if (!res.ok) {
    throw new Error(`Error al obtener servicios: ${res.statusText}`);
  }

  const data = await res.json();

  if (!data || !Array.isArray(data.data)) {
    throw new Error(
      "Estructura de datos no válida o no se encontraron servicios."
    );
  }

  return data.data.map(
    (servicio: { id: string; title: string; description: string }) => {
      return {
        id: servicio.id,
        title: servicio.title,
        description: servicio.description,
      };
    }
  );
}
