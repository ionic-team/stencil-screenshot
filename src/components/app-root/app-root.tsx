// import '@ionic/core';
// import '@stencil/router';
import { Component } from '@stencil/core';


@Component({
  tag: 'app-root'
})
export class AppRoot {

  render() {
    return (
      <stencil-router>
        <stencil-route-switch>
          <stencil-route url="/" component="screenshot-lookup" exact={true} />
          <stencil-route url="/:a/:b/" component="screenshot-compare" />
        </stencil-route-switch>
      </stencil-router>
    );
  }
}
