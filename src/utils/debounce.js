var timeoutId;
export const debounce = (func, duration) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => func(), duration);
};
