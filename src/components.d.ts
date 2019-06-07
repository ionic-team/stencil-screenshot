/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  ScreenshotDiff,
} from './helpers/declarations';
import {
  FilterData,
} from './helpers/filter-data';
import {
  ScreenshotBuild,
} from '@stencil/core/dist/screenshot';
import {
  MatchResults,
} from '@stencil/router';
import {
  ScreenshotBuild as ScreenshotBuild1,
} from '@stencil/core/screenshot';

export namespace Components {
  interface AppRoot {}
  interface CompareAnalysis {
    'aId': string;
    'bId': string;
    'diff': ScreenshotDiff;
    'mismatchedPixels': number;
  }
  interface CompareFilter {
    'diffs': ScreenshotDiff[];
    'filter': FilterData;
  }
  interface CompareHeader {
    'appSrcUrl': string;
    'diffs': ScreenshotDiff[];
    'filter': FilterData;
  }
  interface CompareRow {
    'aId': string;
    'bId': string;
    'diff': ScreenshotDiff;
    'imagesUrl': string;
    'jsonpUrl': string;
    'show': boolean;
  }
  interface CompareThead {
    'a': ScreenshotBuild;
    'b': ScreenshotBuild;
    'diffs': ScreenshotDiff[];
  }
  interface ScreenshotCompare {
    'a': ScreenshotBuild;
    'appSrcUrl': string;
    'b': ScreenshotBuild;
    'buildsUrl': string;
    'comparesUrl': string;
    'imagesUrl': string;
    'jsonpUrl': string;
    'match': MatchResults;
  }
  interface ScreenshotLookup {}
  interface ScreenshotPreview {
    'appSrcUrl': string;
    'buildsUrl': string;
    'imagesUrl': string;
    'match': MatchResults;
  }
}

declare global {


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

  interface HTMLScreenshotPreviewElement extends Components.ScreenshotPreview, HTMLStencilElement {}
  var HTMLScreenshotPreviewElement: {
    prototype: HTMLScreenshotPreviewElement;
    new (): HTMLScreenshotPreviewElement;
  };
  interface HTMLElementTagNameMap {
    'app-root': HTMLAppRootElement;
    'compare-analysis': HTMLCompareAnalysisElement;
    'compare-filter': HTMLCompareFilterElement;
    'compare-header': HTMLCompareHeaderElement;
    'compare-row': HTMLCompareRowElement;
    'compare-thead': HTMLCompareTheadElement;
    'screenshot-compare': HTMLScreenshotCompareElement;
    'screenshot-lookup': HTMLScreenshotLookupElement;
    'screenshot-preview': HTMLScreenshotPreviewElement;
  }
}

declare namespace LocalJSX {
  interface AppRoot extends JSXBase.HTMLAttributes<HTMLAppRootElement> {}
  interface CompareAnalysis extends JSXBase.HTMLAttributes<HTMLCompareAnalysisElement> {
    'aId'?: string;
    'bId'?: string;
    'diff'?: ScreenshotDiff;
    'mismatchedPixels'?: number;
    'onDiffNavChange'?: (event: CustomEvent<string>) => void;
  }
  interface CompareFilter extends JSXBase.HTMLAttributes<HTMLCompareFilterElement> {
    'diffs'?: ScreenshotDiff[];
    'filter'?: FilterData;
    'onFilterChange'?: (event: CustomEvent<FilterData>) => void;
  }
  interface CompareHeader extends JSXBase.HTMLAttributes<HTMLCompareHeaderElement> {
    'appSrcUrl'?: string;
    'diffs'?: ScreenshotDiff[];
    'filter'?: FilterData;
  }
  interface CompareRow extends JSXBase.HTMLAttributes<HTMLCompareRowElement> {
    'aId'?: string;
    'bId'?: string;
    'diff'?: ScreenshotDiff;
    'imagesUrl'?: string;
    'jsonpUrl'?: string;
    'onCompareLoaded'?: (event: CustomEvent<ScreenshotDiff>) => void;
    'show'?: boolean;
  }
  interface CompareThead extends JSXBase.HTMLAttributes<HTMLCompareTheadElement> {
    'a'?: ScreenshotBuild;
    'b'?: ScreenshotBuild;
    'diffs'?: ScreenshotDiff[];
  }
  interface ScreenshotCompare extends JSXBase.HTMLAttributes<HTMLScreenshotCompareElement> {
    'a'?: ScreenshotBuild;
    'appSrcUrl'?: string;
    'b'?: ScreenshotBuild;
    'buildsUrl'?: string;
    'comparesUrl'?: string;
    'imagesUrl'?: string;
    'jsonpUrl'?: string;
    'match'?: MatchResults;
  }
  interface ScreenshotLookup extends JSXBase.HTMLAttributes<HTMLScreenshotLookupElement> {}
  interface ScreenshotPreview extends JSXBase.HTMLAttributes<HTMLScreenshotPreviewElement> {
    'appSrcUrl'?: string;
    'buildsUrl'?: string;
    'imagesUrl'?: string;
    'match'?: MatchResults;
  }

  interface IntrinsicElements {
    'app-root': AppRoot;
    'compare-analysis': CompareAnalysis;
    'compare-filter': CompareFilter;
    'compare-header': CompareHeader;
    'compare-row': CompareRow;
    'compare-thead': CompareThead;
    'screenshot-compare': ScreenshotCompare;
    'screenshot-lookup': ScreenshotLookup;
    'screenshot-preview': ScreenshotPreview;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


