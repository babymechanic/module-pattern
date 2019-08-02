requirejs.config({
  paths: {
    jquery: '../lib/jquery-3.4.1'
  }
});

requirejs([
  'jquery',
  './pages/test-page'
], function (jquery, testPage) {
  jquery(function () {
    testPage.init();
  })
});
