import { Repo, ScreenshotDiff } from '../../helpers/declarations';
import { Component, Prop } from '@stencil/core';
import { FilterData } from '../../helpers/filter-data';


@Component({
  tag: 'compare-header',
  styleUrl: 'compare-header.css',
  shadow: true
})
export class CompareHeader {

  @Prop() appSrcUrl: string;
  @Prop() repo: Repo = null;
  @Prop() diffs: ScreenshotDiff[];
  @Prop() filter: FilterData;

  logoClick(ev: UIEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    document.querySelector('.scroll-y').scrollTop = 0;
  }

  render() {
    return [
      (this.repo ? (
        <nav class="breadcrumbs">
          <a href={this.repo.orgUrl}>{this.repo.orgUrl}</a>
          <a href={this.repo.repoUrl}>{this.repo.repoName}</a>
          <a href={this.repo.commitsUrl}>commits</a>
        </nav>
      ): null),

      <header>
        <div class="logo">
          <a href="#" onClick={this.logoClick.bind(this)}>
            <img src={this.appSrcUrl + '/assets/logo.png'}/>
          </a>
        </div>
        <compare-filter
          diffs={this.diffs}
          filter={this.filter}/>
      </header>
    ];
  }
}