// require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const sequelize = require('./config/connection')
const session = require('express-session')
const exphbs  = require('express-handlebars')
const helpers = require('./utils/helpers')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sess = {
    secret: 'fdsajki',
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: new SequelizeStore({
        db: sequelize
    })
}
app.use(session(sess))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./controllers'))
const hbs = exphbs.create({helpers})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({force: false})
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Now listening on port: ${PORT}`)
    })
})
