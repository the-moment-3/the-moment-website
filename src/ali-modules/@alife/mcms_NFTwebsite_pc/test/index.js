'use strict';

describe('valid', function() {
  let i18n;
  it('should be valid json', function() {
    i18n = require('../index');
    if (!i18n['en-us']) {
      throw ('en-us key not found');
    }
  });

  it('should have all locales', function() {
    'en-us,ko-kr'.split(',').forEach(function(locale) {
      if (!i18n[locale]) {
        throw ('key: ' + locale + ' not found');
      }
    });
  });
});
