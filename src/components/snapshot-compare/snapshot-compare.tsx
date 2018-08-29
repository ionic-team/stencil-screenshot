import { Component, Prop } from '@stencil/core';
import * as d from '../../declarations';


@Component({
  tag: 'snapshot-compare',
  styleUrl: 'snapshot-compare.css'
})
export class SnapshotCompare {

  @Prop() a: string;
  @Prop() b: string;

  screenshotDiffs: ScreenshotDiff[] = [];
  title: string;
  masterSnapshotId: string;

  async componentWillLoad() {
    try {
      const fetchA = fetch(`/screenshot/data/snapshots/${this.a}.json`);
      const fetchB = fetch(`/screenshot/data/snapshots/${this.b}.json`);
      const fetchData = fetch(`/screenshot/data/data.json`);

      const rspA = await fetchA;
      const rspB = await fetchB;
      const rspData = await fetchData;

      const snapshotA = await rspA.json() as d.SnapshotData;
      const snapshotB = await rspB.json() as d.SnapshotData;
      const data = await rspData.json() as d.AppData;
      this.masterSnapshotId = data.masterSnapshotId;

      this.screenshotDiffs = snapshotA.screenshots.map(screenshotA => {
        return {
          id: screenshotA.id,
          desc: screenshotA.desc,
          imageA: `/screenshot/images/${screenshotA.image}`,
          imageB: '',
          diff: null
        }
      });

      snapshotB.screenshots.forEach(screenshotB => {
        const a = this.screenshotDiffs.find(s => s.id === screenshotB.id);
        if (!a) return;

        a.imageB = `/screenshot/images/${screenshotB.image}`;
      });

      this.screenshotDiffs = this.screenshotDiffs.filter(diff => diff.imageA !== diff.imageB);

      this.screenshotDiffs.forEach(screenshotDiff => {
        screenshotDiff.diff = (window as any).resemble(screenshotDiff.imageA)
          .compareTo(screenshotDiff.imageB)
          .onComplete(data => {
            if (data.misMatchPercentage > 0.5) {
              const diffImage = (document.getElementById('diff-' + screenshotDiff.id) as HTMLImageElement);
              diffImage.src = data.getImageDataUrl();

              document.getElementById(`mismatch-${screenshotDiff.id}`).textContent = data.misMatchPercentage;

              document.getElementById(`row-${screenshotDiff.id}`).hidden = false;
            }
          });
      });

      this.title = `Compare: ${this.a}${this.a === data.masterSnapshotId ? ' (master)' : ''} to ${this.b}${this.b === data.masterSnapshotId ? ' (master)' : ''}`;

    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>{this.title}</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <table class="snapshot-compare">

          <tr>
            <td>
              <ion-anchor href={'/' + this.a}>{this.a} {this.a === this.masterSnapshotId ? ' (master)' : ''}</ion-anchor>
            </td>
            <td>
              <ion-anchor href={'/' + this.b}>{this.b} {this.b === this.masterSnapshotId ? ' (master)' : ''}</ion-anchor>
            </td>
            <td>Diff</td>
            <td>Analysis</td>
          </tr>

          {this.screenshotDiffs.map(diff => {
            return (
              <tr id={'row-' + diff.id} hidden>
                <td>
                  <img src={diff.imageA}/>
                </td>
                <td>
                  <img src={diff.imageB}/>
                </td>
                <td>
                  <img src='' id={'diff-' + diff.id}/>
                </td>
                <td>
                  <p>{diff.desc}</p>
                  <p><strong>Mismatch</strong>: <span id={'mismatch-' + diff.id}></span>%</p>
                </td>
              </tr>
            );
          })}

        </table>
      </ion-content>
    ];
  }
}

interface ScreenshotDiff {
  id: string;
  desc: string;
  imageA: string;
  imageB: string;
  diff: any;
}
