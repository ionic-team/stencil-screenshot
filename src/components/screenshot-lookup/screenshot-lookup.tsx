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
