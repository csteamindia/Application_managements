-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 07, 2023 at 05:34 PM
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
-- Database: `csteam_apps_managements`
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `apps`
--

INSERT INTO `apps` (`id`, `app_title`, `logo`, `url`, `admin_url`, `domain_expiry_date`, `database`, `database_host`, `database_username`, `database_password`, `last_backup`, `app_status`) VALUES
(1, 'HRMS', 'logo', 'http://hrms.com/', 'http://hrms.com/admin', '2024-07-27 11:30:53', 'csteam_hrms', 'localhost', 'dbname', '$2b$10$NfoO01e8v1zEGtmggedbiOjwgoFb/.LxM2kj.p9DQ6B6h.KisIeqK', '2023-07-29 11:30:53', 'ACTIVE'),
(2, 'OPD', 'logo', 'http://opd.com/', 'http://opd.com/admin', '2024-06-20 11:30:53', 'csteam_opd', 'localhost', 'dbname', '$2b$10$qGUCso7xjsK9htNnZnzzwOKur2BEJUuCLE3JXdQVsU8.B1QyQ3zlm', '2023-07-31 11:30:53', 'ACTIVE'),
(3, 'Dental', 'logo', 'http://dental.com/', 'http://dental.com/admin', '2024-04-20 11:30:53', 'csteam_opd', 'localhost', 'dbname', '$2b$10$bI4dluU.ly3yJLwTORzhAujdwdOpJH02DmsISzPxGY4dn/qxHpzsq', '2023-08-04 11:30:53', 'ACTIVE'),
(4, 'OTT-ERP', 'logo', 'http://ottTv.com/', 'http://ottTv.com/admin', '2024-01-20 11:30:53', 'csteam_ott', 'localhost', 'dbname', '$2b$10$JfmRFkiazG6pMJ2xNdUtNeZXKWjA5oB6MrlPzFMyT/MwdfTAUTEmq', '2023-08-04 11:30:53', 'ACTIVE'),
(5, 'Whatsapp', 'https://images.unsplash.com/photo-1636751364472-12bfad09b451?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hhdHNhcHB8ZW58MHx8MHx8fDA%3D&w=1000&q=80', 'htpp://whatsapp/web.com', 'http://whatsappapp/admin/web.com', '2023-08-16 00:00:00', 'my Db', 'http://web.com', 'root', '$2b$10$Zwffa1hTx6kMHJGywhIHUeN6impyN9CCTi1dOrwVW156791pfyBbm', '2023-08-17 00:00:00', 'Active'),
(6, 'App-1', 'logo', 'htpp://app-1.com', 'http://app-1/admin.com', '2023-08-18 00:00:00', 'app-database', '168.34.98.01', 'root', '$2b$10$tBFc9VBaj1BIu2erZC0THurMcIuQ6x8Z9fLwzCbavY3SMdATfjosO', '2023-08-25 00:00:00', 'Active'),
(7, 'App-2', 'logo url', 'http://url/db.com', 'http://url/admin/db.com', '2023-08-22 18:30:00', '2023/08/20', 'localhost', 'root', '$2b$10$u9jWRJpLBKmR13yqT0vpMeZ8BkDUoBMbtdHbxObdaTmxlVhHaPoBC', '2023-08-21 18:30:00', 'active'),
(8, 'app-2', 'logo url', 'http://url/db.com', 'http://url/admin/db.com', '2023-08-22 18:30:00', '2023/08/20', 'localhost', 'root', '$2b$10$wdwmP24cg0XazPkQrd4/7usUyTKmt9eVpDWR/35xHCp4mmt.7/I/a', '2023-08-21 18:30:00', 'active'),
(9, 'Crick buzz', 'https://www.forbesindia.com/media/images/2020/Oct/img_144755_forbes900x6001.jpg', 'http://user/crickbuzz.com', 'http://admin/crickbuzz.com', '2023-08-31 00:00:00', 'normal databse', 'localhost', 'db123', '$2b$10$0P1SvSnx6KMEUmdQXt6vTuxmPRNTC9WMKUHMjZKqMHnN6jnA10zdC', '2023-08-28 00:00:00', 'Active'),
(10, 'Test', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1eccef61-2e9d-4e1a-9481-5d7e21547651/d5mnvq2-394933b4-52a9-4f54-af2c-588ac80e4371.png/v1/fit/w_600,h_600/test_logo_by_gypsy9rblx_d5mnvq2-375w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6IlwvZlwvMWVjY2VmNjEtMmU5ZC00ZTFhLTk0ODEtNWQ3ZTIxNTQ3NjUxXC9kNW1udnEyLTM5NDkzM2I0LTUyYTktNGY1NC1hZjJjLTU4OGFjODBlNDM3MS5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.yCU6ecla6iCUj19RGiCxdW_IdC6N89Oe0WYWAa7EVsE', 'http://test.com', 'http://test.com', '2023-09-07 00:00:00', 'localhost', 'localhost', 'root', '$2b$10$5aTGbIC7kubk/e0QDmByvOyfwSEunr3jQ9iwHE2mdaxHp6rcOhZL.', '2023-09-07 00:00:00', 'Active');

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
(1, 'CLIENT', 'karam@gmail.com', 'client', 0),
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
  `description` text DEFAULT NULL,
  `price` double NOT NULL,
  `type` varchar(20) DEFAULT 'monthly'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `package_name`, `description`, `price`, `type`) VALUES
