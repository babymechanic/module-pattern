requirejs.config({
  paths: {
    jquery: '../lib/jquery-3.4.1',
    'jasmine': './jasmine-3.4.0/jasmine',
    'jasmine-html': './jasmine-3.4.0/jasmine-html',
    'jasmine-boot': './jasmine-3.4.0/boot'
  },
  shim: {
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html']
    }
  }
});

// add your test here
var tests = [
  './components/select-component.spec',
  './components/data-tag-select-component.spec',
  './pages/test-page.spec'
];

requirejs(['jasmine-boot'], function () {
  require(tests, function () {
    window.onload(null);
  });
});
