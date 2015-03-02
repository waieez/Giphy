var AppView = Backbone.View.extend({

  className: 'AppView',

  initialize: function(){
    //create view for gifs collection
    var gifs = this.model.get('gifs')
    this.gifsView = new GifsView({collection: gifs});
  },

  render: function(){
    return this.$el.html([
      this.gifsView.$el
      ]);
  }
});