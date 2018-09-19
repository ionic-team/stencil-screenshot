import '@ionic/core';
import { Component } from '@stencil/core';


@Component({
  tag: 'app-root'
})
export class AppRoot {

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="screenshot-lookup" />
          <ion-route url="/:a/:b/" component="screenshot-compare" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
