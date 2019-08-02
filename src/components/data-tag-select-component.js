define([
  'jquery',
  './select-component'
], function (jquery, SelectComponent) {

  function createSelectComponent(id, data, listeners) {
    var createdComponent = SelectComponent.create(id);
    createdComponent.setOptions(data);
    createdComponent.onChange(function (selectedValue) {
      var matchingItems = data.filter(function (x) {
        return x.value.toString() === selectedValue;
      });
      var matchingItem = matchingItems.length === 0 ? null : matchingItems[0];
      listeners.forEach(function (listener) {
        listener(matchingItem);
      })
    });
    return createdComponent;
  }

  return {
    create: function (id, dataTagName, opts) {

      return (function () {
        var listeners = [];
        var finalOptions = Object.assign({}, opts);

        var getData = function () {
          var element = jquery('#' + id);
          var data = element.data(dataTagName);
          return finalOptions.dataParser ? finalOptions.dataParser(data) : data;
        };

        var createdComponent = createSelectComponent(id, getData(), listeners);

        var onChange = function (listener) {
          listeners.push(listener);
        };

        var reload = function () {
          createdComponent.clear();
          createdComponent.setOptions(getData());
        };

        return {
          setOptions: createdComponent.setOptions,
          clear: createdComponent.clear,
          onChange: onChange,
          selectOption: createdComponent.selectOption,
          selectedOption: createdComponent.selectedOption,
          reload: reload
        };
      })();
    }
  }

});
