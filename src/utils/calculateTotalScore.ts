export const calculateTotalScore = (scores: [string, number][]): number => {
  return scores.reduce((prev, [, current]) => prev + current, 0);
};