(1, 'General', 'kokok', 23000, 'Yearly'),
(2, 'General', '', 30000, 'Yearly'),
(3, 'General', '', 9000, 'Quarterly'),
(4, 'Prime', '', 6000, 'Monthly'),
(5, 'Prime', '', 15000, 'Quarterly'),
(6, 'Prime', '', 40000, 'Yearly'),
(7, 'Exrta Prime', '', 10000, 'Monthly'),
(8, 'Exrta Prime', '', 25000, 'Quarterly'),
(9, 'Exrta Prime', '', 79999, 'Yearly'),
(10, 'package-2', 'attractive offers available in this package', 3999, 'Yearly'),
(11, 'pack-2', 'attractive offers available in this package', 3999, 'Yearly'),
(12, 'pack-2', 'attractive offers available in this package', 3999, 'Yearly'),
(13, 'pack-2', 'attractive offers available in this package', 3999, 'Yearly'),
(14, '6', 'attractive offers available in this package', 3999, 'Yearly'),
(15, '6', 'attractive offers available in this package', 3999, 'Yearly'),
(16, '6', 'attractive offers available in this package', 3999, 'Yearly'),
(17, '', 'attractive offers available in this package', 3999, 'Yearly'),
(18, '', 'attractive offers available in this package', 3999, 'Yearly'),
(19, '', 'attractive offers available in this package', 3999, 'Yearly');

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
  `is_active` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `app_id`, `full_name`, `username`, `password`, `email`, `mobile`, `role`, `domain`, `privileges`, `package_id`, `org_name`, `org_type`, `subscribed_date`, `expiry_date`, `is_active`) VALUES
