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
-- Table structure for table `data_repair`
--

DROP TABLE IF EXISTS `data_repair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `data_repair` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sys_id` varchar(2) NOT NULL COMMENT '数据维护的系统',
  `dep_id` varchar(2) NOT NULL COMMENT '数据维护系统中的部门',
  `model_id` varchar(4) NOT NULL COMMENT '系统维护部门中的功能模块',
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
  `result_repair_item` varchar(4) DEFAULT NULL COMMENT '导致错误原因：1、系统 ； 2、人工',
  `local` int(2) DEFAULT NULL COMMENT '提交人所在公司/分店',
  `dep` int(2) DEFAULT NULL COMMENT '提交人所在部门',
  `rwsm` varchar(250) NOT NULL COMMENT '任务说明',
  `sql_backup` text NOT NULL COMMENT '修改数据时，使用的SQL语句',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='修复数据申请表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_repair`
--

LOCK TABLES `data_repair` WRITE;
/*!40000 ALTER TABLE `data_repair` DISABLE KEYS */;
INSERT INTO `data_repair` VALUES (1,'1','2','3','分派给老张','2015-11-02 04:46:44','1','10','2',4,'任务总结：','2015-11-02 05:24:14','1','3','张宁思','修复 体检系统 检验科 血常规中的数据错误','2015-11-02 04:47:32','2015-11-25 16:00:00','1',2,10,'','SQL语句：');
/*!40000 ALTER TABLE `data_repair` ENABLE KEYS */;
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
