import { Component, Element, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { ScreenshotDiff } from '../../helpers/declarations';
import { setMismatchedPixels } from '../../helpers/mismatch-cache';
import { getMismatch } from '../../helpers/pixelmatch';
import { loadJsonpDataUri } from '../../helpers/image-store';


@Component({
  tag: 'compare-row',
  styleUrl: 'compare-row.css'
})
export class CompareRow {

  @Prop() aId: string;
  @Prop() bId: string;
  @Prop() imagesUrl: string;
  @Prop() jsonpUrl: string;
  @Prop() diff: ScreenshotDiff;
  @Prop() show: boolean;
  @Event() compareLoaded: EventEmitter<ScreenshotDiff>;
  @Element() elm: HTMLElement;

  @State() imageASrc: string = null;
  @State() imageBSrc: string = null;

  @State() imageAClass = 'is-loading';
  @State() imageBClass = 'is-loading';
  @State() canvasClass = 'is-loading';

  imageA: HTMLImageElement;
  imageB: HTMLImageElement;

  imagesLoaded = new Set();
  isImageALoaded = false;
  isImageBLoaded = false;
  canvas: HTMLCanvasElement;
  isMismatchInitialized = false;
  hasCalculatedMismatch = false;

  componentWillLoad() {
    this.loadScreenshots();
  }

  componentWillUpdate() {
    this.loadScreenshots();
  }

  loadScreenshots() {
    if (!this.show || !this.diff.hasIntersected) {
      return;
    }

    if (this.diff.identical) {
      this.imageASrc = this.imagesUrl + this.diff.imageA;
      this.isImageALoaded = true;
      this.imageAClass = 'has-loaded';

      this.imageBSrc = this.imagesUrl + this.diff.imageB;
      this.isImageBLoaded = true;
      this.imageBClass = 'has-loaded';

      return;
    }

    if (this.isMismatchInitialized) {
      return;
    }

    this.isMismatchInitialized = true;

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

    if (!this.isImageALoaded || !this.isImageBLoaded || this.hasCalculatedMismatch || !diff.comparable) {
      return;
    }
    this.hasCalculatedMismatch = true;

    diff.mismatchedPixels = await getMismatch(
      this.imageA,
      this.imageB,
      this.canvas,
      Math.round(diff.width * diff.deviceScaleFactor),
      Math.round(diff.height * diff.deviceScaleFactor),
      diff.threshold
    );

    this.canvasClass = 'has-loaded';

    setMismatchedPixels(diff.imageA, diff.imageB, diff.mismatchedPixels, diff.threshold);

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
        {diff.imageA != null ? (
          <a href={this.imagesUrl + diff.imageA} target="_blank">
            <img
              src={this.imageASrc}
              class={this.imageAClass}
              onLoad={this.diff.identical ? null : () => {
                this.isImageALoaded = true;
                this.imageAClass = 'has-loaded';
                this.compareImages();
              }}
              ref={elm => this.imageA = elm}
            />
          </a>
        ): <img style={style} class="is-loading"/>}
      </compare-cell>,

      <compare-cell>
        {diff.imageB != null ? (
          <a href={this.imagesUrl + diff.imageB} target="_blank">
            <img
              src={this.imageBSrc}
              class={this.imageBClass}
              onLoad={this.diff.identical ? null : () => {
                this.isImageBLoaded = true;
                this.imageBClass = 'has-loaded';
                this.compareImages();
              }}
              ref={elm => this.imageB = elm}
            />
          </a>
        ): <img style={style} class="is-loading"/>}
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
            hidden={!diff.comparable}
            ref={(elm) => this.canvas = elm}/>
        )}
      </compare-cell>,

      <compare-cell>
        <compare-analysis
          aId={this.aId}
          bId={this.bId}
          mismatchedPixels={this.diff.mismatchedPixels}
          diff={this.diff}/>
      </compare-cell>
    ];
  }
}
