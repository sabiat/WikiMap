const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/new", (req, res) => {
    const templateVars = {user: req.session.user_id}
    if(req.session.user_id){
      return res.render("map_new", templateVars)
    }
    res.render("login", templateVars)
  })
  router.get("/data", (req, res) => {
    const id = req.session.user_id
    return res.json({id})
  })
  router.get("/data/:id", (req, res) => {
    const id = req.params.id
    const getMap = function(id) {
      db.query(`SELECT pins.*, maps.name as map_name, maps.id as map_id FROM pins RIGHT JOIN maps ON map_id = maps.id WHERE maps.id = $1;`, [id])
      .then((data) => {
        return res.json(data.rows)
      })
      .catch (e => console.log(e))
    };
    getMap(id);
  });
  router.get("/:id", (req, res) => {
    const templateVars = {user: req.session.user_id}
    return res.render("map", templateVars);
  });
  router.post("/", (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const imageUrl = req.body.imageurl;
    const userId = req.session.user_id;
    const values = [userId, name, description, imageUrl];
    db.query(`INSERT INTO maps (user_id, name, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *;`, values )
    .then((data) => {
      const id = data.rows[0].id
      res.redirect(`/api/maps/${id}`)
    })
    .catch (e => console.log(e))
      });
  router.post("/pins/add", (req, res) => {
    const userId = req.session.user_id;
    const name = req.body["pin-name"];
    const description = req.body["pin-description"];
    const address = req.body["pin-address"];
    const image_url = req.body["pin-image"];
    const map_id = req.body["map-id"];
    const values = [name, description, address, image_url, userId, map_id];
    console.log(values);
    db.query(`INSERT INTO pins (name, description, address, image_url, user_id, map_id) VALUES ($1, $2, $3, $4, $5, $6)`, values)
    .then(data => data.rows)
      res.redirect(`/api/maps/${map_id}`)
  })
  router.post("/pins/delete", (req,res) => {
    const pinAdd = req.body.pinAdd;
    const mapId = req.body.mapId;
    const values = [pinAdd, mapId]
    db.query(`DELETE FROM pins WHERE address = $1 AND map_id = $2`, values)
    .then(
      res.redirect(`/api/maps/${mapId}`)
    )
  })
  return router;
};




