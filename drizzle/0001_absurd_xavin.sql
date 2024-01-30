CREATE TABLE `RefreshTokens` (
	`UserId` varchar(70) NOT NULL,
	`RefreshToken` varchar(250) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `RefreshTokens` ADD CONSTRAINT `RefreshTokens_UserId_Users_Id_fk` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE no action ON UPDATE no action;