var FormView = Backbone.View.extend({

  initialize: function(params){
    this.api = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC";
  },

  events: {
    'click #send' : 'giphy'
  },

  giphy: function(e){
    e.preventDefault();
    var text = this.$('#message').val();
    this.$('#message').val('');

    var query = this.isGiphy(text);
    if(query){
      var context = this;
      context.bbajax(query, function (result){
        //random gif
        var rand = Math.floor(Math.random() * result.data.length);
        url = result.data[rand].images.original.url;
        context.collection.add({url: url});
      });
    }

  },

  bbajax: function(query, cb){
    console.log(query)
    Backbone.ajax({
      type: 'GET',
      url: this.api,
      dataType: 'json',
      data:{q: query},
      success: function(data){
        cb(data);
        console.log('success!');
      },
      error: function(err){
        console.log('err!');
      }
    })
  },

  isGiphy: function(text){
    var giphy = text.slice(0,5);
    var query = text.slice(5);
    if (giphy === 'giphy') {
      return query.trim();
    }
    return false;
  }

});