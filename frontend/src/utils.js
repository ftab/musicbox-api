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

export function getProvider(item) {
    return item.youtubeId ? 'YouTube' :
        item.soundcloudId ? 'SoundCloud' :
        item.bandcampId ? 'Bandcamp' :
        item.vimeoId ? 'Vimeo' : 'Unknown';
}

export function formatTimestamp(timestamp) {
    if( ! timestamp) return '—';

    return new Date(timestamp).toLocaleDateString(navigator.language, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export function formatTimestampForFilename(timestamp = Date.now()) {
    const date = new Date(timestamp);
    const pad = n => String(n).padStart(2, '0');

    return [
        date.getFullYear(),
        pad(date.getMonth() + 1),
        pad(date.getDate()),
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds()),
    ].join('-');
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
        'Unknown',
    ];

    const grouped = Object.groupBy(data, item => {
        const provider = getProvider(item);
        return (item.isFlagged && provider !== 'Unknown') ? `${provider} Flagged` : provider;
    });

    return groups.map(group => {
        const items = grouped[group] ?? [];
        const body = items.length > 0
            ? items.map(item => `${formatProviderUrl(item)}\t${getTrackTitle(item)}`).join('\n')
            : '—';
        return `[${group}]\n${body}`;
    }).join('\n\n');
};
