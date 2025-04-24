export interface Point {
  id: number;
  label: string;
  category: string;
}

export interface PointWithRef extends Point {
  ref: React.RefObject<SVGGElement>;
}