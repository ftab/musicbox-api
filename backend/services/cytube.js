const { io } = require('socket.io-client');
const config = require('../../config');
const cytubeUrl = `${config.cytube.server}/r/${config.cytube.channel}`;
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.setMaxListeners(config.emitterMaxListeners);

let socket, currentMedia, playlistMeta, reconnect;

async function connect() {
    if(process.env.NODE_ENV === 'test') return;

    try {
        const url = `${config.cytube.server}/socketconfig/${config.cytube.channel}.json`;
        const response = await fetch(url);
        const json = await response.json();
        const server = json.servers.filter(server => server.secure).shift()?.url;

        socket = io(server, {
            path: '/socket.io',
            transports: ['websocket'],
        });

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('changeMedia', onChangeMedia);
        socket.on('setPlaylistMeta', onSetPlaylistMeta);
    } catch(err) {
        console.error('Failed to get cytu.be socketserver');
    }
};

function onConnect() {
    clearTimeout(reconnect);

    socket.emit('joinChannel', {
        name: config.cytube.channel,
    });
}

function onDisconnect(reason) {
    if(reason === 'io server disconnect') {
        reconnect = setTimeout(() => {
            socket.connect();
        }, 5000);
    }
}

function onSetPlaylistMeta(data) {
    currentMedia = undefined;
    playlistMeta = data;
    emitter.emit('setPlaylistMeta', data);
}

function onChangeMedia(data) {
    currentMedia = data;
    emitter.emit('changeMedia', data);
}

function getCurrentMedia() {
    return currentMedia;
}

function getPlaylistMeta() {
    return playlistMeta;
}

module.exports = {
    connect,
    emitter,
    getCurrentMedia,
    getPlaylistMeta,
};
