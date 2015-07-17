var hapi = require('hapi');
var routes = require('./routes');
var Good = require('good');

var http = new hapi.Server();

http.connection({ port: 8080 });

routes.forEach(function(r) { http.route(r); });

http.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    http.start(function () {
        http.log('info', 'Server running at: ' + http.info.uri);
    });
});
