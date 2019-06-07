import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { FilterData } from '../../helpers/filter-data';
import { ScreenshotDiff } from '../../helpers/declarations';


@Component({
  tag: 'compare-filter',
  styleUrl: 'compare-filter.css',
  shadow: true
})
export class CompareFilter {

  @Prop() diffs: ScreenshotDiff[];
  @Prop() filter: FilterData;
  @Event() filterChange: EventEmitter<FilterData>;

  render() {
    if (!this.diffs || this.diffs.length === 0 || !this.filter) {
      return;
    }

    const devices = this.diffs.reduce((devices, diff) => {
      if (!devices.some(d => d.value === diff.device)) {
        devices.push({ text: diff.device, value: diff.device })
      }
      return devices;
    }, [{ text: 'All Devices', value: '' }] as Device[]);

    return (
      <section>

        <div class="showing">
          Showing {this.diffs.filter(d => d.show).length}
        </div>

        <div class="search">
          <input
            type="search"
            onInput={(ev) => {
              this.filterChange.emit({
                search: (ev.target as HTMLInputElement).value
              })
            }}
            value={this.filter.search || ''}
          />
        </div>

        {devices.length > 1 ? (
          <div class="device">
            <select
              onInput={(ev) => {
                this.filterChange.emit({
                  device: (ev.target as HTMLSelectElement).value
                })
              }}>
              {devices.map(device => (
                <option
                  key={device.value}
                  selected={device.value === this.filter.device}
                  value={device.value}>
                  {device.text}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div class="mismatch">
          <select
            onInput={(ev) => {
              this.filterChange.emit({
                mismatch: (ev.target as HTMLSelectElement).value as any
              })
            }}>
            <option value="" selected={this.filter.mismatch === ''}>
              &gt; 0
            </option>
            <option value="100" selected={this.filter.mismatch === '100'}>
              &gt; 100
            </option>
            <option value="250" selected={this.filter.mismatch === '250'}>
              &gt; 250
            </option>
            <option value="500" selected={this.filter.mismatch === '500'}>
              &gt; 500
            </option>
            <option value="1000" selected={this.filter.mismatch === '1000'}>
              &gt; 1,000
            </option>
            <option value="2500" selected={this.filter.mismatch === '2500'}>
              &gt; 2,500
            </option>
            <option value="5000" selected={this.filter.mismatch === '5000'}>
              &gt; 5,000
            </option>
            <option value="10000" selected={this.filter.mismatch === '10000'}>
              &gt; 10,000
            </option>
            <option value="25000" selected={this.filter.mismatch === '25000'}>
              &gt; 25,000
            </option>
            <option value="50000" selected={this.filter.mismatch === '50000'}>
              &gt; 50,000
            </option>
            <option value="all" selected={this.filter.mismatch === 'all'}>
              All Screenshots
            </option>
          </select>
        </div>

      </section>
    );
  }
}

interface Device {
  text: string;
  value: string;
}
