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
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `NAME` varchar(30) NOT NULL,
  `AGE` int NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `PHONE` varchar(15) NOT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  `ADDRESS` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES ('Ahmed Ali',28,'ahmed.ali@email.com','555-1234',1,'123 Hospital Street'),('Layla Khalil',33,'layla.khalil@email.com','555-5678',2,'456 Tree Street'),('Mohammed Abdullah',31,'mohammed.abdullah@email.com','555-9876',3,'789 River Street'),('Fatima Suleiman',35,'fatima.suleiman@email.com','555-4321',4,'101 Zahraa Street'),('Karim Hassan',29,'karim.hassan@email.com','555-8765',5,'202 Peace Street'),('Norhan Ali',30,'norhan.ali@email.com','555-3456',6,'303 Garden Street'),('Radwan Hamdi',27,'radwan.hamdi@email.com','555-6543',7,'404 University Street'),('Maissa Youssef',32,'maissa.youssef@email.com','555-2345',8,'505 Strawberry Street'),('Abdulrahman Adel',34,'abdulrahman.adel@email.com','555-7654',9,'606 Pine Street'),('Latifa Mahmoud',36,'latifa.mahmoud@email.com','555-8765',10,'707 Cupboard Street');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-18 13:24:02
