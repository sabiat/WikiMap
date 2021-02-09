/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

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
  router.get("/login/:id", (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect("/");
  })
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  })
  router.post("/favourites/add", (req, res) => {
    const user_id = req.session.user_id;
    const map_id = req.body["map-id"];
    const values = [user_id, map_id]
    db.query(`INSERT INTO favourites (user_id, map_id) VALUES ($1, $2)`, values)
    res.redirect(`/api/users/${user_id}/favourites`)
  })
  router.get("/my/favourites", (req, res) => {
    const id = req.session.user_id;
    res.redirect(`/api/users/${id}/favourites`);
  })
  router.get("/:id/favourites", (req, res) => {
    const id = req.params.id
    db.query(`SELECT favourites.*, maps.* FROM favourites JOIN maps ON maps.id=favourites.map_id WHERE favourites.user_id = $1;`, [id])
    .then((data) => {
      // const mapNames = []
      // const mapImages = [];
      const templateVars = {}
      console.log(data.rows)
      data.rows.forEach(row => {
        // console.log(data.rows)
        rowObject = {}
        rowObject.name = row.name
        rowObject.image = row.image_url
        rowObject.id = row.id
        templateVars[row.id] = rowObject
      })
      // console.log(templateVars)
      return res.render("user_favourites", {templateVars})
    })
    .catch(e => console.log(e))
  });
  router.get("/:id/maps", (req, res) => {
    const id = req.params.id
    db.query(`SELECT * FROM maps WHERE user_id = $1;`, [id])
    .then((data) => {
      const templateVars = {}
      console.log(templateVars)
      data.rows.forEach(row => {
        rowObject = {}
        rowObject.name = row.name
        rowObject.image = row.image_url
        rowObject.id = row.id
        templateVars[row.id] = rowObject
      })
      return res.render("user_maps", {templateVars})
    })
  });
  return router;

};
