
export function formatDate(timestamp: number) {
  var d = new Date(timestamp);

  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
}