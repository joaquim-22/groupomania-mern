const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const AdminBro = require('admin-bro');
const AdminBroExpressjs = require('admin-bro-expressjs');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');
const PostModel = require('./models/post.model');
const UserModel = require('./models/users.model');

AdminBro.registerAdapter(require('admin-bro-mongoose'))

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true} ));
app.use('/Images', express.static('./Images'))
app.use(cookieParser());

// jwt
app.get('/*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.json(res.locals.user._id)
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


//AdminBro
const adminBro = new AdminBro({
    resources: [PostModel, UserModel],
    roothPath: '/admin',
    branding: {
        companyName: 'Groupomania',
    }
})

const router = AdminBroExpressjs.buildRouter(adminBro);
app.use(adminBro.options.roothPath, router)

//Server
app.listen(3050, () => {
    console.log(`Listening on port 3050`)
});