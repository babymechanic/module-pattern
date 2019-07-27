var JHG = JHG || {};
JHG.Components = JHG.Components || {};

JHG.Components.SelectComponent = JHG.Components.SelectComponent || function () {

  var selectElement = function (id) {
    return $('#' + id);
  };

  var createOption = function (value, label) {
    return '<option value="' + value + '">' + label + '</option>';
  };


  function allOptions(id) {
    return $('select#' + id + ' option').map(function () {
      return $(this).val();
    }).toArray();
  }

  return {
    create: function (id) {
      return function () {

        var listeners = [];

        selectElement(id).change(function () {
          var selectedValue = $('#' + id + ' option:selected').val();
          listeners.forEach((listener) => {
            listener(selectedValue);
          });
        });

        var clear = function () {
          selectElement(id).empty();
        };

        var setOptions = function (options) {
          clear();
          options.forEach((option) => {
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

        return {
          setOptions: setOptions,
          clear: clear,
          onChange: onChange,
          selectOption: selectOption
        }
      }();
    },
  }
}();