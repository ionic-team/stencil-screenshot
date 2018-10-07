import { Component, Prop, Listen, State } from '@stencil/core';
import { ScreenshotBuild } from '@stencil/core/screenshot';
import { createScreenshotDiff } from '../../helpers/screenshot-diff';
import { ScreenshotDiff } from '../../helpers/declarations';
import { FilterData, getFilterData, updateFilterData } from '../../helpers/filter-data';
import { filterDiffs } from '../../helpers/filter-data';


@Component({
  tag: 'screenshot-compare'
})
export class LocalCompare {

  @Prop() appSrcUrl: string;
  @Prop() imagesUrl: string;
  @Prop() jsonpUrl: string;
  @Prop() a: ScreenshotBuild;
  @Prop() b: ScreenshotBuild;
  @Prop() buildIdA: string;
  @Prop() buildIdB: string;

  diffs: ScreenshotDiff[] = [];
  @State() filter: FilterData;

  componentWillLoad() {
    this.filter = getFilterData();
    this.diffs = createScreenshotDiff(this.a, this.b, this.imagesUrl, this.jsonpUrl);
    this.updateDiffs();
  }

  @Listen('filterChange')
  filterChange(ev: UIEvent) {
    this.filter = updateFilterData(this.filter, ev.detail as any);
    this.updateDiffs();
  }

  @Listen('compareLoaded')
  compareLoaded() {
    this.updateDiffs();
  }

  updateDiffs() {
    this.diffs = filterDiffs(this.filter, this.diffs);
  }

  render() {
    return [
      <compare-header
        diffs={this.diffs}
        filter={this.filter}
        appSrcUrl={this.appSrcUrl}/>,

      <section class="scroll-x">

        <compare-thead
          a={this.a}
          b={this.b}/>

        <section class="scroll-y">

          <compare-table>

            <compare-tbody>

              {this.diffs.map(diff => (
                <compare-row
                  key={diff.id}
                  id={'d-' + diff.id}
                  hidden={diff.hidden}
                  imagesUrl={this.imagesUrl}
                  diff={diff}/>
              ))}

            </compare-tbody>

          </compare-table>

        </section>

      </section>
    ];
  }
}
