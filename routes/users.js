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
  router.get("/login", (req, res) => {
    if(req.session.user_id) {
      return res.redirect('/');
    }
    res.render('login')
  })
  router.post("/login", (req, res) => {
    const username = req.body.email;
    console.log(username)
    db.query(`SELECT users.id FROM users WHERE users.email = $1;`, [username])
    .then((data) => {
      if(data.rows[0]){
        req.session.user_id = data.rows[0].id;
        return res.redirect("/");
      } else {
        return res.send('This user does not exist');
      }
    })
  })
  router.get("/login/:id", (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect("/");
  })
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  })
  router.get("/my/favourites", (req, res) => {
    if(req.session.user_id){
      const id = req.session.user_id;
      return res.redirect(`/api/users/${id}/favourites`);
    }
    res.render('login');
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
