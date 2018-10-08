/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@stencil/router';
import '@stencil/state-tunnel';
import {
  Repo,
  ScreenshotDiff,
} from './helpers/declarations';
import {
  FilterData,
} from './helpers/filter-data';
import {
  EventEmitter,
} from '@stencil/core';
import {
  ScreenshotBuild,
} from '@stencil/core/dist/screenshot';
import {
  ScreenshotBuild as ScreenshotBuild2,
} from '@stencil/core/screenshot';
import {
  MatchResults,
} from '@stencil/router';


export namespace Components {

  interface AppRoot {}
  interface AppRootAttributes extends StencilHTMLAttributes {}

  interface CompareAnalysis {
    'diff': ScreenshotDiff;
    'mismatchedPixels': number;
  }
  interface CompareAnalysisAttributes extends StencilHTMLAttributes {
    'diff'?: ScreenshotDiff;
    'mismatchedPixels'?: number;
  }

  interface CompareFilter {
    'diffs': ScreenshotDiff[];
    'filter': FilterData;
  }
  interface CompareFilterAttributes extends StencilHTMLAttributes {
    'diffs'?: ScreenshotDiff[];
    'filter'?: FilterData;
    'onFilterChange'?: (event: CustomEvent<FilterData>) => void;
  }

  interface CompareHeader {
    'appSrcUrl': string;
    'diffs': ScreenshotDiff[];
    'filter': FilterData;
    'repo': Repo;
  }
  interface CompareHeaderAttributes extends StencilHTMLAttributes {
    'appSrcUrl'?: string;
    'diffs'?: ScreenshotDiff[];
    'filter'?: FilterData;
    'repo'?: Repo;
  }

  interface CompareRow {
    'diff': ScreenshotDiff;
    'imagesUrl': string;
    'jsonpUrl': string;
    'show': boolean;
  }
  interface CompareRowAttributes extends StencilHTMLAttributes {
    'diff'?: ScreenshotDiff;
    'imagesUrl'?: string;
    'jsonpUrl'?: string;
    'onCompareLoaded'?: (event: CustomEvent<ScreenshotDiff>) => void;
    'show'?: boolean;
  }

  interface CompareThead {
    'a': ScreenshotBuild;
    'b': ScreenshotBuild;
  }
  interface CompareTheadAttributes extends StencilHTMLAttributes {
    'a'?: ScreenshotBuild;
    'b'?: ScreenshotBuild;
  }

  interface ScreenshotCompare {
    'a': ScreenshotBuild;
    'appSrcUrl': string;
    'b': ScreenshotBuild;
    'buildsUrl': string;
    'imagesUrl': string;
    'jsonpUrl': string;
    'match': MatchResults;
  }
  interface ScreenshotCompareAttributes extends StencilHTMLAttributes {
    'a'?: ScreenshotBuild;
    'appSrcUrl'?: string;
    'b'?: ScreenshotBuild;
    'buildsUrl'?: string;
    'imagesUrl'?: string;
    'jsonpUrl'?: string;
    'match'?: MatchResults;
  }

  interface ScreenshotLookup {}
  interface ScreenshotLookupAttributes extends StencilHTMLAttributes {}
}

declare global {
  interface StencilElementInterfaces {
    'AppRoot': Components.AppRoot;
    'CompareAnalysis': Components.CompareAnalysis;
    'CompareFilter': Components.CompareFilter;
    'CompareHeader': Components.CompareHeader;
    'CompareRow': Components.CompareRow;
    'CompareThead': Components.CompareThead;
    'ScreenshotCompare': Components.ScreenshotCompare;
    'ScreenshotLookup': Components.ScreenshotLookup;
  }

  interface StencilIntrinsicElements {
    'app-root': Components.AppRootAttributes;
    'compare-analysis': Components.CompareAnalysisAttributes;
    'compare-filter': Components.CompareFilterAttributes;
    'compare-header': Components.CompareHeaderAttributes;
    'compare-row': Components.CompareRowAttributes;
    'compare-thead': Components.CompareTheadAttributes;
    'screenshot-compare': Components.ScreenshotCompareAttributes;
    'screenshot-lookup': Components.ScreenshotLookupAttributes;
  }


  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLCompareAnalysisElement extends Components.CompareAnalysis, HTMLStencilElement {}
  var HTMLCompareAnalysisElement: {
    prototype: HTMLCompareAnalysisElement;
    new (): HTMLCompareAnalysisElement;
  };

  interface HTMLCompareFilterElement extends Components.CompareFilter, HTMLStencilElement {}
  var HTMLCompareFilterElement: {
    prototype: HTMLCompareFilterElement;
    new (): HTMLCompareFilterElement;
  };

  interface HTMLCompareHeaderElement extends Components.CompareHeader, HTMLStencilElement {}
  var HTMLCompareHeaderElement: {
    prototype: HTMLCompareHeaderElement;
    new (): HTMLCompareHeaderElement;
  };

  interface HTMLCompareRowElement extends Components.CompareRow, HTMLStencilElement {}
  var HTMLCompareRowElement: {
    prototype: HTMLCompareRowElement;
    new (): HTMLCompareRowElement;
  };

  interface HTMLCompareTheadElement extends Components.CompareThead, HTMLStencilElement {}
  var HTMLCompareTheadElement: {
    prototype: HTMLCompareTheadElement;
    new (): HTMLCompareTheadElement;
  };

  interface HTMLScreenshotCompareElement extends Components.ScreenshotCompare, HTMLStencilElement {}
  var HTMLScreenshotCompareElement: {
    prototype: HTMLScreenshotCompareElement;
    new (): HTMLScreenshotCompareElement;
  };

  interface HTMLScreenshotLookupElement extends Components.ScreenshotLookup, HTMLStencilElement {}
  var HTMLScreenshotLookupElement: {
    prototype: HTMLScreenshotLookupElement;
    new (): HTMLScreenshotLookupElement;
  };

  interface HTMLElementTagNameMap {
    'app-root': HTMLAppRootElement
    'compare-analysis': HTMLCompareAnalysisElement
    'compare-filter': HTMLCompareFilterElement
    'compare-header': HTMLCompareHeaderElement
    'compare-row': HTMLCompareRowElement
    'compare-thead': HTMLCompareTheadElement
    'screenshot-compare': HTMLScreenshotCompareElement
    'screenshot-lookup': HTMLScreenshotLookupElement
  }

  interface ElementTagNameMap {
    'app-root': HTMLAppRootElement;
    'compare-analysis': HTMLCompareAnalysisElement;
    'compare-filter': HTMLCompareFilterElement;
    'compare-header': HTMLCompareHeaderElement;
    'compare-row': HTMLCompareRowElement;
    'compare-thead': HTMLCompareTheadElement;
    'screenshot-compare': HTMLScreenshotCompareElement;
    'screenshot-lookup': HTMLScreenshotLookupElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
