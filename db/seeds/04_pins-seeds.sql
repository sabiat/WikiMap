INSERT INTO pins (name, description, address, image_url, user_id, map_id) VALUES ('Top Gun Burger', 'Best burgers in Toronto!', '251 Augusta Ave', 'http://www.blogto.com/listings/restaurants/upload/2016/01/20150109-590-TopGunBurger2.jpg', 1, 1);
INSERT INTO pins (name, description, address, image_url, user_id, map_id) VALUES ('NomNomNom Poutine', 'Best poutine in Toronto!', '707 Dundas St W', 'https://media.timeout.com/images/105451314/image.jpg', 1, 1);
INSERT INTO pins (name, description, address, image_url, user_id, map_id) VALUES ('Fuwa Fuwa Japanese Pancakes', 'Best pancakes ever!', '2471 Yonge St', 'https://www.fuwafuwapancakes.com/wp-content/uploads/2018/05/fluffy-pancake-toronto-475x356.jpg', 2, 2);
INSERT INTO pins (name, description, address, image_url, user_id, map_id) VALUES ('Soloways Hotdog Factory Outlet', 'Best hot dogs in the city!', '79 Richmond St E', 'https://s3-media0.fl.yelpcdn.com/bphoto/u0s6obcpGAKOE9k0SmqUHg/o.jpg', 3, 3);
INSERT INTO pins (name, description, address, image_url, user_id, map_id) VALUES ('Toronto City Hall', 'Star Trek', '100 Queen St W', 'https://a.cdn-hotels.com/gdcs/production118/d1365/912395e0-db82-11e8-8022-0242ac11000d.jpg', 1, 4);
INSERT INTO pins (name, description, address, image_url, user_id, map_id) VALUES ('Royal York Hotel', 'Red', '100 Front St W', 'https://www.fairmont.com/assets/0/104/2793/2798/4415/4423/b40e541e-7b09-4b45-8c89-04c5453dfa5e.jpg', 1, 4);
INSERT INTO pins (name, description, address, image_url, user_id, map_id) VALUES ('Capilano Suspension Bridge Park', 'Outdoor activity', '3735 Capilano Road', 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Cliffwalk-on-a-sunny-day-at-Capilano-Suspension-Bridge-Park_CE991BB0-6594-4E81-8EE4A0A03FF22C42_99141dc5-4edc-4762-b2e8b63cab319d2a.jpg', 2, 5);


-- CREATE TABLE pins (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   description text NOT NULL,
--   image_url VARCHAR(255)9,
--   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
-- )
