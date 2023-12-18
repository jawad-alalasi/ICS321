-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: mydatabase
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blood_drive`
--

DROP TABLE IF EXISTS `blood_drive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_drive` (
  `FROM_DATE` date NOT NULL,
  `NUMBER` int NOT NULL AUTO_INCREMENT,
  `LOCATION` varchar(30) NOT NULL,
  `TO_DATE` date NOT NULL,
  PRIMARY KEY (`NUMBER`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_drive`
--

LOCK TABLES `blood_drive` WRITE;
/*!40000 ALTER TABLE `blood_drive` DISABLE KEYS */;
INSERT INTO `blood_drive` VALUES ('2023-01-01',1,'Jeddah','2023-01-02'),('2023-02-01',2,'Kfupm','2023-02-02'),('2023-03-01',3,'Kfupm','2023-03-02'),('2023-04-01',4,'Kfupm','2023-04-02'),('2023-05-01',5,'Kfupm','2023-05-02'),('2023-06-01',6,'Kfupm','2023-06-02'),('2023-07-01',7,'Kfupm','2023-07-02'),('2023-08-01',8,'Kfupm','2023-08-02'),('2023-09-01',9,'Kfupm','2023-09-02'),('2023-10-01',10,'Kfupm','2023-10-02'),('2023-12-05',11,'KFUPM','2023-12-07'),('2023-12-17',12,'Khobar','2023-12-17');
/*!40000 ALTER TABLE `blood_drive` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-18 13:24:03
