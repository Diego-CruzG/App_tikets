-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bd_tikets
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_tikets
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_tikets` DEFAULT CHARACTER SET utf8 ;
USE `bd_tikets` ;

-- -----------------------------------------------------
-- Table `bd_tikets`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_tikets`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contrasena` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_tikets`.`tikets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_tikets`.`tikets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(45) NOT NULL,
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `asunto` VARCHAR(250) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- ----------------------------------------------------------------
-- USUAR BD Y TABLAS
-- ----------------------------------------------------------------
use bd_tikets;
select * from tikets;
select * from usuarios;
-- ----------------------------------------------------------------
-- CREDENCIALES INICIO DE SESION ADMINISTRADOR DE LA APP
-- ----------------------------------------------------------------
insert into `bd_tikets`.`usuarios` (`nombre`, `correo`, `contrasena`) VALUES ('admin', 'admin@email.com', 123);
-- ----------------------------------------------------------------
-- TIKETS POR DEFECTO
-- ----------------------------------------------------------------
insert into `bd_tikets`.`tikets` (`usuario`,`asunto`, `estado`) VALUES ('sandra','daño portatil', 'abierto');
insert into `bd_tikets`.`tikets` (`usuario`,`asunto`, `estado`) VALUES ('juana','problemas software', 'cerrado');
insert into `bd_tikets`.`tikets` (`usuario`,`asunto`, `estado`) VALUES ('juana','problemas wi-fi', 'abierto');
insert into `bd_tikets`.`tikets` (`usuario`,`asunto`, `estado`) VALUES ('pedro','daño cargador', 'abierto');

insert into `bd_tikets`.`tikets` (`usuario`,`asunto`, `estado`) VALUES ('diego','problemas windows', 'cerrado');
insert into `bd_tikets`.`tikets` (`usuario`,`asunto`, `estado`) VALUES ('pedro','daño monitor', 'cerrado');
insert into `bd_tikets`.`tikets` (`usuario`,`asunto`, `estado`) VALUES ('pedro','problemas wi-fi', 'abierto');

insert into `bd_tikets`.`tikets` (`usuario`,`asunto`, `estado`) VALUES ('cecilia','daño pc', 'abierto');
insert into `bd_tikets`.`tikets` (`usuario`,`asunto`, `estado`) VALUES ('carmen','problemas software', 'cerrado');
insert into `bd_tikets`.`tikets` (`usuario`,`asunto`, `estado`) VALUES ('camila','problemas autocad', 'abierto');
insert into `bd_tikets`.`tikets` (`usuario`,`asunto`, `estado`) VALUES ('diego','daño mouse', 'cerrado');
