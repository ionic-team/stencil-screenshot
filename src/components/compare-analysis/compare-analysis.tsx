import { Component, Prop } from '@stencil/core';
import { ScreenshotDiff } from '../../helpers/declarations';


@Component({
  tag: 'compare-analysis',
  styleUrl: 'compare-analysis.css',
  shadow: true
})
export class CompareAnalysis {

  @Prop() diff: ScreenshotDiff;

  navToId(ev: UIEvent) {
    ev.preventDefault();
    ev.stopPropagation();

    // updateHash({
    //   diff: this.diffId
    // });
  }

  render() {
    const diff = this.diff;
    const hasCalculated = typeof diff.mismatchedPixels === 'number';
    const mismatchedRatio = hasCalculated ? (diff.mismatchedPixels / ((diff.width * diff.deviceScaleFactor) * (diff.height * diff.deviceScaleFactor))) : null;

    let mismatchClass = '';
    if (hasCalculated) {
      if (diff.mismatchedPixels > 0) {
        mismatchClass = 'has-mismatch';
      }
    } else {
      mismatchClass = 'not-calculated';
    }

    return [
      <p class="test-path">
        {diff.testPath}
      </p>,
      <dl>
        <div>
          <dt>Diff</dt>
          <dd><a href={'#diff-' + diff.id} onClick={this.navToId.bind(this)}>{diff.id}</a></dd>
        </div>
        <div class={mismatchClass}>
          <dt>Mismatched Pixels</dt>
          <dd>{hasCalculated ? diff.mismatchedPixels : '--'}</dd>
        </div>
        <div class={mismatchClass}>
          <dt>Mismatched Ratio</dt>
          <dd>{hasCalculated ? mismatchedRatio.toFixed(4) : '--'}</dd>
        </div>
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
        <div class="desc">
          <dt>Description</dt>
          <dd>{diff.desc}</dd>
        </div>
      </dl>
    ];
  }
}
