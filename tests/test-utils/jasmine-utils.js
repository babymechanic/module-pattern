var JHG = JHG || {};
JHG.TestUtils = JHG.TestUtils || {};
JHG.TestUtils.Jasmine = JHG.TestUtils.Jasmine || function () {
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