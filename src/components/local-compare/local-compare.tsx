import { Component, Prop } from '@stencil/core';
import { ScreenshotBuild } from '@stencil/core/screenshot';
import { ScreenshotDiff, createScreenshotDiff } from '../../helpers/screenshot-diff';


@Component({
  tag: 'local-compare'
})
export class LocalCompare {

  @Prop() imagesUrl: string;
  @Prop() jsonpUrl: string;
  @Prop() buildA: ScreenshotBuild;
  @Prop() buildB: ScreenshotBuild;

  diffs: ScreenshotDiff[] = [];

  componentWillLoad() {
    this.diffs = createScreenshotDiff(this.buildA, this.buildB, this.imagesUrl, this.jsonpUrl);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Screenshot Compare</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content scroll-x="true">
        <table>
          <tr>
            <th>
              Master
            </th>
            <th>
              {this.buildB.message}
            </th>
            <th>
              Diff
            </th>
            <th>
              Analysis
            </th>
          </tr>

          {this.diffs.map(diff => <tr key={diff.id}>
            <td>
              {diff.imageUrlA ? (
                <a
                  id={'link-a-' + diff.id}
                  style={{ width: diff.width + 'px', height: diff.height + 'px' }}
                  href={diff.imageUrlA}
                  class="img-link"
                  target="_blank"/>
              ) : (
                null
              )}
            </td>

            <td>
              {diff.imageUrlB ? (
                <a
                id={'link-b-' + diff.id}
                  style={{ width: diff.width + 'px', height: diff.height + 'px' }}
                  href={diff.imageUrlB}
                  class="img-link"
                  target="_blank"/>
              ) : (
                null
              )}
            </td>

            <td>
              <local-pixelmatch diff={diff}/>
            </td>

            <td class="analysis">

              <div>
                {(diff.device || diff.userAgent) ? (
                    <strong>{diff.device || diff.userAgent}: </strong>
                ) : (
                  null
                )}
                {diff.desc}
              </div>

              <div>
                <strong>Mismatched Pixels</strong>: <span id={'mismatch-pixels-' + diff.id}>{diff.mismatchedPixels != null ? diff.mismatchedPixels : '...'}</span>
              </div>

              <div>
                <strong>Mismatched Ratio</strong>: <span id={'mismatch-ratio-' + diff.id}>{diff.mismatchedRatio != null ? diff.mismatchedRatio.toFixed(4) : '...'}</span>
              </div>

            </td>

          </tr>
          )}

        </table>
      </ion-content>
    ];
  }
}
