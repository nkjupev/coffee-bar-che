/* ================================================
   COFFEE BAR CHE — spotify-player.js
   Vinyl turntable + Spotify iFrame API playback
   ================================================ */

(function () {
  'use strict';

  const PLAYLIST_ID = '1FwgrxGksSCPBpdul6Po6f';
  const PLAYLIST_URI = `spotify:playlist:${PLAYLIST_ID}`;
  const PLAYLIST_URL = `https://open.spotify.com/playlist/${PLAYLIST_ID}`;

  const TRACK_IDS = [
    '7FwBtcecmlpc1sLySPXeGE', '0SNGe4xksgp7CGnY5kMXOJ', '0qxYx4F3vm1AOnfux6dDxP',
    '029NqmIySn1kOY305AAhxT', '2eRmD96ncTEgQwJmXa6rrg', '6i8ecOsx4J2Px1maiqzqoG',
    '4o6BgsqLIBViaGVbx5rbRk', '4HA2jo7wkMdN1lmLO6ryzE', '17Ng10tIgnYmAitl0SgT3R',
    '6lRkdG1HurVS72F9GoBeWJ', '2bvzxeD1hPWEYotw40Euq9', '2gUjs3Y8RoPpwozKyQDCUa',
    '4qM461TqtpnP4GLRIXwEnW', '4NnWuGQujzWUEg0uZokO5M', '1QFh8OH1e78dGd3VyJZCAC',
    '0u8n6tTSxYMKMZWTXjqwTt', '68pPOao5Huwo0OZGIePiCC', '0GH9HZaizHfuXnAWbSS1vz',
    '2uK4qVI1PVR4rqXG7ND6g4', '1LBHqMFgAl8UPGdxbihx98', '0bZizmaErVv3YE21B9hyYh',
    '50g03fZNZmGYpLcKzu6nbr', '6ITuEsxEy2qPhqMowdDAeI', '3EYOJ48Et32uATr9ZmLnAo',
    '05ajrG3EAcIe3j7NuqRV9B'
  ];

  function parseOembedTitle(raw) {
    const title = (raw || '').trim().replace(/^"|"$/g, '');
    const byIdx = title.toLowerCase().lastIndexOf(' by ');
    if (byIdx > 0) {
      return {
        title: title.slice(0, byIdx).replace(/^"|"$/g, ''),
        artist: title.slice(byIdx + 4).replace(/^"|"$/g, '')
      };
    }
    return { title, artist: '' };
  }

  async function fetchOembed(url) {
    const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error('oEmbed failed');
    return res.json();
  }

  async function loadTracks() {
    const results = await Promise.allSettled(
      TRACK_IDS.map(async (id) => {
        const url = `https://open.spotify.com/track/${id}`;
        const data = await fetchOembed(url);
        const meta = parseOembedTitle(data.title);
        return {
          id,
          uri: `spotify:track:${id}`,
          url,
          title: meta.title,
          artist: meta.artist,
          cover: data.thumbnail_url
        };
      })
    );

    const tracks = results.filter(r => r.status === 'fulfilled').map(r => r.value);
    if (tracks.length) return tracks;

    const playlist = await fetchOembed(PLAYLIST_URL);
    return [{
      id: PLAYLIST_ID,
      uri: PLAYLIST_URI,
      url: PLAYLIST_URL,
      title: playlist.title || 'Retro 80s CHE',
      artist: '',
      cover: playlist.thumbnail_url
    }];
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function initSpotifyPlayer() {
    const root = document.querySelector('[data-che-player]');
    if (!root || root.dataset.playerBound === 'true') return;
    root.dataset.playerBound = 'true';

    const embedHost = root.querySelector('[data-player-embed]');
    if (!embedHost) return;

    const els = {
      title: root.querySelector('[data-player-title]'),
      artist: root.querySelector('[data-player-artist]'),
      cover: root.querySelector('[data-player-cover]'),
      play: root.querySelector('[data-player-play]'),
      playIcon: root.querySelector('[data-player-play] i'),
      open: root.querySelector('[data-player-open]'),
      shuffle: root.querySelector('[data-player-shuffle]'),
      prev: root.querySelector('[data-player-prev]'),
      next: root.querySelector('[data-player-next]'),
      record: root.querySelector('[data-player-record]'),
      arm: root.querySelector('[data-player-arm]')
    };

    let controller = null;
    let tracks = [];
    let queue = [];
    let queueIndex = 0;
    let shuffleOn = false;
    let isPlaying = false;
    let started = false;
    let pendingToggle = false;

    els.open.href = PLAYLIST_URL;

    function setPlayingState(playing) {
      isPlaying = playing;
      root.classList.toggle('che-turntable--playing', playing);
      els.record?.classList.toggle('che-turntable__record--spin', playing);
      els.arm?.classList.toggle('che-turntable__arm--down', playing);
      if (els.playIcon) {
        els.playIcon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
      }
      els.play?.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    }

    function showTrack(track, animate) {
      if (!track) return;
      if (animate) root.classList.add('che-turntable--changing');
      els.title.textContent = track.title || '—';
      els.artist.textContent = track.artist || 'Retro 80s CHE';
      if (track.cover && els.cover) els.cover.src = track.cover;
      if (els.cover) els.cover.alt = track.title || 'Album cover';
      if (animate) {
        setTimeout(() => root.classList.remove('che-turntable--changing'), 350);
      }
    }

    function findTrack(uri) {
      if (!uri) return null;
      return tracks.find(t => uri.includes(t.id)) || null;
    }

    function currentTrack() {
      return queue[queueIndex] || tracks[0] || null;
    }

    function startOrToggle() {
      if (!controller) {
        pendingToggle = true;
        return;
      }

      const track = currentTrack();
      if (!started) {
        started = true;
        if (track) {
          showTrack(track, true);
          controller.loadUri(track.uri);
        }
        controller.play();
        els.arm?.classList.add('che-turntable__arm--down');
        return;
      }

      controller.togglePlay();
    }

    function playTrackAt(index) {
      const track = queue[index];
      if (!track || !controller) return;
      queueIndex = index;
      started = true;
      showTrack(track, true);
      controller.loadUri(track.uri);
      controller.play();
    }

    function playRandomShuffled() {
      if (!tracks.length) return;
      queue = shuffle(tracks);
      const next = Math.floor(Math.random() * queue.length);
      playTrackAt(next);
    }

    function skip(step) {
      if (!queue.length) queue = tracks.slice();
      if (!queue.length) return;
      const nextIndex = (queueIndex + step + queue.length) % queue.length;
      playTrackAt(nextIndex);
    }

    function setupEmbed(IFrameAPI) {
      if (!embedHost || controller) return;

      IFrameAPI.createController(embedHost, {
        uri: PLAYLIST_URI,
        width: '100%',
        height: '152'
      }, (EmbedController) => {
        controller = EmbedController;
        root.classList.remove('che-turntable--loading');

        controller.addListener('playback_update', (e) => {
          const data = e.data || {};
          setPlayingState(!data.isPaused);

          const match = findTrack(data.playingURI);
          if (match) showTrack(match, false);

          if (shuffleOn && data.isPaused && data.duration && data.position >= data.duration - 1) {
            playRandomShuffled();
          }
        });

        if (pendingToggle) {
          pendingToggle = false;
          startOrToggle();
        }
      });
    }

    els.play?.addEventListener('click', startOrToggle);
    els.prev?.addEventListener('click', () => skip(-1));
    els.next?.addEventListener('click', () => skip(1));

    els.shuffle?.addEventListener('click', () => {
      if (!shuffleOn) {
        shuffleOn = true;
        root.classList.add('che-turntable--shuffle');
        els.shuffle?.setAttribute('aria-pressed', 'true');
      }
      playRandomShuffled();
    });

    root.classList.add('che-turntable--loading');

    loadTracks().then((loaded) => {
      tracks = loaded;
      queue = tracks.slice();
      if (tracks[0]) showTrack(tracks[0], false);
    }).catch(() => {
      showTrack({ title: 'Retro 80s CHE', artist: '', cover: '' }, false);
    });

    const bindApi = (api) => {
      if (api) setupEmbed(api);
    };

    bindApi(window.SpotifyIframeApi);
    document.addEventListener('che:spotify-api', () => bindApi(window.SpotifyIframeApi));

    const prev = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      window.SpotifyIframeApi = IFrameAPI;
      if (typeof prev === 'function') prev(IFrameAPI);
      bindApi(IFrameAPI);
    };
  }

  window.initSpotifyPlayer = initSpotifyPlayer;
})();
