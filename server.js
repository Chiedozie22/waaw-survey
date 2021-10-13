const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');  //ejs is a simple html and css that aids itration and flow control.
const port = process.env.PORT || 9051;
const mongoose = require('mongoose');
const User = require('./models/User');
const Survey = require('./models/Survey');
const randomString = require('randomstring');

// const userID = randomString.generate(7);


// DB connection
mongoose.connect('mongodb://localhost/surveyform')
.then((disconnect) => console.log('Data connection sucessful'))
.catch((error) => console.log('Database Connection Error', error.message));

// Setting up express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views')); //to set view path
app.set('view engine', 'ejs'); //sets your default engine to ejs
app.locals.moment = require('moment'); // moment helps you parse validate and display date and time in java script

// You can only use "await" in an async function
app.get('/', async (req, res) => {
   
    res.render('index'); // passing data in an object 'allmesssages' to the frontend
});
app.get("/form-success", (req, res) =>{
    res.render('form-success')
})
 app.post('/user/create-user', async (req, res) => {
    let userData = req.body;
    userData.userID = randomString.generate(7);
    let newUser = new User(userData);
    await newUser.save();
   res.render("success", {user: newUser});

});

app.get("/survey", async (req, res) => {
    try {
        let newUser = await User.find({}).sort({_id: -1})
   res.render("survey", {user: newUser});
    } catch (error) {
        console.log(error);
    }
});

app.post("/user/create-survey", async (req, res) =>{
    const {title, description, location, startDate, endDate, userID} = req.body;
    try {
        if (!req.body) {
            res.redirect('/survey')
        }
        let user = await User.findOne({userID: userID});
        if (!user) {
           res.render('error')
        } else {
            console.log("User found");
            const newSurvey = new Survey({title, description, location, startDate, endDate, userID});
            await newSurvey.save();
            console.log(newSurvey);
            res.redirect("/form-success");
        }
    } catch (error) {
      console.log(error)  
    }
})


app.listen(port, () => {console.log(`Server listening at ${port}`)});