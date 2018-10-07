import { Component, Prop } from '@stencil/core';
import { ScreenshotBuild } from '@stencil/core/dist/screenshot';


@Component({
  tag: 'compare-thead',
  styleUrl: 'compare-thead.css',
  shadow: true
})
export class CompareTHead {

  @Prop() a: ScreenshotBuild;
  @Prop() b: ScreenshotBuild;

  render() {
    let colWidth = 0;
    this.a.screenshots.forEach(s => {
      if (s.width > colWidth) {
        colWidth = s.width;
      }
    });

    colWidth += 8;

    const style = {
      width: colWidth + 'px'
    }

    return [

      <th-cell>
        <div style={style}>
          {this.a.message}
        </div>
      </th-cell>,

      <th-cell>
        <div style={style}>
          {this.b.message}
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
