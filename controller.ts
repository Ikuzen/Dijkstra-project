import { calcDistance, getMousePosition, calculateShortestPath } from "./util.js";
export class Controller {
    cityNames = ['paris', 'lyon', 'marseille', 'dijon', 'strasbourg', 'lille', 'rennes', 'toulouse',]
    paris: City;
    lyon: City;
    marseille: City;
    dijon: City;
    strasbourg: City;
    lille: City;
    rennes: City;
    bordeaux: City;
    toulouse: City;
    links: Link[];
    cities: City[];
    firstCitySelected: City;
    cityObject = {}
    element: HTMLObjectElement
    reset = false;
    canvas = document.getElementById("canvas");
    ctx = this.canvas?.getContext("2d");

    start() {
        window.addEventListener('load', () => {
            this.element = document.getElementById('svg').contentDocument;
            this.element.addEventListener('click', getMousePosition)
            this.paris = this.setCityAttributes(this.element, 'paris',['rennes','dijon','lille','strasbourg']);
            this.lyon = this.setCityAttributes(this.element, 'lyon',['marseille','toulouse','bordeaux','dijon']);
            this.marseille = this.setCityAttributes(this.element, 'marseille',['toulouse','lyon']);
            this.dijon = this.setCityAttributes(this.element, 'dijon',['rennes','paris','bordeaux','strasbourg','lyon']);
            this.strasbourg = this.setCityAttributes(this.element, 'strasbourg',['lille','paris','dijon']);
            this.lille = this.setCityAttributes(this.element, 'lille',['rennes','paris','strasbourg']);
            this.rennes = this.setCityAttributes(this.element, 'rennes',['bordeaux','dijon','paris','lille']);
            this.bordeaux = this.setCityAttributes(this.element, 'bordeaux',['lyon','toulouse','dijon','rennes'])
            this.toulouse = this.setCityAttributes(this.element, 'toulouse',['bordeaux','lyon','marseille'])
            this.cities = [this.paris, this.lyon, this.marseille, this.dijon, this.strasbourg, this.lille, this.rennes, this.bordeaux, this.toulouse]
            this.links = [];
            this.cityObject = {
                'paris':this.paris,
                'lyon':this.lyon,
                'marseille':this.marseille,
                'dijon':this.dijon,
                'strasbourg':this.strasbourg,
                'lille':this.lille,
                'rennes':this.rennes,
                'toulouse':this.toulouse
            }
            this.calculateAllLinks();
            console.log(this.links)
            //attaching cities with event
            this.element?.addEventListener('click', (event: any) => {
                this.handleCity(event);
            })
        });
    }

    // function calculateAllLinks(): void {
    //     for (let i = 0; i < cities.length; i++) {
    //         for (let j = i + 1; j < cities.length; j++) {
    //             links.push({
    //                 cities: [cities[i].name, cities[j].name],
    //                 distance: calcDistance(
    //                     cities[i].x,
    //                     cities[i].y,
    //                     cities[j].x,
    //                     cities[j].y)
    //             });
    //         }
    //     }
    // }
    createGraph() { }

    generateAdjacencyMatrix(graph: Graph) {

    }

    calculateAllLinks(): void {
        for (let i = 0; i < this.cities.length; i++) {
            for (let j = i + 1; j < this.cities.length; j++) {
                this.links.push({
                    cities: [this.cities[i].name, this.cities[j].name],
                    distance: calcDistance(
                        this.cities[i].x,
                        this.cities[i].y,
                        this.cities[j].x,
                        this.cities[j].y)
                });
            }
        }
    }

    handleCity(event: any): void {
        for (let city of this.cities) {
            if (city.name === event.target.id) {
                this.selectCity(city);
                break
            }
        }
    }

    selectCity(city: City): void {
        //case reset, or clicking on the same city twice
        if (city === this.firstCitySelected || city.isHighlighted || this.reset) {
            this.unHighlightAll();
            this.ctx.clearRect(0, 0, 1000, 1000);
            this.firstCitySelected = null;
            if (this.reset != true) {
                return;
            }
            this.reset = false;
        }
        // case clicking on a city first time
        if (!this.firstCitySelected) {
            this.firstCitySelected = city;
            this.highlight(this.element?.getElementById(city.name));
            city.isHighlighted = true
            console.log("selecting first city")
        }

        // case clicking on a 2nd city
        else if (this.firstCitySelected) {
            this.highlight(this.element?.getElementById(city.name));
            console.log(this.firstCitySelected, city);
            console.log(calculateShortestPath(this.firstCitySelected, city));
            this.drawLine(this.firstCitySelected, city);
            city.isHighlighted = true;
            this.reset = true;
        }

    }
    findShortestPath(city1: City, city2: City):number {
        let distanceArray = [];
        let secondCity = city2;
        for (let city in city1.adjacentCities){
            let distance = 0;
            const crossedCities = [];
            while(city != secondCity.name){
                distance += calcDistance(this.cityObject[city].x, this.cityObject[city].y, city2.x, city2.y)
                crossedCities.push(secondCity.name)
                
            }
        }
    }

    setCityAttributes(element: HTMLObjectElement, cityName: string, adjacentCityNames:string[]): City {
        let returnedCity: City;
        let _element = element?.getElementById(cityName);
        _element.style.cursor = "pointer";
        _element.style.fontSize = "20px";
        returnedCity = { name: cityName, x: parseFloat(_element?.getAttribute('x')), y: parseFloat(_element?.getAttribute('y')), isHighlighted: false, adjacentCities:adjacentCityNames };
        return returnedCity;
    }

    highlight(element: HTMLElement): void {
        element.style.fill = "red";
        element.style.fontSize = "30px";
    }

    unHighlight(element: HTMLElement): void {
        element.style.fill = "black";
        element.style.fontSize = "20px";
    }

    unHighlightAll(): void {
        this.cities.map((city) => {
            this.unHighlight(this.element.getElementById(city.name))
            city.isHighlighted = false;
        });
    }

    drawLine(city1: City, city2: City) {
        this.ctx.beginPath();
        this.ctx.moveTo(city1.x, city1.y);
        this.ctx.lineTo(city2.x, city2.y);
        this.ctx.stroke();
    }
}
