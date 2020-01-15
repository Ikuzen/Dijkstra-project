export function calculateShortestPath(city1:City,city2:City):number{
    // console.log(city1)
    // console.log(city2)

    return calcDistance(city1.x,city1.y,city2.x,city2.y);
}

export function calcDistance(x1:number,y1:number,x2:number,y2:number):number{
    return Math.sqrt((x2-x1)**2+(y2-y1)**2);
}

export function getMousePosition (event: { offsetX: any; offsetY: any; }) {
    console.log([event.offsetX,event.offsetY])
    return [event.offsetX,event.offsetY]
}
