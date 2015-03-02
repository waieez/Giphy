var GifView = Backbone.View.extend({

  className: 'GifView',

  initialize: function(){
  },

  template: _.template('<div><img src="<%= url %>"></img></div>'),

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});