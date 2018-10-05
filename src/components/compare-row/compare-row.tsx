import { Component, Element, Prop, Method } from '@stencil/core';
import { ScreenshotDiff } from '../../helpers/declarations';
import { setMismatchedPixels } from '../../helpers/mismatch-cache';
import { getMismatch } from '../../helpers/pixelmatch';
import { loadJsonpDataUri } from '../../helpers/image-store';
import { runFilters } from '../../helpers/filter-data';


@Component({
  tag: 'compare-row',
  styleUrl: 'compare-row.css'
})
export class CompareRow {

  @Prop() imagesUrl: string;
  @Prop() diff: ScreenshotDiff;
  @Prop({ mutable: true }) mismatchedPixels: number = null;
  @Prop({ mutable: true }) isComparable = false;
  @Prop({ mutable: true }) device: string;
  @Element() elm: HTMLElement;

  imagesLoaded = new Set();
  imageA: HTMLImageElement;
  imageB: HTMLImageElement;
  isImageALoaded = false;
  isImageBLoaded = false;
  canvas: HTMLCanvasElement;
  isCanvasLoaded = false;
  analysis: HTMLCompareAnalysisElement;
  initialized = false;
  isComparing = false;
  mismatchedRatio: number = null;
  hasRendered = false;

  componentWillLoad() {
    this.mismatchedPixels = this.diff.mismatchedPixels;
    this.mismatchedRatio = this.diff.mismatchedRatio;
    this.isComparable = this.diff.imageA != null && this.diff.imageB != null;
    this.device = this.diff.device;
  }

  @Method()
  runCompare() {
    if (this.diff.identical || this.initialized) {
      return;
    }
    this.initialized = true;

    if ((window as any).requestIdleCallback) {
      (window as any).requestIdleCallback(this.loadImages.bind(this));
    } else {
      window.requestAnimationFrame(this.loadImages.bind(this));
    }
  }

  loadImages() {
    if (this.diff.imageA != null) {
      loadJsonpDataUri(this.diff.imageA, this.diff.jsonpUrlA, dataUri => {
        this.imageA.src = dataUri;
        this.imageA.style.visibility = '';
        this.isImageALoaded = true;
      });
    }

    if (this.diff.imageB != null) {
      loadJsonpDataUri(this.diff.imageB, this.diff.jsonpUrlB, dataUri => {
        this.imageB.src = dataUri;
        this.imageB.style.visibility = '';
        this.isImageBLoaded = true;
      });
    }
  }

  async compareImages() {
    const diff = this.diff;

    if (!this.isImageALoaded || !this.isImageBLoaded || this.isComparing || this.isCanvasLoaded) {
      return;
    }
    this.isComparing = true;

    this.mismatchedPixels = await getMismatch(this.imageA, this.imageB, this.canvas, diff.naturalWidth, diff.naturalHeight);

    this.canvas.style.visibility = '';
    this.isCanvasLoaded = true;

    this.mismatchedRatio = (diff.mismatchedPixels / (diff.naturalWidth * diff.naturalHeight));

    if (this.analysis) {
      this.analysis.mismatchedPixels = this.mismatchedPixels;
      this.analysis.mismatchedRatio = this.mismatchedRatio;
    }

    setMismatchedPixels(diff.imageA, diff.imageB, diff.mismatchedPixels);

    runFilters();
  }

  render() {
    if (this.hasRendered) {
      return;
    }
    this.hasRendered = true;

    const diff = this.diff;
    const style = {
      width: diff.width + 'px',
      height: diff.height + 'px',
      visibility: this.diff.identical ? '' : 'hidden'
    };

    return [
      <compare-cell>
        <img
          src={this.diff.identical ? (this.imagesUrl + diff.imageA) : ''}
          style={style}
          onLoad={this.diff.identical ? null : this.compareImages.bind(this)}
          ref={(elm) => this.imageA = elm}/>
      </compare-cell>,

      <compare-cell>
        <img
          src={this.diff.identical ? (this.imagesUrl + diff.imageA) : ''}
          style={style}
          onLoad={this.diff.identical ? null : this.compareImages.bind(this)}
          ref={(elm) => this.imageB = elm}/>
      </compare-cell>,

      <compare-cell>
        {this.diff.identical ? (
          <img
            style={style}
            src={this.imagesUrl + diff.imageA}/>
        ) : (
          <canvas
            width={diff.naturalWidth}
            height={diff.naturalHeight}
            style={style}
            ref={(elm) => this.canvas = elm}/>
        )}
      </compare-cell>,

      <compare-cell>
        <compare-analysis
          diffId={this.diff.id}
          mismatchedPixels={this.mismatchedPixels}
          mismatchedRatio={this.mismatchedRatio}
          device={this.diff.device}
          width={this.diff.width}
          height={this.diff.height}
          deviceScaleFactor={this.diff.deviceScaleFactor}
          desc={this.diff.desc}
          testPath={this.diff.testPath}
          ref={elm => this.analysis = elm as any}/>
      </compare-cell>
    ];
  }
}
