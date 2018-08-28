import { Component } from '@stencil/core';


@Component({
  tag: 'screenshot-compare',
  styleUrl: 'screenshot-compare.css'
})
export class ScreenshotCompare {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>ScreenshotCompare</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <p>
          ScreenshotCompare
        </p>
      </ion-content>
    ];
  }
}
