import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const dateFormat = new Intl.DateTimeFormat(navigator.language, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
});

export function setPageTitle(title = null, prefix = 'MusicBox IRC') {
    document.title = title ? `${title} - ${prefix}` : prefix;
};

export function getTrackTitle(track) {
    return track.title || 'Untitled';
};

export function pluralize(count, word) {
    count = Number(count);

    return `${count} ${word}${(count !== 1) ? 's' : ''}`;
};

export function formatProviderUrl(item) {
    if(item.youtubeId) {
        return `https://youtu.be/${item.youtubeId}`;
    }

    if(item.bandcampId) {
        const [bcArtist, bcTrack] = item.bandcampId.split(';');
        return `https://${bcArtist}.bandcamp.com/track/${bcTrack}`;
    }

    if(item.vimeoId) {
        return `https://vimeo.com/${item.vimeoId}`;
    }

    if(item.soundcloudId && item.soundcloudUrl && item.soundcloudUrl !== 'NOT_FOUND') {
        return item.soundcloudUrl;
    }

    return '#';
};

export function calculateRank(index, meta) {
    const pageNum = parseInt(meta.page, 10) || 1;
    return (pageNum - 1) * meta.perPage + index + 1;
};

export function getProvider(item) {
    return item.youtubeId ? 'YouTube' :
        item.soundcloudId ? 'SoundCloud' :
        item.bandcampId ? 'Bandcamp' :
        item.vimeoId ? 'Vimeo' : 'Unknown';
}

export function formatTimestamp(timestamp) {
    if( ! timestamp) return '—';

    const date = dayjs.utc(timestamp).local();

    return timestamp && date.isValid() ? dateFormat.format(date.toDate()) : '–';
};

export function formatDay(day) {
    if( ! day) return '—';

    const date = dayjs.utc(day);

    return date.isValid() ? dateFormat.format(date.toDate()) : '—';
}

export function formatTimestampForFilename(timestamp = Date.now()) {
    return dayjs(timestamp).format('YYYY-MM-DD-HH-mm-ss');
};

export function formatUlistContent(data = []) {
    const groups = [
        'YouTube',
        'SoundCloud',
        'Bandcamp',
        'Vimeo',
        'YouTube Flagged',
        'SoundCloud Flagged',
        'Bandcamp Flagged',
        'Vimeo Flagged',
    ];

    const grouped = Object.groupBy(data, item => {
        const provider = getProvider(item);
        return item.isFlagged ? `${provider} Flagged` : provider;
    });

    return groups.map(group => {
        const items = grouped[group] ?? [];
        const body = items.length > 0
            ? items.map(item => `${formatProviderUrl(item)}\t${getTrackTitle(item)}`).join('\n')
            : '—';
        return `[${group}]\n${body}`;
    }).join('\n\n');
};
