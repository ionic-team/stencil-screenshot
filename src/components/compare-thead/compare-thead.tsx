import { Component, Prop } from '@stencil/core';
import { ScreenshotCompareResults } from '@stencil/core/dist/screenshot';


@Component({
  tag: 'compare-thead',
  styleUrl: 'compare-thead.css',
  shadow: true
})
export class CompareTHead {

  @Prop() compare: ScreenshotCompareResults;

  render() {
    if (!this.compare) {
      return;
    }

    let colWidth = 0;
    this.compare.diffs.forEach(diff => {
      if (diff.width > colWidth) {
        colWidth = diff.width;
      }
    });

    colWidth = colWidth - 6;

    const style = {
      width: colWidth + 'px'
    }

    return [

      <th-cell>
        <div style={style}>
          <a href={this.compare.a.url}>{this.compare.a.message}</a>
        </div>
      </th-cell>,

      <th-cell>
        <div style={style}>
          <a href={this.compare.b.url}>{this.compare.b.message}</a>
        </div>
      </th-cell>,

      <th-cell>
        <div style={style}>
          Diff
        </div>
      </th-cell>,

      <th-cell class="analysis">
        <div>
          Analysis
        </div>
      </th-cell>

    ];
  }
}
