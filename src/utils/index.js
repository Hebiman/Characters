export const randomNumber = (min, max) => {
  const randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum);
};
