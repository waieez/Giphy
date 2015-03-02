$(function(){
  var appModel = new AppModel();
  var appView = new AppView({model: appModel});

  $('.container').append(appView.render());
})