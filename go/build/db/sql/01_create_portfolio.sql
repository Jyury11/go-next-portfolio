DROP TABLE IF EXISTS portfolio;

CREATE TABLE IF NOT EXISTS portfolio (
  id integer PRIMARY KEY AUTO_INCREMENT,
  title varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  image varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  category varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  description varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  skill_level integer NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
