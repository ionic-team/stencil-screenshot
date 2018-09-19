import { Component, Prop } from '@stencil/core';
import { ScreenshotDiff } from '../../helpers/screenshot-diff';
import { getMismatch } from '../../helpers/pixelmatch';


@Component({
  tag: 'local-pixelmatch'
})
export class LocalPixelmatch {

  @Prop() diff: ScreenshotDiff;

  initialized = false;
  canvasDiff: HTMLCanvasElement;

  componentDidLoad() {
    const diff = this.diff;

    const imageA = new Image(diff.naturalWidth, diff.naturalHeight);
    imageA.style.width = `${diff.width}px`;
    imageA.style.height = `${diff.height}px`;

    const imageB = new Image(diff.naturalWidth, diff.naturalHeight);
    imageB.style.width = `${diff.width}px`;
    imageB.style.height = `${diff.height}px`;

    imageA.onload = () => {
      const link = document.getElementById(`link-a-${diff.id}`);
      if (link) {
        link.appendChild(imageA);
        this.pixelmatch(imageA, imageB);
      }
      imageA.onload = null;
    };

    imageB.onload = () => {
      const link = document.getElementById(`link-b-${diff.id}`);
      if (link) {
        link.appendChild(imageB);
        this.pixelmatch(imageA, imageB);
      }
      imageB.onload = null;
    };

    pendingScreenshotLoads.push({
      imageName: diff.imageA,
      callback: (dataUri) => {
        imageA.src = dataUri;
      }
    });

    pendingScreenshotLoads.push({
      imageName: diff.imageB,
      callback: (dataUri) => {
        imageB.src = dataUri;
      }
    });

    const scriptA = document.createElement('script');
    scriptA.src = diff.jsonpUrlA;
    document.head.appendChild(scriptA);

    const scriptB = document.createElement('script');
    scriptB.src = diff.jsonpUrlB;
    document.head.appendChild(scriptB);
  }

  async pixelmatch(imageA: HTMLImageElement, imageB: HTMLImageElement) {
    const diff = this.diff;

    if (!imageA.complete || !imageB.complete || this.initialized || diff.identical) {
      return;
    }
    this.initialized = true;

    diff.mismatchedPixels = await getMismatch(imageA, imageB, this.canvasDiff, diff.naturalWidth, diff.naturalHeight);

    const spanMismatch = document.getElementById(`mismatch-pixels-${diff.id}`) as HTMLSpanElement;
    spanMismatch.textContent = diff.mismatchedPixels + '';

    diff.mismatchedRatio = (diff.mismatchedPixels / (diff.naturalWidth * diff.naturalHeight));

    const spanMismatchRatio = document.getElementById(`mismatch-ratio-${diff.id}`) as HTMLSpanElement;
    spanMismatchRatio.textContent = diff.mismatchedRatio.toFixed(4);
  }

  render() {
    const diff = this.diff;

    if (diff.identical) {
      return (
        <img src={diff.imageUrlA} style={{ width: diff.width + 'px', height: diff.height + 'px' }} />
      );
    }

    return [
      <canvas ref={elm => this.canvasDiff = elm} width={diff.naturalWidth} height={diff.naturalHeight} style={{ width: diff.width + 'px', height: diff.height + 'px' }} />
    ];
  }
}

let pendingScreenshotLoads: { imageName: string; callback: (dataUri: string) => void }[] = [];

(window as any).loadScreenshot = (imageName: string, dataUri: string) => {
  const resolves = pendingScreenshotLoads.filter(p => p.imageName === imageName);
  resolves.forEach(p => p.callback(dataUri));
};
