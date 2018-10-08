import { Component, Element, Event, EventEmitter, Prop, State } from '@stencil/core';
import { ScreenshotDiff } from '../../helpers/declarations';
import { setMismatchedPixels } from '../../helpers/mismatch-cache';
import { getMismatch } from '../../helpers/pixelmatch';
import { loadJsonpDataUri } from '../../helpers/image-store';


@Component({
  tag: 'compare-row',
  styleUrl: 'compare-row.css'
})
export class CompareRow {

  @Prop() imagesUrl: string;
  @Prop() jsonpUrl: string;
  @Prop() diff: ScreenshotDiff;
  @Prop() show: boolean;
  @Event() compareLoaded: EventEmitter<ScreenshotDiff>;
  @Element() elm: HTMLElement;

  @State() imageASrc = '';
  @State() imageBSrc = '';

  @State() imageAClass: string;
  @State() imageBClass: string;
  @State() canvasClass: string;

  imageA: HTMLImageElement;
  imageB: HTMLImageElement;

  imagesLoaded = new Set();
  isImageALoaded = false;
  isImageBLoaded = false;
  canvas: HTMLCanvasElement;
  initializeCalculateMismatch = false;
  hasCalculatedMismatch = false;

  componentWillLoad() {
    this.loadScreenshots();
  }

  componentWillUpdate() {
    this.loadScreenshots();
  }

  loadScreenshots() {
    if (!this.show) {
      return;
    }

    if (this.diff.identical) {
      this.imageASrc = this.imagesUrl + this.diff.imageA;
      this.imageBSrc = this.imagesUrl + this.diff.imageB;
      return;
    }

    if (this.initializeCalculateMismatch) {
      return;
    }

    this.imageAClass = 'is-loading';
    this.imageBClass = 'is-loading';
    this.canvasClass = 'is-loading';
    this.initializeCalculateMismatch = true;

    if (this.jsonpUrl != null) {
      if (this.diff.imageA != null) {
        loadJsonpDataUri(this.jsonpUrl, this.diff.imageA, dataUri => {
          this.imageASrc = dataUri;
        });
      }

      if (this.diff.imageB != null) {
        loadJsonpDataUri(this.jsonpUrl, this.diff.imageB, dataUri => {
          this.imageBSrc = dataUri;
        });
      }

    } else {
      this.imageASrc = this.imagesUrl + this.diff.imageA;
      this.imageBSrc = this.imagesUrl + this.diff.imageB;
    }
  }

  async compareImages() {
    const diff = this.diff;

    if (!this.isImageALoaded || !this.isImageBLoaded || this.hasCalculatedMismatch) {
      return;
    }
    this.hasCalculatedMismatch = true;

    diff.mismatchedPixels = await getMismatch(
      this.imageA,
      this.imageB,
      this.canvas,
      Math.round(diff.width * diff.deviceScaleFactor),
      Math.round(diff.height * diff.deviceScaleFactor)
    );

    this.canvasClass = 'has-loaded';

    setMismatchedPixels(diff.imageA, diff.imageB, diff.mismatchedPixels);

    this.compareLoaded.emit(diff);
  }

  render() {
    const diff = this.diff;
    const style = {
      width: diff.width + 'px',
      height: diff.height + 'px'
    };

    return [
      <compare-cell>
        <img
          src={this.imageASrc}
          class={this.imageAClass}
          style={style}
          onLoad={this.diff.identical ? null : () => {
            this.isImageALoaded = true;
            this.imageAClass = 'has-loaded';
            this.compareImages();
          }}
          ref={elm => this.imageA = elm}
        />
      </compare-cell>,

      <compare-cell>
        <img
          src={this.imageBSrc}
          class={this.imageBClass}
          style={style}
          onLoad={this.diff.identical ? null : () => {
            this.isImageBLoaded = true;
            this.imageBClass = 'has-loaded';
            this.compareImages();
          }}
          ref={elm => this.imageB = elm}
        />
      </compare-cell>,

      <compare-cell>
        {this.diff.identical ? (
          <img
            style={style}
            src={this.imageASrc}/>
        ) : (
          <canvas
            width={Math.round(diff.width * diff.deviceScaleFactor)}
            height={Math.round(diff.height * diff.deviceScaleFactor)}
            class={this.canvasClass}
            style={style}
            ref={(elm) => this.canvas = elm}/>
        )}
      </compare-cell>,

      <compare-cell>
        <compare-analysis
          mismatchedPixels={this.diff.mismatchedPixels}
          diff={this.diff}/>
      </compare-cell>
    ];
  }
}
