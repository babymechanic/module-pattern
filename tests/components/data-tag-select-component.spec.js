describe('DataTagSelectComponent', () => {

  var jasmineUtils = JHG.TestUtils.Jasmine;
  var DataTagSelectComponent = JHG.Components.DataTagSelectComponent;
  var createSelectPageObject = JHG.TestUtils.PageObjects.SelectPageObject.create;
  var selectPageObject;

  beforeEach(() => {
    jasmineUtils.setFixture('<select id="testSelect"></select>');
    selectPageObject = createSelectPageObject('testSelect');
  });

  describe('#create', () => {

    beforeEach(() => {
      jasmineUtils.setDataTag('testSelect', 'categories', [
        {"value": 1, "label": "Fruits"},
        {"value": 2, "label": "Vegetables"}]
      );
    });

    it('returns an instance of the select component', function () {

      var instance = DataTagSelectComponent.create('testSelect', 'categories');
      var selectedData;
      instance.onChange(function (item) {
        selectedData = item;
      });
      instance.selectOption(2);

      expect(selectPageObject.optionsCount()).toEqual(2);
      expect(selectPageObject.optionLabel('1')).toEqual('Fruits');
      expect(selectPageObject.optionLabel('2')).toEqual('Vegetables');
      expect(selectPageObject.selectedOption()).toEqual('2');
      expect(selectedData).toEqual({"value": 2, "label": "Vegetables"});
    });

    it('should be able to parse the data before hand', function () {

      jasmineUtils.setDataTag('testSelect', 'categories', [
        {"id": 1, "description": "Fruits"},
        {"id": 2, "description": "Vegetables"}]
      );

      var instance = DataTagSelectComponent.create('testSelect', 'categories', {
        dataParser: function (data) {
          return data.map(function (item) {
            return {
              value: item.id,
              label: item.description
            }
          });
        }
      });
      var selectedData;
      instance.onChange(function (item) {
        selectedData = item;
      });
      instance.selectOption(2);

      expect(selectPageObject.optionsCount()).toEqual(2);
      expect(selectPageObject.optionLabel('1')).toEqual('Fruits');
      expect(selectPageObject.optionLabel('2')).toEqual('Vegetables');
      expect(selectedData).toEqual({"value": 2, "label": "Vegetables"});
    });

    it('should be able to reload the data from the data tags', function () {
      var instance = DataTagSelectComponent.create('testSelect', 'categories');
      expect(selectPageObject.optionsCount()).toEqual(2);
      expect(selectPageObject.optionLabel('1')).toEqual('Fruits');
      expect(selectPageObject.optionLabel('2')).toEqual('Vegetables');

      jasmineUtils.setDataTag('testSelect', 'categories', [
        {"value": 3, "label": "Dairy"},
        {"value": 4, "label": "Cakes"}]
      );

      instance.reload();
      expect(selectPageObject.optionsCount()).toEqual(2);
      expect(selectPageObject.optionLabel('3')).toEqual('Dairy');
      expect(selectPageObject.optionLabel('4')).toEqual('Cakes');
    });

  });

});