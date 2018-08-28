import { Component, State } from '@stencil/core';
import * as d from '../../declarations';
import { deleteSnapshot, setMasterSnapshot } from '../../helpers/data';


@Component({
  tag: 'screenshot-list',
  styleUrl: 'screenshot-list.css'
})
export class ScreenshotList {

  appData: d.AppData = { masterSnapshotId: null, snapshots: [] };
  isAdmin = true;

  @State() a: string = null;
  @State() b: string = null;

  componentWillLoad() {
    return this.loadAppData();
  }

  private async loadAppData() {
    try {
      const rsp = await fetch('/screenshot/data/data.json');
      this.appData = await rsp.json();

      if (this.appData.masterSnapshotId) {
        this.a = this.appData.masterSnapshotId;
      }

    } catch (e) {
      console.error(e);
    }
  }

  private async setMasterSnapshot(id: string) {
    setMasterSnapshot(id);
  }

  private async deleteSnapshot(id: string) {
    deleteSnapshot(id);
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

        <ion-grid>

          {this.appData.snapshots.map(snapshot => {
            const rowCssClasses = {
              'is-master': snapshot.id === this.appData.masterSnapshotId
            };

            return (
              <ion-row key={snapshot.id} class={rowCssClasses}>

                <ion-col>
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
                </ion-col>

                <ion-col>
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
                </ion-col>

                <ion-col>
                  <ion-anchor href={'/' + snapshot.id}>{snapshot.id}</ion-anchor>
                </ion-col>

                <ion-col>
                  {snapshot.desc}
                </ion-col>

                <ion-col>
                  {snapshot.timestamp}
                </ion-col>

                {(this.isAdmin ? (
                  <ion-col>
                    <ion-anchor
                      tappable
                      hidden={this.appData.masterSnapshotId === snapshot.id}
                      onClick={this.setMasterSnapshot.bind(this, snapshot.id)}>Master</ion-anchor>
                  </ion-col>
                ): null)}

                {(this.isAdmin ? (
                  <ion-col>
                    <ion-anchor
                      tappable
                      hidden={this.appData.masterSnapshotId === snapshot.id}
                      onClick={this.deleteSnapshot.bind(this, snapshot.id)} color="danger">Delete</ion-anchor>
                  </ion-col>
                ): null)}

              </ion-row>
            );
          })}

        </ion-grid>

      </ion-content>
    ];
  }
}
