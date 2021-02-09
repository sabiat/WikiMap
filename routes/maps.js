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
    res.render("map_new")
  })

  router.get("/data/:id", (req, res) => {
    const id = req.params.id
    const getMap = function(id) {
      db.query(`SELECT pins.*, maps.name as map_name FROM pins RIGHT JOIN maps ON map_id = maps.id WHERE maps.id = $1;`, [id])
      .then((data) => {
        return res.json(data.rows)
      })
      .catch (e => console.log(e))
    };
    getMap(id);
  });
  router.get("/:id", (req, res) => {
    return res.render("map")
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
  return router;
};




