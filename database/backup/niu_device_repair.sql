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
-- Table structure for table `device_repair`
--

DROP TABLE IF EXISTS `device_repair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_repair` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `repair_type` varchar(2) NOT NULL COMMENT '维护项目类型：1已绑定个人设备；2办公公用设备；3软件',
  `device_item` varchar(2) NOT NULL COMMENT '设备类目，同device_dic中的ID',
  `device_id` varchar(4) NOT NULL COMMENT '同users_device的ID字段',
  `description` text COMMENT '问题描述\n',
  `submit_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '提交时间',
  `submit_user` varchar(45) DEFAULT NULL COMMENT '提交人ID',
  `submit_user_dep` varchar(45) DEFAULT NULL COMMENT '提交人所在部门',
  `submit_user_local` varchar(45) DEFAULT NULL COMMENT '提交维护人所在店或地域',
  `processing_statue` int(11) DEFAULT NULL COMMENT '处理状态',
  `processing_result` varchar(250) DEFAULT NULL COMMENT '处理结果描述',
  `end_time` timestamp NULL DEFAULT NULL COMMENT '完结时间',
  `task_person_id` varchar(45) DEFAULT NULL COMMENT '任务分配人ID',
  `executioner_id` varchar(45) DEFAULT NULL COMMENT '执行人ID',
  `executioner_name` varchar(45) DEFAULT NULL COMMENT '执行人真实姓名',
  `title` varchar(45) DEFAULT NULL COMMENT '维修标题：维修项目+设备类目+设备名称',
  `confirm_time` timestamp NULL DEFAULT NULL COMMENT '系统自动记录，任务被确认执行的时间',
  `work_end_date` timestamp NULL DEFAULT NULL COMMENT '任务预计完成时间',
  `result_repair_item` varchar(4) DEFAULT NULL COMMENT '设备维修详细部件，详见repair_dic',
  `local` int(2) DEFAULT NULL COMMENT '提交人所在公司/分店',
  `dep` int(2) DEFAULT NULL COMMENT '提交人所在部门',
  `rwsm` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='设备维修申请、记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_repair`
--

LOCK TABLES `device_repair` WRITE;
/*!40000 ALTER TABLE `device_repair` DISABLE KEYS */;
INSERT INTO `device_repair` VALUES (1,'1','0','0','ererererere','2015-10-26 03:08:22','1','9','2',4,NULL,NULL,'1','2','牛晓亮',NULL,NULL,NULL,NULL,NULL,NULL,''),(2,'2','2','3','给牛晓亮','2015-10-26 03:09:24','1','9','2',4,'地对地导弹','0000-00-00 00:00:00','1','2','牛晓亮',NULL,'0000-00-00 00:00:00','2015-10-26 16:00:00','8',NULL,NULL,''),(3,'3','0','0','水电费对方收到 ','2015-10-26 06:35:24','1','9','2',3,NULL,NULL,'1','2','牛晓亮',NULL,'2015-10-30 09:48:13','2015-10-29 16:00:00',NULL,NULL,NULL,''),(5,'2','1','7','sdfsadf f fsdffaf f f asfsa','2015-10-26 06:48:13','1','9','2',4,'地方是否对方','2015-10-28 09:09:24','1','3','张宁思','办公设备 PC Acer明基','2015-10-28 07:47:00','2015-10-28 16:00:00','23',NULL,NULL,''),(6,'3','0','0','帮我转个Office呗','2015-10-26 07:40:51','1','9','2',0,NULL,NULL,NULL,NULL,NULL,'软件维护',NULL,NULL,NULL,NULL,NULL,''),(7,'2','1','8','鹅鹅鹅额','2015-10-26 07:56:03','1','9','2',8,NULL,NULL,'1','2','牛晓亮','办公设备 PC Acer明基答复对方',NULL,NULL,NULL,NULL,NULL,''),(8,'3','0','0','二二二二二二恶人二确认王柔柔玩儿我玩儿去','2015-10-28 05:52:32','6','3','1',0,NULL,NULL,NULL,NULL,NULL,'软件维护',NULL,NULL,NULL,NULL,NULL,''),(9,'2','1','7','的发生地方的身份对方','2015-10-28 06:40:59','1','9','2',0,NULL,NULL,NULL,NULL,NULL,'办公设备 PC Acer明基',NULL,NULL,NULL,NULL,NULL,''),(10,'1','0','0','都是的方式的','2015-10-28 09:18:28','2','9','2',0,NULL,NULL,'2','2','牛晓亮','个人设备',NULL,NULL,NULL,NULL,NULL,''),(11,'3','0','0','答复对方','2015-10-28 09:38:39','3','9','2',0,NULL,NULL,NULL,NULL,NULL,'软件维护',NULL,NULL,NULL,NULL,NULL,''),(12,'2','2','9','gfdgfgfgfdg','2015-10-30 02:56:41','1','10','2',0,NULL,NULL,NULL,NULL,NULL,'办公设备 笔记本 Acer明基0000',NULL,NULL,NULL,2,10,''),(13,'1','0','0','dsfdsfdfdffsdfdsfsd','2015-10-30 10:44:23','1','10','2',0,NULL,NULL,NULL,NULL,NULL,'个人设备',NULL,NULL,NULL,2,10,''),(14,'1','0','0','fdfdfdfddf','2015-10-30 11:04:11','6','3','1',0,NULL,NULL,NULL,NULL,NULL,'个人设备',NULL,NULL,NULL,1,3,''),(15,'1','0','0','fdfdfdfddf','2015-10-30 11:04:11','6','3','1',0,NULL,NULL,NULL,NULL,NULL,'个人设备',NULL,NULL,NULL,1,3,''),(16,'1','2','5','dfdfdfdfdfdfdfdffdfd','2015-10-30 11:04:28','1','10','2',0,NULL,NULL,NULL,NULL,NULL,'个人设备',NULL,NULL,NULL,2,10,''),(17,'2','22','10','dfdfdf ','2015-10-30 11:05:00','1','10','2',0,NULL,NULL,NULL,NULL,NULL,'办公设备 服务器 Acer明基88',NULL,NULL,NULL,2,10,''),(18,'1','2','5','dsfsfsdffsafasf','2015-10-30 11:07:08','1','10','2',0,NULL,NULL,NULL,NULL,NULL,'个人设备',NULL,NULL,NULL,2,10,''),(19,'1','0','0','fgdfgfdfgd','2015-10-30 11:25:25','6','3','1',0,NULL,NULL,NULL,NULL,NULL,'个人设备',NULL,NULL,NULL,1,3,''),(20,'1','0','0','fgdfgfdfgd','2015-10-30 11:25:42','6','3','1',0,NULL,NULL,NULL,NULL,NULL,'个人设备',NULL,NULL,NULL,1,3,''),(21,'2','22','10','fgdfgfdfgd','2015-10-30 11:26:03','6','3','1',0,NULL,NULL,NULL,NULL,NULL,'办公设备 服务器 Acer明基88',NULL,NULL,NULL,1,3,'');
/*!40000 ALTER TABLE `device_repair` ENABLE KEYS */;
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
