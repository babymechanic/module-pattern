describe('test-page', () => {

  var jasmineUtils = App.TestUtils.Jasmine;
  var createSelectPageObject = App.TestUtils.PageObjects.SelectPageObject.create;
  var itemsPageObject;
  var categoryPageObject;

  beforeEach(() => {
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
    categoryPageObject = createSelectPageObject('category');
    itemsPageObject = createSelectPageObject('items');
  });

  it('should load with default values', function () {

  });
});