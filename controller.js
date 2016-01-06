function Controller(view){
  this.view = view
  view.controller = this
}

$(document).ready(function(){
  view = new View();
  controller = new Controller(view);
  controller.pokedex = new Pokedex();
  // Pokemon.getStarterPokemon();
  // view.loadPokemon();
});


