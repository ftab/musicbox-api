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

export function formatTimestamp(timestamp) {
    if( ! timestamp) return '—';

    return new Date(timestamp).toLocaleDateString(navigator.language, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};
