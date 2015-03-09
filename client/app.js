(function(){
'use strict'

angular
  .module('giphy', ['firebase'])
  .controller('MessagesController', MessagesController)
  .factory('Messages', Messages)

MessagesController.$inject = ['$scope', 'Messages'];
function MessagesController ($scope, Messages) {
  var vm = this;

  vm.data = Messages.data||[];

  vm.addMessage = function(text){
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

})()