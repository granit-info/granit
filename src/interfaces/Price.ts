export interface PriceItem {
  code: string;
  description: string;
  price: number;
}

export interface PriseFacet {
  zero: number | undefined;
  first: number | undefined;
  second: number | undefined;
  third: number | undefined;
}

export interface PrisePoem {
  first: number | undefined;
  second: number | undefined;
}

export interface PriseBackside {
  prise: number | undefined;
  photoKoef: number | undefined;
}

export interface PriseKopir {
  prise: number | undefined;
  polishedKoef: number | undefined;
}

export interface PriseCutout {
  flower: number | undefined;
  other: number | undefined;
}

export interface PriseFioFormat {
  size: string | undefined;
  prise: number | undefined;
}

export interface PriseCross {
  size: string | undefined;
  prise: number | undefined;
}

export interface PrisePhotoglassFormat {
  size: string | undefined;
  prise: number | undefined;
}

export interface PrisePhotokeramFormat {
  size: string | undefined;
  prise: number | undefined;
}

export interface PriseArtwork {
  portrait: number | undefined;
  fio: number | undefined;
  poem: number | undefined;
  fioGold: number | undefined;
  poemGold: number | undefined;
}
