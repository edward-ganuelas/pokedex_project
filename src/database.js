import Dexie from 'dexie';

const db = new Dexie('pokemonDB');
db.version(1).stores({
    pokedex: `url, data`,
    pokemon: `id, data`
});

export default db;