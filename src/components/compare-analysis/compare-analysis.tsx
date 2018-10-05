import { Component, Prop } from '@stencil/core';
import { updateHash } from '../../helpers/filter-data';


@Component({
  tag: 'compare-analysis',
  styleUrl: 'compare-analysis.css',
  shadow: true
})
export class CompareAnalysis {

  @Prop() diffId: string;
  @Prop() mismatchedPixels: number = null;
  @Prop() mismatchedRatio: number = null;
  @Prop() device: string;
  @Prop() width: number;
  @Prop() height: number;
  @Prop() deviceScaleFactor: number;
  @Prop() desc: string;
  @Prop() testPath: string;

  navToId(ev: UIEvent) {
    ev.preventDefault();
    ev.stopPropagation();

    updateHash({
      diff: this.diffId
    });
  }

  render() {
    return [
      <p class="test-path">
        {this.testPath}
      </p>,
      <dl>
        <div>
          <dt>Diff</dt>
          <dd><a href={'#diff-' + this.diffId} onClick={this.navToId.bind(this)}>{this.diffId}</a></dd>
        </div>
        <div>
          <dt>Mismatched Pixels</dt>
          <dd>{typeof this.mismatchedPixels === 'number' ? this.mismatchedPixels : '--'}</dd>
        </div>
        <div>
          <dt>Mismatched Ratio</dt>
          <dd>{typeof this.mismatchedRatio === 'number' ? this.mismatchedRatio.toFixed(4) : '--'}</dd>
        </div>
        <div>
          <dt>Device</dt>
          <dd>{this.device}</dd>
        </div>
        <div>
          <dt>Width</dt>
          <dd>{this.width}</dd>
        </div>
        <div>
          <dt>Height</dt>
          <dd>{this.height}</dd>
        </div>
        <div>
          <dt>Device Scale Factor</dt>
          <dd>{this.deviceScaleFactor}</dd>
        </div>
        <div class="desc">
          <dt>Description</dt>
          <dd>{this.desc}</dd>
        </div>
      </dl>
    ];
  }
}
