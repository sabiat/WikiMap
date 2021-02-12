/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/login", (req, res) => {
    if(req.session.user_id) {
      return res.redirect('/');
    }
    const templateVars = {user: req.session.user_id}
    res.render('login', templateVars)
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

  router.get("/signup", (req, res) => {
    if(req.session.user_id) {
      return res.redirect('/');
    }
    const templateVars = {user: req.session.user_id}
    res.render('signup', templateVars)
  });

  router.post("/signup", (req, res) => {
    const email = req.body.email;
    db.query(`SELECT users.id FROM users WHERE users.email = $1;`, [ email ])
    .then((data) => {
      if(data.rows[0]){
        return res.send('This email is already registered');
      } else {
        db.query(`INSERT INTO users (email, password) VALUES ($1, $2)`, [email, "password"])
        .then((data) => {
          return res.redirect("login");
        })
      }
    })
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  })

  router.post("/favourites/add", (req, res) => {
    const user_id = req.session.user_id;
    const map_id = req.body["map-id"];
    const values = [user_id, map_id]
    db.query(`INSERT INTO favourites (user_id, map_id) VALUES ($1, $2)`, values)
    .then(res => res.rows)
    res.redirect(`/api/users/${user_id}/favourites`)
  })

  router.get("/data/:id", (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM favourites JOIN users ON user_id = users.id WHERE user_id = $1`, [id])
    .then((data) => {
      return res.json(data.rows)
    })
  })

  router.post("/favourites/delete", (req,res) => {
    const mapToRemove = Object.keys(req.body)[0];
    const user_id = req.session.user_id;
    db.query(`DELETE FROM favourites WHERE map_id = $1 AND favourites.user_id= $2`, [mapToRemove, user_id])
    .then(() => {
      res.redirect(`/api/users/${user_id}/favourites`)
    })
  })

  router.get("/my/favourites", (req, res) => {
    if(req.session.user_id){
      const id = req.session.user_id;
      return res.redirect(`/api/users/${id}/favourites`);
    }
    const templateVars = {user: req.session.user_id}
    res.render('login', templateVars);
  })

  router.get("/:id/favourites", (req, res) => {
    const id = req.params.id;
    const userId = req.session.user_id;
    db.query(`SELECT favourites.*, maps.* FROM favourites JOIN maps ON maps.id=favourites.map_id WHERE favourites.user_id = $1;`, [id])
    .then((data) => {
      let templateVars = {user: req.session.user_id}
      let parsedData = {}
      data.rows.forEach(row => {
        rowObject = {}
        rowObject.name = row.name
        rowObject.image = row.image_url
        rowObject.id = row.id
        rowObject.currentUserId = userId
        rowObject.userId = id;
        parsedData[row.id] = rowObject
      })
      templateVars["data"] = parsedData
      if (userId) {
        return res.render("user_favourites", templateVars)
      }
      res.redirect("/api/users/login")
    })
    .catch(e => console.log(e))
  });

  router.get("/my/maps", (req, res) => {
    const templateVars = {user: req.session.user_id}
    if(req.session.user_id){
      const id = req.session.user_id;
      return res.redirect(`/api/users/${id}/maps`);
    }
    res.render('login', templateVars);
  })

  router.get("/:id/maps", (req, res) => {
    const id = req.params.id
    db.query(`SELECT maps.* FROM maps JOIN pins ON maps.id = map_id WHERE pins.user_id = $1;`, [id])
    .then((data) => {
      let templateVars = {user: req.session.user_id}
      let parsedData = {}
      console.log(templateVars)
      data.rows.forEach(row => {
        rowObject = {}
        rowObject.name = row.name
        rowObject.image = row.image_url
        rowObject.id = row.id
        parsedData[row.id] = rowObject
      })
      templateVars["data"] = parsedData;
      return res.render("user_maps", templateVars)
    })
  });
  router.get("/my/profile", (req, res) => {
    if(req.session.user_id){
      const id = req.session.user_id;
      return res.redirect(`/api/users/${id}/profile`);
    }
    res.render('login');
  })

  router.get("/:id/profile", (req, res) => {
    const id = req.params.id;
    const userId = req.session.user_id;
    db.query(`SELECT users.email, users.id as userID, favourites.*, maps.* FROM favourites JOIN maps ON maps.id=favourites.map_id JOIN users ON users.id = favourites.user_id WHERE favourites.user_id = $1;`, [id])
    .then((data) => {
      let templateVars = {user: req.session.user_id};
      console.log(data.rows)
      templateVars.userName = data.rows[0].email;
      templateVars.userMaps = data.rows[0].userid;
      let parsedData = {};
      data.rows.forEach(row => {
        rowObject = {};
        rowObject.name = row.name;
        rowObject.image = row.image_url;
        rowObject.id = row.id;
        rowObject.currentUserId = userId;
        rowObject.userId = id;
        parsedData[row.id] = rowObject;
      })
      templateVars["data"] = parsedData;
      // console.log(templateVars)
      if (userId) {
        return res.render("user_profile", templateVars);
      }
      res.redirect("/api/users/login");
    })
    .catch(e => console.log(e));

  });
  return router;
};
