const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/new", (req, res) => {
    if(req.session.user_id){
      return res.render("map_new")
    }
    res.render('login')
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
    const id = req.session.user_id;
    const templateVars = {id}
      return res.render("map", templateVars);

  });
  router.post("/", (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const imageUrl = req.body.imageurl;
    const userId = req.session.user_id;
    const values = [userId, name, description, imageUrl];
    db.query(`INSERT INTO maps (user_id, name, description, image_url) VALUES ($1, $2, $3, $4)`, values )
    .then((data) => {
      return data.rows;
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
    const pinName = req.body.pinName;
    const mapId = req.body.mapId;
    const values = [pinName]
    db.query(`DELETE FROM pins WHERE name = $1`, values)
    .then(
      res.redirect(`/api/maps/${mapId}`)
    )
  })
  return router;
};




