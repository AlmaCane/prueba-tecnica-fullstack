import "../globals.css";

export default function ServiceCard({
  servicio,
}: {
  servicio: { id: string; title: string; description: string };
}) {
  if (!servicio || !servicio.title || !servicio.description) {
    console.error("Servicio inválido:", servicio);
    return null;
  }

  return (
    <div className="serviceCard">
      <h2 className="title">{servicio.title}</h2>
      <p className="description">{servicio.description}</p>
    </div>
  );
}
