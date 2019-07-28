var JHG = JHG || {};
JHG.Pages = JHG.Pages || {};

JHG.Pages.TestPage = JHG.Pages.TestPage || function () {

  var createDataTagSelectComponent = function () {
    return JHG.Components.DataTagSelectComponent.create;
  };

  var createCategoriesComponent = function () {
    return createDataTagSelectComponent()('category', 'categories', {
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
    return createDataTagSelectComponent()('items', 'sub-categories', {
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
}();

