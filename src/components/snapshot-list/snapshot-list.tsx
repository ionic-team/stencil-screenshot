import { Component, State, Prop } from '@stencil/core';
import * as d from '../../declarations';
import { formatDate } from '../../helpers/data';


@Component({
  tag: 'snapshot-list',
  styleUrl: 'snapshot-list.css'
})
export class SnapshotList {

  @State() appData: d.AppData = { masterSnapshotId: null, snapshots: [] };
  isAdmin = false;

  @State() a: string = null;
  @State() b: string = null;

  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: HTMLIonAlertControllerElement;

  async componentWillLoad() {
    this.isAdmin = (window.location.hostname === 'localhost')

    try {
      const rsp = await fetch(`/screenshot/data/data.json`);
      this.appData = await rsp.json();

      if (this.appData.masterSnapshotId) {
        this.a = this.appData.masterSnapshotId;
      }

    } catch (e) {
      console.error(e);
    }
  }

  private async setMasterSnapshot(snapshotId: string) {
    const alert = await this.alertCtrl.create({
      header: `Set as Master: ${snapshotId}`,
      message: `Are you sure you want to master snapshot to ${snapshotId}?`,
      buttons: [
        {
          text: `Cancel`,
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: `Set as Master`,
          handler: async () => {
            try {
              const rsp = await fetch(`/?set_master_snapshot=${snapshotId}`);
              this.appData = await rsp.json();
              alert.dismiss();

            } catch (e) {
              console.error(e);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async deleteSnapshot(snapshotId: string) {
    const alert = await this.alertCtrl.create({
      header: `Delete ${snapshotId}`,
      message: `Are you sure you want to delete snapshot ${snapshotId}?`,
      buttons: [
        {
          text: `Cancel`,
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: `Delete`,
          handler: async () => {
            try {
              const rsp = await fetch(`/?delete_snapshot=${snapshotId}`);
              this.appData = await rsp.json();
              alert.dismiss();

            } catch (e) {
              console.error(e);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Screenshot Comparison</ion-title>
          <ion-buttons slot="end">
            <ion-button
              disabled={this.a === null || this.b === null}
              href={`/${this.a}/${this.b}`}
            >Compare</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>

        <table class="snapshot-list">

          {this.appData.snapshots.map(snapshot => {
            const rowCssClasses = {
              'is-master': snapshot.id === this.appData.masterSnapshotId
            };

            return (
              <tr key={snapshot.id} class={rowCssClasses}>

                <td>
                  <ion-radio
                    onClick={() => {
                      if (this.a === snapshot.id) {
                        this.a = null;
                      } else {
                        this.a = snapshot.id;
                        if (this.b === snapshot.id) {
                          this.b = null;
                        }
                      }
                    }}
                    checked={this.a === snapshot.id}>
                  </ion-radio>
                </td>

                <td>
                  <ion-radio
                    onClick={() => {
                      if (this.b === snapshot.id) {
                        this.b = null;
                      } else {
                        this.b = snapshot.id;
                        if (this.a === snapshot.id) {
                          this.a = null;
                        }
                      }
                    }}
                    checked={this.b === snapshot.id}>
                  </ion-radio>
                </td>

                <td>
                  <ion-anchor href={'/' + snapshot.id}>{snapshot.id}</ion-anchor>
                </td>

                <td class="desc">
                  {snapshot.desc}
                </td>

                <td>
                  {formatDate(snapshot.timestamp)}
                </td>

                {(this.isAdmin ? (
                  <td>
                    <ion-anchor
                      tappable
                      hidden={this.appData.masterSnapshotId === snapshot.id}
                      onClick={this.setMasterSnapshot.bind(this, snapshot.id)}>Set as Master</ion-anchor>
                  </td>
                ): null)}

                {(this.isAdmin ? (
                  <td>
                    <ion-anchor
                      tappable
                      hidden={this.appData.masterSnapshotId === snapshot.id}
                      onClick={this.deleteSnapshot.bind(this, snapshot.id)} color="danger">Delete</ion-anchor>
                  </td>
                ): null)}

              </tr>
            );
          })}

        </table>

      </ion-content>
    ];
  }
}
