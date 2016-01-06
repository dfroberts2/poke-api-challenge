function Pokemon(args){
  Object.assign(this, args);
};

function Pokedex(){
  this.caught_list = []
};

Pokemon.getStarterPokemon = function(pokedex){
  var starterNumbers = [1, 4, 7, 152, 155, 158]
  var rand = starterNumbers[Math.floor(Math.random() * starterNumbers.length)]
  return Pokemon.getSinglePokemon(rand)
};

Pokemon.getSinglePokemon = function(number){
  if (number == null){
    number = Math.floor((Math.random() * 251) + 1)
  }
  return $.get("http://pokeapi.co/api/v1/pokemon/" + number, function(result){

  }).then(function(result){
    var pokemon = new Pokemon(result)
    pokemon.imageUrl = "http://pokeapi.co/media/img/"+ pokemon.national_id +".png"
    return pokemon
  });
};

Pokedex.prototype.catchPokemon = function(pokemon){
  this.caught_list.push(pokemon)
}
