/*
Created: 18/9/2021
Modified: 28/9/2021
Model: GymDBModel
Database: MySQL 8.0
*/

-- Drop foreign keys (relationships) section ---------------------------------------------------

ALTER TABLE HealthConditions DROP FOREIGN KEY RS_Customer_HealthCondition
;
ALTER TABLE Inscriptions DROP FOREIGN KEY RS_TrainingPlan_Inscription
;
ALTER TABLE Payments DROP FOREIGN KEY RS_Inscription_Payment
;
ALTER TABLE Customers DROP FOREIGN KEY RS_Inscription_Customer
;

-- Drop keys section -------------------------------------------------

-- ALTER TABLE Inscriptions DROP PRIMARY KEY
-- ;
-- ALTER TABLE Inscriptions DROP KEY Id
-- ;
-- ALTER TABLE TrainingPlans DROP PRIMARY KEY
-- ;
-- ALTER TABLE TrainingPlans DROP KEY Id
-- ;
-- ALTER TABLE Payments DROP PRIMARY KEY
-- ;
-- ALTER TABLE Payments DROP KEY Id
-- ;
-- ALTER TABLE HealthConditions DROP PRIMARY KEY
-- ;
-- ALTER TABLE HealthConditions DROP KEY Id
-- ;
-- ALTER TABLE Customers DROP PRIMARY KEY
-- ;
-- ALTER TABLE Customers DROP KEY Id
-- ;
-- ALTER TABLE Users DROP PRIMARY KEY
-- ;
-- ALTER TABLE Users DROP KEY Id
-- ;
ALTER TABLE Users DROP KEY UserName
;

-- Drop tables section ---------------------------------------------------

DROP TABLE Inscriptions
;
DROP TABLE TrainingPlans
;
DROP TABLE Payments
;
DROP TABLE HealthConditions
;
DROP TABLE Customers
;
DROP TABLE Users
;

