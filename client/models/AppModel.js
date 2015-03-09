var AppModel = Backbone.Model.extend({
  initialize: function(params){
    //create collection of gifs
    var gifs = new Gifs();
    this.set('gifs', gifs);
  }
});