-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2023 at 11:02 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `development`
--
DROP DATABASE IF EXISTS `development`;
CREATE DATABASE IF NOT EXISTS `development` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `development`;

-- --------------------------------------------------------

--
-- Table structure for table `developmentteams`
--

CREATE TABLE `developmentteams` (
  `teamId` int(11) NOT NULL,
  `teamName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `developmentteams`
--

INSERT INTO `developmentteams` (`teamId`, `teamName`) VALUES
(1, 'UI Team'),
(2, 'Mobile Team'),
(3, 'React Team');

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `meetingId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `startDateTime` datetime NOT NULL,
  `endDateTime` datetime NOT NULL,
  `meetingDuration` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `room` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`meetingId`, `teamId`, `startDateTime`, `endDateTime`, `meetingDuration`, `description`, `room`) VALUES
(4, 1, '2022-12-06 16:55:49', '2022-12-06 18:55:49', 0, 'This is a very important meating', 'Blue Room'),
(5, 2, '2022-12-06 16:55:49', '2022-12-06 19:57:31', 0, 'This is a very important meating', 'Meating Room'),
(6, 3, '2022-12-06 16:55:49', '2022-12-06 19:55:49', 0, 'This is a very important meating', 'Chair Room'),
(7, 1, '2022-12-06 16:55:49', '2022-12-06 19:55:49', 0, 'Anazing', 'Yellow Room'),
(8, 3, '2022-12-06 16:55:49', '2022-12-06 19:57:31', 0, 'Amazing react meeting', 'Small Room'),
(9, 2, '2022-12-06 16:55:49', '2022-12-06 19:57:31', 0, 'Boring meeting...', 'Large Room'),
(10, 2, '2022-12-06 16:55:49', '2022-12-06 19:57:31', 0, 'Long meeting', 'Sisx Room'),
(11, 1, '2022-12-06 10:55:49', '2022-12-06 19:57:31', 0, 'Good', 'Red Room'),
(12, 1, '2022-12-06 15:55:00', '2022-12-06 19:58:00', 0, 'Nice meeting', 'Red Room');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `developmentteams`
--
ALTER TABLE `developmentteams`
  ADD PRIMARY KEY (`teamId`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meetingId`),
  ADD KEY `teamId` (`teamId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `developmentteams`
--
ALTER TABLE `developmentteams`
  MODIFY `teamId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meetingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `developmentteams` (`teamId`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Database: `holidays`
--
DROP DATABASE IF EXISTS `holidays`;
CREATE DATABASE IF NOT EXISTS `holidays` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `holidays`;

-- --------------------------------------------------------

--
-- Table structure for table `followedvacations`
--

CREATE TABLE `followedvacations` (
  `vacationId` int(11) NOT NULL,
  `followNum` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followedvacations`
--

INSERT INTO `followedvacations` (`vacationId`, `followNum`) VALUES
(1, 0),
(2, 3),
(3, 1),
(4, 1),
(5, 0),
(6, 0),
(7, 0),
(8, 0),
(9, 0),
(10, 0),
(11, 0),
(12, 0),
(13, 0),
(14, 0),
(15, 0),
(16, 0),
(21, 0);

-- --------------------------------------------------------

--
-- Table structure for table `useractivity`
--

CREATE TABLE `useractivity` (
  `vacationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `useractivity`
--

INSERT INTO `useractivity` (`vacationId`, `userId`) VALUES
(2, 15),
(2, 14),
(3, 14),
(4, 14);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(10) NOT NULL,
  `lastName` varchar(10) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `userName`, `password`, `role`) VALUES
(13, 'stavit', 'maimoni', 'Stavit', '0de40fc6986405dd5e6b0462ec5882edaca133067edbc1af1df32d83ba8edeeea3eb685e0deb07bd823e10f6ce1c9085b24b31cf35bc5614ec54f5ea933f406c', 'Admin'),
(14, 'Britney ', 'Spears', 'britneySpears', '0de40fc6986405dd5e6b0462ec5882edaca133067edbc1af1df32d83ba8edeeea3eb685e0deb07bd823e10f6ce1c9085b24b31cf35bc5614ec54f5ea933f406c', 'User'),
(15, 'You', 'Cool', 'Youcool', '0de40fc6986405dd5e6b0462ec5882edaca133067edbc1af1df32d83ba8edeeea3eb685e0deb07bd823e10f6ce1c9085b24b31cf35bc5614ec54f5ea933f406c', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `uuId` varchar(300) NOT NULL,
  `destination` varchar(20) NOT NULL,
  `description` varchar(60) NOT NULL,
  `price` decimal(11,0) NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `imageName` varchar(100) NOT NULL,
  `isFollow` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `uuId`, `destination`, `description`, `price`, `checkIn`, `checkOut`, `imageName`, `isFollow`) VALUES
(1, '75e5aa00-6644-4226-bbbc-44b1f022ebf5', 'Hawaii Maui', 'Maui, Hawaii is one of the most sought-after destinations on', '20000', '2022-12-23', '2022-12-25', 'd12ad9be-5ef8-4770-968b-85b79a71cf71.jpg', 0),
(2, '565350e2-21f2-4d3b-92fb-7cb86aa64db6', 'French Plynesia Tahi', 'Here, in The Islands of Tahiti, you will find the freedom an', '80000', '2022-11-18', '2023-11-20', 'French_Plynesia_ Tahiti.jpg', 1),
(3, 'a8194bb9-ab55-4c5c-8832-9e4184801041', 'Bora Bora', 'Bora Bora island will make you feel love at first sight. Wit', '50000', '2022-12-15', '2021-12-16', 'Bora_Bora.jpg', 1),
(4, '2668099a-28d3-42fc-9387-694566189c29', 'New Zealand', 'Witness Gorgeous Coastline and Adventure Filled Landscapes. ', '52000', '2022-12-10', '2022-12-13', 'New_Zealand.jpg', 1),
(5, '809f9d0c-03f5-41ea-9fb2-f49f89aa8bde', 'Maldives', 'The Maldives is a tropical island nation known for its beach', '100000', '2022-11-24', '2022-11-26', 'Maldives.jpg', 0),
(6, '8d74451d-c5d2-43e3-8828-00cc6fd4ff92', 'London', 'London is the capital and largest city of England and the UK', '15000', '2022-12-21', '2022-12-22', '1814b356-60d6-4df3-a71d-c89e32a86ffc.jpg', 0),
(7, '82ebafc5-ecdc-4b9d-83b1-48af56e0d1f9', 'Rome', 'Italy has it all – fabulous food and wine, no shortage of he', '70000', '2022-11-20', '2022-11-25', 'Rome.jpg', 0),
(8, '84229540-2a5a-47d4-8692-6abbbe490f69', 'Turks and Caicos', 'For everyone who has ever dreamed of the perfect tropical hi', '30000', '2022-11-17', '2022-11-19', 'Turks_and_ Caicos.jpg', 0),
(9, '493b0b3d-8a6f-4f72-a516-2639cd6f0a61', 'Tokyo ', 'Tokyo is a city of surprises — ancient temples are nestled a', '25000', '2022-11-19', '2022-11-21', 'Tokyo.jpg', 0),
(10, '5121b379-b4a5-4a9e-8e50-859a1ec0e1b5', 'Paris', 'An undeniably French city, Paris is a must-see destination w', '15000', '2023-01-19', '2023-01-20', 'Paris.jpg', 0),
(11, 'e93f3079-4b4d-41d5-a95d-2e8260236844', 'Jerusalem', 'The holiest city in the whole world. you must visit there', '2022', '2022-12-26', '2022-12-31', '4a0c8ace-e819-4903-820b-6c9bbcbebbd3.jpg', 0),
(12, 'd45d9fa6-4a0a-4473-9b3d-8ff8dcbecf92', 'Berlin', 'Berlin is Germany\'s capital and biggest city. ', '2023', '2022-12-25', '2022-12-27', 'eaa8908c-8c53-4483-87c6-63ea5f0197a5.webp', 0),
(13, 'fc4bde9f-3955-4e77-86b4-78d1ea75dafe', 'Mexico', 'Mexico is a land of extremes, with high mountains and sea', '2022', '2023-01-17', '2023-01-18', '6f40edc7-58db-484e-b18a-eae03342352c.jpg', 0),
(14, '3d34a76c-5507-4184-a6f6-f79dfbebd2c3', 'Sahara Desert ', 'The Sahara Desert is the world\'s largest hot desert ', '2023', '2023-02-05', '2023-02-08', '2e1a0f84-5a0a-4214-b471-8ea445fe16c0.webp', 0),
(15, '74f9278a-ec48-431a-9c78-f89b857249b1', 'Antarctica', 'Antarctica is a continent. It is Earth\'s fifth largest', '2023', '2023-01-22', '2023-01-25', '4465edb3-e512-4ef1-b998-ec6bdef6003f.jpg', 0),
(16, 'a5987fbd-b250-4508-af92-a8579d6b27fc', 'Sweden', 'Sweden is absolutley the best, you must visit there', '2023', '2023-01-09', '2023-01-11', '3c283385-c032-4571-8777-cc0d37f32d43.jpg', 0),
(21, '18710387-c575-4067-bbf0-c632bd85cf67', 'Chaina', 'Chaina is so amazing. You must visit there', '10000', '2022-12-16', '2023-01-01', '1cb98ca7-ffbf-421a-9101-57f7a1244d59.jpg', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followedvacations`
--
ALTER TABLE `followedvacations`
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `useractivity`
--
ALTER TABLE `useractivity`
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followedvacations`
--
ALTER TABLE `followedvacations`
  ADD CONSTRAINT `followedvacations_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `useractivity`
--
ALTER TABLE `useractivity`
  ADD CONSTRAINT `useractivity_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`),
  ADD CONSTRAINT `useractivity_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
--
-- Database: `phpmyadmin`
--
DROP DATABASE IF EXISTS `phpmyadmin`;
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Table structure for table `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Table structure for table `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Table structure for table `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

--
-- Dumping data for table `pma__designer_settings`
--

INSERT INTO `pma__designer_settings` (`username`, `settings_data`) VALUES
('root', '{\"snap_to_grid\":\"off\",\"angular_direct\":\"direct\",\"relation_lines\":\"true\"}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Table structure for table `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Table structure for table `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Table structure for table `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

--
-- Dumping data for table `pma__pdf_pages`
--

INSERT INTO `pma__pdf_pages` (`db_name`, `page_nr`, `page_descr`) VALUES
('holidays', 1, 'Vacations Diagram ');

-- --------------------------------------------------------

--
-- Table structure for table `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"development\",\"table\":\"meetings\"},{\"db\":\"development\",\"table\":\"developmentteams\"},{\"db\":\"movies\",\"table\":\"theaters\"},{\"db\":\"development\",\"table\":\"meeting\"},{\"db\":\"development\",\"table\":\"developmentteam\"},{\"db\":\"development\",\"table\":\"meating\"},{\"db\":\"development\",\"table\":\"developmentTeam\"},{\"db\":\"movies\",\"table\":\"movies\"},{\"db\":\"movies\",\"table\":\"theater\"},{\"db\":\"movies\",\"table\":\"movie\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Table structure for table `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

--
-- Dumping data for table `pma__table_coords`
--

INSERT INTO `pma__table_coords` (`db_name`, `table_name`, `pdf_page_number`, `x`, `y`) VALUES
('holidays', 'followedvacations', 1, 270, 170),
('holidays', 'useractivity', 1, 646, 393),
('holidays', 'users', 1, 347, 247),
('holidays', 'vacations', 1, 471, 315);

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

--
-- Dumping data for table `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'development', 'meetings', '{\"sorted_col\":\"`meetings`.`meetingId` ASC\"}', '2022-12-06 18:05:31');

-- --------------------------------------------------------

--
-- Table structure for table `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2022-12-06 18:12:42', '{\"Console\\/Mode\":\"collapse\"}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Table structure for table `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indexes for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indexes for table `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indexes for table `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indexes for table `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indexes for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indexes for table `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indexes for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indexes for table `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indexes for table `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indexes for table `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indexes for table `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indexes for table `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indexes for table `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `test`
--
DROP DATABASE IF EXISTS `test`;
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
