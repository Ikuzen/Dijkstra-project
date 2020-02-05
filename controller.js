import { calcDistance, getMousePosition, calculateShortestPath } from "./util.js";
export class Controller {
    constructor() {
        var _a;
        this.cityNames = ['paris', 'lyon', 'marseille', 'dijon', 'strasbourg', 'lille', 'rennes', 'toulouse',];
        this.reset = false;
        this.canvas = document.getElementById("canvas");
        this.ctx = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.getContext("2d");
    }
    start() {
        window.addEventListener('load', () => {
            var _a;
            this.element = document.getElementById('svg').contentDocument;
            this.element.addEventListener('click', getMousePosition);
            this.paris = this.getCityAttributes(this.element, 'paris');
            this.lyon = this.getCityAttributes(this.element, 'lyon');
            this.marseille = this.getCityAttributes(this.element, 'marseille');
            this.dijon = this.getCityAttributes(this.element, 'dijon');
            this.strasbourg = this.getCityAttributes(this.element, 'strasbourg');
            this.lille = this.getCityAttributes(this.element, 'lille');
            this.rennes = this.getCityAttributes(this.element, 'rennes');
            this.bordeaux = this.getCityAttributes(this.element, 'bordeaux');
            this.toulouse = this.getCityAttributes(this.element, 'toulouse');
            this.cities = [this.paris, this.lyon, this.marseille, this.dijon, this.strasbourg, this.lille, this.rennes, this.bordeaux, this.toulouse];
            this.links = [];
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
    }
    getCityAttributes(element, cityName) {
        var _a, _b, _c;
        let returnedCity;
        let _element = (_a = element) === null || _a === void 0 ? void 0 : _a.getElementById(cityName);
        _element.style.cursor = "pointer";
        _element.style.fontSize = "20px";
        returnedCity = { name: cityName, x: parseFloat((_b = _element) === null || _b === void 0 ? void 0 : _b.getAttribute('x')), y: parseFloat((_c = _element) === null || _c === void 0 ? void 0 : _c.getAttribute('y')), isHighlighted: false };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNsRixNQUFNLE9BQU8sVUFBVTtJQUF2Qjs7UUFDSSxjQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUE7UUFjakcsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLFdBQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLFFBQUcsU0FBRyxJQUFJLENBQUMsTUFBTSwwQ0FBRSxVQUFVLENBQUMsSUFBSSxFQUFFO0lBeUl4QyxDQUFDO0lBdklHLEtBQUs7UUFDRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTs7WUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLGVBQWUsQ0FBQztZQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ3hELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUNoRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFBO1lBQ2hFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3pJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3ZCLDZCQUE2QjtZQUM3QixNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO2dCQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLENBQUMsRUFBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHVDQUF1QztJQUN2QyxnREFBZ0Q7SUFDaEQsd0RBQXdEO0lBQ3hELDJCQUEyQjtJQUMzQiw0REFBNEQ7SUFDNUQsMENBQTBDO0lBQzFDLG1DQUFtQztJQUNuQyxtQ0FBbUM7SUFDbkMsbUNBQW1DO0lBQ25DLG1DQUFtQztJQUNuQyxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFFBQVE7SUFDUixJQUFJO0lBQ0osV0FBVyxLQUFLLENBQUM7SUFFakIsdUJBQXVCLENBQUMsS0FBWTtJQUVwQyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNaLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNsRCxRQUFRLEVBQUUsWUFBWSxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEIsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNqQixLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO2dCQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixNQUFLO2FBQ1I7U0FDSjtJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBVTs7UUFDakIsZ0RBQWdEO1FBQ2hELElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDcEIsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDdEI7UUFDRCxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLE9BQUMsSUFBSSxDQUFDLE9BQU8sMENBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQTtZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUE7U0FDdEM7UUFFRCw4QkFBOEI7YUFDekIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsT0FBQyxJQUFJLENBQUMsT0FBTywwQ0FBRSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDckI7SUFFTCxDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsS0FBVyxFQUFFLEtBQVc7SUFFekMsQ0FBQztJQUVELGlCQUFpQixDQUFDLE9BQTBCLEVBQUUsUUFBZ0I7O1FBQzFELElBQUksWUFBa0IsQ0FBQztRQUN2QixJQUFJLFFBQVEsU0FBRyxPQUFPLDBDQUFFLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLFlBQVksR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsT0FBQyxRQUFRLDBDQUFFLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsVUFBVSxPQUFDLFFBQVEsMENBQUUsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNoSixPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRUQsU0FBUyxDQUFDLE9BQW9CO1FBRTFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFvQjtRQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ3hELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFXLEVBQUUsS0FBVztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUNKIn0=