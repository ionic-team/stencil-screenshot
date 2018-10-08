import { Component } from '@stencil/core';


@Component({
  tag: 'screenshot-lookup',
  styleUrl: 'screenshot-lookup.css',
  shadow: true
})
export class ScreenshotLookup {

  a = '';
  b = '';

  onSubmit(ev: UIEvent) {
    ev.preventDefault();
    ev.stopPropagation();

    const a = this.a.trim().toLowerCase();
    const b = this.b.trim().toLowerCase();

    if (!a || !b) {
      return;
    }

    const url = `/${a}/${b}`;

    window.location.href = url;
  }

  render() {
    return [
      <header>
        <div class="logo">
          <a href="/">
            <img src="/assets/logo.png"/>
          </a>
        </div>
      </header>,
      <section>

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
