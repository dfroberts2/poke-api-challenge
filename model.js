function Pokemon(args){
  Object.assign(this, args);
};

function Pokedex(){
  this.party_list = []
  this.storage_box = []
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
  pokemon.wild = false
  if (this.partySizeTooGreat()){
    this.storage_box.push(pokemon)
  }else{
    this.party_list.push(pokemon)
  }

}

Pokedex.prototype.partySizeTooGreat = function(){
  return this.party_list.length >= 6
}

Pokedex.prototype.switchPartyPokemon = function(dragIndex, dropIndex){
  drop = this.party_list[dragIndex]
  drag = this.party_list[dropIndex]
  this.party_list[dragIndex] = drag
  this.party_list[dropIndex] = drop
}

Pokedex.prototype.switchPartyBoxPokemon = function (dragIndex, dropIndex){
  drop = this.storage_box[dropIndex]
  drag = this.party_list[dragIndex]
  debugger
}
