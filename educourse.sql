-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2025 at 02:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `educourse`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `id_tutor` int(11) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `nama_kelas` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `id_tutor`, `id_kategori`, `nama_kelas`, `deskripsi`, `harga`) VALUES
(1, 1, 1, 'dari  put testing nih ', 'testing postman', 200000),
(3, 2, 2, 'dari  put testing nih ', 'testing postman', 200000),
(4, 1, 1, 'coba', 'nodejs', 100000),
(5, 2, 3, 'hi', 'Wawaaw', 10000),
(6, 2, 3, 'dari postman nih', 'halo ini postman lohh', 10000),
(7, 2, 3, 'dari postman nih2', 'halo ini postman lohh2', 100002),
(8, 2, 3, 'dari postman nih2', 'halo ini postman lohh2', 100002),
(9, 2, 3, 'dari postman nih2', 'halo ini postman lohh2', 300002),
(14, 2, 2, 'dari  post testing nih ', 'testing postman', 200000);

-- --------------------------------------------------------

--
-- Table structure for table `kategori_kelas`
--

CREATE TABLE `kategori_kelas` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori_kelas`
--

INSERT INTO `kategori_kelas` (`id_kategori`, `nama_kategori`) VALUES
(1, 'pemasaran'),
(2, 'desain'),
(3, 'pengembangan diri'),
(4, 'bisnis');

-- --------------------------------------------------------

--
-- Table structure for table `tutor`
--

CREATE TABLE `tutor` (
  `id_tutor` int(11) NOT NULL,
  `nama_tutor` varchar(255) NOT NULL,
  `pekerjaan_tutor` varchar(255) NOT NULL,
  `tempat_kerja` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tutor`
--

INSERT INTO `tutor` (`id_tutor`, `nama_tutor`, `pekerjaan_tutor`, `tempat_kerja`) VALUES
(1, 'jenna ortega', 'senior accountant', 'gojek'),
(2, 'alexander', 'senior developer', 'tokopedia');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tutor` (`id_tutor`),
  ADD KEY `id_kategori` (`id_kategori`);

--
-- Indexes for table `kategori_kelas`
--
ALTER TABLE `kategori_kelas`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `tutor`
--
ALTER TABLE `tutor`
  ADD PRIMARY KEY (`id_tutor`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `kategori_kelas`
--
ALTER TABLE `kategori_kelas`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tutor`
--
ALTER TABLE `tutor`
  MODIFY `id_tutor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`id_tutor`) REFERENCES `tutor` (`id_tutor`),
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_kelas` (`id_kategori`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
