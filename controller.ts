import { calcDistance, getMousePosition, calculateShortestPath } from "./util.js";
let cityNames = ['paris', 'lyon', 'marseille', 'dijon', 'strasbourg', 'lille', 'rennes', 'toulouse',]
let paris: City;
let lyon: City;
let marseille: City;
let dijon: City;
let strasbourg: City;
let lille: City;
let rennes: City;
let bordeaux:City;
let toulouse: City;
let links: Link[];
let cities: City[];
let firstCitySelected: City;
let element: HTMLObjectElement
let reset = false;
let canvas = document.getElementById("canvas");
let ctx = canvas?.getContext("2d");



window.addEventListener('load', () => {
    element = document.getElementById('svg').contentDocument;
    element.addEventListener('click', getMousePosition)
    paris = getCityAttributes(element, 'paris');
    lyon = getCityAttributes(element, 'lyon');
    marseille = getCityAttributes(element, 'marseille');
    dijon = getCityAttributes(element, 'dijon');
    strasbourg = getCityAttributes(element, 'strasbourg');
    lille = getCityAttributes(element, 'lille');
    rennes = getCityAttributes(element, 'rennes');
    bordeaux = getCityAttributes(element, 'bordeaux')
    toulouse = getCityAttributes(element, 'toulouse')
    cities = [paris, lyon, marseille, dijon, strasbourg, lille, rennes,bordeaux, toulouse]
    links = [];
    calculateAllLinks();
    console.log(links)
    //attaching cities with event
    element?.addEventListener('click', (event: any) => {
        handleCity(event);
    })
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
function createGraph(){}

function calculateAllLinks(): void {
    for (let i = 0; i < cities.length; i++) {
        for (let j = i + 1; j < cities.length; j++) {
            links.push({
                cities: [cities[i].name, cities[j].name],
                distance: calcDistance(
                    cities[i].x,
                    cities[i].y,
                    cities[j].x,
                    cities[j].y)
            });
        }
    }
}

function handleCity(event: any): void {
    for (let city of cities) {
        if (city.name === event.target.id) {
            selectCity(city);
            break
        }
    }
}

function selectCity(city: City): void {
    //case reset, or clicking on the same city twice
    if(city === firstCitySelected || city.isHighlighted || reset){
        unHighlightAll();
        ctx.clearRect(0, 0, 1000, 1000);
        firstCitySelected = null;
        if(reset!= true){
            return;
        }
        reset = false;
    }
    // case clicking on a city first time
    if (!firstCitySelected) {
        firstCitySelected = city;
        highlight(element?.getElementById(city.name));
        city.isHighlighted = true
        console.log("selecting first city")
    }

    // case clicking on a 2nd city
    else if (firstCitySelected) {
        highlight(element?.getElementById(city.name));
        console.log(firstCitySelected, city);
        console.log(calculateShortestPath(firstCitySelected, city));
        drawLine(firstCitySelected, city);
        city.isHighlighted = true;
        reset = true;
    }

}
function findShortestPath(city1:City,city2:City){
    
}

function getCityAttributes(element: HTMLObjectElement, cityName: string): City {
    let returnedCity: City;
    let _element = element?.getElementById(cityName);
    _element.style.cursor="pointer";
    _element.style.fontSize = "20px";
    returnedCity = { name: cityName, x: parseFloat(_element?.getAttribute('x')), y: parseFloat(_element?.getAttribute('y')), isHighlighted: false };
    return returnedCity;
}

function highlight(element: HTMLElement): void {

    element.style.fill = "red";
    element.style.fontSize = "30px";
}

function unHighlight(element: HTMLElement): void {
    element.style.fill = "black";
    element.style.fontSize = "20px";
}

function unHighlightAll(): void {
    cities.map((city) => {
        unHighlight(element.getElementById(city.name))
        city.isHighlighted = false;
    });
}

function drawLine(city1: City, city2: City) {
    ctx.beginPath();
    ctx.moveTo(city1.x, city1.y);
    ctx.lineTo(city2.x, city2.y);
    ctx.stroke();
}