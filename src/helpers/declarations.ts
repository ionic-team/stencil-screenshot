import { ScreenshotDiff as CoreScreenshotDiff } from '@stencil/core/screenshot';


type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type CoreScreenshotDiffOmit = Omit<CoreScreenshotDiff,
'allowableMismatchedPixels' | 'allowableMismatchedRatio'
>;


export interface ScreenshotDiff extends CoreScreenshotDiffOmit {
  imageA: string;
  imageUrlA: string;
  imageB: string;
  imageUrlB: string;
  identical: boolean;
  comparable: boolean;
  show: boolean;
  hasIntersected: boolean;
}


export interface Repo {
  orgName: string;
  orgUrl: string;
  repoName: string;
  repoUrl: string;
  commitsUrl: string;
}
