import { supabase } from "../lib/supabase";
import { create, all } from 'mathjs'

const config = {}
const math = create(all, config)

export const linearReg = async () => {
    const { data, error } = await supabase
        .from("consumo_hora")
        .select("litros, tiempos");
    
    if (error) {
        console.error("Error al obtener datos de la base de datos:", error);
        return null;
    }
    const X = data.map(row => row.tiempos);
    const Y = data.map(row => row.litros);

    // Calcula las medias de X y Y
    const mean_x = math.mean(X);
    const mean_y = math.mean(Y);

    // Calcula la pendiente (m) y la intersección (b) de la regresión lineal
    let numerator = 0;
    let den = 0;
    for (let i = 0; i < X.length; i++) {
        numerator += (mean_y - Y[i]) * (mean_x - X[i]);
        den += (mean_x - X[i]) * (mean_x - X[i]);
    }
    const m = numerator / den;
    const b = mean_y - m * mean_x;

    return { m, b };
}

const euclideanDistance = (point1, point2) => {
    return Math.sqrt(Math.pow(point2 - point1, 2));
  };
  

export const knn = async (k, tiempoPredicho) => {
  const { data, error } = await supabase
      .from("consumo_hora")
      .select("consumo, tiempos");

  if (error) {
      console.error("Error al obtener datos de la base de datos:", error);
      return null;
  }

  const etiquetas = data.map(row => row.consumo);
  const tiempos = data.map(row => row.tiempos);

  const neighbors = [];
  for (let i = 0; i < etiquetas.length; i++) {
      const distance = Math.abs(tiempoPredicho - tiempos[i]);
      neighbors.push({ distance, label: etiquetas[i] });
  }
  neighbors.sort((a, b) => a.distance - b.distance);
  const kNeighbors = neighbors.slice(0, k);
  const counts = {};
  kNeighbors.forEach(neighbor => {
      if (counts[neighbor.label]) {
          counts[neighbor.label]++;
      } else {
          counts[neighbor.label] = 1;
      }
  });
  const etiquetaPredicha = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

  return etiquetaPredicha;
};

