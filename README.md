# MusicBox API

Web interface and API for the MusicBox IRC bot database. See `#randommusic` on Rizon.

## Prerequisites

- Node.js v18+
- MySQL or MariaDB with the `ircbot` database (schema from [IRCMusicBot](https://github.com/k3ypusher/IRCMusicBot), including the V3 aliases migration)

## Setup

```bash
npm install
cp config.js.example config.js   # then fill in your DB credentials

# Development
npm run dev                      # runs on http://localhost:5173

# Production
npm run build                    # build /dist
npm start                        # runs on http://localhost:5000
```

## Pages

| Route | Description |
|-|-|
| `/` | Top 50 leaderboard |
| `/links?nickname=<nick>` | Video list for a user (alias-aware) |
| `/help` | Bot commands reference |

## API Endpoints

| Route | Description |
|-|-|
| `GET /api/leaderboard` | Paginated leaderboard (`?page=N`) |
| `GET /api/users` | Paginated user list |
| `GET /api/videos?userid=<id>` | Videos posted by a user |

## Deployment

The app is deployed via GitHub Actions (rsync + systemd user unit). First-time setup on the server:

```bash
sudo loginctl enable-linger musicbox
cd /home/musicbox/api/production
npm run build
mkdir -p ~/.config/systemd/user
cp musicbox-api.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now musicbox-api
```

`config.js` is protected from rsync overwrites by the deploy workflow.

## License

MIT

## Docker

sux: 69420
