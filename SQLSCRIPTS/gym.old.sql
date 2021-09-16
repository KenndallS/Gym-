-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-07-2021 a las 22:20:09
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gym`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `iddireccion` int(11) NOT NULL,
  `idmiembros` int(11) NOT NULL,
  `calle` varchar(40) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `estado` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `ciudad` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `zipcode` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `condicion` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_salud`
--

CREATE TABLE `estado_salud` (
  `idestado_salud` int(11) NOT NULL,
  `idmiembros` int(11) NOT NULL,
  `calorias` varchar(8) DEFAULT NULL,
  `altura` varchar(8) DEFAULT NULL,
  `peso` varchar(8) DEFAULT NULL,
  `obeso` varchar(8) DEFAULT NULL,
  `comentarios` varchar(200) DEFAULT NULL,
  `condicion` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `estado_salud`
--

INSERT INTO `estado_salud` (`idestado_salud`, `idmiembros`, `calorias`, `altura`, `peso`, `obeso`, `comentarios`, `condicion`) VALUES
(13, 20, '1', '1', '1', '1', '1', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `idinscripcion` int(11) NOT NULL,
  `idplan` int(11) NOT NULL,
  `idmiembros` int(11) NOT NULL,
  `pago_fecha` date DEFAULT NULL,
  `validez` varchar(15) DEFAULT NULL,
  `fecha_exp` date DEFAULT NULL,
  `condicion` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `inscripcion`
--

INSERT INTO `inscripcion` (`idinscripcion`, `idplan`, `idmiembros`, `pago_fecha`, `validez`, `fecha_exp`, `condicion`) VALUES
(1, 1, 21, '0000-00-00', '', '0000-00-00', 1),
(2, 3, 22, '0000-00-00', '90', '0000-00-00', 1),
(4, 2, 22, '0000-00-00', '60', '0000-00-00', 1),
(5, 1, 20, '0000-00-00', '60', '0000-00-00', 1),
(6, 2, 22, '0000-00-00', '60', '0000-00-00', 1),
(7, 3, 21, '0000-00-00', '60', '0000-00-00', 1),
(10, 4, 29, '0000-00-00', '', '0000-00-00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `miembros`
--

CREATE TABLE `miembros` (
  `idmiembros` int(11) NOT NULL,
  `idplan` int(11) NOT NULL,
  `nombre_miembros` varchar(40) NOT NULL,
  `genero` varchar(15) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `dob` date NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `calle` varchar(40) NOT NULL,
  `estado` varchar(40) NOT NULL,
  `ciudad` varchar(40) NOT NULL,
  `zipcode` varchar(40) NOT NULL,
  `monto` decimal(11,2) NOT NULL,
  `validez` varchar(20) NOT NULL,
  `condicion` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `miembros`
--

INSERT INTO `miembros` (`idmiembros`, `idplan`, `nombre_miembros`, `genero`, `celular`, `email`, `dob`, `fecha_ingreso`, `calle`, `estado`, `ciudad`, `zipcode`, `monto`, `validez`, `condicion`) VALUES
(20, 3, 'primero', 'Masculino', '1', '1', '2021-07-01', '2021-07-31', '1', '1', '1', '1', '3.00', 'mes', 1),
(21, 3, 'tercero', 'Masculino', '3', '3', '2021-07-01', '2021-07-31', '3', '3', '3', '3', '2000.00', 'mes', 1),
(22, 2, 'cuarto', 'Femenino', '4', '4', '2000-01-01', '2000-01-01', '4', '4', '4', '4', '3.00', '', 1),
(23, 3, 'quinto', 'Femenino', '5', '5', '2000-01-01', '2000-01-01', '5', '5', '5', '5', '2000.00', 'año', 1),
(26, 3, 'sexto', 'Femenino', '6', '6', '2000-01-01', '2000-01-02', '6', '6', '6', '6', '0.00', '', 1),
(27, 1, 'septimo', 'Femenino', '7', '7', '2000-01-01', '2000-01-01', '7', '7', '7', '7', '0.00', '', 1),
(28, 2, 'octavo', 'Femenino', '8', '8', '2000-01-01', '2000-01-01', '8', '8', '8', '8', '2000.00', 'bimes', 1),
(29, 1, 'noveno', 'Femenino', '9', '9', '2000-01-01', '2000-01-01', '9', '9', '9', '9', '9.00', '9', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `idpermiso` int(11) NOT NULL,
  `nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`idpermiso`, `nombre`) VALUES
(1, 'escritorio'),
(2, 'inscripcion'),
(3, 'miembros'),
(4, 'estadodesalud'),
(5, 'plan'),
(6, 'rutinadeejercicios'),
(7, 'vistageneral'),
(8, 'acceso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

CREATE TABLE `plan` (
  `idplan` int(11) NOT NULL,
  `nombre_plan` varchar(20) NOT NULL,
  `descripcion` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `validez` varchar(20) NOT NULL,
  `monto` int(10) NOT NULL,
  `condicion` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `plan`
--

INSERT INTO `plan` (`idplan`, `nombre_plan`, `descripcion`, `validez`, `monto`, `condicion`) VALUES
(1, 'uno', 'uno', 'mes', 1000, 1),
(2, 'dos', 'dos', 'bimes', 2000, 1),
(3, 'tres', 'tres', 'tres', 3, 1),
(4, 'cuarto', 'cuarto', 'trimestre', 10000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutina`
--

CREATE TABLE `rutina` (
  `idrutina` int(11) NOT NULL,
  `nombre_rutina` varchar(45) DEFAULT NULL,
  `dia1` varchar(200) DEFAULT NULL,
  `dia2` varchar(200) DEFAULT NULL,
  `dia3` varchar(200) DEFAULT NULL,
  `dia4` varchar(200) DEFAULT NULL,
  `dia5` varchar(200) DEFAULT NULL,
  `dia6` varchar(200) DEFAULT NULL,
  `condicion` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `rutina`
--

INSERT INTO `rutina` (`idrutina`, `nombre_rutina`, `dia1`, `dia2`, `dia3`, `dia4`, `dia5`, `dia6`, `condicion`) VALUES
(1, 'priemera', '1', '1', '1', '1', '1', '1', 1),
(2, 'segunda', '2', '2', '2', '2', '2', '2', 1),
(3, 'Tercera', '3', '3', '3', '3', '3', '3', 1),
(4, 'Cuartas', '4', '4', '4', '4', '4', '4', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `tipo_documento` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `num_documento` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(70) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cargo` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `login` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `clave` varchar(64) COLLATE utf8_spanish_ci NOT NULL,
  `imagen` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `condicion` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idusuario`, `nombre`, `tipo_documento`, `num_documento`, `direccion`, `telefono`, `email`, `cargo`, `login`, `clave`, `imagen`, `condicion`) VALUES
(1, 'Admin', 'DNI', '63238', 'Conocido', '27386126', 'admin@gmail.com', 'Gerente', 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '1523752615.jpg', 1),
(2, 'Pedro', 'DNI', '123456', 'aasa', '12345', 'asas@gmail.com', 'asas', 'pedro', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_permiso`
--

CREATE TABLE `usuario_permiso` (
  `idusuario_permiso` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `idpermiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario_permiso`
--

INSERT INTO `usuario_permiso` (`idusuario_permiso`, `idusuario`, `idpermiso`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(33, 2, 1),
(34, 2, 2),
(35, 2, 3),
(36, 2, 4),
(37, 2, 5),
(38, 2, 6),
(39, 2, 7),
(40, 2, 8);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD KEY `idmiembros` (`idmiembros`),
  ADD KEY `iddireccion` (`iddireccion`);

--
-- Indices de la tabla `estado_salud`
--
ALTER TABLE `estado_salud`
  ADD PRIMARY KEY (`idestado_salud`),
  ADD KEY `fk_estado_salud_miembros_idx` (`idmiembros`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`idinscripcion`),
  ADD KEY `idmiembros_idx` (`idmiembros`),
  ADD KEY `idplan_idx` (`idplan`);

--
-- Indices de la tabla `miembros`
--
ALTER TABLE `miembros`
  ADD PRIMARY KEY (`idmiembros`),
  ADD KEY `fk_miembros_plan_idx` (`idplan`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD PRIMARY KEY (`idpermiso`);

--
-- Indices de la tabla `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`idplan`);

--
-- Indices de la tabla `rutina`
--
ALTER TABLE `rutina`
  ADD PRIMARY KEY (`idrutina`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idusuario`),
  ADD UNIQUE KEY `login_UNIQUE` (`login`);

--
-- Indices de la tabla `usuario_permiso`
--
ALTER TABLE `usuario_permiso`
  ADD PRIMARY KEY (`idusuario_permiso`),
  ADD KEY `fk_usuario_permiso_permiso_idx` (`idpermiso`),
  ADD KEY `fk_usuario_permiso_usuario_idx` (`idusuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estado_salud`
--
ALTER TABLE `estado_salud`
  MODIFY `idestado_salud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `idinscripcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `miembros`
--
ALTER TABLE `miembros`
  MODIFY `idmiembros` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `idpermiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `plan`
--
ALTER TABLE `plan`
  MODIFY `idplan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rutina`
--
ALTER TABLE `rutina`
  MODIFY `idrutina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario_permiso`
--
ALTER TABLE `usuario_permiso`
  MODIFY `idusuario_permiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD CONSTRAINT `fk_direccion_miembros` FOREIGN KEY (`idmiembros`) REFERENCES `miembros` (`idmiembros`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `estado_salud`
--
ALTER TABLE `estado_salud`
  ADD CONSTRAINT `fk_estado_salud_miembros_idx` FOREIGN KEY (`idmiembros`) REFERENCES `miembros` (`idmiembros`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD CONSTRAINT `fk_inscripcion_plan` FOREIGN KEY (`idplan`) REFERENCES `plan` (`idplan`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_insripcion_miembros` FOREIGN KEY (`idmiembros`) REFERENCES `miembros` (`idmiembros`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `miembros`
--
ALTER TABLE `miembros`
  ADD CONSTRAINT `fk_miembros_plan` FOREIGN KEY (`idplan`) REFERENCES `plan` (`idplan`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario_permiso`
--
ALTER TABLE `usuario_permiso`
  ADD CONSTRAINT `fk_usuario_permiso_permiso` FOREIGN KEY (`idpermiso`) REFERENCES `permiso` (`idpermiso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuario_permiso_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
