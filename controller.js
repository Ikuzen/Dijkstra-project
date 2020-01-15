import { calcDistance, getMousePosition, calculateShortestPath } from "./util.js";
let paris;
let lyon;
let marseille;
let dijon;
let cities;
let links;
let firstCitySelected;
let element;
window.addEventListener('load', () => {
    var _a;
    element = document.getElementById('svg').contentDocument;
    element.addEventListener('click', getMousePosition);
    paris = getCityAttributes(element, 'paris');
    lyon = getCityAttributes(element, 'lyon');
    marseille = getCityAttributes(element, 'marseille');
    dijon = getCityAttributes(element, 'dijon');
    cities = [paris, lyon, marseille, dijon];
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
    if (city === firstCitySelected)
        return;
    if (!firstCitySelected) {
        firstCitySelected = city;
        highlight((_a = element) === null || _a === void 0 ? void 0 : _a.getElementById(city.name));
    }
    else if (firstCitySelected) {
        highlight((_b = element) === null || _b === void 0 ? void 0 : _b.getElementById(city.name));
        console.log(firstCitySelected, city);
        console.log(calculateShortestPath(firstCitySelected, city));
    }
}
function getCityAttributes(element, cityName) {
    var _a, _b, _c;
    let returnedCity;
    let _element = (_a = element) === null || _a === void 0 ? void 0 : _a.getElementById(cityName);
    returnedCity = { name: cityName, x: parseFloat((_b = _element) === null || _b === void 0 ? void 0 : _b.getAttribute('x')), y: parseFloat((_c = _element) === null || _c === void 0 ? void 0 : _c.getAttribute('y')) };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNsRixJQUFJLEtBQVcsQ0FBQztBQUNoQixJQUFJLElBQVUsQ0FBQztBQUNmLElBQUksU0FBZSxDQUFDO0FBQ3BCLElBQUksS0FBVyxDQUFDO0FBQ2hCLElBQUksTUFBYyxDQUFDO0FBQ25CLElBQUksS0FBYSxDQUFDO0FBQ2xCLElBQUksaUJBQXNCLENBQUM7QUFFM0IsSUFBSSxPQUEwQixDQUFBO0FBRTlCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUMsR0FBRSxFQUFFOztJQUMvQixPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxlQUFvQyxDQUFDO0lBQzlFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUNuRCxLQUFLLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsU0FBUyxHQUFFLGlCQUFpQixDQUFDLE9BQU8sRUFBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxLQUFLLEdBQUUsaUJBQWlCLENBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLE1BQU0sR0FBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLEtBQUssR0FBRSxFQUFFLENBQUM7SUFDVixpQkFBaUIsRUFBRSxDQUFDO0lBQ3BCLDZCQUE2QjtJQUM3QixNQUFBLE9BQU8sMENBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFDLENBQUMsS0FBUyxFQUFD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