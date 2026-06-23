export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  pageIndex: number;
  color: string;
  width: number;
  points: Point[];
}
