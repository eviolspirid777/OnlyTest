import { createRef } from "react";
import { PointWithRef } from "../types/Point";

export const mockPoints: PointWithRef[] = [
  {
    id: 1,
    label: "Кино",
    ref: createRef<SVGGElement>(),
    date: {
      minDate: 1987,
      maxDate: 1991
    },
    events: [
      {
        date: "1987",
        description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
      },
      {
        date: "1988",
        description: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11"
      },
      {
        date: "1991",
        description: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi"
      },
      {
        date: "1987",
        description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
      },
      {
        date: "1988",
        description: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11"
      },
      {
        date: "1991",
        description: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi"
      }
    ]
  },
  {
    id: 2,
    label: "Литература",
    ref: createRef<SVGGElement>(),
    date: {
      minDate: 1987,
      maxDate: 1991
    },
    events: [
      {
        date: "1987",
        description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
      },
      {
        date: "1988",
        description: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11"
      },
      {
        date: "1991",
        description: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi"
      }
    ]
  },
  {
    id: 3,
    label: "Театр",
    ref: createRef<SVGGElement>(),
    date: {
      minDate: 1987,
      maxDate: 1991
    },
    events: [
      {
        date: "1987",
        description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
      }
    ]
  },
  {
    id: 4,
    label: "Музыка",
    ref: createRef<SVGGElement>(),
    date: {
      minDate: 1987,
      maxDate: 1991
    },
    events: [
      {
        date: "1987",
        description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
      }
    ]
  },
  {
    id: 5,
    label: "Наука",
    ref: createRef<SVGGElement>(),
    date: {
      minDate: 1987,
      maxDate: 1991
    },
    events: [
      {
        date: "1987",
        description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
      }
    ]
  },
  {
    id: 6,
    label: "Искусство",
    ref: createRef<SVGGElement>(),
    date: {
      minDate: 1987,
      maxDate: 1991
    },
    events: [
      {
        date: "1987",
        description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
      }
    ]
  }
];