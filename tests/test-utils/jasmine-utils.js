define([
  'jquery'
], function (jquery) {
  return {
    clearFixture: function () {
      jquery('#testFixture').html('');
    },
    setFixture: function (html) {
      jquery('#testFixture').html(html)
    },
    setDataTag: function (id, tagName, data) {
      jquery('#' + id).data(tagName, data);
    }
  };
});
