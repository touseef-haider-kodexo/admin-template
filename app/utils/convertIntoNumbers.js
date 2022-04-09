export const removeSpecialChar = (str) =>
  str && String(str).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\s]+/gi, "");
