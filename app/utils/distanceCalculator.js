export default function getDistanceInMiles(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lat2 || !lon1 || !lon2) return 0;
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  const km = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  return (km / 1.609).toFixed(2);
}

export function meterToMiles(meters) {
  return (meters * 0.000621371192).toFixed(2);
}
