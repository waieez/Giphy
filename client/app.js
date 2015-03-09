(function(){
'use strict'

angular
  .module('giphy', [
    'firebase'
    ])
  .controller('MessagesController', MessagesController)
  .factory('Messages', Messages)
  .factory('GiphyApi', GiphyApi)

MessagesController.$inject = ['$scope', 'Messages', 'GiphyApi'];
function MessagesController ($scope, Messages, GiphyApi) {
  var vm = this;

  vm.data = Messages.data||[];
  vm.giphs = [];

  vm.remove = Messages.remove;

  vm.addMessage = function(text){
    Messages.addMessage(text);
    vm.text = "";

    var query = GiphyApi.isGiphy(text);
    if (query) {//text starts with giphy, fetch and add to db
      GiphyApi.getGiphy(query)
        .then(function (giph) {
          var gifUrl = giph.images.downsized.url;
          Messages.addGiphy(gifUrl);
        })
        .catch(function (err) {
          console.log(err);
        })
    }
  }

};

Messages.$inject = ['$firebaseArray'];
function Messages ($firebaseArray) {
  var giphy = new Firebase(firebaseURL+"/giphy");
  var data = $firebaseArray(giphy);

  return {
    giphy: giphy,
    data: data,  
    addMessage: addMessage,
    addGiphy: addGiphy,
    remove: remove
  }

  function addMessage (text) {
    data.$add({text: text});
  };

  function addGiphy (url) {
    data.$add({url: url});
  };

  function remove (message) {
    data.$remove(message)
      .then(function (ref) {
        console.log("removed " + ref);
      });
  }
}

GiphyApi.inject = ['$http'];
function GiphyApi ($http) {
  var apiKey = 'dc6zaTOxFJmzC';
  var giphyUrl = 'http://api.giphy.com/v1/gifs/search'
  return {
    isGiphy: isGiphy,
    getGiphy: getGiphy
  }

  function isGiphy (text) {
    var query = text.slice(0,5);
    if (query == 'giphy') {
      query = text.slice(5).trim();
      return query;
    }
    return false;
  };

  function getGiphy (query) {
    return $http({
      method: 'GET',
      url: giphyUrl,
      params: {api_key: apiKey, q: query}
    })
    .then(function (res) {
      var result = res.data.data;
      var len = result.length;
      var index = Math.floor(Math.random() * len);
      return result[index];
    })
    .catch(function (err) {
      return err;
    });
  };
};

})()