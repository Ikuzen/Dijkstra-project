import { calcDistance, getMousePosition } from "./util.js";

window.addEventListener('load',()=>{
    let element = document.getElementById('svg') as HTMLObjectElement;
    element.contentDocument?.addEventListener('click', getEventTarget)

    //attaching cities with event
    element?.contentDocument?.getElementById("tspan6834-4-2")?.addEventListener('mouseover',()=>{
        console.log('Paris');
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
function handleCity():void{

}

function getEventTarget(e:any) {
    e = e || window.event;
    console.log(e.target.id)
    return e.target || e.srcElement;
  }

let paris: City = { name: 'Paris', x: 0, y: 0 };
let lyon: City = { name: 'Lyon', x: 2, y: 2 };
let marseille: City = { name: 'Marseille', x: 4, y: 4 };
let dijon: City = { name: 'Dijon', x: 5, y: -14 };
let cities: City[] = [paris, lyon, marseille, dijon]
let links: Link[] = [];
calculateAllLinks();
console.log(links)
console.log('')