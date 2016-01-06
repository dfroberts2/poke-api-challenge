function View(){
  // renders single pokemon
  var source = $("#pokemon-template").html();
  Handlebars.registerPartial('pokemon-template', source)
  this.singlePokemonTemplate = Handlebars.compile(source);

  // renders list of caught pokemon
  var listSource = $("#caught-pokemon-list").html();
  this.caughtPokemonTemplate = Handlebars.compile(listSource);

  $('#start-button').on('click', this.handleStart.bind(this));
};

View.prototype.showCaughtPokemon= function(myPokemon){
  var context = {pokemons: myPokemon}
  var htmlOutput = this.caughtPokemonTemplate(context);
  $('#my-pokemon').html(htmlOutput);
}
View.prototype.showWildPokemon= function(pokemon){
  var context = {pokemon: pokemon}
  var htmlOutput = this.singlePokemonTemplate(context);
  $('#wild-pokemon').html(htmlOutput);
}

View.prototype.loadPokemon = function(number){
  Pokemon.getSinglePokemon(number).done(function(result){
    this.showWildPokemon(result)
  }.bind(this))
}

View.prototype.handleStart = function(event){
  Pokemon.getStarterPokemon().done(function(result){
    this.controller.pokedex.catchPokemon(result)
    this.showCaughtPokemon(this.controller.pokedex.caught_list)
    $('#start-button').hide();
    $('#look-in-tall-grass').show();
  }.bind(this))
}
