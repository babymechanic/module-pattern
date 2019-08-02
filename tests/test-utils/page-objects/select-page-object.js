define([
  'jquery'
], function (jquery) {
  return {
    create: function (id) {
      return function () {
        return {
          optionsCount: function () {
            return jquery('select#' + id + ' option').length;
          },
          optionLabel: function (value) {
            var matchingItems = jquery('select#' + id + ' option').filter(function () {
              return jquery(this).val() === value;
            });
            if (matchingItems.length === 0) return null;
            return matchingItems[0].innerText;
          },
          selectOption: function (value) {
            jquery('#' + id).val(value.toString()).trigger('change');
          },
          selectedOption: function () {
            return jquery('#' + id).val();
          }
        };
      }();
    }
  };
});
