export const Categories_WCA:Categorie[] = [
  {
    "id": "333",
    "format": "time",
    "name": "3x3x3 Cube",
    "rank": "10",
    "cellName": "3x3x3 Cube",
    "state": 1
  },
  {
    "id": "222",
    "format": "time",
    "name": "2x2x2 Cube",
    "rank": "20",
    "cellName": "2x2x2 Cube",
    "state": 1
  },
  {
    "id": "444",
    "format": "time",
    "name": "4x4x4 Cube",
    "rank": "30",
    "cellName": "4x4x4 Cube",
    "state": 1
  },
  {
    "id": "555",
    "format": "time",
    "name": "5x5x5 Cube",
    "rank": "40",
    "cellName": "5x5x5 Cube",
    "state": 1
  },
  {
    "id": "666",
    "format": "time",
    "name": "6x6x6 Cube",
    "rank": "50",
    "cellName": "6x6x6 Cube",
    "state": 1
  },
  {
    "id": "777",
    "format": "time",
    "name": "7x7x7 Cube",
    "rank": "60",
    "cellName": "7x7x7 Cube",
    "state": 1
  },
  {
    "id": "333bf",
    "format": "time",
    "name": "3x3x3 Blindfolded",
    "rank": "70",
    "cellName": "3x3x3 Blindfolded",
    "state": 1
  },
  {
    "id": "333fm",
    "format": "number",
    "name": "3x3x3 Fewest Moves",
    "rank": "80",
    "cellName": "3x3x3 Fewest Moves",
    "state": 1
  },
  {
    "id": "333oh",
    "format": "time",
    "name": "3x3x3 One-Handed",
    "rank": "90",
    "cellName": "3x3x3 One-Handed",
    "state": 1
  },
  {
    "id": "clock",
    "format": "time",
    "name": "Clock",
    "rank": "110",
    "cellName": "Clock",
    "state": 1
  },
  {
    "id": "minx",
    "format": "time",
    "name": "Megaminx",
    "rank": "120",
    "cellName": "Megaminx",
    "state": 1
  },
{
    "id": "pyram",
    "format": "time",
    "name": "Pyraminx",
    "rank": "130",
    "cellName": "Pyraminx",
    "state": 1
  },
  {
    "id": "skewb",
    "format": "time",
    "name": "Skewb",
    "rank": "140",
    "cellName": "Skewb",
    "state": 1
  },
  {
    "id": "sq1",
    "format": "time",
    "name": "Square-1",
    "rank": "150",
    "cellName": "Square-1",
    "state": 1
  },
  {
    "id": "444bf",
    "format": "time",
    "name": "4x4x4 Blindfolded",
    "rank": "160",
    "cellName": "4x4x4 Blindfolded",
    "state": 1
  },
  {
    "id": "555bf",
    "format": "time",
    "name": "5x5x5 Blindfolded",
    "rank": "170",
    "cellName": "5x5x5 Blindfolded",
    "state": 1
  },
  {
    "id": "333mbf",
    "format": "multi",
    "name": "3x3x3 Multi-Blind",
    "rank": "180",
    "cellName": "3x3x3 Multi-Blind",
    "state": 1
  },
  {
    "id": "333ft",
    "format": "time",
    "name": "3x3x3 With Feet",
    "rank": "996",
    "cellName": "3x3x3 With Feet",
    "state": 0
  },
  {
    "id": "333mbo",
    "format": "multi",
    "name": "3x3x3 Multi-Blind Old Style",
    "rank": "999",
    "cellName": "3x3x3 Multi-Blind Old Style",
    "state": 0
  },
  {
    "id": "magic",
    "format": "time",
    "name": "Magic",
    "rank": "997",
    "cellName": "Magic",
    "state": 0
  },
  
  {
    "id": "mmagic",
    "format": "time",
    "name": "Master Magic",
    "rank": "998",
    "cellName": "Master Magic",
    "state": 0
  },
  
]

export interface Categorie{
  id: string;
  format: string;
  name: string;
  rank: string;
  cellName: string;
  state: 0 | 1 | 2;
}

/*
  0: Ya no es una categoria oficial de la wca
  1: Sigue vigente
  2: Para esas categorias no oficiales (una idea futura)
*/