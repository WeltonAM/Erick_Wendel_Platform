const http = require('http');
const DEFAULT_USER = {
    userName: 'admin',
    password: 'admin'
}

const { once } = require('events');

const routes = {
    '/contact:get': (req, res) => {
        res.write('Contact page');
        return res.end();
    },
    '/login:post': async (req, res) => {
        const data = JSON.parse(await once(req, 'data'));
        const toLower = (value) => value.toLowerCase();

        if (
            toLower(data.userName) != DEFAULT_USER.userName ||
            toLower(data.password) != DEFAULT_USER.password) {
            res.writeHead(401);

            return res.end('Invalid credentials');
        }

        res.writeHead(200);

        return res.end('Login successful');
    },
    default: (req, res) => {
        res.writeHead(404);
        return res.end('Page not found');
    }
}

function handler(req, res) {
    const { url, method } = req;
    const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
    const chosenRoute = routes[routeKey] || routes.default;

    return chosenRoute(req, res);
}

const app = http.createServer(handler)
    .listen(3000, () => console.log('Server running on port 3000'));

module.exports = app;