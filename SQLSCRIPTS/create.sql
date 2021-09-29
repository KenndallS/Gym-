/*
Created: 18/9/2021
Modified: 28/9/2021
Model: GymDBModel
Database: MySQL 8.0
*/

-- Create tables section -------------------------------------------------

-- Table Users

CREATE TABLE Users
(
  Id Int NOT NULL AUTO_INCREMENT,
  UserName Varchar(50) NOT NULL,
  PasswordHash Varchar(256) NOT NULL,
  Description Varchar(250),
  Status Varchar(1) NOT NULL,
  PRIMARY KEY (Id),
  UNIQUE Id (Id)
)
;

ALTER TABLE Users ADD UNIQUE UserName (UserName)
;

-- Table Customers

CREATE TABLE Customers
(
  Id Int NOT NULL AUTO_INCREMENT,
  Inscription Int,
  Card Varchar(15) NOT NULL,
  FirstName Varchar(50) NOT NULL,
  LastName Varchar(100) NOT NULL,
  PhoneNumber Varchar(50) NOT NULL,
  Gender Varchar(1) NOT NULL,
  Birthday Date NOT NULL,
  Status Varchar(1) NOT NULL,
  PRIMARY KEY (Id),
  UNIQUE Id (Id)
)
;

-- Table HealthConditions

CREATE TABLE HealthConditions
(
  Id Int NOT NULL AUTO_INCREMENT,
  Customer Int NOT NULL,
  Height Float,
  Weight Float,
  FatAverage Float,
  MuscleAverage Float,
  IMC Float,
  MetabolicAge Int,
  Date Date NOT NULL,
  Status Varchar(1) NOT NULL,
  PRIMARY KEY (Id),
  UNIQUE Id (Id)
)
;

-- Table Payments

CREATE TABLE Payments
(
  Id Int NOT NULL AUTO_INCREMENT,
  Inscription Int,
  Amount Float NOT NULL,
  PayDate Date,
  ExpirationDate Date,
  Status Varchar(1) NOT NULL,
  PRIMARY KEY (Id),
  UNIQUE Id (Id)
)
;

-- Table TrainingPlans

CREATE TABLE TrainingPlans
(
  Id Int NOT NULL AUTO_INCREMENT,
  Cost Float NOT NULL,
  Name Varchar(50) NOT NULL,
  Details Varchar(250),
  Status Varchar(1) NOT NULL,
  PRIMARY KEY (Id),
  UNIQUE Id (Id)
)
;

-- Table Inscriptions

CREATE TABLE Inscriptions
(
  Id Int NOT NULL AUTO_INCREMENT,
  TrainingPlan Int,
  InscriptionDate Date NOT NULL,
  PaymentDate Date NOT NULL,
  PRIMARY KEY (Id),
  UNIQUE Id (Id)
)
;

-- Create foreign keys (relationships) section -------------------------------------------------

ALTER TABLE HealthConditions ADD CONSTRAINT RS_Customer_HealthCondition FOREIGN KEY (Customer) REFERENCES Customers (Id) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE Inscriptions ADD CONSTRAINT RS_TrainingPlan_Inscription FOREIGN KEY (TrainingPlan) REFERENCES TrainingPlans (Id) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE Payments ADD CONSTRAINT RS_Inscription_Payment FOREIGN KEY (Inscription) REFERENCES Inscriptions (Id) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE Customers ADD CONSTRAINT RS_Inscription_Customer FOREIGN KEY (Inscription) REFERENCES Inscriptions (Id) ON DELETE RESTRICT ON UPDATE RESTRICT
;

