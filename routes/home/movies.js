const express = require('express');
const router = express.Router();
const Requests = require('../../models/Requests');
const Movies = require('../../models/Movies');
const Users = require('../../models/Users');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const { request } = require('express');


// Making sure that if you come to this file from admin, you do not inherit admin's layout, rather you fall back on default layout which for home
router.all('/*', (req, res, next) => { // select everything that comes after this route (localhost:64000/home/)
    req.app.locals.layout = 'empty-file'; // and reset the default layout for all these routes to index-home
    next();
});


// /home/movies
router.get('/', (req, res) => {
    
    Movies.find( {$where: function() { return (this.visibility == true) } } ).lean()
    .then( (allMovies) => {
        res.render('home/catalog-results', { catalog: allMovies });
    }).catch( (error) => {
        res.render('errors/server', { exactError: error });
    });
});

// localhost:64000/home/movies/:id
router.get('/:id', (req, res) => {
    let movieID = req.params.id;

    // fetching the movie by ID from the DB
    Movies.findOne({_id: ObjectID(movieID)}).lean()
    .then( (data) => {
        Movies.find( {$where: function() { return (this.visibility == true) } } ).sort( {_id: -1} ).limit(4).lean() // oldest to newest
        .then( (fourMovies) => {
            res.render('home/movie-details', { 
                movie: data,
                peopleAlsoSearch: fourMovies,
                email: req.session.isUserSignedIn || req.session.isAuth ? req.session.email: null,
            });
        }).catch( (error) => {
            res.render('errors/server', { exactError: error });
        });
    })
    .catch( (error) => {
        res.render('errors/server', { exactError: error });
    });
});


// if somebody searches for the movie using movie name
router.post('/search', (req, res) => {
    Movies.find( {'name': new RegExp(req.body.keyword, 'i')} ).lean()
    .then( (movies) => {
        if (movies.length > 0) {
            res.render('home/search-results', { data: movies });
        }
        else {
            res.render('home/search-results-not-found', { 
                requestedMovie: req.body.keyword,
                email: req.session.isUserSignedIn || req.session.isAuth ? req.session.email: null
            });
        }
    }).catch( (error) => {
        res.render('errors/server', { exactError: error });
    })
});


// if somebody requests for the movie using movie name
router.get('/add-movie-request/:name', async (req, res) => {
    let fName = 'Fallback';
    let lName = 'Name';

    const allUsers = await Users.find();
    allUsers.map( (eachUser) => {
        if (eachUser.email === req.session.email) {
            fName = eachUser.firstName;
            lName = eachUser.lastName;
        }
    });
    
    Requests.findOne( { movieName: req.params.name } )
    .then( (movie) => {
        if (!movie) {
            let dataToSave = new Requests({
                movieName: req.params.name,
                requester: {
                    firstName: fName,
                    lastName: lName,
                    email: req.session.email
                }
            });
            dataToSave.save()
            .then( (success) => {
                req.flash('movieRequestAddedSuccessfully', `We are reviewing your request for "${ success.movieName }." Please be patient while we process it. Thank you!`);
                res.redirect('/home');
            })
            .catch( (error) => {
                res.render('errors/server', { exactError: error });
            });
        }
        else {
            req.flash('requestedMovieRepeatedely', `We have already received a request for "${ req.params.name }." We are working on it. Thank you!`);
            res.redirect('/home');
        }
    })
    .catch( (error) => {
        res.render('errors/server', { exactError: error });
    });
});


module.exports = router;
