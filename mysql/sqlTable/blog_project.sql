/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50736
Source Host           : localhost:3306
Source Database       : blog_project

Target Server Type    : MYSQL
Target Server Version : 50736
File Encoding         : 65001

Date: 2022-04-19 19:58:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_article
-- ----------------------------
DROP TABLE IF EXISTS `tb_article`;
CREATE TABLE `tb_article` (
  `art_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `art_title` varchar(50) DEFAULT '' COMMENT '文章标题',
  `art_content` text COMMENT '文章内容',
  `art_author` int(11) DEFAULT '0' COMMENT '关联作者id',
  `art_status` tinyint(4) DEFAULT '0' COMMENT '审核状态',
  `art_date` datetime DEFAULT NULL COMMENT '上传时间',
  `art_pic` varchar(200) NOT NULL DEFAULT '' COMMENT '文章封面图',
  `cate_id` int(11) DEFAULT '0' COMMENT '关联分类id',
  PRIMARY KEY (`art_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_article
-- ----------------------------
INSERT INTO `tb_article` VALUES ('1', '财经新闻1', '<p>财经新闻财经新闻财经新闻</p>', '34', '1', '2022-04-16 10:12:17', '2ccd984d261962d8906688229b138c77.jpg', '6');
INSERT INTO `tb_article` VALUES ('2', '财经新闻1', '<p>财经新闻财经新闻财经新闻</p>', '34', '1', '2022-04-16 10:12:17', '848cfa001904eb59e6b12da1b0d7317d.jpg', '25');
INSERT INTO `tb_article` VALUES ('3', '财经新闻1', '<p>财经新闻财经新闻财经新闻</p>', '34', '1', '2022-04-16 10:12:17', 'a58ed5b9973c0aa6b61e7775ba4f21cf.jpg', '7');
INSERT INTO `tb_article` VALUES ('4', '财经新闻1', '<p>财经新闻财经新闻财经新闻</p>', '34', '1', '2022-04-16 10:12:17', 'fb3ddcf3a331381eaba7c2ea018ba4a8.jpg', '24');
INSERT INTO `tb_article` VALUES ('6', '财经新闻1', '<p>财经新闻财经新闻财经新闻</p>', '34', '1', '2022-04-16 10:12:17', '6d18d7d03b9cd875e410322292eece92.jpg', '7');
INSERT INTO `tb_article` VALUES ('15', '财经新闻1', '<p>财经新闻财经新闻财经新闻</p>', '34', '1', '2022-04-16 10:12:17', '7f725f48f44ece998a6930ed0b5b2e3c.jpg', '7');
INSERT INTO `tb_article` VALUES ('32', '5', '<p>5</p>', '5', '0', '2022-04-18 00:00:00', '3d8d531ef26406bca7c4934652a8871a.jpg', '24');
INSERT INTO `tb_article` VALUES ('33', '1', '<p>111</p>', '1', '0', '2022-04-18 00:00:00', '7c9b6915a60ade8d074d38ad347ea96c.jpg', '8');
INSERT INTO `tb_article` VALUES ('34', '555', '<p>55555</p>', '55', '0', '2022-04-18 00:00:00', '137d2d995ade0d3c36aa2d0a86d1eac0.png', '7');
INSERT INTO `tb_article` VALUES ('36', '5', '<p>555</p>', '5', '0', '2022-04-18 00:00:00', 'e3e54227777697aa6cd603fe7943a498.jpg', '7');
INSERT INTO `tb_article` VALUES ('41', '5', '<p>5</p>', '5', '1', '2022-04-19 00:00:00', 'c02aeed622f717578ca238d328e14ef8.png', '7');
INSERT INTO `tb_article` VALUES ('42', '666', '<p>6</p>', '6', '1', '2022-04-19 00:00:00', '927a2df540d583171c523ef27a7cf781.jpg', '7');
INSERT INTO `tb_article` VALUES ('43', '888', '<p>888</p>', '888', '0', '2022-04-19 00:00:00', '1.webp', '8');
INSERT INTO `tb_article` VALUES ('44', '354', '<p>99999999999999999999999999999999999999999999999999999999999999999999</p>', '34', '0', '2022-04-19 11:52:36', 'a68491baf5b1aff413d8c5ee432da599.jpg', '7');

-- ----------------------------
-- Table structure for tb_category
-- ----------------------------
DROP TABLE IF EXISTS `tb_category`;
CREATE TABLE `tb_category` (
  `cate_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `cate_name` varchar(30) DEFAULT '' COMMENT '分类名称',
  PRIMARY KEY (`cate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_category
-- ----------------------------
INSERT INTO `tb_category` VALUES ('6', '财经');
INSERT INTO `tb_category` VALUES ('7', '军事');
INSERT INTO `tb_category` VALUES ('8', '社会');
INSERT INTO `tb_category` VALUES ('24', '搞笑');
INSERT INTO `tb_category` VALUES ('25', '国际');

-- ----------------------------
-- Table structure for tb_settings
-- ----------------------------
DROP TABLE IF EXISTS `tb_settings`;
CREATE TABLE `tb_settings` (
  `set_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '设置id',
  `set_logoPic` varchar(200) DEFAULT '' COMMENT 'logo图片',
  `set_logo` varchar(30) DEFAULT '' COMMENT 'logo名称',
  PRIMARY KEY (`set_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_settings
-- ----------------------------
INSERT INTO `tb_settings` VALUES ('1', '95544ff2d5a5f83fb9b04c3d688cad6a.jpg', '后台管理系统');

-- ----------------------------
-- Table structure for tb_users
-- ----------------------------
DROP TABLE IF EXISTS `tb_users`;
CREATE TABLE `tb_users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `u_name` varchar(30) DEFAULT '' COMMENT '用户名称',
  `u_password` varchar(32) DEFAULT '' COMMENT '用户密码',
  `u_sex` varchar(2) DEFAULT NULL COMMENT '用户性别',
  `u_intro` varchar(100) DEFAULT '' COMMENT '个人介绍',
  `u_avatar` varchar(200) DEFAULT '' COMMENT '用户头像',
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_users
-- ----------------------------
INSERT INTO `tb_users` VALUES ('34', '小白', '28f64065b88982573f427f9d219b64da', '1', '这个人很懒，什么都没有留下', '6b0f0de6d73a8a2650cd0fe8dc5dab6a.jpg');
INSERT INTO `tb_users` VALUES ('35', '小黑', '28f64065b88982573f427f9d219b64da', '2', '', '252602801a962c3df166af92efa9eeac.png');
INSERT INTO `tb_users` VALUES ('36', '小明', '28f64065b88982573f427f9d219b64da', '0', '', 'images/avatar.webp');
INSERT INTO `tb_users` VALUES ('37', '11', 'b4168584f4a3908431f5fd9c2a813af7', '1', '这个人很懒，什么都没有留下', '38226bb7fa93f88069855aa14c8ae789.jpg');
INSERT INTO `tb_users` VALUES ('41', '小白1', '4275affc6968f34305081c9352e26b11', '0', '这个人很懒，什么都没有留下', '359fcf6c080eeb243a65d9dcdcb2a8b9.jpg');
INSERT INTO `tb_users` VALUES ('42', '888', '28f64065b88982573f427f9d219b64da', '2', '000000', 'images/avatar.webp');
INSERT INTO `tb_users` VALUES ('43', '111', '4275affc6968f34305081c9352e26b11', '1', '111111', 'images/avatar.webp');
INSERT INTO `tb_users` VALUES ('44', '1111', '4275affc6968f34305081c9352e26b11', '2', '11111', '4bf63a403c50714ffe2ac6c37453d870.jpg');
INSERT INTO `tb_users` VALUES ('45', '000', '27fbc5e0e8cb4108a5744f6b162fe270', '0', '999999', 'images/avatar.webp');
