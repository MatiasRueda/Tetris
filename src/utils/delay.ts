const delayTimeMiliseconds = 1100;
export const delayUntilClosing = async () => {
  await new Promise((r) => setTimeout(r, delayTimeMiliseconds));
};
