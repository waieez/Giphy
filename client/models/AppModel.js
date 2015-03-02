var AppModel = Backbone.Model.extend({
  initialize: function(params){
    //create collection of gifs

    var url = "http://ai-i1.infcdn.net/icons_siandroid/jpg/300/598/598842.jpg";

    var thing = {url: url};

    var gifs = new Gifs([thing, thing, thing]);
    console.log(gifs);
    this.set('gifs', gifs);
  }
});