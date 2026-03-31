CREATE TABLE `aliases` (
  `aliasId` INT NOT NULL AUTO_INCREMENT,
  `primaryNick` VARCHAR(45) NOT NULL,
  `aliasNick` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`aliasId`),
  UNIQUE KEY `uk_aliasNick` (`aliasNick`),
  INDEX `idx_primaryNick` (`primaryNick`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE `chat_log` (
  `logId` BIGINT NOT NULL AUTO_INCREMENT,
  `nickname` VARCHAR(45) NOT NULL,
  `message` TEXT NOT NULL,
  `timestamp` DATETIME NOT NULL,
  PRIMARY KEY (`logId`),
  INDEX `idx_chatlog_nickname` (`nickname`),
  INDEX `idx_chatlog_timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(45) NOT NULL,
  `isAdminIndicator` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE `user_video` (
  `uservideoId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `videoId` int(11) NOT NULL,
  `lastPlayedTimestamp` datetime NOT NULL,
  `playCount` int(11) NOT NULL DEFAULT 1,
  `hideFromList` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uservideoId`),
  UNIQUE KEY `uservideoId_UNIQUE` (`uservideoId`),
  INDEX `idx_userId` (`userId`),
  INDEX `idx_userId_videoId` (`userId`, `videoId`),
  INDEX `idx_hideFromList_lastPlayed` (`hideFromList`, `lastPlayedTimestamp`),
  INDEX `idx_videoId` (`videoId`),
  INDEX `idx_topTracks` (`hideFromList`, `videoId`, `playCount`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE `video` (
  `videoId` int(11) NOT NULL AUTO_INCREMENT,
  `youtubeId` varchar(50) DEFAULT NULL,
  `youtubeChannelName` varchar(255) DEFAULT NULL,
  `soundcloudId` varchar(255) DEFAULT NULL,
  `soundcloudUrl` varchar(255) DEFAULT NULL,
  `vimeoId` varchar(50) DEFAULT NULL,
  `bandcampId` varchar(255) DEFAULT NULL,
  `isFlagged` tinyint(1) NOT NULL DEFAULT 0,
  `tags` varchar(500) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `apiFailures` int(10) unsigned NOT NULL DEFAULT 0,
  `latestApiSuccess` datetime DEFAULT NULL,
  PRIMARY KEY (`videoId`),
  UNIQUE KEY `videoId_UNIQUE` (`videoId`),
  FULLTEXT KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE `artist` (
  `artistId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`artistId`),
  UNIQUE KEY `uk_artist_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE `video_artist` (
  `videoArtistId` INT NOT NULL AUTO_INCREMENT,
  `videoId` INT NOT NULL,
  `artistId` INT NOT NULL,
  `role` ENUM('primary','featured','remixer') NOT NULL DEFAULT 'primary',
  PRIMARY KEY (`videoArtistId`),
  UNIQUE KEY `uk_video_artist_role` (`videoId`, `artistId`, `role`),
  INDEX `idx_artist_video` (`artistId`),
  CONSTRAINT `fk_va_video` FOREIGN KEY (`videoId`) REFERENCES `video` (`videoId`) ON DELETE CASCADE,
  CONSTRAINT `fk_va_artist` FOREIGN KEY (`artistId`) REFERENCES `artist` (`artistId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

