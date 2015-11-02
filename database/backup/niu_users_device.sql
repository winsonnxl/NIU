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
-- Table structure for table `users_device`
--

DROP TABLE IF EXISTS `users_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_device` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL COMMENT '同users表中id',
  `device_type` varchar(2) NOT NULL COMMENT '设备类型：1为PC；2为笔记本; 3打印机；4服务器',
  `brand` varchar(45) NOT NULL COMMENT '品牌',
  `sn` varchar(45) NOT NULL COMMENT '设备型号',
  `cpu_brand` varchar(45) NOT NULL COMMENT 'cpu品牌',
  `harddisk` varchar(45) NOT NULL COMMENT '电脑硬盘存储量',
  `memory_size` varchar(45) NOT NULL COMMENT '内存容量',
  `cd` varchar(45) NOT NULL COMMENT '光驱',
  `os` varchar(45) NOT NULL COMMENT '操作系统',
  `browser` varchar(45) NOT NULL COMMENT '浏览器',
  `office` varchar(45) NOT NULL COMMENT '办公软件',
  `defense` varchar(45) NOT NULL COMMENT '杀毒软件',
  `cpu_type` varchar(45) NOT NULL COMMENT 'CPU型号',
  `local` int(2) DEFAULT NULL COMMENT '所在公司或分店',
  `dep` int(2) DEFAULT NULL COMMENT '所在部门',
  `time_buying` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='用户设备记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_device`
--

LOCK TABLES `users_device` WRITE;
/*!40000 ALTER TABLE `users_device` DISABLE KEYS */;
INSERT INTO `users_device` VALUES (3,'0','2','3','1111118888','4','888','88','8','12','14,15','','18','5',2,6,'2015-11-04'),(5,'1','2','3','','0','','','0','0','','','0','0',NULL,NULL,NULL),(7,'5','1','3','','6','','','0','0','13,14,15','','0','7',NULL,NULL,NULL),(8,'3','1','3','答复对方','4','2','2','8','11','13,15','','18','5',NULL,NULL,NULL),(9,'4','2','3','0000','4','00','00','8','12','13,14,15','','18','5',NULL,NULL,NULL),(10,'0','22','3','88','4','222','2','8','11','13,15','','18','5',NULL,NULL,NULL),(11,'2','22','0','','0','','','0','0','','','0','0',NULL,NULL,NULL),(12,'0','1','3','11111','4','2','3','9','11','13,14,15','','18','5',1,0,NULL);
/*!40000 ALTER TABLE `users_device` ENABLE KEYS */;
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
