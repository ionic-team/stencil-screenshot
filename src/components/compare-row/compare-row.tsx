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
  @Prop() diff: ScreenshotDiff;
  @Prop({ reflectToAttr: true }) hidden: boolean;
  @Event() compareLoaded: EventEmitter;
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
    if (this.hidden) {
      return;
    }

    if (this.diff.identical) {
      this.imageASrc = this.imagesUrl + this.diff.imageA;
      this.imageBSrc = this.imagesUrl + this.diff.imageA;
      return;
    }

    if (this.initializeCalculateMismatch) {
      return;
    }

    this.imageAClass = 'is-loading';
    this.imageBClass = 'is-loading';
    this.canvasClass = 'is-loading';
    this.initializeCalculateMismatch = true;

    if (this.diff.imageA != null) {
      loadJsonpDataUri(this.diff.imageA, this.diff.jsonpUrlA, dataUri => {
        this.imageASrc = dataUri;
        this.imageAClass = 'has-loaded';
        this.isImageALoaded = true;
      });
    }

    if (this.diff.imageB != null) {
      loadJsonpDataUri(this.diff.imageB, this.diff.jsonpUrlB, dataUri => {
        this.imageBSrc = dataUri;
        this.imageBClass = 'has-loaded';
        this.isImageBLoaded = true;
      });
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

    this.compareLoaded.emit();
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
          onLoad={this.diff.identical ? null : this.compareImages.bind(this)}
          ref={elm => this.imageA = elm}
        />
      </compare-cell>,

      <compare-cell>
        <img
          src={this.imageBSrc}
          class={this.imageBClass}
          style={style}
          onLoad={this.diff.identical ? null : this.compareImages.bind(this)}
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
        <compare-analysis diff={this.diff}/>
      </compare-cell>
    ];
  }
}
