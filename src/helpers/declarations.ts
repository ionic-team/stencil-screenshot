

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
  width: number;
  height: number;
  device: string;
  deviceScaleFactor: number;
  identical: boolean;
  hidden: boolean;
}

export interface Repo {
  orgName: string;
  orgUrl: string;
  repoName: string;
  repoUrl: string;
  commitsUrl: string;
}
