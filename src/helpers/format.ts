
export function formatDate(timestamp: number) {
  const d = new Date(timestamp);

  let rtn = (d.getUTCFullYear() + '-');
  rtn += ('0' + (d.getUTCMonth() + 1)).slice(-2) + '-';
  rtn += ('0' + d.getUTCDate()).slice(-2) + ' ';
  rtn += ('0' + d.getUTCHours()).slice(-2) + ':';
  rtn += ('0' + d.getUTCMinutes()).slice(-2) + ':';
  rtn += ('0' + d.getUTCSeconds()).slice(-2);

  return rtn;
}
