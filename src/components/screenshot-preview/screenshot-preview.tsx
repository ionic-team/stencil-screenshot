import { Component, Prop } from '@stencil/core';
import { ScreenshotBuild } from '@stencil/core/screenshot';
import { MatchResults } from '@stencil/router';


@Component({
  tag: 'screenshot-preview'
})
export class ScreenshotPreview {

  @Prop() appSrcUrl = '';
  @Prop() imagesUrl = '/data/images/';
  @Prop() buildsUrl = '/data/builds/';
  @Prop() match: MatchResults;

  build: ScreenshotBuild;

  async componentWillLoad() {
    if (this.match && this.match.params.buildId) {
      const buildId: string = this.match.params.buildId;

      let dataUrl = `${this.buildsUrl}${buildId}.json`;

      if (buildId === 'master') {
        dataUrl += `?ts=${Date.now()}`;
      }

      const req = await fetch(dataUrl);

      if (req.ok) {
        this.build = await req.json();
      }
    }
  }

  navToDiff(diffId: string) {
    const diffElm = document.getElementById(`d-${diffId}`);
    const scrollElm = document.querySelector('.scroll-y');
    if (diffElm && scrollElm) {
      scrollElm.scrollTop = diffElm.offsetTop - 84;
    }
  }

  render() {
    if (!this.build) {
      return;
    }

    return [
      <compare-header
        appSrcUrl={this.appSrcUrl}/>,

      <section class="scroll-x">

        <section class="scroll-y">

          <compare-table>

            <compare-tbody>

              {this.build.screenshots.map(screenshot => (
                <div>
                  <p>{screenshot.device || screenshot.userAgent}: {screenshot.desc}</p>
                  <a href={this.imagesUrl + screenshot.image} target="_blank">
                    <img src={this.imagesUrl + screenshot.image} style={{width: screenshot.width + 'px', height: screenshot.height + 'px'}}/>
                  </a>
                </div>
              ))}

            </compare-tbody>

          </compare-table>

        </section>

      </section>
    ];
  }
}
