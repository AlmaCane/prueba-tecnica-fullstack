"use client";

import React, { useEffect, useState } from "react";
import fetchServicios from "../utils/fecthServicios";
import fetchColors from "../utils/fetchColors";
import ServiceCard from "../components/ServiceCard";
import "../globals.css";

interface Servicio {
  id: string;
  title: string;
  description: string;
}

interface Color {
  id: string;
  name: string;
  hex: string;
}

interface ColorPageProps {
  params: {
    color: string;
  };
}

export default function ColorPage({ params }: ColorPageProps) {
  const { color: colorName } = params;

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [colorData, setColorData] = useState<Color | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching colors...");

        const colorsData = await fetchColors();
        console.log("Colors fetched:", colorsData);

        const selectedColor = colorsData.find(
          (c: Color) => c.name.toLowerCase() === colorName.toLowerCase()
        );

        console.log("Selected color:", selectedColor);

        if (!selectedColor) {
          throw new Error("Color no encontrado");
        }

        setColorData(selectedColor);

        const serviciosData = await fetchServicios(selectedColor.id);
        console.log("Servicios fetched:", serviciosData);
        setServicios(serviciosData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [colorName]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!colorData) {
    return <div>Error: Color no encontrado</div>;
  }

  return (
    <div style={{ backgroundColor: `#${colorData.hex}` }}>
      <h1>Servicios de {colorData.name}</h1>
      <div className="cardContainer">
        {servicios.map((servicio) => (
          <ServiceCard key={servicio.id} servicio={servicio} />
        ))}
      </div>
    </div>
  );
}
