function getProducts(request, reply) {
    function findProducts(name) {
        return products.filter(function(product) {
            return product.name.toLowerCase() === name.toLowerCase();
        });
    }

    if (request.query.name) {
        reply(findProducts(request.query.name));
    }
    else {
        reply(products);
    }
}

function getProduct(request, reply) {
    var product = products.filter(function(p) {
        return p.id == request.params.id;
    }).pop();

    if(product) {
      reply(product);
    } else {
      reply().code(404);
    }
}

function addProduct(request, reply) {
    var product = {
        id: products[products.length - 1].id + 1,
        name: request.payload.name
    };

    products.push(product);

    reply.created('/products/' + product.id)({
        id: product.id
    });
}

var Types = require('hapi').Types;

var products = [{
        id: 1,
        name: 'Guitar'
    },
    {
        id: 2,
        name: 'Banjo'
    }
];

module.exports = [
    { method: 'GET', path: '/products', handler: getProducts },
    { method: 'GET', path: '/products/{id}', handler: getProduct },
    { method: 'POST', path: '/products', handler: addProduct }
];
