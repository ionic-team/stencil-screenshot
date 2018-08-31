import { Component, Prop } from '@stencil/core';
import { E2ESnapshot } from '@stencil/core/screenshot';
import { formatCommitUrl, formatDate } from '../../helpers/format';


@Component({
  tag: 'snapshot-detail',
  styleUrl: 'snapshot-detail.css'
})
export class SnapshotDetail {

  @Prop() snapshotId: string;
  snapshot: E2ESnapshot = null;

  async componentWillLoad() {
    try {
      const rsp = await fetch(`/screenshot/data/snapshots/${this.snapshotId}.json`);
      this.snapshot = await rsp.json();

    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" text="Back" icon="" />
          </ion-buttons>
          <ion-title>Snapshot {this.snapshotId}</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>

        {this.snapshot.msg && this.snapshot.repoUrl ? (
          <p>
            <a href={formatCommitUrl(this.snapshot.repoUrl, this.snapshot.id)} target="_blank">
              {this.snapshot.msg}
            </a>
          </p>
        ) : this.snapshot.msg ? (
          <p>
            {this.snapshot.msg}
          </p>
        ): null}

        <p>{formatDate(this.snapshot.timestamp)}</p>

        <table class="snapshot-detail">

          {this.snapshot.screenshots.map(screenshot => {
            return (
              <tr id={'screenshot-' + screenshot.id}>
                <td class="screenshot">
                  <a href={`/screenshot/images/${screenshot.image}`} target="_blank">
                    <img
                      src={`/screenshot/images/${screenshot.image}`}
                      width={screenshot.width}
                      height={screenshot.height}
                      title={screenshot.device + ', ' + screenshot.desc}/>
                  </a>
                </td>
                <td>
                  <p class="id">
                    <strong>ID:</strong> <a href={'#screenshot-' + screenshot.id}>
                      {screenshot.id}
                    </a>
                  </p>
                  <p><strong>Description:</strong> {screenshot.desc}</p>
                  <p><strong>Device:</strong> {screenshot.device}</p>
                  <p><strong>Size:</strong> {screenshot.width} x {screenshot.height}</p>
                  <p><strong>Scale Factor:</strong> {screenshot.deviceScaleFactor}</p>
                </td>
              </tr>
            )
          })}

        </table>
      </ion-content>
    ];
  }
}
