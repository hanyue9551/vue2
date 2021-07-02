/*
 Navicat Premium Data Transfer

 Source Server         : HansSQL
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : vueSql

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 01/06/2021 17:10:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for userList
-- ----------------------------
DROP TABLE IF EXISTS `userList`;
CREATE TABLE `userList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `create_time` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userList
-- ----------------------------
BEGIN;
INSERT INTO `userList` VALUES (1, 'han', 111, NULL, '2021-06-01 16:30:37.597');
INSERT INTO `userList` VALUES (2, 'han2', NULL, NULL, '2021-06-01 16:30:37.597');
INSERT INTO `userList` VALUES (5, 'han2', 12, 'ddd', '2021-06-01 16:30:37.597');
INSERT INTO `userList` VALUES (6, 'han3', 11, NULL, '2021-06-01 16:30:37.597');
INSERT INTO `userList` VALUES (7, 'han3', 1, '2', '2021-06-01 16:30:50.495');
COMMIT;

-- ----------------------------
-- Table structure for userLogin
-- ----------------------------
DROP TABLE IF EXISTS `userLogin`;
CREATE TABLE `userLogin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userLogin
-- ----------------------------
BEGIN;
INSERT INTO `userLogin` VALUES (1, 'admin', 'Z+DjxuBRxX1od+5xqc6Lbe61DTpSoTMKb1lNMHTCkxU=', 1);
INSERT INTO `userLogin` VALUES (2, 'han', 'Z+DjxuBRxX1od+5xqc6Lbe61DTpSoTMKb1lNMHTCkxU=', 2);
COMMIT;
