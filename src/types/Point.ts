export interface Point {
  id: number;
  label: string;
  date: {
    minDate: number;
    maxDate: number;
  },
  events: {
    date: string;
    description: string;
  }[]
}

export interface PointWithRef extends Point {
  ref: React.RefObject<SVGGElement>;
}