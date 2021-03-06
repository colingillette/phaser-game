/*
	Run this script to create the table needed to store scoring information.
*/

CREATE DATABASE `platformer` /*!40100 DEFAULT CHARACTER SET latin1 */;

CREATE TABLE `platformer`.`scores` (
  `score_id` int(11) NOT NULL AUTO_INCREMENT,
  `display_name` varchar(30) NOT NULL,
  `score` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`score_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `platformer`.`scores`
(`display_name`,
`score`,
`level`,
`datetime`)
VALUES
('Tester 1', 500, 6, '2019-04-17 10:33:00'),
('Tester 2', 120, 3, '2019-04-17 10:37:00'),
('Tester 3', 780, 7, '2019-04-19 16:08:00'),
('Tester 4', 1065, 8, '2019-04-23 07:53:00'),
('Tester 5', 4150, 15, '2019-04-25 22:19:00'),
('Colin', 2800, 12, '2019-05-02 07:39:00'),
('Colin Again', 2350, 11, '2019-04-30 19:25:00'),
('Trying Hard', 3620, 13, '2019-04-29 09:48:00'),
('Not Trying as Hard', 80, 3, '2019-05-03 22:51:00'),
('Tester 6', 1960, 9, '2019-05-04 23:07:00');
