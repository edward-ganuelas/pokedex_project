var pokeAPI = "http://pokeapi.co/api/v2/";
var pokeAPIPokeDex ="pokedex/";
var pokeAPIPokemon = 'pokemon/';
var pokeDexVue = new Vue({
    el: "#pokedex",
    data: {
        pokemon_entries: '',
        pokemon_selected: '',
        pokemon: ""
    },
    methods: {
        getPokemon: function(item){
            var apiCall = pokeAPI+pokeAPIPokemon+this.pokemon_selected;
            var pokemonThis = this;
            $("#loading-indicator").show();
             $('#entry').hide();   
            $.ajax({url: apiCall}).success(function(e){
                    pokemonThis.pokemon = e; 
                    $('#entry').show();   
                    $("#loading-indicator").hide();
                });

        }
    }
});

$(document).ready(function(){
   $('#pokedexSelect').change(function(){
      var pokedexSelectValue = $(this).val();
      if(pokedexSelectValue == "0"){return;}
      if(sessionStorage.getItem('pokemon_entries_'+pokedexSelectValue) == null){
        var apiCall = pokeAPI+pokeAPIPokeDex+pokedexSelectValue;
        $("#loading-indicator").show();
        $('#pokedexEntries').hide();
        $.ajax({url: apiCall}).success(function(e){
            $('#pokedexEntries').show();
            $("#loading-indicator").hide();
            pokeDexVue.pokemon_entries = e.pokemon_entries;
            sessionStorage.setItem('pokemon_entries_'+pokedexSelectValue, JSON.stringify(e.pokemon_entries));
        });
     }else{
         pokeDexVue.pokemon_entries = JSON.parse(sessionStorage.getItem('pokemon_entries_'+pokedexSelectValue));
         console.log(pokeAPIPokeDex.pokemon_entries);
         $('#pokedexEntries').show();
     }
   });
});