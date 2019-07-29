var App = App || {};
App.TestUtils = App.TestUtils || {};
App.TestUtils.Jasmine = App.TestUtils.Jasmine || function () {
  return {
    clearFixture: function () {
      $('#testFixture').html('');
    },
    setFixture: function (html) {
      $('#testFixture').html(html)
    },
    setDataTag: function (id, tagName, data) {
      $('#'+id).data(tagName, data);
    }
  };
}();
