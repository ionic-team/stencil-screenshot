

export interface ScreenshotDiff {
  id: string;
  desc: string;
  testPath: string;
  imageA: string;
  imageUrlA: string;
  jsonpUrlA: string;
  imageB: string;
  imageUrlB: string;
  jsonpUrlB: string;
  imageDiff: string;
  mismatchedPixels: number;
  mismatchedRatio: number;
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
  device: string;
  deviceScaleFactor: number;
  identical: boolean;
}

export interface Repo {
  orgName: string;
  orgUrl: string;
  repoName: string;
  repoUrl: string;
  commitsUrl: string;
}
