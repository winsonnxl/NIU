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
-- Table structure for table `company_dep_dic`
--

DROP TABLE IF EXISTS `company_dep_dic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_dep_dic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL COMMENT '分级：0为分店名称；1为部门名称',
  `content` varchar(18) DEFAULT NULL COMMENT '名字',
  `dep` varchar(45) DEFAULT NULL COMMENT '分店所涵盖部门，取2级分类ID，已半角逗号分割',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='公司分属字典表，涉及到公司分店，部门信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_dep_dic`
--

LOCK TABLES `company_dep_dic` WRITE;
/*!40000 ALTER TABLE `company_dep_dic` DISABLE KEYS */;
INSERT INTO `company_dep_dic` VALUES (1,0,'方圆店','2,3,4,5,6,7,8,10'),(2,0,'金融街店','5,6,7,10'),(3,1,'销售部',NULL),(4,1,'综合管理',NULL),(5,1,'体检部',NULL),(6,1,'会员部',NULL),(7,1,'呼叫中心',NULL),(8,1,'市场部',NULL),(10,1,'信息部','');
/*!40000 ALTER TABLE `company_dep_dic` ENABLE KEYS */;
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
