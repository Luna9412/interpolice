-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-12-2024 a las 06:48:19
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `interpolice`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `antecedentes`
--

CREATE TABLE `antecedentes` (
  `idantecedente` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `descripcion` longtext NOT NULL,
  `ciudadanos_idciudadano` int(11) NOT NULL,
  `delitos_iddelito` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudadanos`
--

CREATE TABLE `ciudadanos` (
  `idciudadano` int(11) NOT NULL,
  `nombre_ciudadano` varchar(150) NOT NULL,
  `apellido_ciudadano` varchar(150) DEFAULT NULL,
  `apodo_ciudadano` varchar(200) DEFAULT NULL,
  `email_ciudadano` varchar(256) NOT NULL,
  `password_ciudadano` varchar(300) NOT NULL,
  `fechaorigen` date NOT NULL,
  `foto_ciudadano` varchar(256) NOT NULL,
  `especies_idespecie` int(11) NOT NULL,
  `roles_idrol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `ciudadanos`
--

INSERT INTO `ciudadanos` (`idciudadano`, `nombre_ciudadano`, `apellido_ciudadano`, `apodo_ciudadano`, `email_ciudadano`, `password_ciudadano`, `fechaorigen`, `foto_ciudadano`, `especies_idespecie`, `roles_idrol`) VALUES
(4, 'sdf', 'sdf', 'sdf', 'cosmo@cosdma.com', '123456', '2024-12-04', '', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `delitos`
--

CREATE TABLE `delitos` (
  `iddelito` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `descripcion` longtext DEFAULT NULL,
  `grado_delitos_idgrado_delito` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especies`
--

CREATE TABLE `especies` (
  `idespecie` int(11) NOT NULL,
  `nombre_especie` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `especies`
--

INSERT INTO `especies` (`idespecie`, `nombre_especie`) VALUES
(1, 'alien'),
(2, 'humano'),
(3, 'robot');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grado_delitos`
--

CREATE TABLE `grado_delitos` (
  `idgrado_delito` int(11) NOT NULL,
  `grado` varchar(150) NOT NULL,
  `descripción` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idrol` int(11) NOT NULL,
  `nombre_rol` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idrol`, `nombre_rol`) VALUES
(1, 'policia'),
(2, 'ciudadano'),
(3, 'administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `antecedentes`
--
ALTER TABLE `antecedentes`
  ADD PRIMARY KEY (`idantecedente`),
  ADD KEY `fk_antecedentes_ciudadanos1_idx` (`ciudadanos_idciudadano`),
  ADD KEY `fk_antecedentes_delitos1_idx` (`delitos_iddelito`);

--
-- Indices de la tabla `ciudadanos`
--
ALTER TABLE `ciudadanos`
  ADD PRIMARY KEY (`idciudadano`),
  ADD UNIQUE KEY `email_UNIQUE` (`email_ciudadano`),
  ADD KEY `fk_ciudadanos_especies_idx` (`especies_idespecie`),
  ADD KEY `fk_ciudadanos_roles1_idx` (`roles_idrol`);

--
-- Indices de la tabla `delitos`
--
ALTER TABLE `delitos`
  ADD PRIMARY KEY (`iddelito`),
  ADD KEY `fk_delitos_grado_delitos1_idx` (`grado_delitos_idgrado_delito`);

--
-- Indices de la tabla `especies`
--
ALTER TABLE `especies`
  ADD PRIMARY KEY (`idespecie`);

--
-- Indices de la tabla `grado_delitos`
--
ALTER TABLE `grado_delitos`
  ADD PRIMARY KEY (`idgrado_delito`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idrol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `antecedentes`
--
ALTER TABLE `antecedentes`
  MODIFY `idantecedente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ciudadanos`
--
ALTER TABLE `ciudadanos`
  MODIFY `idciudadano` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `delitos`
--
ALTER TABLE `delitos`
  MODIFY `iddelito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especies`
--
ALTER TABLE `especies`
  MODIFY `idespecie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `grado_delitos`
--
ALTER TABLE `grado_delitos`
  MODIFY `idgrado_delito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idrol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `antecedentes`
--
ALTER TABLE `antecedentes`
  ADD CONSTRAINT `fk_antecedentes_ciudadanos1` FOREIGN KEY (`ciudadanos_idciudadano`) REFERENCES `ciudadanos` (`idciudadano`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_antecedentes_delitos1` FOREIGN KEY (`delitos_iddelito`) REFERENCES `delitos` (`iddelito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ciudadanos`
--
ALTER TABLE `ciudadanos`
  ADD CONSTRAINT `fk_ciudadanos_especies` FOREIGN KEY (`especies_idespecie`) REFERENCES `especies` (`idespecie`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ciudadanos_roles1` FOREIGN KEY (`roles_idrol`) REFERENCES `roles` (`idrol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `delitos`
--
ALTER TABLE `delitos`
  ADD CONSTRAINT `fk_delitos_grado_delitos1` FOREIGN KEY (`grado_delitos_idgrado_delito`) REFERENCES `grado_delitos` (`idgrado_delito`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
