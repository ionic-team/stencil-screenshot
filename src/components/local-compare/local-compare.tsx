import { Component, Prop } from '@stencil/core';
import { ScreenshotBuild } from '@stencil/core/screenshot';
import { createScreenshotDiff } from '../../helpers/screenshot-diff';
import { ScreenshotDiff } from '../../helpers/declarations';
import { runFilters } from '../../helpers/filter-data';


@Component({
  tag: 'local-compare'
})
export class LocalCompare {

  @Prop() appSrcUrl: string;
  @Prop() imagesUrl: string;
  @Prop() jsonpUrl: string;
  @Prop() a: ScreenshotBuild;
  @Prop() b: ScreenshotBuild;

  diffs: ScreenshotDiff[] = [];
  hasRendered = false;

  componentWillLoad() {
    this.diffs = createScreenshotDiff(this.a, this.b, this.imagesUrl, this.jsonpUrl);
  }

  componentDidLoad() {
    runFilters();
  }

  render() {
    if (this.hasRendered) {
      return;
    }
    this.hasRendered = true;

    return [
      <compare-header appSrcUrl={this.appSrcUrl}/>,

      <main class="scroll-view">

        <compare-table>

          <compare-thead>

            <compare-header-row>

              <compare-cell>
                {this.a.message}
              </compare-cell>

              <compare-cell>
                {this.b.message}
              </compare-cell>

              <compare-cell>
                Diff
              </compare-cell>

              <compare-cell>
                Analysis
              </compare-cell>

            </compare-header-row>

          </compare-thead>

          <compare-tbody>

            {this.diffs.map(diff => {
              return (
                <compare-row
                  hidden
                  id={'d-' + diff.id}
                  imagesUrl={this.imagesUrl}
                  diff={diff}/>
              )
            })}

          </compare-tbody>

        </compare-table>

      </main>
    ];
  }
}
