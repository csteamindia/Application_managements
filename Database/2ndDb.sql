-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 07, 2023 at 05:35 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `2ndDb`
--

-- --------------------------------------------------------

--
-- Table structure for table `apps`
--

CREATE TABLE `apps` (
  `id` int(11) NOT NULL,
  `app_title` varchar(100) NOT NULL,
  `logo` text NOT NULL,
  `url` varchar(256) NOT NULL,
  `admin_url` varchar(256) NOT NULL,
  `domain_expiry_date` datetime NOT NULL,
  `database` varchar(256) NOT NULL,
  `database_host` varchar(256) NOT NULL,
  `database_username` varchar(256) NOT NULL,
  `database_password` varchar(256) NOT NULL,
  `last_backup` datetime NOT NULL,
  `app_status` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `demo_creds`
--

CREATE TABLE `demo_creds` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `is_deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `demo_creds`
--

INSERT INTO `demo_creds` (`id`, `type`, `email`, `password`, `is_deleted`) VALUES
(1, 'CLIENT', 'karam@gmail.com', 'client', 1),
(2, 'ADMIN', 'demo@gmail.com', 'client', 0),
(3, 'ADMIN', 'demo1@gmail.com', 'admin', 0),
(4, 'ADMIN', 'admi@gmail.com', 'admin12', 0),
(5, 'CLIENT', 'aman.gupta@gmail.com', 'aman123', 0);

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `package_name` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `price` double NOT NULL,
  `type` varchar(20) DEFAULT 'monthly'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `app_id` int(11) NOT NULL,
  `full_name` varchar(256) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `mobile` varchar(256) NOT NULL,
  `role` varchar(10) NOT NULL,
  `domain` varchar(256) DEFAULT NULL,
  `privileges` varchar(256) NOT NULL,
  `package_id` int(11) DEFAULT NULL,
  `org_name` varchar(256) DEFAULT NULL,
  `org_type` varchar(256) DEFAULT NULL,
  `subscribed_date` datetime DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `app_id`, `full_name`, `username`, `password`, `email`, `mobile`, `role`, `domain`, `privileges`, `package_id`, `org_name`, `org_type`, `subscribed_date`, `expiry_date`, `is_active`) VALUES
(1, 1, 'Arav Singhania', 'arav2', 'uiojlk8', 'arav2@gmail.com', '89898998', 'CLIENT', 'xcvxcv', '[\"Read\",\"Writer\"]', 8, 'xcvxc', 'xcvxcvxc', '2023-08-25 00:00:00', '2023-08-23 00:00:00', 0),
(2, 6, 'Karan Kundra', 'karan234', 'client', 'karan.kundra@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-09 18:30:00', 0),
(3, 6, 'Karan Kundra', 'karan234', 'client', 'karan.kundra3@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-09 18:30:00', 0),
(4, 6, 'Karan Kundra', 'karan234', 'client', 'karan.kundra22@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-09 18:30:00', 0),
(5, 6, 'Karan Kundra', 'karan234', 'client', 'karan.kundra12@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2023-08-10 18:30:00', 0),
(6, 1, 'aa', 'bb', 'dkdk', 'jj@gmail.com', 'sdsn', 'CLIENT', 'sfsn', '[\"Writer\"]', NULL, 'asda', 'asdas', '2023-08-29 00:00:00', '2023-08-30 00:00:00', 0),
(7, 1, 'Anubhav mishra', 'anubhav12', 'asd123', 'anubhav@gmail.com', '8909099899', 'CLIENT', 'http://cosmo.com', '[\"Sharing\"]', NULL, 'cosmos enterprise', 'sport', '2023-08-30 00:00:00', '2023-08-31 00:00:00', 0),
(8, 1, 'Ketrina kaif', 'katrina23', '345kol', 'katrina@gmail.com', '457680923', 'CLIENT', 'http://beautycare.com', '[\"Writer\"]', NULL, 'beauty care', 'beauty care', '2023-08-29 00:00:00', '2023-08-30 00:00:00', 0),
(9, 1, 'dfgfgf', 'dfgdfg', 'sdfsdf', 'dfd@gmail.com', 'sdfsdfsdf', 'CLIENT', 'sdfsdfsdfsdf', '[\"Writer\"]', NULL, 'sdfsd', 'sdfsdf', '2023-08-23 00:00:00', '2023-08-28 00:00:00', 0),
(10, 1, 'Kaushik', 'kaushik34', 'jjkkiil23', 'kaushik@gmail.com', '9809876778', 'CLIENT', 'http://exmaple.com', '[\"Writer\"]', 10, 'xyz', 'xyz', '2023-08-29 00:00:00', '2023-08-31 00:00:00', 0),
(11, 6, 'Karan Kundra', 'karan234', 'client', 'karandfsdf@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2023-08-11 18:30:00', 0),
(12, 6, 'Karan Kundra', 'karan234', 'client', 'karanddf@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2023-08-11 18:30:00', 0),
(13, 6, 'Karan Kundra', 'karan234', 'client', 'karand45df@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2023-08-11 18:30:00', 0),
(14, 6, 'Karan Kundra', 'karan234', 'client', 'karand4df@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2023-08-11 18:30:00', 0),
(15, 6, 'Karan Kundra', 'karan234', 'client', 'karand4df88@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2023-08-11 18:30:00', 0),
(16, 1, 'Karan Kundra', 'karan234', 'client', 'karam@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-02 18:30:00', 0),
(17, 1, 'Karan Kundra', 'karan234', 'client', 'demo@gmail.com', '9090989098', 'ADMIN', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-02 18:30:00', 0),
(18, 1, 'Karan Kundra', 'karan234', 'admin', 'demo1@gmail.com', '9090989098', 'ADMIN', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-02 18:30:00', 0),
(19, 1, 'Karan Kundra', 'karan234', 'admin12', 'admi@gmail.com', '9090989098', 'ADMIN', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-02 18:30:00', 0),
(20, 1, 'Aman Gupta', 'aman12', 'aman123', 'aman.gupta@gmail.com', '7898789878', 'CLIENT', 'godaddy.com', '[\"Read\",\"Writer\"]', 7, 'aman ', 'clothes', '2023-09-08 00:00:00', '2023-09-21 00:00:00', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apps`
--
ALTER TABLE `apps`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `demo_creds`
--
ALTER TABLE `demo_creds`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apps`
--
ALTER TABLE `apps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `demo_creds`
--
ALTER TABLE `demo_creds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
