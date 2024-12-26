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
  UNIQUE KEY `uservideoId_UNIQUE` (`uservideoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE `video` (
  `videoId` int(11) NOT NULL AUTO_INCREMENT,
  `youtubeId` varchar(50) DEFAULT NULL,
  `soundcloudId` varchar(50) DEFAULT NULL,
  `vimeoId` varchar(50) DEFAULT NULL,
  `bandcampId` varchar(50) DEFAULT NULL,
  `isFlagged` tinyint(1) NOT NULL DEFAULT 0,
  `tags` varchar(500) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `apiFailures` int(10) unsigned NOT NULL DEFAULT 0,
  `latestApiSuccess` datetime DEFAULT NULL,
  PRIMARY KEY (`videoId`),
  UNIQUE KEY `videoId_UNIQUE` (`videoId`),
  FULLTEXT KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

