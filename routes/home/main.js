const express = require('express');
const router = express.Router();
const Movies = require('../../models/Movies');
const Genres = require('../../models/Genres');
const Users = require('../../models/Users');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const crypto = require('crypto');


// Making sure that if you come to this file from admin, you do not inherit admin's layout, rather you fall back on default layout which for home
router.all('/*', (req, res, next) => { // select everything that comes after this route (localhost:64000/home/)
    req.app.locals.layout = 'index-home'; // and reset the default layout for all these routes to index-home
    next();
});


// redirecting "/" route to the "/home" route
router.get('/', (req, res) => {
    res.redirect('home');
});


// faq
router.get('/home/faq', (req, res) => {
    res.render('home/faq', { layout: false }); // Will add layout in some other way. This way gives me trouble
});

// Movies.find( {$where: function() { return (this.visibility == true) } } ).sort( {_id: -1} ).limit(4).lean() // oldest to newest
        
// homepage
router.get('/home', (req, res) => {
    Movies.find( {$where: function() { return (this.visibility == true) }} ).lean()
    .then( (allMovies) => {
        global.allMovies = allMovies;
        Genres.find( {} ).lean().then( (allGenres) => {
            let topSevenMovies = [];
            for (let i = 0; i < 7; i++) { 
                if (allMovies[i]) {
                    topSevenMovies[i] = allMovies[i];
                }
            }
            res.render('home/page-content', {
            movies: allMovies,
            carouselData: topSevenMovies,
            genresData: allGenres,
            email: req.session.email ? req.session.email : 'Not Signed In'
        })}).catch( (error) => {
            res.render('errors/server', { exactError: error });
        });
    })
    .catch( (error) => {
        res.render('errors/server', { exactError: error });
    });
});

module.exports = router;
