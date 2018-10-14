import { ScreenshotDiff } from "./declarations";


export function filterDiffs(filter: FilterData, diffs: ScreenshotDiff[]) {
  diffs = diffs.map(diff => {
    diff = Object.assign({}, diff);
    return filterDiff(filter, diff);

  }).sort((a, b) => {
    if (a.mismatchedPixels > b.mismatchedPixels) return -1;
    if (a.mismatchedPixels < b.mismatchedPixels) return 1;

    if (a.desc.toLowerCase() < b.desc.toLowerCase()) return -1;
    if (a.desc.toLowerCase() > b.desc.toLowerCase()) return 1;

    if (a.device.toLowerCase() < b.device.toLowerCase()) return -1;
    if (a.device.toLowerCase() > b.device.toLowerCase()) return 1;

    return 0;
  });


  return diffs;
}


function filterDiff(filter: FilterData, diff: ScreenshotDiff) {
  const matchesDevice = (!filter.device || filter.device === diff.device);

  const matchesSearch = (!filter.search || diff.desc.includes(filter.search))

  let matchesMismatch = true;
  if (filter.diff && (filter.diff === diff.id)) {
    matchesMismatch = true;

  } else if (filter.mismatch) {
    if (diff.mismatchedPixels != null && filter.mismatch !== 'all') {
      matchesMismatch = parseInt(filter.mismatch, 10) < diff.mismatchedPixels;
    }

  } else {
    matchesMismatch = diff.mismatchedPixels > 0 || diff.mismatchedPixels == null;
  }

  diff.show = (matchesDevice && matchesSearch && matchesMismatch);

  return diff;
}


export function getFilterData() {
  const filter: FilterData = {};

  const hash = location.hash.replace('#', '');
  if (hash !== '') {
    const splt = hash.split(';');

    splt.forEach(part => {
      const s = part.split('-');
      if (s.length > 1) {
        filter[s[0]] = s[1];
      } else {
        filter[s[0]] = true;
      }
    });
  }

  return filter;
}


export function updateFilterData(existingFilter: FilterData, updatedFilter: FilterData) {
  const filterData = Object.assign({}, existingFilter, updatedFilter);

  const keys = Object.keys(filterData);
  const newData: string[] = [];
  keys.map(key => {
    const d = filterData[key];
    if (d === true) {
      newData.push(key);
    } else if (d != null && d !== '') {
      newData.push(key + '-' + d);
    }
  });

  window.location.hash = newData.sort().join(';');

  return filterData;
}


export interface FilterData {
  diff?: string;
  mismatch?: '' | '100' | '250' | '500' | '1000' | '2500' | '5000' | '10000' | '25000' | '50000' | 'all';
  comparable?: string;
  device?: string;
  search?: string;
}
