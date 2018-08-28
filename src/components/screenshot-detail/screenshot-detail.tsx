import { Component } from '@stencil/core';


@Component({
  tag: 'screenshot-detail',
  styleUrl: 'screenshot-detail.css'
})
export class ScreenshotDetail {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" text="Back" icon="" />
          </ion-buttons>
          <ion-title>ScreenshotDetail</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <p>
        ScreenshotDetail
        </p>
      </ion-content>
    ];
  }
}
