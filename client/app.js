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

  vm.addMessage = function(text){
    GiphyApi.getGiphy(text)
      .then(function (data) {
        vm.giphs = data.data;
      });
    //perhaps add message and url together;
    Messages.addMessage(text); 
    vm.text = "";
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
  }
  function addMessage (text) {
    data.$add({text: text});
  };
}

GiphyApi.inject = ['$http'];
function GiphyApi ($http) {
  var apiKey = 'dc6zaTOxFJmzC';
  var giphyUrl = 'http://api.giphy.com/v1/gifs/search'
  return {
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

  function getGiphy (text) {
    var query = isGiphy(text);
    if (query) {
      return $http({
        method: 'GET',
        url: giphyUrl,
        params: {
          api_key: apiKey,
          q: query
        }
      }).then(function (res) {
        return res.data
      });
    }
  };
};

})()