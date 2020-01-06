interface Link {
    city1: string;
    city2: string;
    distance?: number
  }

interface AdjacentCity {
    city: City;
    coordinates: Coordinates;
}

interface Coordinates {
    x: number;
    y: number;
}

class City {
    adjacentCities: AdjacentCity[];

    constructor(public readonly name: string, public readonly coordinates:Coordinates) { }

    setAdjacentCities(cities: City[], coordinates:Coordinates[]): void {
        this.adjacentCities = cities.map((city, index) => ({
            city,
            coordinates: coordinates[index]
        }));
    }
}

