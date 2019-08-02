define([
  'jquery'
], function (jquery) {

  var selectElement = function (id) {
    return jquery('#' + id);
  };

  var createOption = function (value, label) {
    return '<option value="' + value + '">' + label + '</option>';
  };


  var allOptions = function (id) {
    return jquery('select#' + id + ' option').map(function () {
      return jquery(this).val();
    }).toArray();
  };

  var setupObserverNotification = function (id, listeners) {
    selectElement(id).change(function () {
      var selectedValue = jquery('#' + id + ' option:selected').val();
      listeners.forEach(function (listener) {
        listener(selectedValue);
      });
    });
  };

  return {
    create: function (id) {
      return function () {

        var listeners = [];

        setupObserverNotification(id, listeners);

        var clear = function () {
          selectElement(id).empty();
        };

        var setOptions = function (options) {
          clear();
          options.forEach(function (option) {
            selectElement(id).append(createOption(option.value, option.label));
          });
        };

        var onChange = function (listener) {
          listeners.push(listener);
        };

        var selectOption = function (value) {
          var options = allOptions(id);
          if (options.indexOf(value.toString()) === -1) throw new Error(value + ' is not a valid value');
          selectElement(id).val(value.toString()).trigger('change');
        };

        var selectedOption = function () {
          return selectElement(id).val();
        };

        return {
          setOptions: setOptions,
          clear: clear,
          onChange: onChange,
          selectOption: selectOption,
          selectedOption: selectedOption
        }
      }();
    },
  }
});
