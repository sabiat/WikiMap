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
  router.get("/:id", (req, res) => {
    const id = req.params.id
    const getMap = function(id) {
      db.query(`SELECT pins.address FROM pins JOIN maps ON map_id = maps.id WHERE maps.id = $1;`, [id])
      .then((data) => {
        const newArr = [];
        data.rows.forEach(row => newArr.push(row.address))
        // console.log(newArr);
        return res.render("map", {newArr: newArr})
      })
      .catch (e => console.log(e))
    };
    getMap(id);
  })
  return router;
};
