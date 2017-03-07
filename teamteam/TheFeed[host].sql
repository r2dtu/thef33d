/*CREATE TABLE `thefeed`.`accounts` (
	`username` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
	`password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`y_id` varchar(255) DEFAULT NULL,
	`r_id` varchar(255) DEFAULT NULL,
	`p_id` varchar(255) DEFAULT NULL,
    `oauth_provider` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`oauth_uid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`created` datetime NOT NULL,
	`lastLoggedIn` datetime NOT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `thefeed`.`categories` (
	`c_id` varchar(255) NOT NULL,
	`username` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
	`c_name` varchar(127) NOT NULL,
	`img` varchar(255) DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
*/

-- MySQL dump 10.13  Distrib 5.5.54, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: thefeed
-- ------------------------------------------------------
-- Server version	5.5.54-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `y_id` varchar(20) DEFAULT NULL,
  `r_id` varchar(20) DEFAULT NULL,
  `p_id` varchar(20) DEFAULT NULL,
  `oauth_provider` varchar(255) NOT NULL,
  `oauth_uid` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `lastLoggedIn` datetime NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('','',NULL,NULL,NULL),('dctu@ucsd.edu','WTF110lecture',NULL,NULL,NULL),('foo','bar','foo_y_channel_id',NULL,NULL),('gkarma','mypassword',NULL,NULL,NULL);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `c_id` varchar(13) NOT NULL,
  `username` varchar(20) NOT NULL,
  `c_name` varchar(25) NOT NULL,
  `img` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `c_id` (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('c_id_cat_vids','foo','Cat Videos',NULL),('c_id_cooking','foo','Cooking',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `p_subs`
--

DROP TABLE IF EXISTS `p_subs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `p_subs` (
  `sub` varchar(20) NOT NULL,
  `c_id` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `p_subs`
--

LOCK TABLES `p_subs` WRITE;
/*!40000 ALTER TABLE `p_subs` DISABLE KEYS */;
/*!40000 ALTER TABLE `p_subs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `r_subs`
--

DROP TABLE IF EXISTS `r_subs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `r_subs` (
  `sub` varchar(20) NOT NULL,
  `c_id` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `r_subs`
--

LOCK TABLES `r_subs` WRITE;
/*!40000 ALTER TABLE `r_subs` DISABLE KEYS */;
/*!40000 ALTER TABLE `r_subs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `y_subs`
--

DROP TABLE IF EXISTS `y_subs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `y_subs` (
  `sub` varchar(20) NOT NULL,
  `c_id` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `y_subs`
--

LOCK TABLES `y_subs` WRITE;
/*!40000 ALTER TABLE `y_subs` DISABLE KEYS */;
INSERT INTO `y_subs` VALUES ('y_sub1_cooking','c_id_cooking'),('y_sub2_cooking','c_id_cooking'),('y_sub3_cooking','c_id_cooking'),('y_sub1_cat_vids','c_id_cat_vids'),('y_sub2_cat_vids','c_id_cat_vids');
/*!40000 ALTER TABLE `y_subs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-03  1:09:08
