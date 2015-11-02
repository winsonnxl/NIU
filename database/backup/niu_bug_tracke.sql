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
-- Table structure for table `bug_tracke`
--

DROP TABLE IF EXISTS `bug_tracke`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bug_tracke` (
  `id_bug_tracke` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID主键，唯一值，自增长',
  `title` varchar(30) NOT NULL COMMENT 'BUG问题标题，用最简单的方式告知问题，不超过30个字',
  `bug_description` text NOT NULL COMMENT 'BUG详细描述',
  `bug_suggest` text COMMENT 'BUG问题修改建议',
  `bug_model` int(11) NOT NULL COMMENT 'bug功能模块（界面）',
  `submit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '提交时间',
  `submit_user_id` varchar(10) NOT NULL COMMENT '提交者用户ID',
  `processing_statue` int(11) NOT NULL DEFAULT '0' COMMENT '处理状态：默认值0（未受理）；已受理：1；已指派：2；处理中：3；已完结：4；待确认：5；已确认：6；未完成要求：7；驳回（不受理）8；',
  `processing_result` varchar(250) DEFAULT NULL COMMENT '处理结果及方案描述',
  `result_time` timestamp NULL DEFAULT NULL COMMENT '完结时间',
  `confirm_time` timestamp NULL DEFAULT NULL COMMENT 'BUG修改完成的确认时间',
  `bug_executioner_id` int(11) DEFAULT NULL COMMENT '被指派执行人ID',
  `bug_executioner_name` varchar(45) DEFAULT NULL COMMENT '被指派执行人真实姓名',
  `task_person_id` varchar(45) DEFAULT NULL COMMENT '任务分派人ID',
  `bug_sys` int(2) NOT NULL COMMENT '提交BUG系统，NIU：1；体检：2；CRM：3',
  `bug_level` int(2) NOT NULL COMMENT '1:一般；2：紧急；3：严重',
  `bug_dep` int(2) NOT NULL COMMENT '岗位功能，详见sys_list表',
  `tesk_descrption` varchar(250) DEFAULT NULL COMMENT '指派任务时，附带的简单说明',
  `work_end_date` timestamp NULL DEFAULT NULL COMMENT '执行人确定任务完成日期',
  `local` int(2) DEFAULT NULL COMMENT '提交者所在公司/分店',
  `dep` int(2) DEFAULT NULL COMMENT '提交者所在部门',
  PRIMARY KEY (`id_bug_tracke`),
  UNIQUE KEY `id_bug_tracke_UNIQUE` (`id_bug_tracke`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='BUG提交信息记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bug_tracke`
--

LOCK TABLES `bug_tracke` WRITE;
/*!40000 ALTER TABLE `bug_tracke` DISABLE KEYS */;
INSERT INTO `bug_tracke` VALUES (1,'dfdfdfdfd','fdfdfdfdfdfd','',7,'2015-11-02 02:28:41','1',0,NULL,NULL,NULL,NULL,NULL,NULL,1,1,2,NULL,NULL,2,10);
/*!40000 ALTER TABLE `bug_tracke` ENABLE KEYS */;
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
