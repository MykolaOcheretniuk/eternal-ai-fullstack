CREATE TABLE `ChatLog` (
	`Id` serial AUTO_INCREMENT NOT NULL,
	`UserId` varchar(70) NOT NULL,
	`Individual` varchar(50) NOT NULL,
	`Question` varchar(256) NOT NULL,
	`Answer` varchar(256) NOT NULL,
	CONSTRAINT `ChatLog_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `Subscribers` (
	`UserId` varchar(70) NOT NULL,
	`StripeSubId` varchar(100) NOT NULL,
	`StripeCustomerId` varchar(100) NOT NULL,
	`nextPaymentDate` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `UserIndividualChat` (
	`UserId` varchar(70) NOT NULL,
	`IndividualName` varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`Id` varchar(70) NOT NULL,
	`Name` varchar(100),
	`Email` varchar(100) NOT NULL,
	`PasswordHash` varchar(256) NOT NULL,
	`PhoneNumber` varchar(100),
	`Questions` int NOT NULL,
	CONSTRAINT `Users_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
ALTER TABLE `ChatLog` ADD CONSTRAINT `ChatLog_UserId_Users_Id_fk` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Subscribers` ADD CONSTRAINT `Subscribers_UserId_Users_Id_fk` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserIndividualChat` ADD CONSTRAINT `UserIndividualChat_UserId_Users_Id_fk` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE no action ON UPDATE no action;