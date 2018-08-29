import '@ionic/core';
import { Component } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="snapshot-list" />
          <ion-route url="/:snapshotId/" component="snapshot-detail" />
          <ion-route url="/:a/:b/" component="snapshot-compare" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
