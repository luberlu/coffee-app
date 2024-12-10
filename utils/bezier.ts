/**
 * Calcule un point sur une courbe de Bézier quadratique
 * @param interpolatedValue - La valeur t entre 0 et 1 qui détermine la position sur la courbe
 * @param p0 - Point de départ de la courbe
 * @param p1 - Point de contrôle qui influence la courbure
 * @param p2 - Point d'arrivée de la courbe
 * @returns La valeur y calculée sur la courbe à la position t
 */
export function calcBezier(interpolatedValue: number, p0: number, p1: number, p2: number) {
  "worklet";
  const t1 = 1 - interpolatedValue;
  return t1 * t1 * p0 + 2 * t1 * interpolatedValue * p1 + interpolatedValue * interpolatedValue * p2;
} 