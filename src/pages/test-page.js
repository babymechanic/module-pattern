define([
  '../components/data-tag-select-component'
], function (DataTagSelectComponent) {

  var createCategoriesComponent = function () {
    return DataTagSelectComponent.create('category', 'categories', {
      dataParser: function (data) {
        return data.map(function (item) {
          return {
            value: item.id,
            label: item.label
          };
        });
      }
    });
  };

  var createSubCategoryComponent = function (categoriesComponent) {
    return DataTagSelectComponent.create('items', 'sub-categories', {
      dataParser: function (data) {
        return data
          .filter(function (item) {
            return item.parentId.toString() === categoriesComponent.selectedOption();
          })
          .map(function (item) {
            return {
              value: item.id,
              label: item.label
            };
          });
      }
    });
  };

  return function () {
    var init = function () {
      var categoriesComponent = createCategoriesComponent();
      var subCategoryComponent = createSubCategoryComponent(categoriesComponent);
      categoriesComponent.onChange(function () {
        subCategoryComponent.reload();
      });
    };
    return {
      init: init
    }
  }()

});


