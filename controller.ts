import { calcDistance, getMousePosition, calculateShortestPath } from "./util.js";
let paris: City;
let lyon: City;
let marseille: City;
let dijon: City;
let cities: City[];
let links: Link[];
let firstCitySelected:City;

let element: HTMLObjectElement

window.addEventListener('load',()=>{
    element = document.getElementById('svg').contentDocument as HTMLObjectElement;
    element.addEventListener('click', getMousePosition)
    paris = getCityAttributes(element,'paris');
    lyon = getCityAttributes(element,'lyon');
    marseille= getCityAttributes(element,'marseille');
    dijon= getCityAttributes(element,'dijon');
    cities= [paris, lyon, marseille, dijon];
    links =[];
    calculateAllLinks();
    //attaching cities with event
    element?.addEventListener('click',(event:any)=>{
        handleCity(event);
    })
});

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

function handleCity(event:any):void{
    for(let city of cities){
        if(city.name ===event.target.id){
            selectCity(city);
            break
        }
    }
}

function selectCity(city:City):void{
    if(city === firstCitySelected) return;
    if(!firstCitySelected) {
        firstCitySelected = city;
        highlight(element?.getElementById(city.name))
    }
    else if(firstCitySelected){
        highlight(element?.getElementById(city.name))
        console.log(firstCitySelected,city)
        console.log(calculateShortestPath(firstCitySelected,city));
        
    }


}

function getCityAttributes(element:HTMLObjectElement, cityName:string):City{
    let returnedCity:City
    let _element = element?.getElementById(cityName)
    returnedCity = {name:cityName, x:parseFloat(_element?.getAttribute('x')), y:parseFloat(_element?.getAttribute('y'))}
    return returnedCity;
}

function highlight(element:HTMLElement):void{
    element.style.fill = "red";
    element.style.fontSize = 30;
}

function unHighlight(element:HTMLElement):void{
    element.style.fill = "black";
    element.style.fontSize = 20;
}