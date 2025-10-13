-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2025 at 10:29 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `verification_token` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `fullname`, `username`, `password`, `email`, `verification_token`, `is_verified`) VALUES
(1, 'Budi Santoso', 'budi123', '$2b$10$ZCVewRa3JV3kuqs9x/G.JeuUga6c85w7qliuyhoC0/lmcStl9ek7C', 'budi@example.com', NULL, 1),
(2, 'fardy', 'fardy', '$2b$10$cC.lIl5lW/UKw2roI6GKhOWhrUX/BEkXlCmTTj6P6qQCThmP4OI1e', 'fardy@example.com', NULL, 1),
(3, 'fardy', 'fredy', '$2b$10$mTK5GPysy/IxXjL.Tv/DNO3ZUvOhIzI9xkYzvE.PufjoAjwF7IDYe', 'fredy@gmail.com', NULL, 1),
(4, 'Freedy', 'freedy123', '$2b$10$.BWgj8WrlDGXsJSe/nLDpe3aZbNk.L8WnC3uNQwpT648PkKVXNPMW', 'freedygenshin@gmail.com', NULL, 1),
(5, 'Freedy', 'freedy123', '$2b$10$4gdFazRmAh1ZxBkEka.yS.SMS/ouX1Om22foVewtA1C3x7cNLl6a.', 'freedygenshin@gmail.com', NULL, 1),
(6, 'Freedy', 'freedy123', '$2b$10$Ep7S2RiN/BfhaB1XrSSHXuQ1YHfh6xzicwTUEHRLzXwp.849LoTjy', 'freedyjob@gmail.com', NULL, 1),
(7, 'Freedy', 'freedy', '$2b$10$ji4hXlEsIK/AKtkSXcAaPuskIOX/xh2zuIlZz.3AnV0QF5NkUMRh6', 'freedyjob@gmail.com', NULL, 1),
(8, 'Freedy', 'freedy', '$2b$10$hIZEk7nxlyNHWxTOHaNadetkPDNYrqXCiMD8urRnaY/gQUmhFTizC', 'freedyjob@gmail.com', NULL, 1);

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
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

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
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
