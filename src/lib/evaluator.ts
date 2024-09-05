export function CalculateSimilarityScore(vectorA: number[], vectorB: number[]) {
  const dotProduct = vectorA.reduce(
    (sum: number, a, i) => sum + a * vectorB[i],
    0
  );
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}
