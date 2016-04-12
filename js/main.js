var pokeAPI = "http://pokeapi.co/api/v2/";
var pokeAPIPokeDex ="pokedex/";
var pokeAPIPokemon = 'pokemon/';
var pokeAPIPokemonSpecies ='pokemon-species/';


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
        region_select: "0"
    },
    methods: {
        getPokemon: function(){ //This methos is called on #pokedexEntries onChange
            
            var apiCall = pokeAPI+pokeAPIPokemon+this.pokemon_selected;
            var pokemonThis = this;
 
             $("#loading-indicator").show();
             $('#entry').hide();   
            $.ajax({url: apiCall}).success(function(e){
                    pokemonThis.pokemon = e; 
                    var pokemonId = e.id;
                    $.ajax({url: pokeAPI+pokeAPIPokemonSpecies+pokemonId}).success(function(e){
                        pokemonThis.pokemon_description = e.flavor_text_entries;
                        $('#entry').show();   
                        $("#loading-indicator").hide();
                    }).error(function(e){
                        console.log(e);  
                        $("#loading-indicator").hide();  
                    });
                }).error(function(e){
                   console.log(e);  
                   $("#loading-indicator").hide();  
                });

        },
        getPokedex: function(){
            var pokemonThis = this;
            var pokedexSelectValue = pokemonThis.region_select;
            if(pokemonThis.region_select == "0"){return;} //Return if the default is selected
             if(sessionStorage.getItem('pokemon_entries_'+pokedexSelectValue) == null){ //Check if the object is stored on a session storage
                var apiCall = pokeAPI+pokeAPIPokeDex+pokemonThis.region_select; //Build the URL
                $("#loading-indicator").show();
                $('#pokedexEntries').hide();
                $.ajax({url: apiCall}).success(function(e){ //AJAX call, jQuery 
                    $('#pokedexEntries').show();
                    $("#loading-indicator").hide();
                    pokemonThis.pokemon_entries = e.pokemon_entries; //I only want the pokemon entries. Set it to the pokemon_entries object of the pokeDexVue object.
                    sessionStorage.setItem('pokemon_entries_'+pokedexSelectValue, JSON.stringify(e.pokemon_entries)); //Save the JSON object to a sessionStorage variable to avoid too much AJAX Calls. 
                }).error(function(e){
                    console.log(e);  
                    $("#loading-indicator").hide();
                });
            }else{ //If the sessionStorage item exist, set it to pokemon_entries
                pokemonThis.pokemon_entries = JSON.parse(sessionStorage.getItem('pokemon_entries_'+pokedexSelectValue));
                $('#pokedexEntries').show();
            }
        }
    }
});