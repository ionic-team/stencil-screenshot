import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { ScreenshotDiff } from '../../helpers/declarations';


@Component({
  tag: 'compare-analysis',
  styleUrl: 'compare-analysis.css',
  shadow: true
})
export class CompareAnalysis {

  @Prop() aId: string;
  @Prop() bId: string;
  @Prop() diff: ScreenshotDiff;
  @Prop() mismatchedPixels: number = null;
  @Event() diffNavChange: EventEmitter<string>;

  navToDiff(ev: UIEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.diffNavChange.emit(this.diff.id);
  }

  render() {
    const diff = this.diff;

    const hasCalculated = typeof this.mismatchedPixels === 'number';
    const mismatchedRatio = hasCalculated ? (this.mismatchedPixels / ((diff.width * diff.deviceScaleFactor) * (diff.height * diff.deviceScaleFactor))) : null;

    let mismatchClass = '';
    if (hasCalculated) {
      if (this.mismatchedPixels > 0) {
        mismatchClass = 'has-mismatch';
      }
    } else {
      mismatchClass = 'not-calculated';
    }

    const parts = diff.testPath.split('/');
    parts.pop();
    const previewUrl = parts.join('/');

    return [
      <p class="test-path">
        {diff.testPath}
      </p>,
      <dl>
        <div>
          <dt>Diff</dt>
          <dd><a href={'#diff-' + diff.id} onClick={this.navToDiff.bind(this)}>{diff.id}</a></dd>
        </div>
        {diff.comparable ? [
          <div class={mismatchClass}>
            <dt>Mismatched Pixels</dt>
            <dd>{hasCalculated ? this.mismatchedPixels : '--'}</dd>
          </div>,
          <div class={mismatchClass}>
            <dt>Mismatched Ratio</dt>
            <dd>{hasCalculated ? mismatchedRatio.toFixed(4) : '--'}</dd>
          </div>
        ]: null}
        <div>
          <dt>Device</dt>
          <dd>{diff.device}</dd>
        </div>
        <div>
          <dt>Width</dt>
          <dd>{diff.width}</dd>
        </div>
        <div>
          <dt>Height</dt>
          <dd>{diff.height}</dd>
        </div>
        <div>
          <dt>Device Scale Factor</dt>
          <dd>{diff.deviceScaleFactor}</dd>
        </div>
        {diff.imageA ? (
          <div>
            <dt>Left Preview</dt>
            <dd><a href={`/data/tests/${this.aId}/${previewUrl}/`} target="_blank">HTML</a></dd>
          </div>
        ) : null}
        {diff.imageB ? (
          <div>
            <dt>Right Preview</dt>
            <dd><a href={`/data/tests/${this.bId}/${previewUrl}/`} target="_blank">HTML</a></dd>
          </div>
        ) : null}
        <div class="desc">
          <dt>Description</dt>
          <dd>{diff.desc}</dd>
        </div>
      </dl>
    ];
  }
}
