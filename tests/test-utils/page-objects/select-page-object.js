var JHG = JHG || {};
JHG.TestUtils = JHG.TestUtils || {};
JHG.TestUtils.PageObjects = JHG.TestUtils.PageObjects || {};

JHG.TestUtils.PageObjects.SelectPageObject = JHG.TestUtils.PageObjects.SelectPageObject || function () {
  return {
    create: function (id) {
      return function () {
        return {
          optionsCount: function () {
            return $('select#' + id + ' option').length;
          },
          optionLabel: function (value) {
            var matchingItems = $('select#' + id + ' option').filter(function () {
              return $(this).val() === value;
            });
            if (matchingItems.length === 0) return null;
            return matchingItems[0].innerText;
          },
          selectOption: function (value) {
            $('#' + id).val(value.toString()).trigger('change');
          },
          selectedOption: function () {
            return $('#' + id).val();
          }
        };
      }();
    }
  };
}();