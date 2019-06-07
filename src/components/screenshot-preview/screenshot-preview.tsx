import { Component, Prop, h } from '@stencil/core';
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
    let buildId = 'master';

    if (this.match && this.match.params.buildId) {
      buildId = this.match.params.buildId.substr(0, 7);
    }

    let dataUrl = `${this.buildsUrl}${buildId}.json`;

    if (buildId === 'master') {
      dataUrl += `?ts=${Date.now()}`;
    }

    const req = await fetch(dataUrl);

    if (req.ok) {
      this.build = await req.json();

      document.title = `${this.build.id} Preview: ${this.build.message}`;
    }
  }

  render() {
    const previews: PreviewData[] = [];

    if (this.build) {
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
    }

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

          {this.build ? (
            <h1>
              <a href={this.build.url}>
                {this.build.message}
              </a>
            </h1>
          ) : null}

          {previews.map(preview => (
            <div>
              <a href={preview.url}>
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
