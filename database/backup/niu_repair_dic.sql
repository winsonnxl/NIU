CREATE DATABASE  IF NOT EXISTS `niu` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `niu`;
-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: niu
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

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
-- Table structure for table `repair_dic`
--

DROP TABLE IF EXISTS `repair_dic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `repair_dic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(20) DEFAULT NULL COMMENT '名称',
  `type` varchar(4) DEFAULT NULL COMMENT '归类：0一级类；其他数字对应相关一级类ID',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='维护类型及项目字典';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repair_dic`
--

LOCK TABLES `repair_dic` WRITE;
/*!40000 ALTER TABLE `repair_dic` DISABLE KEYS */;
INSERT INTO `repair_dic` VALUES (1,'PC','0'),(2,'打印机','0'),(3,'投影仪','0'),(4,'显示器','1'),(5,'网卡','1'),(6,'主板','1'),(7,'鼠标','1'),(8,'硒鼓','2'),(9,'走纸轮','2'),(10,'灯泡','3'),(11,'笔记本','0'),(12,'键盘','11'),(13,'鼠标','11');
/*!40000 ALTER TABLE `repair_dic` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-02 13:49:59