(1, 1, 'Kaishav Shah', 'kaishav123', '@123', 'infinityhospital2@care.com', '+91 63445 45434', 'CLIENT', 'https://infinityhospital@care.com', '[\"Read\"]', 2, 'Infinity Hospital', 'All', '2023-03-01 04:30:53', '2024-01-29 11:30:53', 1),
(2, 1, 'Dr.Mahesh Singh', 'Dental124', '', 'mydentalCare.dental@care.com', '+91 63445 54436', 'CLIENT', 'http://mydentalcare@care.co.in', '[\"Read\"]', 1, '', '', '2023-08-22 00:00:00', '2023-08-31 00:00:00', 0),
(3, 1, 'Dr.Haresh Kulkarni', 'Dental123', '', 'mydentalCare23.dental@care.com', '+91 63445 54436', 'CLIENT', 'http://mydentalcare@care.co.in', '[\"Read\"]', 1, '', '', '2023-07-29 11:30:53', '2024-07-29 11:30:53', 0),
(4, 3, 'Dr.Kahil Kulkarni', 'Dental123', '', 'dentalCare.dental@care.com', '+91 63445 54436', 'CLIENT', 'http://mydentalcare@care.co.in', '[\"Read\"]', 1, '', '', '2023-07-29 11:30:53', '2024-07-29 11:30:53', 0),
(5, 3, 'Dr.Manish Paul', 'Dental123', '', 'dentalCare1.dental@care.com', '+91 63445 54436', 'CLIENT', 'http://mydentalcare@care.co.in', '[\"Read\"]', 2, '', '', '2023-07-29 11:30:53', '2024-07-29 11:30:53', 0),
(6, 6, 'Karan Kundra', 'karan2345', 'client', 'karan.kundra33@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-10 18:30:00', '2024-08-09 18:30:00', 0),
(7, 2, 'as', 'admin@gmail.com', '', 'admin@ott.com', '+91 99099 88080', '', 'dsdcdcdcdc', '[\"Read\",\"Writer\",\"Sharing\"]', 5, 'dddd', 'industrial', '2023-08-03 00:00:00', '2023-08-10 00:00:00', 1),
(8, 1, 'TY Karishma singh', 'karishma12', '', 'karishma.singh.90ii@gmail.com', '7089765643', 'CLIENT', 'http://helpanytime.com', '[\"Read\",\"Writer\",\"Sharing\"]', 7, '', '', '2023-08-16 00:00:00', '2023-09-16 00:00:00', 1),
(9, 2, 'Kaishav Patel', 'kaishav123', '', 'infinityhospital@care.com', '+91 63445 45434', 'CLIENT', 'https://infinityhospital@care.com', '[\"Read\",\"Writer\"]', 8, 'Infinity Hospital', 'All', '2023-03-01 04:30:53', '2024-01-29 11:30:53', 0),
(10, 3, 'Kaishav Patel', 'kaishav123', '', 'infinityhospital456@care.com', '+91 63445 45434', 'CLIENT', 'https://infinityhospital@care.com', '[\"Read\"]', 3, 'Infinity Hospital', 'All', '2023-03-01 04:30:53', '2024-01-29 11:30:53', 0),
(11, 3, 'SI Karishma singh', 'karishma12', '', 'karishma.singh23@gmail.com', '7089765643', 'CLIENT', 'http://helpanytime.com', '[\"Read\",\"Writer\",\"Sharing\"]', 2, '', '', '2023-08-16 00:00:00', '2023-09-16 00:00:00', 0),
(12, 1, 'naresh', 'santosh@sence96gmail.com', '', 'admin1@gmail.com', '+91 99099 88088', 'CLIENT', 'http://example.com', '[\"Writer\",\"Sharing\"]', 2, 'ssssssss', 'cdcd', '2023-08-12 00:00:00', '2023-08-07 00:00:00', 0),
(13, 5, 'naresh345', 'santosh@sence96gmail.com', '', 'admidfdn@gmail.com', '+91 99099 88088', 'ADMIN', 'http://example.com', '[\"Writer\",\"Sharing\",\"Read\"]', 3, 'ssssssss', 'cdcd', '2023-08-12 00:00:00', '2023-08-07 00:00:00', 0),
(14, 1, 'Kaishav patel 23', 'kaishav123', '', 'infinityhospital4rft5@care.com', '+91 63445 45434', 'ADMIN', 'https://infinityhospital@care.com', '[\"Read\",\"Writer\",\"Sharing\"]', 2, 'Infinity Hospital', 'All', '2023-03-01 04:30:53', '2024-01-29 11:30:53', 0),
(15, 1, 'kali', 'kali23', '1234', 'kali@gmail.com', '7887887878`', 'CLIENT', 'slfsnf', '[\"Read\",\"Writer\",\"Sharing\"]', 5, '', '', '2023-08-16 00:00:00', '2023-08-15 00:00:00', 1),
(16, 1, 'Amrita Rao', 'amrita609', '', 'iamamrita.rao@gmail.com', '990990990', 'CLIENT', 'www.amritasaris.com', '[\"Read\",\"Sharing\"]', 6, 'Amria and Amrita Fashion', 'Selling', '2023-08-23 00:00:00', '2024-08-23 00:00:00', 1),
(17, 1, 'Arav Singhania', 'arav2', 'uiojlk8', 'arav2@gmail.com', '89898998', 'CLIENT', 'xcvxcv', '[\"Read\",\"Writer\"]', 8, 'xcvxc', 'xcvxcvxc', '2023-08-25 00:00:00', '2023-08-23 00:00:00', 1),
(18, 6, 'Karan Kundra', 'karan234', 'client', 'karan.kundra@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-09 18:30:00', 0),
(19, 6, 'Karan Kundra', 'karan234', 'client', 'karan.kundra32322@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-09 18:30:00', 0),
(20, 6, 'Karan Kundra', 'karan234', 'client', 'karan.kundra22@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-09 18:30:00', 0),
(21, 6, 'Karan Kundra', 'karan234', 'client', 'karan.kundra12@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2023-08-10 18:30:00', 0),
(22, 1, 'aa', 'bb', 'dkdk', 'jj@gmail.com', 'sdsn', 'CLIENT', 'sfsn', '[\"Writer\"]', NULL, 'asda', 'asdas', '2023-08-29 00:00:00', '2023-08-30 00:00:00', 1),
(23, 1, 'Anubhav mishra', 'anubhav12', 'asd123', 'anubhav@gmail.com', '8909099899', 'CLIENT', 'http://cosmo.com', '[\"Sharing\"]', NULL, 'cosmos enterprise', 'sport', '2023-08-30 00:00:00', '2023-08-31 00:00:00', 0),
(24, 1, 'Ketrina kaif', 'katrina23', '345kol', 'katrina@gmail.com', '457680923', 'CLIENT', 'http://beautycare.com', '[\"Writer\"]', NULL, 'beauty care', 'beauty care', '2023-08-29 00:00:00', '2023-08-30 00:00:00', 1),
(25, 1, 'dfgfgf', 'dfgdfg', 'sdfsdf', 'dfd@gmail.com', 'sdfsdfsdf', 'CLIENT', 'sdfsdfsdfsdf', '[\"Writer\"]', NULL, 'sdfsd', 'sdfsdf', '2023-08-23 00:00:00', '2023-08-28 00:00:00', 1),
(26, 1, 'Kaushik', 'kaushik34', 'jjkkiil23', 'kaushik@gmail.com', '9809876778', 'CLIENT', 'http://exmaple.com', '[\"Writer\"]', 10, 'xyz', 'xyz', '2023-08-29 00:00:00', '2023-08-31 00:00:00', 0),
(27, 6, 'Karan Kundra', 'karan234', 'client', 'karandfsdf@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2023-08-11 18:30:00', 0),
(28, 6, 'Karan Kundra', 'karan234', 'client', 'karanddf@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2023-08-11 18:30:00', 0),
(29, 6, 'Karan Kundra', 'karan234', 'client', 'karand45df@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2023-08-11 18:30:00', 0),
(30, 6, 'Karan Kundra', 'karan234', 'client', 'karand4df@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2023-08-11 18:30:00', 0),
(31, 6, 'Karan Kundra', 'karan234', 'client', 'karand4df88@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2023-08-11 18:30:00', 0),
(32, 1, 'Karan Kundra', 'karan234', 'client', 'karam@gmail.com', '9090989098', 'CLIENT', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-02 18:30:00', 0),
(33, 1, 'Karan Kundra', 'karan234', 'client', 'demo@gmail.com', '9090989098', 'ADMIN', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-02 18:30:00', 0),
(34, 1, 'Karan Kundra', 'karan234', 'admin', 'demo1@gmail.com', '9090989098', 'ADMIN', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-02 18:30:00', 0),
(35, 1, 'Karan Mohan', 'karan234', '', 'admi@gmail.com', '9090989098', 'ADMIN', 'http://example.com', '[\"read\",\"write\",\"share\"]', 3, 'KR House', 'Filmy Industry', '2023-08-09 18:30:00', '2024-08-02 18:30:00', 0),
(36, 1, 'Aman Gupta', 'aman12', 'aman123', 'aman.gupta@gmail.com', '7898789878', 'CLIENT', 'godaddy.com', '[\"Read\",\"Writer\"]', 7, 'aman ', 'clothes', '2023-09-08 00:00:00', '2023-09-21 00:00:00', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `demo_creds`
--
ALTER TABLE `demo_creds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
