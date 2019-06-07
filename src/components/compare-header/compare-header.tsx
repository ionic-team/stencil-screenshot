import { ScreenshotDiff } from '../../helpers/declarations';
import { Component, Prop, h } from '@stencil/core';
import { FilterData } from '../../helpers/filter-data';


@Component({
  tag: 'compare-header',
  styleUrl: 'compare-header.css',
  shadow: true
})
export class CompareHeader {

  @Prop() appSrcUrl: string;
  @Prop() diffs: ScreenshotDiff[];
  @Prop() filter: FilterData;

  render() {
    return [
      <header>
        <div class="logo">
          <a href="/">
            <img src={this.appSrcUrl + '/assets/logo.png?1'}/>
          </a>
        </div>
        <compare-filter
          diffs={this.diffs}
          filter={this.filter}/>
      </header>
    ];
  }
}
