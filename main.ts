let Paris = new City('Paris', );
let Marseille = new City('Marseille');
let Lyon = new City('Lyon');

Paris.setAdjacentCities([Marseille,Lyon],[10,7]);
Marseille.setAdjacentCities([Paris,Lyon],[10,4]);
Lyon.setAdjacentCities([Paris,Marseille],[7,4]);

console.log(Paris.adjacentCities)
console.log(Marseille.adjacentCities)
console.log(Lyon.adjacentCities)