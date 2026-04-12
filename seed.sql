INSERT INTO user (userId, nickname, isAdminIndicator) VALUES
  (1, 'Cuckoo', 0),
  (2, 'adminuser', 1);

INSERT INTO video (videoId, youtubeId, title, youtubeChannelName) VALUES
  (1, 'dQw4w9WgXcQ', 'Test Video One', 'TestChannel'),
  (2, 'abcdefghijk', 'Test Video Two', 'TestChannel');

INSERT INTO user_video (userId, videoId, lastPlayedTimestamp, playCount, hideFromList) VALUES
  (1, 1, NOW(), 10, 0),
  (1, 2, NOW(), 5, 0),
  (2, 1, NOW(), 3, 0);

INSERT INTO artist (artistId, name) VALUES
  (1, 'Test Artist 1');
  (2, 'Test Artist 2');

INSERT INTO video_artist (videoId, artistId, role) VALUES
  (1, 1, 'primary'),
  (2, 1, 'primary');
