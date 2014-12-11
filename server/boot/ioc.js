module.exports = (function () {
    var fs = require('fs');
    var Zeninjector = require('zeninjector');
    var ioc = new Zeninjector({verbose: false});
    var f = require('feathers');
    ioc.registerAndExport('q', require('bluebird'));
    ioc.registerAndExport('feathers', f);
    ioc.register('app', require('./app'));
    ioc.registerAndExport('mongodb', require('feathers-mongodb'));
    ioc.registerAndExport('_', require('lodash'));
    ioc.register('config', require('./../config/config'));
    return ioc;
})();