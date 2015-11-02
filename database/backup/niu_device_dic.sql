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
-- Table structure for table `device_dic`
--

DROP TABLE IF EXISTS `device_dic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_dic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL COMMENT '类型：1：设备类目。2：品牌。 3：处理器品牌。 4：处理器型号。 5光驱。 6：操作系统。 7：浏览器。 8：办公软件。 9：杀毒软件。10：配件名称',
  `level` varchar(2) NOT NULL DEFAULT '0' COMMENT '信息分类等级：0表示一级类（无二级选项），1表示二级类（有上级选项）',
  `uplevel` varchar(4) NOT NULL DEFAULT '0' COMMENT '上级归属，默认0为无上级',
  `content` varchar(20) NOT NULL COMMENT '信息内容',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COMMENT='设备信息字典表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_dic`
--

LOCK TABLES `device_dic` WRITE;
/*!40000 ALTER TABLE `device_dic` DISABLE KEYS */;
INSERT INTO `device_dic` VALUES (1,'1','0','0','PC'),(2,'1','0','0','笔记本'),(3,'2','0','0','Acer明基'),(4,'3','0','0','Inter'),(5,'4','1','4','酷睿i5'),(6,'3','0','0','AMD'),(7,'4','1','6','皓龙'),(8,'5','0','0','无光驱'),(9,'5','0','0','有光驱无刻录'),(10,'5','0','0','有光驱DVD刻录'),(11,'6','0','0','Windows XP'),(12,'6','0','0','Windows 7'),(13,'7','0','0','IE6'),(14,'7','0','0','IE7'),(15,'7','0','0','Chrome'),(16,'8','0','0','office 2010'),(17,'8','0','0','office 2013'),(18,'9','0','0','金山毒霸'),(19,'9','0','0','360杀毒'),(20,'10','1','1','网卡'),(21,'10','1','2','键盘'),(22,'1','0','0','服务器'),(23,'10','1','22','UPS');
/*!40000 ALTER TABLE `device_dic` ENABLE KEYS */;
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
