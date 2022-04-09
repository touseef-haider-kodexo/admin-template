export function getUniqueID(name) {
  return `${name}-${Date.now() + (Math.random() * 100000).toFixed()}`;
}
