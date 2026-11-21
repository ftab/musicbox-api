import { io } from 'socket.io-client';
import config from '../../config.js';
import { EventEmitter } from 'events';

const emitter = new EventEmitter();

emitter.setMaxListeners(config.emitterMaxListeners);

let socket, reconnect, configRetryTimer, joinTimer;
let currentMedia = null;
let playlistMeta = null;
let status = false;

function setStatus(state) {
    if(status === state) return;
    status = state;

    if( ! state) {
        currentMedia = null;
        playlistMeta = null;
    }

    emitter.emit('status', status);
}

async function connect() {
    if(process.env.NODE_ENV === 'test') return;

    clearTimeout(configRetryTimer);

    try {
        const url = `${config.cytube.server}/socketconfig/${config.cytube.channel}.json`;
        const response = await fetch(url, { signal: AbortSignal.timeout(10000) });

        if( ! response.ok) throw new Error(`socketconfig returned HTTP ${response.status}`);

        const json = await response.json();
        const server = json.servers?.find((entry) => entry.secure)?.url;

        if( ! server) throw new Error('socketconfig has no secure server');

        clearTimeout(reconnect);
        clearTimeout(joinTimer);

        socket?.removeAllListeners();
        socket?.disconnect();

        socket = io(server, {
            path: '/socket.io',
            transports: ['websocket'],
        });

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('playlist', onPlaylist);
        socket.on('changeMedia', onChangeMedia);
        socket.on('setPlaylistMeta', onSetPlaylistMeta);
        socket.on('delete', onDelete);
    } catch(err) {
        console.error('Failed to get cytu.be socketserver', err);
        setStatus(false);
        configRetryTimer = setTimeout(connect, 10000);
    }
};

function onConnect() {
    clearTimeout(reconnect);

    socket.emit('joinChannel', {
        name: config.cytube.channel,
    });

    clearTimeout(joinTimer);

    joinTimer = setTimeout(() => {
        setStatus(false);
        socket.disconnect();
        reconnect = setTimeout(() => socket.connect(), 5000);
    }, 15000);
}

function onDisconnect(reason) {
    clearTimeout(joinTimer);
    setStatus(false);

    if(reason === 'io server disconnect') {
        reconnect = setTimeout(() => socket.connect(), 5000);
    }
}

function onPlaylist(data) {
    clearTimeout(joinTimer);
    setStatus(true);
}

function onChangeMedia(data) {
    currentMedia = data;
    emitter.emit('changeMedia', data);
}

function onSetPlaylistMeta(data) {
    playlistMeta = data;
    emitter.emit('setPlaylistMeta', data);
}

function onDelete(data) {
    if(currentMedia?.uid === data?.uid) {
        currentMedia = null;
    }
}

function getCurrentMedia() {
    return currentMedia;
}

function getPlaylistMeta() {
    return playlistMeta;
}

function getStatus() {
    return status;
}

export default {
    connect,
    emitter,
    getCurrentMedia,
    getPlaylistMeta,
    getStatus,
};
