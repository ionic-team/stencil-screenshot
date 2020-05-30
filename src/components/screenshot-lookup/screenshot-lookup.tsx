import { Component, h } from '@stencil/core';
import { ScreenshotBuild } from '@stencil/core/internal';


@Component({
  tag: 'screenshot-lookup',
  styleUrl: 'screenshot-lookup.css',
  shadow: true
})
export class ScreenshotLookup {

  a = '';
  b = '';
  build: ScreenshotBuild;

  async componentWillLoad() {
    const dataUrl = `/data/builds/master.json?ts=${Date.now()}`;

    const req = await fetch(dataUrl);

    if (req.ok) {
      this.build = await req.json();
    }
  }

  onSubmit(ev: UIEvent) {
    ev.preventDefault();
    ev.stopPropagation();

    let a = this.a.trim().toLowerCase();
    let b = this.b.trim().toLowerCase();

    if (!a || !b) {
      return;
    }

    a = a.substring(0, 7);
    b = b.substring(0, 7);

    const url = `/${a}/${b}`;

    window.location.href = url;
  }

  render() {
    return [
      <header>
        <div class="logo">
          <a href="/">
            <img src="/assets/logo.png?1"/>
          </a>
        </div>
      </header>,
      <section>

        {this.build ? (
          <section class="master">
            <p><a href="/master">{this.build.message}</a></p>
          </section>
        ) : null}

        <form onSubmit={this.onSubmit.bind(this)}>

          <div>
            <input onInput={elm => this.a = (elm.target as HTMLInputElement).value} />
          </div>

          <div>
          <input onInput={elm => this.b = (elm.target as HTMLInputElement).value} />
          </div>

          <div>
            <button type="submit">Compare Screenshots</button>
          </div>

        </form>

      </section>
    ];
  }
}
