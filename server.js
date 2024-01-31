// express
const express = require("express");
const app = express();
const port = 3000;

// Connecting to mongodb
const { MongoClient } = require('mongodb');
let url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

// database
const dbName = "swapi";
const db = client.db(dbName);

// collections
const planets = db.collection("planets");
const characters = db.collection("characters");
const films = db.collection("films");
const films_characters = db.collection("films_characters");
const films_planets = db.collection("films_planets");


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get planets
app.get("/api/planets", async (req, res) => {
  const results = await planets.find().toArray();
  res.json(results);
});

// get characters
app.get('/api/characters', async (req, res) => {
  const results = await characters.find().toArray();
  res.json(results);
});

// get films
app.get('/api/films', async (req, res) => {
  const results = await films.find().toArray();
  res.json(results);
});

// get character by id
app.get('/api/characters/:id', async (req, res) => {
    const charId = parseInt(req.params.id);
    try{
        const results = await characters.findOne({id: charId});
        if(results){
            res.json(results);
        }else{
            res.status(404).json({message: 'character not found'})
        }
    }catch(error){
        res.status(500).json({message:'internal server error'})
    }
});

// get films by id
app.get('/api/films/:id', async (req, res) => {
    const filmId = parseInt(req.params.id);
    try{
        const results = await films.findOne({id: filmId});
        if(results){
            res.json(results);
        }else{
            res.status(404).json({message: 'film not found'})
        }
    }catch(error){
        res.status(500).json({message:'internal server error'})
    }
});

// get planet by id
app.get('/api/planets/:id', async (req, res) => {
    const planetId = parseInt(req.params.id);
    try{
        const results = await planets.findOne({id: planetId});
        if(results){
            res.json(results);
        }else{
            res.status(404).json({message: 'planet not found'})
        }
    }catch(error){
        res.status(500).json({message:'internal server error'})
    }
});

// get characters in a film by film id
app.get('/api/films/:id/characters', async (req, res) => {
    const filmId = parseInt(req.params.id);
    try{
        const results = await films_characters.find({film_id: filmId}).toArray();
        const characterIds = results.map(result => result.character_id)
        console.log(characterIds)
        const characterNames = await characters.find({id: {$in: characterIds}}).toArray();
        if(characterNames){
            res.json(characterNames);
        }else{
            res.status(404).json({message: 'film not found'})
        }
    }catch(error){
        res.status(500).json({message:'internal server error'})
    }
});

// get planets in a film by film id
app.get('/api/films/:id/planets', async (req, res) => {
    const filmId = parseInt(req.params.id);
    try{
        const results = await films_planets.find({film_id: filmId}).toArray();
        const planetIds = results.map(result => result.planet_id)
        const planetNames = await planets.find({id: {$in: planetIds}}).toArray();
        if(planetNames){
            res.json(planetNames);
        }else{
            res.status(404).json({message: 'film not found'})
        }
    }catch(error){
        res.status(500).json({message:'internal server error'})
    }
});

// get films that a character is in by character id 
app.get('/api/characters/:id/films', async (req, res) => {
    const charId = parseInt(req.params.id);
    try{
        const results = await films_characters.find({character_id: charId}).toArray();
        const filmIds = results.map(result => result.film_id)
        const filmNames = await films.find({id: {$in: filmIds}}).toArray();
        if(filmNames){
            res.json(filmNames);
        }else{
            res.status(404).json({message: 'film not found'})
        }
    }catch(error){
        res.status(500).json({message:'internal server error'})
    }
});

// get films that take place on a planet by planet id
app.get('/api/planets/:id/films', async (req, res) => {
    const planetId = parseInt(req.params.id);
    try{
        const results = await films_planets
          .find({ planet_id: planetId })
          .toArray();
        const filmIds = results.map(result => result.film_id)
        const filmNames = await films.find({id: {$in: filmIds}}).toArray();
        if(filmNames){
            res.json(filmNames);
        }else{
            res.status(404).json({message: 'film not found'})
        }
    }catch(error){
        res.status(500).json({message:'internal server error'})
    }
});

// get characters that are from a planet by id
app.get('/api/planets/:id/characters', async (req, res) => {
    const planetId = parseInt(req.params.id);
    try{
        const results = await characters
          .find({ homeworld: planetId })
          .toArray();
        if(results){
            res.json(results);
        }else{
            res.status(404).json({message: 'film not found'})
        }
    }catch(error){
        res.status(500).json({message:'internal server error'})
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
