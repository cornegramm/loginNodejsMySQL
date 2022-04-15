CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

  CREATE TABLE IF NOT EXISTS `users` (
    `email` varchar(100) NOT NULL PRIMARY KEY,
    `name` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
  );
