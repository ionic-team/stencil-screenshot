import * as d from '../../declarations';
import { Component, Prop } from '@stencil/core';
import { formatDate } from '../../helpers/data';


@Component({
  tag: 'snapshot-detail',
  styleUrl: 'snapshot-detail.css'
})
export class SnapshotDetail {

  @Prop() snapshotId: string;
  snapshot: d.SnapshotData = null;

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

        {this.snapshot.desc && this.snapshot.commitUrl ? (
          <p>
            <a href={this.snapshot.commitUrl}>{this.snapshot.desc}</a>
          </p>
        ) : this.snapshot.desc ? (
          <p>
            {this.snapshot.desc}
          </p>
        ): null}

        <p>{formatDate(this.snapshot.timestamp)}</p>

        <table class="snapshot-detail">

        {this.snapshot.screenshots.map(screenshot => {
          return (
            <tr>
              <td>
                <img src={`/screenshot/images/${screenshot.image}`}/>
              </td>
              <td>
                <p class="id"><strong>ID:</strong> {screenshot.id}</p>
                <p class="desc">{screenshot.desc}</p>
              </td>
            </tr>
          )
        })}

        </table>
      </ion-content>
    ];
  }
}
