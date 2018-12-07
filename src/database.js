import Dexie from 'dexie';

const db = new Dexie('pokemonDB');
db.version(2).stores({
    pokedex: `url, data`,
    pokemon: `id, data`,
    type: `url, data`
});
db.version(3).stores({
    pokedex: `url, data`,
    pokemon: `id, data`,
    type: `url, data`,
    ability: `url, data`
});
db.version(3).stores({
    pokedex: `url, data`,
    pokemon: `id, data`,
    type: `url, data`,
    ability: `url, data`
}).upgrade(x=>x);
export default db;