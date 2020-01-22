interface Link {
    cities: [string, string];
    distance?: number
}

interface City {
    name: string; // must be unique
    x: number;
    y: number;
    isHighlighted?:boolean;
}
