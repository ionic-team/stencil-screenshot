import { Component, Prop, Listen, State } from '@stencil/core';
import { ScreenshotCompareResults, ScreenshotBuild } from '@stencil/core/screenshot';
import { ScreenshotDiff } from '../../helpers/declarations';
import { FilterData, getFilterData, updateFilterData } from '../../helpers/filter-data';
import { filterDiffs } from '../../helpers/filter-data';
import { MatchResults } from '@stencil/router';
import { calculateScreenshotDiffs } from '../../helpers/screenshot-diff';


@Component({
  tag: 'screenshot-compare'
})
export class ScreenshotCompare {

  @Prop() appSrcUrl = '';
  @Prop() imagesUrl = '/data/images/';
  @Prop() buildsUrl = '/data/builds/';
  @Prop() comparesUrl = '/data/compares/';
  @Prop() jsonpUrl: string = null;
  @Prop() compare: ScreenshotCompareResults;
  @Prop() match: MatchResults;

  @State() filter: FilterData;
  @State() diffs: ScreenshotDiff[] = [];

  a: ScreenshotBuild;
  b: ScreenshotBuild;

  async componentWillLoad() {
    if (this.compare) {
      this.diffs = loadServerSideCompare(this.compare, this.imagesUrl);
      this.a = this.compare.a as any;
      this.b = this.compare.b as any;

    } else if (this.match) {
      if (this.match.params.buildIdA && this.match.params.buildIdB) {
        await this.loadBuilds(this.match.params.buildIdA, this.match.params.buildIdB);
      }
    }

    this.filter = getFilterData();
    this.updateDiffs();
  }

  componentDidLoad() {
    if ('IntersectionObserver' in window) {
      const options = {
        root: document.querySelector('.scroll-y'),
        rootMargin: '1200px'
      }

      const observer = new IntersectionObserver(entries => {
        let doUpdate = false;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const diff = this.diffs.find(d => entry.target.id === `d-${d.id}`);
            if (diff) {
              diff.hasIntersected = true;
              doUpdate = true;
            }
          }
        });

        if (doUpdate) {
          if ((window as any).requestIdleCallback) {
            (window as any).requestIdleCallback(() => {
              this.updateDiffs();
            });
          } else {
            window.requestAnimationFrame(() => {
              this.updateDiffs();
            });
          }
        }
      }, options);

      const rows = document.querySelectorAll('compare-row');
      for (let i = 0; i < rows.length; i++) {
        observer.observe(rows[i]);
      }

    } else {
      this.diffs.forEach(d => {
        d.hasIntersected = true;
      });
      this.updateDiffs();
    }

    if (this.filter && this.filter.diff) {
      this.navToDiff(this.filter.diff);
    }
  }

  async loadBuilds(buildIdA: string, buildIdB: string) {
    const urlCompare = `${this.comparesUrl}${buildIdA}-${buildIdB}.json`;

    let urlA = `${this.buildsUrl}${buildIdA}.json`;
    if (buildIdA === 'master') {
      urlA += `?ts=${Date.now()}`;
    }

    let urlB = `${this.buildsUrl}${buildIdB}.json`;
    if (buildIdB === 'master') {
      urlB += `?ts=${Date.now()}`;
    }

    const requests = await Promise.all([
      fetch(urlCompare),
      fetch(urlA),
      fetch(urlB)
    ]);

    const reqCompare = await requests[0];
    const reqA = await requests[1];
    const reqB = await requests[2];

    if (reqCompare.ok) {
      const serverSideCompare: ScreenshotCompareResults = await reqCompare.json();
      this.diffs = loadServerSideCompare(serverSideCompare, this.imagesUrl);

      this.a = serverSideCompare.a as any;
      this.b = serverSideCompare.b as any;

    } else if (reqA.ok && reqB.ok) {
      this.a = await reqA.json();
      this.b = await reqB.json();

      this.diffs = await calculateScreenshotDiffs(this.imagesUrl, this.a, this.b);
    }
  }

  @Listen('filterChange')
  filterChange(ev: UIEvent) {
    this.filter = updateFilterData(this.filter, ev.detail as any);
    this.updateDiffs();
  }

  @Listen('diffNavChange')
  diffNavChange(ev: UIEvent) {
    const diffId = ev.detail as any;

    this.filter = updateFilterData(this.filter, {
      diff: diffId
    });
    this.updateDiffs();

    this.navToDiff(diffId);
  }

  navToDiff(diffId: string) {
    const diffElm = document.getElementById(`d-${diffId}`);
    const scrollElm = document.querySelector('.scroll-y');
    if (diffElm && scrollElm) {
      scrollElm.scrollTop = diffElm.offsetTop - 84;
    }
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
          b={this.b}
          diffs={this.diffs}/>

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


function loadServerSideCompare(serverSideCompare: ScreenshotCompareResults, imagesUrl: string) {
  const diffs = serverSideCompare.diffs.map(serverSideDiff => {
    const diff: ScreenshotDiff = {
      id: serverSideDiff.id,
      desc: serverSideDiff.desc,
      testPath: serverSideDiff.testPath,
      imageA: serverSideDiff.imageA,
      imageUrlA: `${imagesUrl}${serverSideDiff.imageA}`,
      imageB: serverSideDiff.imageB,
      imageUrlB: `${imagesUrl}${serverSideDiff.imageB}`,
      identical: (serverSideDiff.mismatchedPixels === 0),
      mismatchedPixels: serverSideDiff.mismatchedPixels,
      width: serverSideDiff.width,
      height: serverSideDiff.height,
      deviceScaleFactor: serverSideDiff.deviceScaleFactor,
      device: (serverSideDiff.device || serverSideDiff.userAgent),
      show: false,
      hasIntersected: false
    };

    return diff;
  });

  return diffs;
}
