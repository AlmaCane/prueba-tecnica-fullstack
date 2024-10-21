"use client";

import React, { useEffect, useState } from "react";
import fetchColor from "./utils/fetchColor";
import fetchServicios from "./utils/fecthServicios";
import ServiceCard from "./components/ServiceCard";
import "./globals.css";
import RootLayout from "./layout";

interface Color {
  id: string;
  name: string;
  hex: string;
}

interface Servicio {
  id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [color, setColor] = useState<Color | null>(null);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getColorsAndServices = async () => {
      try {
        const amarilloColor = await fetchColor("amarillo");
        setColor(amarilloColor);

        if (amarilloColor) {
          const serviciosData = await fetchServicios(amarilloColor.id);
          setServicios(serviciosData);
        }
      } catch (error) {
        console.error("Error fetching colors or services:", error);
      } finally {
        setLoading(false);
      }
    };

    getColorsAndServices();
  }, []);

  return (
    <RootLayout>
      <div style={{ backgroundColor: color ? `#${color.hex}` : "#fff" }}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="container">
            <div className="leftText">
              <p>
                Hay que crear dos colecciones en Strapi, una llamada servicios y
                otra llamada color, y aunque un color puede tener varios
                servicios, un servicio solo puede pertenecer a un solo color.
                Los servicios tienen título y párrafo, los íconos no se guardan
                en base de datos, son aleatorios, pero deben ser los que están
                en el prototipo. Los colores tienen nombre y un hexadecimal, el
                cuál va a ser el valor que reemplace todos los elementos que
                tengan la variable yellow (#F9BB00) en el prototipo. Los
                servicios de un color los puedo encontrar en la ruta /:color, si
                no existe el parámetro con el color ingresado en la URL me
                redirige al 404. Pero no debe ser el 404 que tiene NEXT js por
                defecto sino una pantalla completamente negra, donde solo se vea
                el logo, en la posición superior izquierda como en esta página.
                <br />
              </p>
            </div>
            <div className="cardContainer">
              {servicios.map((servicio) => (
                <ServiceCard key={servicio.id} servicio={servicio} />
              ))}
            </div>
          </div>
        )}
        <h1 className="title">SERVICIOS AMARILLOS</h1>
      </div>
    </RootLayout>
  );
}
