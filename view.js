function View(){
  // renders single pokemon
  var source = $("#pokemon-template").html();
  Handlebars.registerPartial('pokemon-template', source)
  this.singlePokemonTemplate = Handlebars.compile(source);

  // renders list of caught pokemon
  var listSource = $("#caught-pokemon-list").html();
  this.caughtPokemonTemplate = Handlebars.compile(listSource);

  $('#start-button').on('click', this.handleStart.bind(this));
  $('#look-in-tall-grass').on('click', this.handleWildPokemonEncounter.bind(this));
  this.setupPokeballThrow();

  $('#run-from-encounter').on('click', this.runFromWildPokemon.bind(this));

};

View.prototype.showCaughtPokemon= function(myPokemon){
  var context = {pokemons: myPokemon}
  var htmlOutput = this.caughtPokemonTemplate(context);
  $('#my-pokemon').html(htmlOutput);
}
View.prototype.showWildPokemon= function(pokemon){
  $('#run-from-encounter').show();
  $('#wild-pokemon').show();
  var context = {pokemon: pokemon};
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

View.prototype.handleWildPokemonEncounter = function(event){
  Pokemon.getSinglePokemon().done(function(result){
    this.showWildPokemon(result)
    $('#look-in-tall-grass').hide();
  }.bind(this))
}

View.prototype.setupPokeballThrow = function(){
  var view = this
  $('#pokeball-pic').draggable({
    revert: true
  })
  $('#wild-pokemon').droppable({
    drop: function(event, ui) {
      Pokemon.getSinglePokemon($(event.target).find(".national-id").html()).then(function(result){
      view.controller.pokedex.catchPokemon(result)

      $('#wild-pokemon').hide()
      view.showCaughtPokemon(view.controller.pokedex.caught_list)
      $('#look-in-tall-grass').show();
      $('#run-from-encounter').hide();
      })
    }
  });
}

View.prototype.runFromWildPokemon = function(){
  $('#run-from-encounter').hide();
  $('#wild-pokemon').html("");
  $('#look-in-tall-grass').show();

}
