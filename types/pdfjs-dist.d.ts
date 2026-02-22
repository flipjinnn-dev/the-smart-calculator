declare module 'pdfjs-dist' {
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
  }

  export interface PDFPageProxy {
    getTextContent(): Promise<TextContent>;
    getViewport(params: { scale: number }): PageViewport;
  }

  export interface TextContent {
    items: TextItem[];
  }

  export interface TextItem {
    str: string;
    transform?: number[];
    width?: number;
    height?: number;
  }

  export interface PageViewport {
    width: number;
    height: number;
  }

  export interface PDFDocumentLoadingTask {
    promise: Promise<PDFDocumentProxy>;
  }

  export const GlobalWorkerOptions: {
    workerSrc: string;
  };

  export const version: string;

  export function getDocument(params: {
    data?: ArrayBuffer;
    url?: string;
    verbosity?: number;
  }): PDFDocumentLoadingTask;
}

declare module 'pdfjs-dist/webpack' {
  export * from 'pdfjs-dist';
}
