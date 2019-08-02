define([
  '../test-utils/jasmine-utils',
  '../test-utils/page-objects/select-page-object',
  '../../src/pages/test-page'
], function (jasmineUtils, SelectPageObject, testPage) {

  describe('test-page', function () {

    var itemsPageObject;
    var categoryPageObject;

    beforeEach(function () {
      jasmineUtils.setFixture('<select id="category"></select><select id="items"></select>');
      jasmineUtils.setDataTag('category', 'categories', [
        {"id": 1, "label": "Fruits"},
        {"id": 2, "label": "Vegetables"}
      ]);
      jasmineUtils.setDataTag('items', 'sub-categories', [
        {"id": 1, "parentId": 1, "label": "Apple"},
        {"id": 2, "parentId": 1, "label": "Banana"},
        {"id": 3, "parentId": 2, "label": "Potato"},
        {"id": 4, "parentId": 2, "label": "Tomato"}
      ]);
      categoryPageObject = SelectPageObject.create('category');
      itemsPageObject = SelectPageObject.create('items');
    });

    it('should load with default values', function () {
      testPage.init();

      expect(categoryPageObject.optionsCount()).toEqual(2);
      expect(categoryPageObject.selectedOption()).toEqual('1');
      expect(itemsPageObject.optionsCount()).toEqual(2);
      expect(itemsPageObject.selectedOption()).toEqual('1');
    });

    it('changes the subcategory based on category', function () {
      testPage.init();

      categoryPageObject.selectOption(2);
      expect(itemsPageObject.selectedOption()).toEqual('3');
      expect(itemsPageObject.optionLabel('3')).toEqual('Potato');
      expect(itemsPageObject.optionLabel('4')).toEqual('Tomato');
    });
  });

});

