var _a;
import { calcDistance, getMousePosition, calculateShortestPath } from "./util.js";
let cityNames = ['paris', 'lyon', 'marseille', 'dijon', 'strasbourg', 'lille', 'rennes', 'toulouse',];
let paris;
let lyon;
let marseille;
let dijon;
let strasbourg;
let lille;
let rennes;
let bordeaux;
let toulouse;
let links;
let cities;
let firstCitySelected;
let element;
let reset = false;
let canvas = document.getElementById("canvas");
let ctx = (_a = canvas) === null || _a === void 0 ? void 0 : _a.getContext("2d");
window.addEventListener('load', () => {
    var _a;
    element = document.getElementById('svg').contentDocument;
    element.addEventListener('click', getMousePosition);
    paris = getCityAttributes(element, 'paris');
    lyon = getCityAttributes(element, 'lyon');
    marseille = getCityAttributes(element, 'marseille');
    dijon = getCityAttributes(element, 'dijon');
    strasbourg = getCityAttributes(element, 'strasbourg');
    lille = getCityAttributes(element, 'lille');
    rennes = getCityAttributes(element, 'rennes');
    bordeaux = getCityAttributes(element, 'bordeaux');
    toulouse = getCityAttributes(element, 'toulouse');
    cities = [paris, lyon, marseille, dijon, strasbourg, lille, rennes, bordeaux, toulouse];
    links = [];
    calculateAllLinks();
    //attaching cities with event
    (_a = element) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => {
        handleCity(event);
    });
});
function calculateAllLinks() {
    for (let i = 0; i < cities.length; i++) {
        for (let j = i + 1; j < cities.length; j++) {
            links.push({
                cities: [cities[i].name, cities[j].name],
                distance: calcDistance(cities[i].x, cities[i].y, cities[j].x, cities[j].y)
            });
        }
    }
}
function handleCity(event) {
    for (let city of cities) {
        if (city.name === event.target.id) {
            selectCity(city);
            break;
        }
    }
}
function selectCity(city) {
    var _a, _b;
    if (city === firstCitySelected || city.isHighlighted || reset) {
        unHighlightAll();
        ctx.clearRect(0, 0, 1000, 1000);
        firstCitySelected = null;
        if (reset != true) {
            return;
        }
        reset = false;
    }
    if (!firstCitySelected) {
        firstCitySelected = city;
        highlight((_a = element) === null || _a === void 0 ? void 0 : _a.getElementById(city.name));
        city.isHighlighted = true;
        console.log("selecting first city");
    }
    else if (firstCitySelected) {
        highlight((_b = element) === null || _b === void 0 ? void 0 : _b.getElementById(city.name));
        console.log(firstCitySelected, city);
        console.log(calculateShortestPath(firstCitySelected, city));
        drawLine(firstCitySelected, city);
        city.isHighlighted = true;
        reset = true;
    }
}
function getCityAttributes(element, cityName) {
    var _a, _b, _c;
    let returnedCity;
    let _element = (_a = element) === null || _a === void 0 ? void 0 : _a.getElementById(cityName);
    returnedCity = { name: cityName, x: parseFloat((_b = _element) === null || _b === void 0 ? void 0 : _b.getAttribute('x')), y: parseFloat((_c = _element) === null || _c === void 0 ? void 0 : _c.getAttribute('y')), isHighlighted: false };
    return returnedCity;
}
function highlight(element) {
    element.style.fill = "red";
    element.style.fontSize = 30;
}
function unHighlight(element) {
    element.style.fill = "black";
    element.style.fontSize = 20;
}
function unHighlightAll() {
    cities.map((city) => {
        unHighlight(element.getElementById(city.name));
        city.isHighlighted = false;
    });
}
function drawLine(city1, city2) {
    ctx.beginPath();
    ctx.moveTo(city1.x, city1.y);
    ctx.lineTo(city2.x, city2.y);
    ctx.stroke();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDbEYsSUFBSSxTQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUE7QUFDckcsSUFBSSxLQUFXLENBQUM7QUFDaEIsSUFBSSxJQUFVLENBQUM7QUFDZixJQUFJLFNBQWUsQ0FBQztBQUNwQixJQUFJLEtBQVcsQ0FBQztBQUNoQixJQUFJLFVBQWdCLENBQUM7QUFDckIsSUFBSSxLQUFXLENBQUM7QUFDaEIsSUFBSSxNQUFZLENBQUM7QUFDakIsSUFBSSxRQUFhLENBQUM7QUFDbEIsSUFBSSxRQUFjLENBQUM7QUFDbkIsSUFBSSxLQUFhLENBQUM7QUFDbEIsSUFBSSxNQUFjLENBQUM7QUFDbkIsSUFBSSxpQkFBdUIsQ0FBQztBQUM1QixJQUFJLE9BQTBCLENBQUE7QUFDOUIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ2xCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0MsSUFBSSxHQUFHLFNBQUcsTUFBTSwwQ0FBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFJbkMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7O0lBQ2pDLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLGVBQW9DLENBQUM7SUFDOUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ25ELEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVB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