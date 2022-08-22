require('dotenv').config({path: './config/.env'});
require('./config/db');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const PostModel = require('./models/post.model');
const UserModel = require('./models/users.model');
const {checkUser, requireAuth, requireAdmin} = require('./middleware/auth.middleware');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express')

const AdminJSMongoose = require('@adminjs/mongoose')
AdminJS.registerAdapter(AdminJSMongoose)

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
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

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

//Jwt
app.get('/*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.json(res.locals.user._id)
});

//AdminBro
const adminJs = new AdminJS({
    resources: [PostModel, UserModel],
    branding: {
        companyName: 'Groupomania',
        logo: false
    },
    dashboard: {
        component: AdminJS.bundle('./Dashboard.jsx')
      },
    rootPath: '/admin'
});

const router = AdminJSExpress.buildRouter(adminJs)
app.use(adminJs.options.rootPath, requireAdmin, router)

//Server
app.listen(3050, () => {
    console.log(`Listening on port 3050`)
});