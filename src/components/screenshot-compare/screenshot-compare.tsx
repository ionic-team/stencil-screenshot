import { Component, Prop, Listen, State } from '@stencil/core';
import { ScreenshotBuild } from '@stencil/core/screenshot';
import { createScreenshotDiff } from '../../helpers/screenshot-diff';
import { ScreenshotDiff } from '../../helpers/declarations';
import { FilterData, getFilterData, updateFilterData } from '../../helpers/filter-data';
import { filterDiffs } from '../../helpers/filter-data';
import { MatchResults } from '@stencil/router';


@Component({
  tag: 'screenshot-compare'
})
export class ScreenshotCompare {

  @Prop() appSrcUrl = '';
  @Prop() imagesUrl = '/data/images/';
  @Prop() buildsUrl = '/data/builds/';
  @Prop() jsonpUrl: string = null;
  @Prop({ mutable: true }) a: ScreenshotBuild;
  @Prop({ mutable: true }) b: ScreenshotBuild;
  @Prop() match: MatchResults;

  @State() diffs: ScreenshotDiff[] = [];
  @State() filter: FilterData;

  async componentWillLoad() {
    if (this.match) {
      if (this.match.params.buildIdA && this.match.params.buildIdB) {
        await this.loadBuilds(this.match.params.buildIdA, this.match.params.buildIdB);
      }
    }

    if (this.a && this.b) {
      this.filter = getFilterData();
      this.diffs = createScreenshotDiff(this.a, this.b, this.imagesUrl);
      this.updateDiffs();
    }
  }

  async loadBuilds(buildIdA: string, buildIdB: string) {
    const urlA = `${this.buildsUrl}${buildIdA}.json`;
    const urlB = `${this.buildsUrl}${buildIdB}.json`;

    const requests = await Promise.all([
      fetch(urlA),
      fetch(urlB)
    ]);

    const reqA = await requests[0];
    const reqB = await requests[1];

    if (reqA.ok) {
      this.a = await requests[0].json();
    }

    if (reqB.ok) {
      this.b = await requests[1].json();
    }
  }

  @Listen('filterChange')
  filterChange(ev: UIEvent) {
    this.filter = updateFilterData(this.filter, ev.detail as any);
    this.updateDiffs();
  }

  @Listen('compareLoaded')
  compareLoaded(ev: CustomEvent) {
    const updatedDiff = (ev.detail as ScreenshotDiff);
    const diff = this.diffs.find(d => d.id === updatedDiff.id);
    if (diff) {
      diff.mismatchedPixels = updatedDiff.mismatchedPixels;
    }
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
                  show={diff.show}
                  hidden={!diff.show}
                  imagesUrl={this.imagesUrl}
                  jsonpUrl={this.jsonpUrl}
                  diff={diff}/>
              ))}

            </compare-tbody>

          </compare-table>

        </section>

      </section>
    ];
  }
}
