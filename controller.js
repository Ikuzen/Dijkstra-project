import { calcDistance, getMousePosition, calculateShortestPath } from "./util.js";
export class Controller {
    constructor() {
        var _a;
        this.cityNames = ['paris', 'lyon', 'marseille', 'dijon', 'strasbourg', 'lille', 'rennes', 'toulouse',];
        this.cityObject = {};
        this.reset = false;
        this.canvas = document.getElementById("canvas");
        this.ctx = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.getContext("2d");
    }
    start() {
        window.addEventListener('load', () => {
            var _a;
            this.element = document.getElementById('svg').contentDocument;
            this.element.addEventListener('click', getMousePosition);
            this.paris = this.setCityAttributes(this.element, 'paris', ['rennes', 'dijon', 'lille', 'strasbourg']);
            this.lyon = this.setCityAttributes(this.element, 'lyon', ['marseille', 'toulouse', 'bordeaux', 'dijon']);
            this.marseille = this.setCityAttributes(this.element, 'marseille', ['toulouse', 'lyon']);
            this.dijon = this.setCityAttributes(this.element, 'dijon', ['rennes', 'paris', 'bordeaux', 'strasbourg', 'lyon']);
            this.strasbourg = this.setCityAttributes(this.element, 'strasbourg', ['lille', 'paris', 'dijon']);
            this.lille = this.setCityAttributes(this.element, 'lille', ['rennes', 'paris', 'strasbourg']);
            this.rennes = this.setCityAttributes(this.element, 'rennes', ['bordeaux', 'dijon', 'paris', 'lille']);
            this.bordeaux = this.setCityAttributes(this.element, 'bordeaux', ['lyon', 'toulouse', 'dijon', 'rennes']);
            this.toulouse = this.setCityAttributes(this.element, 'toulouse', ['bordeaux', 'lyon', 'marseille']);
            this.cities = [this.paris, this.lyon, this.marseille, this.dijon, this.strasbourg, this.lille, this.rennes, this.bordeaux, this.toulouse];
            this.links = [];
            this.cityObject = {
                'paris': this.paris,
                'lyon': this.lyon,
                'marseille': this.marseille,
                'dijon': this.dijon,
                'strasbourg': this.strasbourg,
                'lille': this.lille,
                'rennes': this.rennes,
                'toulouse': this.toulouse
            };
            this.calculateAllLinks();
            console.log(this.links);
            //attaching cities with event
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => {
                this.handleCity(event);
            });
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
    generateAdjacencyMatrix(graph) {
    }
    calculateAllLinks() {
        for (let i = 0; i < this.cities.length; i++) {
            for (let j = i + 1; j < this.cities.length; j++) {
                this.links.push({
                    cities: [this.cities[i].name, this.cities[j].name],
                    distance: calcDistance(this.cities[i].x, this.cities[i].y, this.cities[j].x, this.cities[j].y)
                });
            }
        }
    }
    handleCity(event) {
        for (let city of this.cities) {
            if (city.name === event.target.id) {
                this.selectCity(city);
                break;
            }
        }
    }
    selectCity(city) {
        var _a, _b;
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
            this.highlight((_a = this.element) === null || _a === void 0 ? void 0 : _a.getElementById(city.name));
            city.isHighlighted = true;
            console.log("selecting first city");
        }
        // case clicking on a 2nd city
        else if (this.firstCitySelected) {
            this.highlight((_b = this.element) === null || _b === void 0 ? void 0 : _b.getElementById(city.name));
            console.log(this.firstCitySelected, city);
            console.log(calculateShortestPath(this.firstCitySelected, city));
            this.drawLine(this.firstCitySelected, city);
            city.isHighlighted = true;
            this.reset = true;
        }
    }
    findShortestPath(city1, city2) {
        let distanceArray = [];
        let secondCity = city2;
        for (let city in city1.adjacentCities) {
            let distance = 0;
            const crossedCities = [];
            while (city != secondCity.name) {
                distance += calcDistance(this.cityObject[city].x, this.cityObject[city].y, city2.x, city2.y);
                crossedCities.push(secondCity.name);
            }
        }
    }
    setCityAttributes(element, cityName, adjacentCityNames) {
        var _a, _b, _c;
        let returnedCity;
        let _element = (_a = element) === null || _a === void 0 ? void 0 : _a.getElementById(cityName);
        _element.style.cursor = "pointer";
        _element.style.fontSize = "20px";
        returnedCity = { name: cityName, x: parseFloat((_b = _element) === null || _b === void 0 ? void 0 : _b.getAttribute('x')), y: parseFloat((_c = _element) === null || _c === void 0 ? void 0 : _c.getAttribute('y')), isHighlighted: false, adjacentCities: adjacentCityNames };
        return returnedCity;
    }
    highlight(element) {
        element.style.fill = "red";
        element.style.fontSize = "30px";
    }
    unHighlight(element) {
        element.style.fill = "black";
        element.style.fontSize = "20px";
    }
    unHighlightAll() {
        this.cities.map((city) => {
            this.unHighlight(this.element.getElementById(city.name));
            city.isHighlighted = false;
        });
    }
    drawLine(city1, city2) {
        this.ctx.beginPath();
        this.ctx.moveTo(city1.x, city1.y);
        this.ctx.lineTo(city2.x, city2.y);
        this.ctx.stroke();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNsRixNQUFNLE9BQU8sVUFBVTtJQUF2Qjs7UUFDSSxjQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUE7UUFhakcsZUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUVmLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxXQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxRQUFHLFNBQUcsSUFBSSxDQUFDLE1BQU0sMENBQUUsVUFBVSxDQUFDLElBQUksRUFBRTtJQTRKeEMsQ0FBQztJQTFKRyxLQUFLO1FBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7O1lBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxlQUFlLENBQUM7WUFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtZQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbkcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsQ0FBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3JHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFDLENBQUMsVUFBVSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM3RyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBQyxDQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMvRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUMzRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxDQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1lBQ3JHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO1lBQ2hHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3pJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUc7Z0JBQ2QsT0FBTyxFQUFDLElBQUksQ0FBQyxLQUFLO2dCQUNsQixNQUFNLEVBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQ2hCLFdBQVcsRUFBQyxJQUFJLENBQUMsU0FBUztnQkFDMUIsT0FBTyxFQUFDLElBQUksQ0FBQyxLQUFLO2dCQUNsQixZQUFZLEVBQUMsSUFBSSxDQUFDLFVBQVU7Z0JBQzVCLE9BQU8sRUFBQyxJQUFJLENBQUMsS0FBSztnQkFDbEIsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNO2dCQUNwQixVQUFVLEVBQUMsSUFBSSxDQUFDLFFBQVE7YUFDM0IsQ0FBQTtZQUNELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3ZCLDZCQUE2QjtZQUM3QixNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO2dCQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLENBQUMsRUFBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHVDQUF1QztJQUN2QyxnREFBZ0Q7SUFDaEQsd0RBQXdEO0lBQ3hELDJCQUEyQjtJQUMzQiw0REFBNEQ7SUFDNUQsMENBQTBDO0lBQzFDLG1DQUFtQztJQUNuQyxtQ0FBbUM7SUFDbkMsbUNBQW1DO0lBQ25DLG1DQUFtQztJQUNuQyxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFFBQVE7SUFDUixJQUFJO0lBQ0osV0FBVyxLQUFLLENBQUM7SUFFakIsdUJBQXVCLENBQUMsS0FBWTtJQUVwQyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNaLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNsRCxRQUFRLEVBQUUsWUFBWSxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEIsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNqQixLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO2dCQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixNQUFLO2FBQ1I7U0FDSjtJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBVTs7UUFDakIsZ0RBQWdEO1FBQ2hELElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDcEIsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDdEI7UUFDRCxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLE9BQUMsSUFBSSxDQUFDLE9BQU8sMENBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQTtZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUE7U0FDdEM7UUFFRCw4QkFBOEI7YUFDekIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsT0FBQyxJQUFJLENBQUMsT0FBTywwQ0FBRSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDckI7SUFFTCxDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsS0FBVyxFQUFFLEtBQVc7UUFDckMsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN2QixLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUM7WUFDbEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN6QixPQUFNLElBQUksSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFDO2dCQUMxQixRQUFRLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUM1RixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUV0QztTQUNKO0lBQ0wsQ0FBQztJQUVELGlCQUFpQixDQUFDLE9BQTBCLEVBQUUsUUFBZ0IsRUFBRSxpQkFBMEI7O1FBQ3RGLElBQUksWUFBa0IsQ0FBQztRQUN2QixJQUFJLFFBQVEsU0FBRyxPQUFPLDBDQUFFLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLFlBQVksR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsT0FBQyxRQUFRLDBDQUFFLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsVUFBVSxPQUFDLFFBQVEsMENBQUUsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDbEwsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUVELFNBQVMsQ0FBQyxPQUFvQjtRQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBb0I7UUFDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUN4RCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBVyxFQUFFLEtBQVc7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLENBQUM7Q0FDSiJ9