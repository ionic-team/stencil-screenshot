import { Component, Prop } from '@stencil/core';
import { ScreenshotBuild } from '@stencil/core/screenshot';
import { MatchResults } from '@stencil/router';


@Component({
  tag: 'screenshot-preview',
  styleUrl: 'screenshot-preview.css'
})
export class ScreenshotPreview {

  @Prop() appSrcUrl = '';
  @Prop() imagesUrl = '/data/images/';
  @Prop() buildsUrl = '/data/builds/';
  @Prop() match: MatchResults;

  build: ScreenshotBuild;

  async componentWillLoad() {
    if (this.match && this.match.params.buildId) {
      const buildId: string = this.match.params.buildId.substr(0, 7);

      let dataUrl = `${this.buildsUrl}${buildId}.json`;

      if (buildId === 'master') {
        dataUrl += `?ts=${Date.now()}`;
      }

      const req = await fetch(dataUrl);

      if (req.ok) {
        this.build = await req.json();

        document.title = `${this.build.id} HTML Preview`;
      }
    }
  }

  render() {
    if (!this.build) {
      return;
    }

    const previews: PreviewData[] = [];

    this.build.screenshots.forEach(s => {
      const parts = s.testPath.split('/');
      parts.pop();
      const url = `/data/tests/${this.build.id}/${parts.join('/')}/`;

      if (!previews.some(p => p.url === url)) {
        const previewUrl: PreviewData = {
          desc: s.desc.split(',')[0],
          url: url
        };
        previews.push(previewUrl)
      }
    });

    previews.sort((a, b) => {
      if (a.desc.toLowerCase() < b.desc.toLowerCase()) return -1;
      if (a.desc.toLowerCase() > b.desc.toLowerCase()) return 1;
      return 0;
    });

    return [
      <compare-header
        appSrcUrl={this.appSrcUrl}/>,

      <section class="scroll-y">

        <section class="content">

          <h1>
            <a href={this.build.url} target="_blank">
              {this.build.message}
            </a>
          </h1>

          {previews.map(preview => (
            <div>
              <a href={preview.url} target="_blank">
                {preview.desc}
              </a>
            </div>
          ))}

        </section>

      </section>
    ];
  }
}

interface PreviewData {
  desc: string;
  url: string;
}
