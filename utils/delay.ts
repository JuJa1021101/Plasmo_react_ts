export const delay = (time: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(void 0);
    }, time);
  });
};
