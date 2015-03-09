var GifsView = Backbone.View.extend({

  className: 'GifsView',

  initialize: function(){
    console.log('init GifsView');
    this.render();
    this.collection.on('add', function(e){
      console.log('shit got added');
      this.render();
    }, this)
  },

  render: function(){
    this.$el.children().detach();

    this.$el.html('<div>Giphy Vs Humanity<div>').append(this.collection.map(function (gif){
      return new GifView({model: gif}).render();
    }))

    return this;
  }
});