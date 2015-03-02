var GifsView = Backbone.View.extend({

  className: 'GifsView',

  initialize: function(){
    console.log('init GifsView');
    this.render();
  },

  render: function(){
    this.$el.children().detach();

    this.$el.html('<div>BOA HANCOCK<div>').append(this.collection.map(function (gif){
      return new GifView({model: gif}).render();
    }))

    return this;
  }
});