import { Component, Prop, h } from '@stencil/core';
import { ScreenshotDiff } from '../../helpers/declarations';
import { ScreenshotBuild } from '@stencil/core/internal';


@Component({
  tag: 'compare-thead',
  styleUrl: 'compare-thead.css',
  shadow: true
})
export class CompareTHead {

  @Prop() a: ScreenshotBuild;
  @Prop() b: ScreenshotBuild;
  @Prop() diffs: ScreenshotDiff[];

  render() {
    if (!this.a || !this.b || !this.diffs) {
      return;
    }

    let colWidth = 0;
    this.diffs.forEach(diff => {
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
          <a href={this.a.url} target="_blank">{this.a.message}</a>
        </div>
      </th-cell>,

      <th-cell>
        <div style={style}>
          <a href={this.b.url} target="_blank">{this.b.message}</a>
        </div>
      </th-cell>,

      <th-cell>
        <div style={style}>
          <a href={`https://github.com/ionic-team/ionic/compare/${this.a.id}...${this.b.id}`} target="_blank">
            Compare: {this.a.id} - {this.b.id}
          </a>
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
