const express = require('express')
const fortune = require('./lib/fortune')
const app = express()

//设置handlebars的视图引擎
const handlebars = require('express3-handlebars')
        .create({defaultLayout:'main'})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 3000)

app.use(express.static(__dirname + '/public'))

app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1'
    next()
})

app.get('/', function (req, res) {
    res.render('home')
})

app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    })
})

app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river')
})

app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate')
})

//定制404页面
app.use(function (req, res) {
    res.status(404)
    res.render('404')
})

//定制500页面
app.use(function(err, req, res, next){
    console.error(err.stack)
    res.type('text/plain')
    res.status(500)
    res.render('500')
})

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:'+
        app.get('port') + '; press Ctrl-C to terminate')
})