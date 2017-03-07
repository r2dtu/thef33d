-- phpMyAdmin SQL Dump
-- version 4.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 14, 2017 @ 1:14 PM
-- Server version: 5.5.49-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

-- Table structure for accounts
CREATE TABLE IF NOT EXISTS `accounts` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `loggedIn` int(1) NOT NULL,
	`categoryIDs` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`youtube_channelId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`reddit_channelId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`pinterest_channelId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`oauth_provider` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`oauth_uid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`created` datetime NOT NULL,
	`lastLoggedIn` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Table structure for emails
CREATE TABLE IF NOT EXISTS `emails` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Table structure for categories
CREATE TABLE IF NOT EXISTS `categories` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `youtube_refs` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `reddit_refs` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `pinterest_refs` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `bg_image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `priority` int(11) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
