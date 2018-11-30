import Dexie from 'dexie';

const db = new Dexie('pokemonDB');
db.version(2).stores({
    pokedex: `url, data`,
    pokemon: `id, data`,
    type: `url, data`
});

export default db;