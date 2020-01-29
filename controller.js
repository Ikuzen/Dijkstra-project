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
    console.log(links);
    //attaching cities with event
    (_a = element) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => {
        handleCity(event);
    });
});
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
function createGraph() { }
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
    //case reset, or clicking on the same city twice
    if (city === firstCitySelected || city.isHighlighted || reset) {
        unHighlightAll();
        ctx.clearRect(0, 0, 1000, 1000);
        firstCitySelected = null;
        if (reset != true) {
            return;
        }
        reset = false;
    }
    // case clicking on a city first time
    if (!firstCitySelected) {
        firstCitySelected = city;
        highlight((_a = element) === null || _a === void 0 ? void 0 : _a.getElementById(city.name));
        city.isHighlighted = true;
        console.log("selecting first city");
    }
    // case clicking on a 2nd city
    else if (firstCitySelected) {
        highlight((_b = element) === null || _b === void 0 ? void 0 : _b.getElementById(city.name));
        console.log(firstCitySelected, city);
        console.log(calculateShortestPath(firstCitySelected, city));
        drawLine(firstCitySelected, city);
        city.isHighlighted = true;
        reset = true;
    }
}
function findShortestPath(city1, city2) {
}
function getCityAttributes(element, cityName) {
    var _a, _b, _c;
    let returnedCity;
    let _element = (_a = element) === null || _a === void 0 ? void 0 : _a.getElementById(cityName);
    _element.style.cursor = "pointer";
    _element.style.fontSize = "20px";
    returnedCity = { name: cityName, x: parseFloat((_b = _element) === null || _b === void 0 ? void 0 : _b.getAttribute('x')), y: parseFloat((_c = _element) === null || _c === void 0 ? void 0 : _c.getAttribute('y')), isHighlighted: false };
    return returnedCity;
}
function highlight(element) {
    element.style.fill = "red";
    element.style.fontSize = "30px";
}
function unHighlight(element) {
    element.style.fill = "black";
    element.style.fontSize = "20px";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDbEYsSUFBSSxTQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUE7QUFDckcsSUFBSSxLQUFXLENBQUM7QUFDaEIsSUFBSSxJQUFVLENBQUM7QUFDZixJQUFJLFNBQWUsQ0FBQztBQUNwQixJQUFJLEtBQVcsQ0FBQztBQUNoQixJQUFJLFVBQWdCLENBQUM7QUFDckIsSUFBSSxLQUFXLENBQUM7QUFDaEIsSUFBSSxNQUFZLENBQUM7QUFDakIsSUFBSSxRQUFhLENBQUM7QUFDbEIsSUFBSSxRQUFjLENBQUM7QUFDbkIsSUFBSSxLQUFhLENBQUM7QUFDbEIsSUFBSSxNQUFjLENBQUM7QUFDbkIsSUFBSSxpQkFBdUIsQ0FBQztBQUM1QixJQUFJLE9BQTBCLENBQUE7QUFDOUIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ2xCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0MsSUFBSSxHQUFHLFNBQUcsTUFBTSwwQ0FBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFJbkMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7O0lBQ2pDLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLGVBQWUsQ0FBQztJQUN6RCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUE7SUFDbkQsS0FBSyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFB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