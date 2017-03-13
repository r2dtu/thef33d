
--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `y_id` varchar(128) DEFAULT NULL,
  `r_id` varchar(128) DEFAULT NULL,
  `p_id` varchar(128) DEFAULT NULL,
  `oauth_provider` varchar(128) NOT NULL,
  `oauth_uid` varchar(128) NOT NULL,
  `y_rtoken` varchar(255) DEFAULT NULL,
  `r_rtoken` varchar(255) DEFAULT NULL,
  `p_rtoken` varchar(255) DEFAULT NULL,
  `logged_in` int(11) NOT NULL,
  `hwid` varchar(12) NOT NULL DEFAULT "",
  PRIMARY KEY (`username`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `thefeed`.`accounts` (`username`, `password`, `first_name`, `y_id`) VALUES ('dctu@ucsd.edu', 'WTF110lecture', 'David', 'UCsWFLT73oruDCILtslNbaVQ');
--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `c_id` varchar(13) NOT NULL,
  `username` varchar(128) NOT NULL,
  `c_name` varchar(128) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `organized` varchar(128) NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `c_id` (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `thefeed`.`categories` (`c_id`, `username`, `c_name`, `img`, `organized`) VALUES (1, 'dctu@ucsd.edu', 'Development', 'http://thef33d.me/bg_images/dctu@ucsd.edu/Lunar1.jpg', 'a-z:A-Z');
INSERT INTO `thefeed`.`categories` (`c_id`, `username`, `c_name`, `img`, `organized`) VALUES (2, 'dctu@ucsd.edu', 'Disney', 'http://thef33d.me/bg_images/dctu@ucsd.edu/snowy-mointain.jpg', 'a-z:A-Z');
INSERT INTO `thefeed`.`categories` (`c_id`, `username`, `c_name`, `img`, `organized`) VALUES (3, 'dctu@ucsd.edu', 'Math', 'http://thef33d.me/bg_images/dctu@ucsd.edu/rainforest.jpg', 'a-z:A-Z');

--
-- Table structure for table `pinterest_subs`
--

DROP TABLE IF EXISTS `p_subs`;
CREATE TABLE `p_subs` (
  `id` int(11) AUTO_INCREMENT,
  `c_id` varchar(13) NOT NULL,
  `sub_name` varchar(128) NOT NULL,
  `sub_id` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `reddit_subs`
--

DROP TABLE IF EXISTS `r_subs`;
CREATE TABLE `r_subs` (
  `id` int(11) AUTO_INCREMENT,
  `c_id` varchar(13) NOT NULL,
  `sub_name` varchar(128) NOT NULL,
  `sub_id` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `youtube_subs`
--

DROP TABLE IF EXISTS `y_subs`;
CREATE TABLE `y_subs` (
  `id` int(11) AUTO_INCREMENT,
  `c_id` varchar(13) NOT NULL,
  `sub_name` varchar(128) NOT NULL,
  `sub_id` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `thefeed`.`y_subs` (`sub_name`, `sub_id`, `c_id`) VALUES ('YouTube for Developers', 'UCtVd0c0tGXuTSbU5d8cSBUg', '1');
INSERT INTO `thefeed`.`y_subs` (`sub_name`, `sub_id`, `c_id`) VALUES ('DisneyMusicVEVO', 'UCgwv23FVv3lqh567yagXfNg', '2');
INSERT INTO `thefeed`.`y_subs` (`sub_name`, `sub_id`, `c_id`) VALUES ('Mathematics - Topic', 'UCT4-UAcRfvBtO76gX2vexpA', '3');
INSERT INTO `thefeed`.`y_subs` (`sub_name`, `sub_id`, `c_id`) VALUES ('Numberphile', 'UCoxcjq-8xIDTYp3uz647V5A', '3');

