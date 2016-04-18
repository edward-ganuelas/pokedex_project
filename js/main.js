var pokeAPI = "http://pokeapi.co/api/v2/";
var pokeAPIPokeDex ="pokedex/";
var pokeAPIPokemon = 'pokemon/';
// var pokeAPIPokemonSpecies ='pokemon-species/';


var pokeDexVue = new Vue({
    el: "#pokedex",
    data: {
        pokedexSelect:[
            {
                id: 0,
                name: "Select"
            },
            {
                id: 1,
                name: "National"
            },
            {
                id: 2,
                name: "Kanto"
            },
            {
                id: 3,
                name: "Original Johto"
            },
            {
                id: 4,
                name: "Hoenn"
            },
            {
                id: 5,
                name: "Original Sinnoh"
            },
            {
                id: 6,
                name: "Extended Sinnoh"
            },
            {
                id: 7,
                name: "Updates Johto"
            },
            {
                id: 8,
                name: "Original Unova"
            },
            {
                id: 9,
                name: "Updated Unova"
            },
        
        ],
        pokemon_entries: '',
        pokemon_selected: '',
        pokemon: "",
        pokemon_description: "",
        pokemon_genus: "",
        region_select: "0",
        ajax_call: false //Controls if the ajax gif is shown or not
    },
    methods: {
        getPokemon: function(){ //This methos is called on #pokedexEntries onChange
            
            var apiCall = this.pokemon_selected;
            var pokemonThis = this;
            pokemonThis.pokemon = ''; //Unsets the variable and hides #entry.
            
            pokemonThis.ajax_call = true;
            $.ajax({url: apiCall}).success(function(e){
                    pokemonThis.pokemon_description = e.flavor_text_entries;
                    pokemonThis.pokemon_genus = e.genera;
                    var pokemonId = e.id;
                    $.ajax({url: pokeAPI+pokeAPIPokemon+pokemonId}).success(function(e){
                        pokemonThis.pokemon = e; 
                        pokemonThis.ajax_call = false;
                    }).error(function(e){
                        console.log(e);  
                        pokemonThis.ajax_call = true;
                    });
                }).error(function(e){
                   console.log(e);  
                     pokemonThis.ajax_call = false;
                });

        },
        getPokedex: function(){
            var pokemonThis = this;
            var pokedexSelectValue = pokemonThis.region_select;
            pokemonThis.pokemon = '';
            pokemonThis.pokemon_entries = '';
            // $('#entry').hide();
 
            if(pokemonThis.region_select == "0"){return;} //Return if the default is selected
             if(sessionStorage.getItem('pokemon_entries_'+pokedexSelectValue) == null){ //Check if the object is stored on a session storage
                var apiCall = pokeAPI+pokeAPIPokeDex+pokemonThis.region_select; //Build the URL
                // $("#loading-indicator").show();
                pokemonThis.ajax_call = true;
                // $('#pokedexEntries').hide();
                $.ajax({url: apiCall}).success(function(e){ //AJAX call, jQuery 
                    // $('#pokedexEntries').show();
                    // $("#loading-indicator").hide();
                    pokemonThis.ajax_call = false;
                    pokemonThis.pokemon_entries = e.pokemon_entries; //I only want the pokemon entries. Set it to the pokemon_entries object of the pokeDexVue object.
                    sessionStorage.setItem('pokemon_entries_'+pokedexSelectValue, JSON.stringify(e.pokemon_entries)); //Save the JSON object to a sessionStorage variable to avoid too much AJAX Calls. 
                }).error(function(e){
                    console.log(e);  
                    // $("#loading-indicator").hide();
                    pokemonThis.ajax_call = false;
                });
            }else{ //If the sessionStorage item exist, set it to pokemon_entries
                pokemonThis.pokemon_entries = JSON.parse(sessionStorage.getItem('pokemon_entries_'+pokedexSelectValue));
                // $('#pokedexEntries').show();
                // pokemonThis.ajax_call = true;
            }
        }
    }
});