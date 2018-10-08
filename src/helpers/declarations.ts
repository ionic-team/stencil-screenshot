

export interface ScreenshotDiff {
  id: string;
  desc: string;
  testPath: string;
  imageA: string;
  imageUrlA: string;
  imageB: string;
  imageUrlB: string;
  imageDiff: string;
  mismatchedPixels: number;
  width: number;
  height: number;
  device: string;
  deviceScaleFactor: number;
  identical: boolean;
  show: boolean;
}

export interface Repo {
  orgName: string;
  orgUrl: string;
  repoName: string;
  repoUrl: string;
  commitsUrl: string;
}
