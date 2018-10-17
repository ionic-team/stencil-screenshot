import '@stencil/router';
import { Component } from '@stencil/core';


@Component({
  tag: 'app-root'
})
export class AppRoot {

  render() {
    return (
      <stencil-router class="full-screen">
        <stencil-route-switch>
          <stencil-route url="/:buildIdA/:buildIdB" exact={true} component="screenshot-compare" class="full-screen" />
          <stencil-route url="/:buildId" component="screenshot-preview" class="full-screen" />
          <stencil-route url="/" component="screenshot-lookup" exact={true} class="full-screen" />
        </stencil-route-switch>
      </stencil-router>
    );
  }
}
