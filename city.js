class City {
    constructor(name, coordinates) {
        this.name = name;
        this.coordinates = coordinates;
    }
    setAdjacentCities(cities, coordinates) {
        this.adjacentCities = cities.map((city, index) => ({
            city,
            coordinates: coordinates[index]
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0JBLE1BQU0sSUFBSTtJQUdOLFlBQTRCLElBQVksRUFBa0IsV0FBdUI7UUFBckQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFrQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFJLENBQUM7SUFFdEYsaUJBQWlCLENBQUMsTUFBYyxFQUFFLFdBQXlCO1FBQ3ZELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0MsSUFBSTtZQUNKLFdBQVcsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztDQUNKIn0=