INSERT INTO pins (name, description, address, image_url, user_id, map_id) VALUES ('Top Gun Burger', 'Best burgers in Toronto!', '251 Augusta Ave', 'http://www.blogto.com/listings/restaurants/upload/2016/01/20150109-590-TopGunBurger2.jpg', 1, 1);
INSERT INTO pins (name, description, address, image_url, user_id, map_id) VALUES ('Fuwa Fuwa Japanese Pancakes', 'Best pancakes ever!', '2471 Yonge St', 'https://www.fuwafuwapancakes.com/wp-content/uploads/2018/05/fluffy-pancake-toronto-475x356.jpg', 2, 2);
INSERT INTO pins (name, description, address, image_url, user_id, map_id) VALUES ('Soloways Hotdog Factory Outlet', 'Best hot dogs in the city!', '79 Richmond St E', 'https://s3-media0.fl.yelpcdn.com/bphoto/u0s6obcpGAKOE9k0SmqUHg/o.jpg', 3, 3);

-- CREATE TABLE pins (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   description text NOT NULL,
--   image_url VARCHAR(255)9,
--   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
-- )
