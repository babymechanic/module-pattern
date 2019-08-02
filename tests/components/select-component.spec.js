define([
  '../../src/components/select-component',
  '../test-utils/jasmine-utils',
  '../test-utils/page-objects/select-page-object'
], function (SelectComponent, jasmineUtils, SelectPageObject) {

  describe('SelectComponent', function () {

    var createSelectComponent = SelectComponent.create;
    var createSelectPageObject = SelectPageObject.create;
    var selectComponent;
    var selectPageObject;

    beforeEach(() => {
      jasmineUtils.setFixture(`<select id="testComponent"></select>`);
      selectComponent = createSelectComponent('testComponent');
      selectPageObject = createSelectPageObject('testComponent')
    });

    afterEach(() => {
      jasmineUtils.clearFixture();
    });

    it('should create a select component with the given options', function () {
      var options = [
        {value: 1, label: 'option1'},
        {value: 2, label: 'option2'}
      ];

      selectComponent.setOptions(options);

      expect(selectPageObject.optionsCount()).toEqual(2);
      expect(selectPageObject.optionLabel('1')).toEqual('option1');
      expect(selectPageObject.optionLabel('2')).toEqual('option2');
    });

    it('should be able to reset the options on a select component', function () {
      selectComponent.setOptions([
        {value: 1, label: 'option1'},
        {value: 2, label: 'option2'}
      ]);

      selectComponent.setOptions([
        {value: 3, label: 'option3'},
        {value: 4, label: 'option4'}
      ]);

      expect(selectPageObject.optionsCount()).toEqual(2);
      expect(selectPageObject.optionLabel('3')).toEqual('option3');
      expect(selectPageObject.optionLabel('4')).toEqual('option4');
    });

    it('should be able to clear the options on a select component', function () {
      selectComponent.setOptions([
        {value: 1, label: 'option1'},
        {value: 2, label: 'option2'}
      ]);

      selectComponent.clear();

      expect(selectPageObject.optionsCount()).toEqual(0);
    });

    it('should be able to notify if the selected value changes', function () {
      selectComponent.setOptions([
        {value: 1, label: 'option1'},
        {value: 2, label: 'option2'},
        {value: 3, label: 'option3'}
      ]);
      var value;

      selectComponent.onChange((selectedValue) => {
        value = selectedValue;
      });

      selectPageObject.selectOption(2);
      expect(value).toEqual('2');
      selectPageObject.selectOption(3);
      expect(value).toEqual('3');
    });

    it('should be able to set and get the value of the option', function () {
      selectComponent.setOptions([
        {value: 1, label: 'option1'},
        {value: 2, label: 'option2'}
      ]);

      selectComponent.selectOption(2);

      expect(selectPageObject.selectedOption()).toEqual('2');
      expect(selectComponent.selectedOption()).toEqual('2');
    });

    it('should throw an error if the selected option is not a valid option', function () {
      selectComponent.setOptions([
        {value: 1, label: 'option1'},
        {value: 2, label: 'option2'}
      ]);

      expect(function () {
        selectComponent.selectOption(3);
      }).toThrowError('3 is not a valid value');

    });
  });

});

