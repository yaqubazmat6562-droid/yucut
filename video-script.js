/* ============================================================
   YUCUT - VIDEO EDITOR (FINAL v6)
   Real Split • Dynamic Audio • Multi-Track • Time Scale
   ============================================================ */

// ================= ELEMENTS =================
const veBack        = document.getElementById('ve-back');
const veUndo        = document.getElementById('ve-undo');
const veRedo        = document.getElementById('ve-redo');
const veExportBtn   = document.getElementById('ve-export');

const veTools       = document.querySelectorAll('.ve-tool');
const vePanelViews  = {
    media:      document.getElementById('ve-panel-media'),
    audio:      document.getElementById('ve-panel-audio'),
    text:       document.getElementById('ve-panel-text'),
    sticker:    document.getElementById('ve-panel-sticker'),
    effects:    document.getElementById('ve-panel-effects'),
    filters:    document.getElementById('ve-panel-filters'),
    transition: document.getElementById('ve-panel-transition'),
    ai:         document.getElementById('ve-panel-ai'),
    overlay:    document.getElementById('ve-panel-overlay'),
    presets:    document.getElementById('ve-panel-presets'),
    export:     document.getElementById('ve-panel-export')
};

const veVideo        = document.getElementById('ve-video');
const veEmpty        = document.getElementById('ve-empty');
const vePlay         = document.getElementById('ve-play');
const veSeek         = document.getElementById('ve-seek');
const veCurrentTime  = document.getElementById('ve-current-time');
const veTotalTime    = document.getElementById('ve-total-time');
const veMute         = document.getElementById('ve-mute');
const veFullscreen   = document.getElementById('ve-fullscreen');

const veTimeline        = document.getElementById('ve-timeline');
const veTimelineScroll  = document.getElementById('ve-timeline-scroll');
const veTrackVideo      = document.getElementById('ve-track-video');
const veTrackAudio      = document.getElementById('ve-track-audio');
const vePlayhead        = document.getElementById('ve-playhead');
const veSplitBtn        = document.getElementById('ve-split');
const veDeleteClip      = document.getElementById('ve-delete-clip');
const veZoomInTL        = document.getElementById('ve-zoom-in-timeline');
const veZoomOutTL       = document.getElementById('ve-zoom-out-timeline');
const veFitTimeline     = document.getElementById('ve-fit-timeline');
const veSplitPlayhead   = document.getElementById('ve-split-playhead');

// Inputs
const veVideoInput   = document.getElementById('ve-video-input');
const veImageInput   = document.getElementById('ve-image-input');
const veAudioInput   = document.getElementById('ve-audio-input');
const veVideoUpload  = document.getElementById('ve-video-upload');
const veImageUpload  = document.getElementById('ve-image-upload');
const veAudioUpload  = document.getElementById('ve-audio-upload');
const veRecordVoice  = document.getElementById('ve-record-voice');
const veMediaList    = document.getElementById('ve-media-list');
const veAudioList    = document.getElementById('ve-audio-list');

// Filters / Effects
const veFilterGrid    = document.getElementById('ve-filter-grid');
const veEffectGrid    = document.getElementById('ve-effect-grid');
const veTransitionGrid= document.getElementById('ve-transition-grid');
const veStickerGrid   = document.getElementById('ve-sticker-grid');
const vePresetGrid    = document.getElementById('ve-preset-grid');

// Color sliders
const veBright   = document.getElementById('ve-bright');
const veContrast = document.getElementById('ve-contrast');
const veSat      = document.getElementById('ve-sat');
const veBlur     = document.getElementById('ve-blur');
const veSharp    = document.getElementById('ve-sharp');
const veHue      = document.getElementById('ve-hue');
const veGray     = document.getElementById('ve-gray');
const veApplyFilter = document.getElementById('ve-apply-filter');

// Text
const veTextInput    = document.getElementById('ve-text-input');
const veTextSize     = document.getElementById('ve-text-size');
const veTextSizeVal  = document.getElementById('ve-text-size-val');
const veTextColor    = document.getElementById('ve-text-color');
const veTextBg       = document.getElementById('ve-text-bg');
const veTextAnim     = document.getElementById('ve-text-anim');
const vePosBtns      = document.querySelectorAll('.ve-pos-btn');
const veAddText      = document.getElementById('ve-add-text');

// Export
const veExportRes     = document.getElementById('ve-export-res');
const veExportAspect  = document.getElementById('ve-export-aspect');
const veExportFps     = document.getElementById('ve-export-fps');
const veExportQuality = document.getElementById('ve-export-quality');
const veQualityVal    = document.getElementById('ve-quality-val');
const veExportFormat  = document.getElementById('ve-export-format');
const veExportRotate  = document.getElementById('ve-export-rotate');
const veRotateVal     = document.getElementById('ve-rotate-val');
const veInfoDuration  = document.getElementById('ve-info-duration');
const veInfoSize      = document.getElementById('ve-info-size');
const veInfoOutput    = document.getElementById('ve-info-output');
const veDoExport      = document.getElementById('ve-do-export');

// Volume
const veVideoVolume     = document.getElementById('ve-video-volume');
const veVideoVolumeVal  = document.getElementById('ve-video-volume-val');
const veVideoMuteBtn    = document.getElementById('ve-video-mute-btn');
const veVideoMuteIcon   = document.getElementById('ve-video-mute-icon');

// Overlay
const veOverlayVideoInput  = document.getElementById('ve-overlay-video-input');
const veOverlayImageInput  = document.getElementById('ve-overlay-image-input');
const veOverlayVideoUpload = document.getElementById('ve-overlay-video-upload');
const veOverlayImageUpload = document.getElementById('ve-overlay-image-upload');
const veOverlayLayer       = document.getElementById('ve-overlay-layer');
const veOverlayList        = document.getElementById('ve-overlay-list');
const veOverlayEmpty       = document.getElementById('ve-overlay-empty');
const veOverlayControls    = document.getElementById('ve-overlay-controls');
const veOverlaySize        = document.getElementById('ve-overlay-size');
const veOverlaySizeVal     = document.getElementById('ve-overlay-size-val');
const veOverlayOpacity     = document.getElementById('ve-overlay-opacity');
const veOverlayOpacityVal  = document.getElementById('ve-overlay-opacity-val');
const veOverlayRotation    = document.getElementById('ve-overlay-rotation');
const veOverlayRotationVal = document.getElementById('ve-overlay-rotation-val');
const veOverlayStart       = document.getElementById('ve-overlay-start');
const veOverlayStartVal    = document.getElementById('ve-overlay-start-val');
const veOverlayEnd         = document.getElementById('ve-overlay-end');
const veOverlayEndVal      = document.getElementById('ve-overlay-end-val');
const veOverlayApply       = document.getElementById('ve-overlay-apply');
const veOverlayDelete      = document.getElementById('ve-overlay-delete');

// ================= STATE =================
let mediaLibrary = [];
let audioLibrary = [];
let timelineClips = [];
let selectedClipId = null;
let clipIdCounter = 0;

// ✅ AUDIO STATE (Independent Track)
let audioTracks = [];           // Array of audio clips on timeline
let selectedAudioId = null;
let audioIdCounter = 0;

let currentVideoSrc = null;
let videoNaturalDuration = 0;
let currentTextPosition = 'center';
let currentEffectsFilter = 'none';
let timelineZoom = 1;

let videoVolumeLevel = 1;
let isVideoMuted = false;
let isAutoAdvancing = false;
let isExporting = false;

let exportRotate = 0;
let exportFlip = 'none';

// Audio playback objects
const audioPlaybackObjects = {};

// ================= TIMELINE CONFIG =================
const TIMELINE_CONFIG = {
    PX_PER_SECOND: 50,
    MIN_ZOOM: 0.3,
    MAX_ZOOM: 5,
    MIN_CLIP_DURATION: 0.5,
    MAX_CLIP_DURATION: 300,
    MAJOR_MARKER_INTERVAL: 5,
    MINOR_MARKER_INTERVAL: 1,
    END_BUFFER: 0.06,
    START_BUFFER: 0.06
};

// ================= CLIP PLAYBACK RANGE =================
function getSelectedClipPlaybackRange() {
    if (!selectedClipId) return null;
    const clip = timelineClips.find(c => c.id === selectedClipId);
    if (!clip || clip.type === 'audio') return null;

    const start = clip.trimStart || 0;
    const end = clip.trimEnd || (start + clip.duration);
    return { clip, start, end };
}

function getNextVideoClip(currentClipId) {
    const videoClips = timelineClips.filter(c => c.type !== 'audio');
    if (videoClips.length === 0) return null;
    const idx = videoClips.findIndex(c => c.id === currentClipId);
    if (idx === -1 || idx >= videoClips.length - 1) return null;
    return videoClips[idx + 1];
}

function isSameVideoSource(clip) {
    if (!clip) return false;
    const currentSrc = veVideo.getAttribute('src') || veVideo.src || '';
    return currentSrc === clip.src;
}

// ================= TOOLBAR SWITCH =================
veTools.forEach(tool => {
    tool.addEventListener('click', () => {
        const toolKey = tool.dataset.tool;
        veTools.forEach(t => t.classList.remove('active'));
        tool.classList.add('active');
        Object.values(vePanelViews).forEach(p => { if (p) p.style.display = 'none'; });
        if (vePanelViews[toolKey]) vePanelViews[toolKey].style.display = 'block';
    });
});

// ================= UPLOAD HANDLERS =================
veVideoUpload.addEventListener('click', () => veVideoInput.click());
veImageUpload.addEventListener('click', () => veImageInput.click());
veAudioUpload.addEventListener('click', () => veAudioInput.click());

veVideoInput.addEventListener('change', (e) => handleMediaFiles(e.target.files, 'video'));
veImageInput.addEventListener('change', (e) => handleMediaFiles(e.target.files, 'image'));
veAudioInput.addEventListener('change', (e) => handleAudioFiles(e.target.files));

// ================= HANDLE VIDEO/IMAGE =================
function handleMediaFiles(files, type) {
    Array.from(files).forEach(file => {
        const sizeMB = file.size / 1024 / 1024;
        const sizeGB = sizeMB / 1024;

        if (sizeGB > 5) {
            alert(`⚠️ "${file.name}" (${sizeGB.toFixed(2)}GB) bahut badi hai.`);
            return;
        }

        if (sizeGB > 1) showToast(`⏳ Loading ${sizeGB.toFixed(2)}GB video...`);

        const blobUrl = URL.createObjectURL(file);

        const media = {
            id: 'media_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            type: type,
            name: file.name,
            src: blobUrl,
            size: file.size
        };

        if (type === 'video') {
            const testVid = document.createElement('video');
            testVid.preload = 'metadata';
            testVid.onloadedmetadata = () => {
                media.duration = testVid.duration;
                media.width = testVid.videoWidth;
                media.height = testVid.videoHeight;
                mediaLibrary.push(media);
                renderMediaList();
                addClipToTimeline(media);
            };
            testVid.onerror = () => {
                alert(`❌ "${file.name}" load nahi ho saki.`);
                URL.revokeObjectURL(blobUrl);
            };
            testVid.src = blobUrl;
        } else {
            media.duration = 3;
            mediaLibrary.push(media);
            renderMediaList();
            addClipToTimeline(media);
        }
    });

    veVideoInput.value = '';
    veImageInput.value = '';
}

// ================= HANDLE AUDIO =================
function handleAudioFiles(files) {
    Array.from(files).forEach(file => {
        const sizeMB = file.size / 1024 / 1024;
        if (sizeMB > 500) {
            alert(`⚠️ "${file.name}" bahut badi hai.`);
            return;
        }

        const blobUrl = URL.createObjectURL(file);

        const audio = {
            id: 'audio_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            type: 'audio',
            name: file.name,
            src: blobUrl,
            size: file.size
        };

        const testAud = new Audio();
        testAud.preload = 'metadata';
        testAud.onloadedmetadata = () => {
            audio.duration = testAud.duration;
            audioLibrary.push(audio);
            renderAudioList();
            addAudioToTimeline(audio);
        };
        testAud.onerror = () => {
            alert(`❌ "${file.name}" load nahi ho saki.`);
            URL.revokeObjectURL(blobUrl);
        };
        testAud.src = blobUrl;
    });
    veAudioInput.value = '';
}

// ================= MEDIA LIST =================
function renderMediaList() {
    if (mediaLibrary.length === 0) {
        veMediaList.innerHTML = '<p class="ve-empty-msg">Koi media nahi hai</p>';
        return;
    }
    veMediaList.innerHTML = '';
    mediaLibrary.forEach(media => {
        const item = document.createElement('div');
        item.className = 've-media-item';
        item.title = media.name;
        if (media.type === 'video') {
            item.innerHTML = `<video src="${media.src}" muted></video><span class="ve-media-badge">MP4</span>`;
        } else {
            item.innerHTML = `<img src="${media.src}" alt="${media.name}"><span class="ve-media-badge">IMG</span>`;
        }
        item.addEventListener('click', () => addClipToTimeline(media));
        veMediaList.appendChild(item);
    });
}

function renderAudioList() {
    if (audioLibrary.length === 0) {
        veAudioList.innerHTML = '<p class="ve-empty-msg">Koi audio nahi hai</p>';
        return;
    }
    veAudioList.innerHTML = '';
    audioLibrary.forEach(audio => {
        const item = document.createElement('div');
        item.className = 've-media-item';
        item.title = audio.name;
        item.innerHTML = `
            <div style="width:100%;height:100%;background:linear-gradient(135deg,#ff9500,#cc7700);display:flex;align-items:center;justify-content:center;color:white;font-size:20px;">
                <i class="fa-solid fa-music"></i>
            </div>
            <span class="ve-media-badge">AUD</span>
        `;
        item.addEventListener('click', () => addAudioToTimeline(audio));
        veAudioList.appendChild(item);
    });
}

// ================= VIDEO TIMELINE =================
function addClipToTimeline(media) {
    const clip = {
        id: 'clip_' + (++clipIdCounter),
        mediaId: media.id,
        type: media.type,
        name: media.name,
        src: media.src,
        duration: media.duration || 3,
        trimStart: 0,
        trimEnd: media.duration || 3,
        filters: { filter: 'none' },
        transition: 'none'
    };
    timelineClips.push(clip);
    renderTimeline();
    selectClip(clip.id);
}

// ✅ AUDIO to Timeline — NAYA
function addAudioToTimeline(audio) {
    audioIdCounter++;

    const audioClip = {
        id: 'aud_' + audioIdCounter,
        mediaId: audio.id,
        type: 'audio',
        name: audio.name,
        src: audio.src,
        duration: audio.duration || 5,
        originalDuration: audio.duration || 5,
        trimStart: 0,
        trimEnd: audio.duration || 5,
        startTime: 0,           // ✅ Timeline start position (drag to move)
        volume: 100,
        muted: false,
        fadeIn: 0,
        fadeOut: 0
    };

    audioTracks.push(audioClip);

    // Setup playback object
    const audioObj = new Audio();
    audioObj.src = audio.src;
    audioObj.preload = 'auto';
    audioObj.volume = audioClip.volume / 100;
    audioPlaybackObjects[audioClip.id] = audioObj;

    renderTimeline();
    selectAudioClip(audioClip.id);

    showToast(`🎵 Audio added: ${audio.name}`);
}

// ================= RENDER TIMELINE (Video + Audio) =================
function renderTimeline() {
    // Render Video Track
    veTrackVideo.innerHTML = '';
    let videoAccumulatedTime = 0;

    timelineClips.forEach(clip => {
        if (clip.type !== 'audio') {
            veTrackVideo.appendChild(createClipEl(clip, clip.type === 'image' ? 'image-clip' : 'video-clip'));
            videoAccumulatedTime += clip.duration;
        }
    });

    // Render Audio Track
    renderAudioTimeline();

    // Update widths
    const totalVideoDuration = timelineClips
        .filter(c => c.type !== 'audio')
        .reduce((s, c) => s + c.duration, 0);
    const totalAudioDuration = audioTracks.reduce((s, a) => s + a.duration, 0);
    const totalDuration = Math.max(totalVideoDuration, totalAudioDuration);

    const pxPerSec = TIMELINE_CONFIG.PX_PER_SECOND * timelineZoom;
    const minWidth = Math.max(
        (totalDuration * pxPerSec) + 200,
        veTimelineScroll ? veTimelineScroll.clientWidth : 800
    );

    veTrackVideo.style.minWidth = minWidth + 'px';
    veTrackAudio.style.minWidth = minWidth + 'px';

    renderTimeRuler(totalDuration, minWidth);
    updateExportInfo();
    updateTimelineTimecode();
}

// ✅ RENDER AUDIO TIMELINE
function renderAudioTimeline() {
    if (!veTrackAudio) return;
    veTrackAudio.innerHTML = '';

    if (audioTracks.length === 0) {
        veTrackAudio.innerHTML = `<div style="color: rgba(255,255,255,0.25); font-size: 11px; padding: 12px; width: 100%; text-align: center;">
            Audio panel se upload karein — audio yahan aayega
        </div>`;
        return;
    }

    const pxPerSec = TIMELINE_CONFIG.PX_PER_SECOND * timelineZoom;

    audioTracks.forEach(audioClip => {
        const el = document.createElement('div');
        el.className = 've-clip audio-clip';
        el.dataset.audioId = audioClip.id;

        // Width based on duration
        const width = Math.max(40, audioClip.duration * pxPerSec);
        el.style.width = width + 'px';

        // Left position based on startTime
        const left = (audioClip.startTime || 0) * pxPerSec;
        el.style.marginLeft = left + 'px';

        if (audioClip.id === selectedAudioId) el.classList.add('selected');

        el.innerHTML = `
            <span class="ve-clip-label">
                <i class="fa-solid fa-music" style="font-size: 9px; margin-right: 4px;"></i>
                ${audioClip.name}
            </span>
            <span class="ve-clip-duration">${formatTime(audioClip.duration)}</span>
            <div class="trim-end"></div>
        `;

        // Click to select
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            selectAudioClip(audioClip.id);
        });

        // Drag to move (startTime change)
        el.addEventListener('mousedown', (e) => {
            // Check if near edge (trim)
            const rect = el.getBoundingClientRect();
            const edgeX = e.clientX - rect.left;
            if (edgeX < 8 || edgeX > rect.width - 8) {
                startAudioTrim(e, audioClip, edgeX < 8 ? 'start' : 'end');
                e.stopPropagation();
                return;
            }
            // Otherwise drag to move
            startAudioDrag(e, audioClip);
            e.stopPropagation();
        });

        veTrackAudio.appendChild(el);
    });
}

// ================= AUDIO DRAG (Move) =================
let audioDragData = null;

function startAudioDrag(e, audioClip) {
    e.preventDefault();
    selectAudioClip(audioClip.id);

    audioDragData = {
        audioClip,
        startX: e.clientX,
        origStartTime: audioClip.startTime || 0
    };

    document.addEventListener('mousemove', onAudioDrag);
    document.addEventListener('mouseup', endAudioDrag);
    document.addEventListener('touchmove', onAudioDrag, { passive: false });
    document.addEventListener('touchend', endAudioDrag);
}

function onAudioDrag(e) {
    if (!audioDragData) return;
    e.preventDefault();

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const pxPerSec = TIMELINE_CONFIG.PX_PER_SECOND * timelineZoom;
    const delta = (clientX - audioDragData.startX) / pxPerSec;

    let newStart = Math.max(0, audioDragData.origStartTime + delta);
    audioDragData.audioClip.startTime = newStart;

    renderAudioTimeline();
}

function endAudioDrag() {
    audioDragData = null;
    document.removeEventListener('mousemove', onAudioDrag);
    document.removeEventListener('mouseup', endAudioDrag);
    document.removeEventListener('touchmove', onAudioDrag);
    document.removeEventListener('touchend', endAudioDrag);
}

// ================= AUDIO TRIM =================
let audioTrimData = null;

function startAudioTrim(e, audioClip, edge) {
    e.preventDefault();
    selectAudioClip(audioClip.id);

    audioTrimData = {
        audioClip,
        edge,
        startX: e.clientX,
        origTrimStart: audioClip.trimStart,
        origTrimEnd: audioClip.trimEnd
    };

    document.addEventListener('mousemove', onAudioTrim);
    document.addEventListener('mouseup', endAudioTrim);
    document.addEventListener('touchmove', onAudioTrim, { passive: false });
    document.addEventListener('touchend', endAudioTrim);
}

function onAudioTrim(e) {
    if (!audioTrimData) return;
    e.preventDefault();

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const pxPerSec = TIMELINE_CONFIG.PX_PER_SECOND * timelineZoom;
    const delta = (clientX - audioTrimData.startX) / pxPerSec;
    const audioClip = audioTrimData.audioClip;

    if (audioTrimData.edge === 'start') {
        let newStart = audioTrimData.origTrimStart + delta;
        newStart = Math.max(0, Math.min(newStart, audioClip.trimEnd - TIMELINE_CONFIG.MIN_CLIP_DURATION));
        audioClip.trimStart = newStart;
        audioClip.duration = audioClip.trimEnd - newStart;
    } else {
        let newEnd = audioTrimData.origTrimEnd + delta;
        newEnd = Math.min(audioClip.originalDuration, Math.max(newEnd, audioClip.trimStart + TIMELINE_CONFIG.MIN_CLIP_DURATION));
        audioClip.trimEnd = newEnd;
        audioClip.duration = newEnd - audioClip.trimStart;
    }

    renderAudioTimeline();
}

function endAudioTrim() {
    audioTrimData = null;
    document.removeEventListener('mousemove', onAudioTrim);
    document.removeEventListener('mouseup', endAudioTrim);
    document.removeEventListener('touchmove', onAudioTrim);
    document.removeEventListener('touchend', endAudioTrim);
}

// ================= AUDIO SPLIT =================
function splitAudioAtPlayhead() {
    if (!selectedAudioId) {
        alert('Pehle audio clip select karein!');
        return;
    }

    const audioClip = audioTracks.find(a => a.id === selectedAudioId);
    if (!audioClip) return;

    if (audioClip.duration < TIMELINE_CONFIG.MIN_CLIP_DURATION * 2) {
        alert('Audio bahut chhoti hai split ke liye.');
        return;
    }

    // Split at playhead (global time)
    const playheadGlobalTime = veVideo.currentTime;
    const clipStartGlobal = audioClip.startTime || 0;
    const clipEndGlobal = clipStartGlobal + audioClip.duration;

    if (playheadGlobalTime <= clipStartGlobal + TIMELINE_CONFIG.MIN_CLIP_DURATION ||
        playheadGlobalTime >= clipEndGlobal - TIMELINE_CONFIG.MIN_CLIP_DURATION) {
        alert('Playhead audio ke beech me rakhein.');
        return;
    }

    // Local split point
    const localSplitPoint = playheadGlobalTime - clipStartGlobal;

    const leftDur = localSplitPoint;
    const rightDur = audioClip.duration - localSplitPoint;

    const clip1 = {
        ...audioClip,
        id: 'aud_' + (++audioIdCounter),
        duration: leftDur,
        trimStart: audioClip.trimStart,
        trimEnd: audioClip.trimStart + leftDur,
        startTime: audioClip.startTime,
        name: audioClip.name + ' (1)'
    };

    const clip2 = {
        ...audioClip,
        id: 'aud_' + (++audioIdCounter),
        duration: rightDur,
        trimStart: audioClip.trimStart + leftDur,
        trimEnd: audioClip.trimEnd,
        startTime: playheadGlobalTime,
        name: audioClip.name + ' (2)'
    };

    // Setup new playback object for clip2
    const obj2 = new Audio();
    obj2.src = clip2.src;
    obj2.preload = 'auto';
    obj2.volume = clip2.volume / 100;
    audioPlaybackObjects[clip2.id] = obj2;

    // Remove old audio object
    if (audioPlaybackObjects[audioClip.id]) {
        audioPlaybackObjects[audioClip.id].pause();
        delete audioPlaybackObjects[audioClip.id];
    }

    // Replace old clip
    const idx = audioTracks.indexOf(audioClip);
    audioTracks.splice(idx, 1, clip1, clip2);

    // Setup clip1 playback object
    const obj1 = new Audio();
    obj1.src = clip1.src;
    obj1.preload = 'auto';
    obj1.volume = clip1.volume / 100;
    audioPlaybackObjects[clip1.id] = obj1;

    selectedAudioId = clip2.id;
    renderAudioTimeline();
    showToast('✂️ Audio split!');
}

// ================= SELECT AUDIO CLIP =================
function selectAudioClip(audioId) {
    selectedAudioId = audioId;
    selectedClipId = null;

    document.querySelectorAll('.ve-clip.audio-clip').forEach(el => {
        el.classList.toggle('selected', el.dataset.audioId === audioId);
    });

    document.querySelectorAll('.ve-clip.video-clip, .ve-clip.image-clip').forEach(el => {
        el.classList.remove('selected');
    });
}

// ================= CREATE VIDEO CLIP EL =================
function createClipEl(clip, className) {
    const el = document.createElement('div');
    el.className = 've-clip ' + className;
    el.dataset.clipId = clip.id;

    const pxPerSec = TIMELINE_CONFIG.PX_PER_SECOND * timelineZoom;
    const width = Math.max(40, clip.duration * pxPerSec);
    el.style.width = width + 'px';

    if (clip.id === selectedClipId) el.classList.add('selected');

    el.innerHTML = `
        <span class="ve-clip-label">${clip.name}</span>
        <span class="ve-clip-duration">${formatTime(clip.duration)}</span>
    `;

    el.addEventListener('click', (e) => {
        e.stopPropagation();
        selectClip(clip.id);
    });

    return el;
}

// ================= RENDER TIME RULER =================
function renderTimeRuler(totalDuration, minWidth) {
    const ruler = document.getElementById('ve-time-ruler');
    if (!ruler) return;

    ruler.innerHTML = '';
    ruler.style.minWidth = minWidth + 'px';

    const maxTime = Math.max(totalDuration + 10, 30);
    const pxPerSec = TIMELINE_CONFIG.PX_PER_SECOND * timelineZoom;

    let majorInterval = TIMELINE_CONFIG.MAJOR_MARKER_INTERVAL;
    let minorInterval = TIMELINE_CONFIG.MINOR_MARKER_INTERVAL;

    if (timelineZoom < 0.5) { majorInterval = 10; minorInterval = 5; }
    else if (timelineZoom > 2) { majorInterval = 1; minorInterval = 0.5; }

    for (let t = 0; t <= maxTime; t += minorInterval) {
        const marker = document.createElement('div');
        marker.className = 've-time-marker';
        marker.style.left = (t * pxPerSec) + 'px';
        ruler.appendChild(marker);
    }

    for (let t = 0; t <= maxTime; t += majorInterval) {
        const marker = document.createElement('div');
        marker.className = 've-time-marker major';
        marker.style.left = (t * pxPerSec) + 'px';

        const label = document.createElement('div');
        label.className = 've-time-marker-label major';
        label.style.left = (t * pxPerSec + 4) + 'px';
        label.textContent = formatTimeShort(t);

        ruler.appendChild(marker);
        ruler.appendChild(label);
    }
}

function updateTimelineTimecode() {
    const el = document.getElementById('ve-timeline-timecode');
    if (!el) return;
    const current = formatTime(veVideo.currentTime || 0);
    const totalDuration = timelineClips
        .filter(c => c.type !== 'audio')
        .reduce((s, c) => s + c.duration, 0);
    el.textContent = `${current} / ${formatTime(totalDuration)}`;
}

function formatTimeShort(seconds) {
    if (seconds < 60) return Math.floor(seconds) + 's';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ':' + String(s).padStart(2, '0');
}

// ================= SELECT VIDEO CLIP =================
function selectClip(clipId) {
    selectedClipId = clipId;
    selectedAudioId = null;

    const clip = timelineClips.find(c => c.id === clipId);
    if (!clip) return;

    document.querySelectorAll('.ve-clip').forEach(el => {
        el.classList.toggle('selected', el.dataset.clipId === clipId);
    });

    if (clip.type === 'video' || clip.type === 'image') {
        currentVideoSrc = clip.src;

        if (clip.type === 'video') {
            const sameSource = isSameVideoSource(clip);

            if (sameSource) {
                try { veVideo.currentTime = clip.trimStart || 0; } catch (e) {}
                vePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
                updateClipTimeDisplay(clip);
            } else {
                veVideo.pause();
                veVideo.src = clip.src;
                veVideo.style.display = 'block';
                veEmpty.style.display = 'none';
                veVideo.load();

                const onLoaded = () => {
                    veVideo.removeEventListener('loadedmetadata', onLoaded);
                    try { veVideo.currentTime = clip.trimStart || 0; } catch (e) {}
                    vePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
                    updateClipTimeDisplay(clip);
                };
                veVideo.addEventListener('loadedmetadata', onLoaded);
            }
        } else {
            try { veVideo.src = ''; } catch (e) {}
            veEmpty.style.display = 'none';
        }
    }
    isAutoAdvancing = false;
}

function updateClipTimeDisplay(clip) {
    if (!clip) return;
    const clipDuration = clip.duration;
    const localTime = veVideo.currentTime - (clip.trimStart || 0);
    veCurrentTime.textContent = formatTime(Math.max(0, localTime));
    veTotalTime.textContent = formatTime(clipDuration);
    veSeek.value = Math.min(100, Math.max(0, (localTime / clipDuration) * 100));
}

// ================= PLAY/PAUSE =================
vePlay.addEventListener('click', togglePlay);
veVideo.addEventListener('click', togglePlay);

function togglePlay() {
    if (!veVideo.src) return;

    if (veVideo.paused) {
        const range = getSelectedClipPlaybackRange();
        if (range) {
            if (veVideo.currentTime < range.start - 0.05 ||
                veVideo.currentTime >= range.end - 0.1) {
                try { veVideo.currentTime = range.start; } catch (e) {}
            }
        }

        veVideo.play().then(() => {
            vePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }).catch(err => console.warn('Play failed:', err));
    } else {
        veVideo.pause();
        vePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

// ================= TIME UPDATE =================
let lastTimeUpdate = 0;

veVideo.addEventListener('timeupdate', () => {
    if (!veVideo.duration) return;
    if (isExporting) return;

    const now = Date.now();
    if (now - lastTimeUpdate < 60) return;
    lastTimeUpdate = now;

    const range = getSelectedClipPlaybackRange();

    if (range && !isNaN(range.end) && !isNaN(range.start)) {
        if (veVideo.currentTime >= range.end - TIMELINE_CONFIG.END_BUFFER) {
            veVideo.pause();

            if (isAutoAdvancing) return;
            const nextClip = getNextVideoClip(range.clip.id);

            if (nextClip) {
                isAutoAdvancing = true;
                selectedClipId = nextClip.id;

                document.querySelectorAll('.ve-clip').forEach(el => {
                    el.classList.toggle('selected', el.dataset.clipId === nextClip.id);
                });

                if (isSameVideoSource(nextClip)) {
                    try { veVideo.currentTime = nextClip.trimStart || 0; } catch (e) {}
                    setTimeout(() => {
                        isAutoAdvancing = false;
                        try {
                            veVideo.play().then(() => {
                                vePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
                            }).catch(() => {});
                        } catch (e) { isAutoAdvancing = false; }
                    }, 80);
                } else {
                    veVideo.src = nextClip.src;
                    veVideo.load();
                    veVideo.addEventListener('loadedmetadata', function handler() {
                        veVideo.removeEventListener('loadedmetadata', handler);
                        try { veVideo.currentTime = nextClip.trimStart || 0; } catch (e) {}
                        isAutoAdvancing = false;
                        veVideo.play().then(() => {
                            vePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
                        }).catch(() => {});
                    }, { once: true });
                }
            } else {
                isAutoAdvancing = false;
                vePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
            return;
        }

        if (veVideo.currentTime < range.start - TIMELINE_CONFIG.START_BUFFER) {
            try { veVideo.currentTime = range.start; } catch (e) {}
            return;
        }

        const clipLocalTime = veVideo.currentTime - range.start;
        const clipDuration = range.end - range.start;
        veSeek.value = Math.min(100, Math.max(0, (clipLocalTime / clipDuration) * 100));
        veCurrentTime.textContent = formatTime(clipLocalTime);
        veTotalTime.textContent = formatTime(clipDuration);
    } else {
        const percent = (veVideo.currentTime / veVideo.duration) * 100;
        veSeek.value = percent;
        veCurrentTime.textContent = formatTime(veVideo.currentTime);
        veTotalTime.textContent = formatTime(veVideo.duration);
    }

    // Playhead position
    const pxPerSec = TIMELINE_CONFIG.PX_PER_SECOND * timelineZoom;
    vePlayhead.style.left = (14 + (veVideo.currentTime * pxPerSec)) + 'px';
    updateTimelineTimecode();

    // ✅ AUDIO SYNC — Play audios based on currentTime
    syncAudioWithVideo(veVideo.currentTime);
});

// ================= AUDIO SYNC FUNCTION =================
function syncAudioWithVideo(globalTime) {
    if (isExporting) return;

    audioTracks.forEach(audioClip => {
        const audioObj = audioPlaybackObjects[audioClip.id];
        if (!audioObj) return;

        const clipStart = audioClip.startTime || 0;
        const clipEnd = clipStart + audioClip.duration;

        // Check if audio should be playing
        const shouldPlay = globalTime >= clipStart && globalTime < clipEnd;

        if (shouldPlay && !veVideo.paused && !audioClip.muted) {
            // Calculate local time within audio
            const localTime = (globalTime - clipStart) + (audioClip.trimStart || 0);

            if (Math.abs(audioObj.currentTime - localTime) > 0.3) {
                try { audioObj.currentTime = localTime; } catch (e) {}
            }

            if (audioObj.paused) {
                audioObj.volume = (audioClip.volume / 100);
                audioObj.play().catch(() => {});
            }
        } else {
            if (!audioObj.paused) {
                audioObj.pause();
            }
        }
    });
}

veVideo.addEventListener('loadedmetadata', () => {
    videoNaturalDuration = veVideo.duration;
});

veVideo.addEventListener('ended', () => {
    if (isAutoAdvancing) return;
    if (isExporting) return;

    const range = getSelectedClipPlaybackRange();
    if (range) {
        const nextClip = getNextVideoClip(range.clip.id);
        if (nextClip) {
            isAutoAdvancing = true;
            selectedClipId = nextClip.id;

            document.querySelectorAll('.ve-clip').forEach(el => {
                el.classList.toggle('selected', el.dataset.clipId === nextClip.id);
            });

            if (isSameVideoSource(nextClip)) {
                try { veVideo.currentTime = nextClip.trimStart || 0; } catch (e) {}
                setTimeout(() => {
                    isAutoAdvancing = false;
                    veVideo.play().then(() => {
                        vePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    }).catch(() => {});
                }, 80);
            } else {
                veVideo.src = nextClip.src;
                veVideo.load();
                veVideo.addEventListener('loadedmetadata', function handler() {
                    veVideo.removeEventListener('loadedmetadata', handler);
                    try { veVideo.currentTime = nextClip.trimStart || 0; } catch (e) {}
                    isAutoAdvancing = false;
                    veVideo.play().then(() => {
                        vePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    }).catch(() => {});
                }, { once: true });
            }
            return;
        }
    }
    vePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
});

// ================= SEEK =================
veSeek.addEventListener('input', (e) => {
    if (!veVideo.duration) return;

    const range = getSelectedClipPlaybackRange();

    if (range) {
        const clipDuration = range.end - range.start;
        const targetLocalTime = (e.target.value / 100) * clipDuration;
        const targetGlobalTime = range.start + targetLocalTime;
        const clampedTime = Math.max(range.start, Math.min(targetGlobalTime, range.end - 0.05));
        try { veVideo.currentTime = clampedTime; } catch (err) {}
        veCurrentTime.textContent = formatTime(targetLocalTime);
    } else {
        veVideo.currentTime = (e.target.value / 100) * veVideo.duration;
    }
});

veMute.addEventListener('click', () => {
    veVideo.muted = !veVideo.muted;
    veMute.innerHTML = veVideo.muted
        ? '<i class="fa-solid fa-volume-xmark"></i>'
        : '<i class="fa-solid fa-volume-high"></i>';
});

veFullscreen.addEventListener('click', () => {
    const preview = document.getElementById('ve-preview');
    if (!preview) return;
    if (!document.fullscreenElement) {
        preview.requestFullscreen?.();
    } else {
        document.exitFullscreen?.();
    }
});

// ================= SPLIT VIDEO IN MIDDLE =================
veSplitBtn.addEventListener('click', () => {
    if (selectedAudioId) {
        // Audio split
        splitAudioAtPlayhead();
        return;
    }

    if (!selectedClipId) {
        alert('Pehle koi clip select karein!');
        return;
    }

    const clip = timelineClips.find(c => c.id === selectedClipId);
    if (!clip) return;

    if (clip.duration < TIMELINE_CONFIG.MIN_CLIP_DURATION * 2) {
        alert(`⚠️ Clip bahut chhoti hai.`);
        return;
    }

    const mid = clip.duration / 2;
    const clipStart = clip.trimStart || 0;
    const splitPoint = clipStart + mid;

    const clip1 = { ...clip, id: 'clip_' + (++clipIdCounter), duration: mid, trimStart: clipStart, trimEnd: splitPoint, name: clip.name + ' (1)' };
    const clip2 = { ...clip, id: 'clip_' + (++clipIdCounter), duration: mid, trimStart: splitPoint, trimEnd: clip.trimEnd || (clipStart + clip.duration), name: clip.name + ' (2)' };

    const idx = timelineClips.indexOf(clip);
    timelineClips.splice(idx, 1, clip1, clip2);

    selectedClipId = clip2.id;
    renderTimeline();
    showToast('✂️ Video split');
    forceVideoToClip(clip2);
});

// ================= SPLIT AT PLAYHEAD =================
if (veSplitPlayhead) {
    veSplitPlayhead.addEventListener('click', () => {
        if (selectedAudioId) {
            splitAudioAtPlayhead();
            return;
        }

        if (!selectedClipId) {
            alert('Pehle koi clip select karein!');
            return;
        }

        const clip = timelineClips.find(c => c.id === selectedClipId);
        if (!clip) return;

        const clipStart = clip.trimStart || 0;
        const clipEnd = clip.trimEnd || (clipStart + clip.duration);
        let playheadTime = veVideo.currentTime;

        if (playheadTime <= clipStart) playheadTime = clipStart + TIMELINE_CONFIG.MIN_CLIP_DURATION;
        if (playheadTime >= clipEnd) playheadTime = clipEnd - TIMELINE_CONFIG.MIN_CLIP_DURATION;

        const leftDuration = playheadTime - clipStart;
        const rightDuration = clipEnd - playheadTime;

        if (leftDuration < TIMELINE_CONFIG.MIN_CLIP_DURATION || rightDuration < TIMELINE_CONFIG.MIN_CLIP_DURATION) {
            alert('⚠️ Split nahi ho sakti.');
            return;
        }

        const clip1 = { ...clip, id: 'clip_' + (++clipIdCounter), duration: leftDuration, trimStart: clipStart, trimEnd: playheadTime, name: clip.name + ' (1)' };
        const clip2 = { ...clip, id: 'clip_' + (++clipIdCounter), duration: rightDuration, trimStart: playheadTime, trimEnd: clipEnd, name: clip.name + ' (2)' };

        const idx = timelineClips.indexOf(clip);
        timelineClips.splice(idx, 1, clip1, clip2);

        selectedClipId = clip2.id;
        renderTimeline();
        showToast(`✂️ Split at ${formatTime(playheadTime)}`);
        forceVideoToClip(clip2);
    });
}

function forceVideoToClip(clip) {
    if (!clip || clip.type !== 'video') return;

    veVideo.pause();
    isAutoAdvancing = false;

    if (isSameVideoSource(clip)) {
        try { veVideo.currentTime = clip.trimStart || 0; } catch (e) {}
    } else {
        veVideo.src = clip.src;
        veVideo.load();
        veVideo.addEventListener('loadedmetadata', function handler() {
            veVideo.removeEventListener('loadedmetadata', handler);
            try { veVideo.currentTime = clip.trimStart || 0; } catch (e) {}
        }, { once: true });
    }

    vePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
}

// ================= DELETE =================
veDeleteClip.addEventListener('click', () => {
    // If audio selected
    if (selectedAudioId) {
        const audioClip = audioTracks.find(a => a.id === selectedAudioId);
        if (audioClip) {
            if (audioPlaybackObjects[audioClip.id]) {
                audioPlaybackObjects[audioClip.id].pause();
                delete audioPlaybackObjects[audioClip.id];
            }
            audioTracks = audioTracks.filter(a => a.id !== selectedAudioId);
            selectedAudioId = null;
            renderAudioTimeline();
            showToast('🗑️ Audio deleted');
        }
        return;
    }

    // Video delete
    if (!selectedClipId) {
        alert('Pehle koi clip select karein!');
        return;
    }
    timelineClips = timelineClips.filter(c => c.id !== selectedClipId);
    selectedClipId = null;
    isAutoAdvancing = false;
    renderTimeline();
    showToast('🗑️ Video clip deleted');
});

// ================= TIMELINE ZOOM =================
veZoomInTL.addEventListener('click', () => {
    timelineZoom = Math.min(TIMELINE_CONFIG.MAX_ZOOM, timelineZoom + 0.25);
    renderTimeline();
});

veZoomOutTL.addEventListener('click', () => {
    timelineZoom = Math.max(TIMELINE_CONFIG.MIN_ZOOM, timelineZoom - 0.25);
    renderTimeline();
});

if (veFitTimeline) {
    veFitTimeline.addEventListener('click', () => {
        const totalDuration = Math.max(
            timelineClips.filter(c => c.type !== 'audio').reduce((s, c) => s + c.duration, 0),
            audioTracks.reduce((s, a) => s + a.duration + (a.startTime || 0), 0)
        );
        if (totalDuration === 0) return;

        const availableWidth = veTimelineScroll.clientWidth - 40;
        const idealPxPerSec = availableWidth / totalDuration;
        const idealZoom = idealPxPerSec / TIMELINE_CONFIG.PX_PER_SECOND;

        timelineZoom = Math.max(TIMELINE_CONFIG.MIN_ZOOM, Math.min(TIMELINE_CONFIG.MAX_ZOOM, idealZoom));
        renderTimeline();
        veTimelineScroll.scrollLeft = 0;
    });
}

// ================= AUDIO CONTROLS in Panel =================
// Add small controls under audio track in audio panel
function renderAudioTrackControls() {
    const panel = document.getElementById('ve-panel-audio');
    if (!panel) return;

    // Remove old
    const old = panel.querySelector('.audio-track-controls');
    if (old) old.remove();

    if (audioTracks.length === 0) return;

    const div = document.createElement('div');
    div.className = 'audio-track-controls';
    div.style.marginTop = '12px';
    div.style.padding = '10px';
    div.style.background = '#fafafa';
    div.style.borderRadius = '8px';
    div.style.border = '1px solid #e5e5e5';

    div.innerHTML = `
        <h3 style="font-size: 11px; color: #666; margin-bottom: 8px; text-transform: uppercase;">
            <i class="fa-solid fa-music"></i> Timeline Audios (${audioTracks.length})
        </h3>
    `;

    audioTracks.forEach(clip => {
        const row = document.createElement('div');
        row.style.cssText = `
            display: flex; align-items: center; gap: 6px;
            padding: 6px; background: white; border-radius: 6px;
            margin-bottom: 4px; border: 1px solid ${selectedAudioId === clip.id ? '#ff9500' : 'transparent'};
            cursor: pointer;
        `;

        row.innerHTML = `
            <i class="fa-solid fa-music" style="color: #ff9500; font-size: 11px;"></i>
            <span style="flex: 1; font-size: 11px; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                ${clip.name}
            </span>
            <span style="font-size: 9px; color: #999; font-family: monospace;">${formatTime(clip.duration)}</span>
        `;

        row.addEventListener('click', () => selectAudioClip(clip.id));
        div.appendChild(row);
    });

    panel.appendChild(div);
}

// Hook to render controls
const _origRenderAudioList = renderAudioList;
renderAudioList = function() {
    _origRenderAudioList();
    setTimeout(renderAudioTrackControls, 100);
};

// ================= EXPORT =================
veExportQuality.addEventListener('input', e => {
    veQualityVal.textContent = e.target.value + '%';
});

function getAspectRatio() {
    if (!veExportAspect) return 16 / 9;
    const aspect = veExportAspect.value;
    switch (aspect) {
        case '16:9': return 16 / 9;
        case '9:16': return 9 / 16;
        case '1:1':  return 1;
        case '4:5':  return 4 / 5;
        case '21:9': return 21 / 9;
        case 'original':
            if (veVideo.videoWidth && veVideo.videoHeight) {
                return veVideo.videoWidth / veVideo.videoHeight;
            }
            return 16 / 9;
        default: return 16 / 9;
    }
}

function getOutputDimensions() {
    const baseRes = parseInt(veExportRes.value);
    const ratio = getAspectRatio();
    let w, h;
    if (ratio >= 1) {
        w = baseRes;
        h = Math.round(baseRes / ratio);
    } else {
        h = baseRes;
        w = Math.round(baseRes * ratio);
    }
    return { w, h };
}

function updateExportInfo() {
    const videoClips = timelineClips.filter(c => c.type !== 'audio');
    const totalDuration = videoClips.reduce((s, c) => s + c.duration, 0);
    if (veInfoDuration) veInfoDuration.textContent = formatTime(totalDuration);

    const res = parseInt(veExportRes.value);
    const quality = parseInt(veExportQuality.value) / 100;
    const estSize = (res * res * totalDuration * quality * 0.00000005).toFixed(1);
    if (veInfoSize) veInfoSize.textContent = `~${estSize} MB`;

    const dims = getOutputDimensions();
    if (veInfoOutput) veInfoOutput.textContent = `${dims.w} × ${dims.h}`;
}

if (veExportRes) veExportRes.addEventListener('change', updateExportInfo);
if (veExportAspect) veExportAspect.addEventListener('change', updateExportInfo);
veExportQuality.addEventListener('input', updateExportInfo);

veDoExport.addEventListener('click', async () => {
    const videoClips = timelineClips.filter(c => c.type !== 'audio');
    if (videoClips.length === 0) {
        alert('Timeline khali hai!');
        return;
    }

    const originalHTML = veDoExport.innerHTML;
    veDoExport.disabled = true;
    veDoExport.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Exporting...';
    isExporting = true;

    try {
        const fps = parseInt(veExportFps.value);
        const format = veExportFormat.value;
        const dims = getOutputDimensions();
        const totalExportDuration = videoClips.reduce((s, c) => s + c.duration, 0);

        const canvas = document.createElement('canvas');
        canvas.width = dims.w;
        canvas.height = dims.h;
        const ctx = canvas.getContext('2d', { alpha: false });
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const stream = canvas.captureStream(fps);

        // Audio mixing
        if (audioTracks.length > 0) {
            try {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const dest = audioCtx.createMediaStreamDestination();

                audioTracks.forEach(clip => {
                    try {
                        const clone = new Audio();
                        clone.src = clip.src;
                        clone.crossOrigin = 'anonymous';
                        clone.volume = clip.volume / 100;

                        const source = audioCtx.createMediaElementSource(clone);
                        source.connect(dest);
                    } catch (e) {}
                });

                stream.addTrack(dest.stream.getAudioTracks()[0]);
            } catch (e) {
                console.warn('Audio mixing failed:', e);
            }
        }

        let mimeType = 'video/webm;codecs=vp9,opus';
        if (format === 'mp4') {
            const mp4Type = 'video/mp4;codecs=avc1.42E01E,mp4a.40.2';
            if (MediaRecorder.isTypeSupported(mp4Type)) mimeType = mp4Type;
            else if (MediaRecorder.isTypeSupported('video/mp4')) mimeType = 'video/mp4';
        }

        const recorder = new MediaRecorder(stream, {
            mimeType: mimeType,
            videoBitsPerSecond: Math.max(dims.w * dims.h * 0.2, 2500000)
        });

        const chunks = [];
        recorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunks.push(e.data); };

        recorder.onstop = () => {
            const actualMime = recorder.mimeType || mimeType;
            const isWebM = actualMime.includes('webm');
            const ext = isWebM ? 'webm' : 'mp4';

            const blob = new Blob(chunks, { type: actualMime });
            if (blob.size < 1000) {
                alert('❌ Export failed.');
                veDoExport.disabled = false;
                veDoExport.innerHTML = originalHTML;
                isExporting = false;
                return;
            }

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `yucut-video-${Date.now()}.${ext}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 2000);

            veDoExport.disabled = false;
            veDoExport.innerHTML = originalHTML;
            isExporting = false;

            showToast(`✅ Export done! (${(blob.size / 1024 / 1024).toFixed(1)} MB)`);
        };

        recorder.start(1000);

        const savedSelectedId = selectedClipId;
        const savedCurrentTime = veVideo.currentTime;

        const drawFrame = () => {
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            if (exportRotate !== 0) ctx.rotate((exportRotate * Math.PI) / 180);
            let scaleX = 1, scaleY = 1;
            if (exportFlip === 'horizontal') scaleX = -1;
            if (exportFlip === 'vertical') scaleY = -1;
            if (scaleX !== 1 || scaleY !== 1) ctx.scale(scaleX, scaleY);

            const vw = veVideo.videoWidth || dims.w;
            const vh = veVideo.videoHeight || dims.h;
            const isRotated90 = (exportRotate === 90 || exportRotate === 270);
            const effectiveW = isRotated90 ? canvas.height : canvas.width;
            const effectiveH = isRotated90 ? canvas.width : canvas.height;

            const videoRatio = vw / vh;
            const canvasRatio = effectiveW / effectiveH;

            let drawW, drawH;
            if (videoRatio > canvasRatio) {
                drawW = effectiveW;
                drawH = effectiveW / videoRatio;
            } else {
                drawH = effectiveH;
                drawW = effectiveH * videoRatio;
            }

            try {
                ctx.drawImage(veVideo, -drawW / 2, -drawH / 2, drawW, drawH);
            } catch (e) {}

            ctx.restore();
        };

        for (let i = 0; i < videoClips.length; i++) {
            const clip = videoClips[i];
            const clipDuration = clip.duration;
            const clipStart = clip.trimStart || 0;
            const clipEnd = clip.trimEnd || (clipStart + clipDuration);

            if (veVideo.getAttribute('src') !== clip.src) {
                await new Promise((resolve) => {
                    veVideo.src = clip.src;
                    veVideo.load();
                    const handler = () => {
                        veVideo.removeEventListener('loadedmetadata', handler);
                        resolve();
                    };
                    veVideo.addEventListener('loadedmetadata', handler);
                    setTimeout(resolve, 3000);
                });
            }

            try { veVideo.currentTime = clipStart; } catch (e) {}
            await new Promise(resolve => setTimeout(resolve, 250));
            try { await veVideo.play(); } catch (e) {}

            await new Promise((resolve) => {
                const startTime = Date.now();
                const maxDuration = (clipDuration * 1000) + 5000;
                let lastFrameTime = 0;
                const frameInterval = 1000 / fps;

                const recordLoop = () => {
                    const now = Date.now();
                    const elapsed = now - startTime;

                    if (veVideo.currentTime >= clipEnd - 0.05 || veVideo.ended) {
                        veVideo.pause();
                        drawFrame();
                        resolve();
                        return;
                    }

                    if (elapsed > maxDuration) {
                        veVideo.pause();
                        resolve();
                        return;
                    }

                    if (now - lastFrameTime >= frameInterval) {
                        drawFrame();
                        lastFrameTime = now;
                    }

                    requestAnimationFrame(recordLoop);
                };
                recordLoop();
            });

            await new Promise(resolve => setTimeout(resolve, 200));
        }

        drawFrame();

        setTimeout(() => {
            if (recorder.state === 'recording') recorder.stop();
        }, 800);

    } catch (err) {
        console.error(err);
        alert('❌ Export error: ' + err.message);
        veDoExport.disabled = false;
        veDoExport.innerHTML = originalHTML;
        isExporting = false;
    }
});

veExportBtn.addEventListener('click', () => {
    veTools.forEach(t => t.classList.remove('active'));
    const exportTool = document.querySelector('[data-tool="export"]');
    if (exportTool) exportTool.classList.add('active');
    Object.values(vePanelViews).forEach(p => { if (p) p.style.display = 'none'; });
    vePanelViews.export.style.display = 'block';
    updateExportInfo();
});

// ================= HELPERS =================
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function showToast(msg) {
    const existing = document.querySelector('.ve-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 've-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2200);
}

// ================= VOICE RECORDING =================
veRecordVoice.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/webm' });
            const url = URL.createObjectURL(blob);
            const audio = {
                id: 'audio_' + Date.now(),
                type: 'audio',
                name: 'Voice Recording',
                src: url,
                duration: 5
            };
            audioLibrary.push(audio);
            renderAudioList();
            addAudioToTimeline(audio);
            stream.getTracks().forEach(t => t.stop());
            showToast('🎙️ Voice recorded!');
        };

        recorder.start();
        showToast('🔴 Recording...');

        const stopHandler = () => {
            if (recorder.state === 'recording') {
                recorder.stop();
                veRecordVoice.removeEventListener('click', stopHandler);
            }
        };
        veRecordVoice.addEventListener('click', stopHandler);

        setTimeout(() => {
            if (recorder.state === 'recording') recorder.stop();
        }, 10000);
    } catch (err) {
        alert('❌ Microphone access denied');
    }
});

// ================= BACK =================
veBack.addEventListener('click', () => {
    if (isExporting) {
        if (!confirm('Export chal raha hai. Leave karna chahte hain?')) return;
    }
    window.location.href = 'index.html';
});

// ================= VOLUME =================
veVideoVolume.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    videoVolumeLevel = val / 100;
    veVideoVolumeVal.textContent = val + '%';
    veVideo.volume = videoVolumeLevel;

    // Update all audio objects
    audioTracks.forEach(clip => {
        const obj = audioPlaybackObjects[clip.id];
        if (obj) obj.volume = (val / 100) * (clip.volume / 100);
    });

    updateVideoVolumeIcon(val);
});

veVideoMuteBtn.addEventListener('click', () => {
    isVideoMuted = !isVideoMuted;
    veVideo.muted = isVideoMuted;

    if (isVideoMuted) {
        veVideoMuteIcon.className = 'fa-solid fa-volume-xmark';
        veVideoMuteBtn.classList.add('muted');
    } else {
        veVideoMuteIcon.className = 'fa-solid fa-volume-high';
        veVideoMuteBtn.classList.remove('muted');
        veVideo.volume = videoVolumeLevel;
    }
});

function updateVideoVolumeIcon(level) {
    if (isVideoMuted || level === 0) {
        veVideoMuteIcon.className = 'fa-solid fa-volume-xmark';
        veVideoMuteBtn.classList.add('muted');
    } else if (level < 70) {
        veVideoMuteIcon.className = 'fa-solid fa-volume-low';
        veVideoMuteBtn.classList.remove('muted');
    } else {
        veVideoMuteIcon.className = 'fa-solid fa-volume-high';
        veVideoMuteBtn.classList.remove('muted');
    }
}

// ================= FILTERS =================
const FILTERS_DATA = [
    { name: 'None',      filter: 'none' },
    { name: 'Bright',    filter: 'brightness(130%)' },
    { name: 'Dark',      filter: 'brightness(70%)' },
    { name: 'Contrast',  filter: 'contrast(150%)' },
    { name: 'Sepia',     filter: 'sepia(80%)' },
    { name: 'Vintage',   filter: 'sepia(40%) saturate(140%) contrast(90%)' },
    { name: 'B&W',       filter: 'grayscale(100%)' },
    { name: 'Cinematic', filter: 'contrast(120%) saturate(80%) sepia(20%)' },
    { name: 'Cool',      filter: 'hue-rotate(180deg) saturate(120%)' },
    { name: 'Warm',      filter: 'sepia(30%) saturate(140%) brightness(105%)' },
    { name: 'Glitch',    filter: 'hue-rotate(90deg) saturate(200%) contrast(150%)' },
    { name: 'VHS',       filter: 'sepia(30%) saturate(150%) hue-rotate(-30deg) contrast(120%)' }
];

function renderFilterGrid() {
    veFilterGrid.innerHTML = '';
    FILTERS_DATA.forEach(f => {
        const card = document.createElement('div');
        card.className = 've-filter-card';
        card.innerHTML = `<i class="fa-solid fa-circle-half-stroke"></i>${f.name}`;
        card.addEventListener('click', () => {
            document.querySelectorAll('.ve-filter-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentEffectsFilter = f.filter;
        });
        veFilterGrid.appendChild(card);
    });
}

veApplyFilter.addEventListener('click', () => {
    if (!selectedClipId) {
        alert('Pehle timeline se koi clip select karein!');
        return;
    }
    const clip = timelineClips.find(c => c.id === selectedClipId);
    if (!clip) return;

    let filter = currentEffectsFilter === 'none' ? '' : currentEffectsFilter + ' ';
    filter += `brightness(${veBright.value}%) contrast(${veContrast.value}%) saturate(${veSat.value}%) blur(${veBlur.value}px) hue-rotate(${veHue.value}deg) grayscale(${veGray.value}%)`;

    clip.filters = { filter: filter.trim() };
    veVideo.style.filter = clip.filters.filter;
    showToast('✨ Filter applied!');
});

veBright.addEventListener('input', e => document.getElementById('ve-bright-val').textContent = e.target.value + '%');
veContrast.addEventListener('input', e => document.getElementById('ve-contrast-val').textContent = e.target.value + '%');
veSat.addEventListener('input', e => document.getElementById('ve-sat-val').textContent = e.target.value + '%');
veBlur.addEventListener('input', e => document.getElementById('ve-blur-val').textContent = e.target.value + 'px');
veSharp.addEventListener('input', e => document.getElementById('ve-sharp-val').textContent = e.target.value + '%');
veHue.addEventListener('input', e => document.getElementById('ve-hue-val').textContent = e.target.value + '°');
veGray.addEventListener('input', e => document.getElementById('ve-gray-val').textContent = e.target.value + '%');

// ================= EFFECTS =================
const EFFECTS_DATA = [
    { name: 'Shake', icon: 'fa-arrows-up-down-left-right' },
    { name: 'Zoom', icon: 'fa-magnifying-glass-plus' },
    { name: 'Rotate', icon: 'fa-rotate' },
    { name: 'Flash', icon: 'fa-bolt' },
    { name: 'Slowmo', icon: 'fa-hourglass-half' },
    { name: 'Glitch', icon: 'fa-tv' },
    { name: 'VHS', icon: 'fa-tape' },
    { name: 'Cinematic', icon: 'fa-film' }
];

function renderEffectGrid() {
    veEffectGrid.innerHTML = '';
    EFFECTS_DATA.forEach(e => {
        const card = document.createElement('div');
        card.className = 've-effect-card';
        card.innerHTML = `<i class="fa-solid ${e.icon}"></i>${e.name}`;
        card.addEventListener('click', () => {
            document.querySelectorAll('.ve-effect-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            showToast(`✨ ${e.name} selected`);
        });
        veEffectGrid.appendChild(card);
    });
}

// ================= TRANSITIONS =================
const TRANSITIONS_DATA = [
    { name: 'Fade', icon: 'fa-circle-half-stroke' },
    { name: 'Slide', icon: 'fa-arrow-right' },
    { name: 'Zoom', icon: 'fa-magnifying-glass-plus' },
    { name: 'Wipe', icon: 'fa-eraser' },
    { name: 'Spin', icon: 'fa-rotate' },
    { name: 'Blur', icon: 'fa-droplet' },
    { name: 'Flash', icon: 'fa-bolt' },
    { name: 'Glitch', icon: 'fa-tv' }
];

function renderTransitionGrid() {
    veTransitionGrid.innerHTML = '';
    TRANSITIONS_DATA.forEach(t => {
        const card = document.createElement('div');
        card.className = 've-transition-card';
        card.innerHTML = `<i class="fa-solid ${t.icon}"></i>${t.name}`;
        card.addEventListener('click', () => {
            if (!selectedClipId) {
                alert('Pehle clip select karein!');
                return;
            }
            const clip = timelineClips.find(c => c.id === selectedClipId);
            if (clip) clip.transition = t.name.toLowerCase();
            showToast(`🎬 ${t.name} added`);
        });
        veTransitionGrid.appendChild(card);
    });
}

// ================= STICKERS =================
const STICKERS = ['😀','😂','😍','🥰','😎','🤩','😴','🥳','🤔','😢','😡','🤯','👍','👏','🙌','🙏','❤️','💔','⭐','🔥','✨','💯','🎉','🎈','🌈','☀️','🌙','☁️','⚡','❄️'];

function renderStickerGrid() {
    veStickerGrid.innerHTML = '';
    STICKERS.forEach(s => {
        const item = document.createElement('div');
        item.className = 've-sticker-item';
        item.textContent = s;
        item.addEventListener('click', () => {
            showToast(`Added: ${s}`);
            addTextToVideo(s, true);
        });
        veStickerGrid.appendChild(item);
    });
}

// ================= TEXT =================
veTextSize.addEventListener('input', e => {
    veTextSizeVal.textContent = e.target.value + 'px';
});

vePosBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        vePosBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTextPosition = btn.dataset.pos;
    });
});

veAddText.addEventListener('click', () => {
    const text = veTextInput.value.trim();
    if (!text) {
        alert('Pehle text likhein!');
        return;
    }
    addTextToVideo(text, false);
});

function addTextToVideo(text, isSticker) {
    const overlay = document.createElement('div');
    overlay.className = 've-dynamic-overlay';
    overlay.textContent = text;
    overlay.style.position = 'absolute';
    overlay.style.color = isSticker ? '#fff' : veTextColor.value;
    overlay.style.fontSize = (isSticker ? 40 : parseInt(veTextSize.value)) + 'px';
    overlay.style.fontWeight = '700';
    overlay.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '5';

    if (currentTextPosition === 'top') {
        overlay.style.top = '8%';
        overlay.style.left = '50%';
        overlay.style.transform = 'translateX(-50%)';
    } else if (currentTextPosition === 'bottom') {
        overlay.style.bottom = '8%';
        overlay.style.left = '50%';
        overlay.style.transform = 'translateX(-50%)';
    } else {
        overlay.style.top = '50%';
        overlay.style.left = '50%';
        overlay.style.transform = 'translate(-50%, -50%)';
    }

    document.querySelector('.ve-preview').appendChild(overlay);

    setTimeout(() => {
        overlay.style.transition = 'opacity 0.5s';
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);
    }, 5000);

    showToast('✅ Text added');
}

// ================= PRESETS =================
const PRESETS = [
    { name: 'TikTok', icon: 'fa-mobile-screen', ratio: '9:16' },
    { name: 'YouTube', icon: 'fa-tv', ratio: '16:9' },
    { name: 'Insta Reel', icon: 'fa-instagram', ratio: '9:16' },
    { name: 'Insta Post', icon: 'fa-camera', ratio: '1:1' },
    { name: 'YT Shorts', icon: 'fa-play', ratio: '9:16' },
    { name: 'Facebook', icon: 'fa-facebook', ratio: '16:9' }
];

function renderPresetGrid() {
    vePresetGrid.innerHTML = '';
    PRESETS.forEach(p => {
        const card = document.createElement('div');
        card.className = 've-preset-card';
        card.innerHTML = `
            <div class="ve-preset-icon"><i class="fa-brands ${p.icon}"></i></div>
            <strong>${p.name}</strong>
            <small>${p.ratio}</small>
        `;
        card.addEventListener('click', () => {
            if (veExportAspect) {
                veExportAspect.value = p.ratio;
                updateExportInfo();
            }
            showToast(`📱 ${p.name}`);
        });
        vePresetGrid.appendChild(card);
    });
}

// ================= EXPORT ROTATE / FLIP =================
document.querySelectorAll('.rotate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.rotate-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        exportRotate = parseInt(btn.dataset.rotate);
        if (veExportRotate) veExportRotate.value = exportRotate;
        if (veRotateVal) veRotateVal.textContent = exportRotate + '°';
    });
});

if (veExportRotate) {
    veExportRotate.addEventListener('input', (e) => {
        exportRotate = parseInt(e.target.value);
        if (veRotateVal) veRotateVal.textContent = exportRotate + '°';
    });
}

document.querySelectorAll('.flip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.flip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        exportFlip = btn.dataset.flip;
    });
});

// ================= OVERLAY SYSTEM (unchanged from v5) =================
veOverlayVideoUpload.addEventListener('click', () => veOverlayVideoInput.click());
veOverlayImageUpload.addEventListener('click', () => veOverlayImageInput.click());

veOverlayVideoInput.addEventListener('change', (e) => {
    if (e.target.files.length) handleOverlayUpload(e.target.files[0], 'video');
    veOverlayVideoInput.value = '';
});

veOverlayImageInput.addEventListener('change', (e) => {
    if (e.target.files.length) handleOverlayUpload(e.target.files[0], 'image');
    veOverlayImageInput.value = '';
});

function handleOverlayUpload(file, type) {
    const blobUrl = URL.createObjectURL(file);
    if (type === 'video') {
        const testVid = document.createElement('video');
        testVid.preload = 'metadata';
        testVid.onloadedmetadata = () => {
            createOverlay({ type: 'video', name: file.name, src: blobUrl, duration: testVid.duration });
        };
        testVid.src = blobUrl;
    } else {
        const testImg = new Image();
        testImg.onload = () => {
            createOverlay({ type: 'image', name: file.name, src: blobUrl, duration: 5 });
        };
        testImg.src = blobUrl;
    }
}

function createOverlay(data) {
    const overlay = {
        id: 'overlay_' + (++overlayIdCounter),
        type: data.type,
        name: data.name,
        src: data.src,
        duration: data.duration || 5,
        x: 60, y: 60, width: 30, height: 20,
        opacity: 100, rotation: 0,
        startTime: 0, endTime: data.duration || 5,
        el: null
    };
    overlays.push(overlay);
    renderOverlayOnPreview(overlay);
    renderOverlayList();
    showToast(`✅ Overlay added`);
}

let overlayIdCounter = 0;
let overlays = [];
let selectedOverlayId = null;

function renderOverlayOnPreview(overlay) {
    if (overlay.el && overlay.el.parentNode) overlay.el.remove();

    const el = document.createElement('div');
    el.className = 've-overlay-item';
    el.dataset.overlayId = overlay.id;
    el.style.left = overlay.x + '%';
    el.style.top = overlay.y + '%';
    el.style.width = overlay.width + '%';
    el.style.height = overlay.height + '%';
    el.style.opacity = overlay.opacity / 100;

    if (overlay.type === 'video') {
        const vid = document.createElement('video');
        vid.src = overlay.src;
        vid.muted = true;
        vid.loop = true;
        vid.autoplay = true;
        el.appendChild(vid);
        vid.play().catch(() => {});
    } else {
        const img = document.createElement('img');
        img.src = overlay.src;
        el.appendChild(img);
    }

    el.addEventListener('click', (e) => { e.stopPropagation(); });
    veOverlayLayer.appendChild(el);
    overlay.el = el;
}

function renderOverlayList() {
    if (!veOverlayList) return;
    veOverlayList.innerHTML = '';
    overlays.forEach(o => {
        const el = document.createElement('div');
        el.className = 've-overlay-track';
        el.innerHTML = `<div class="ve-overlay-track-header">
            <div class="ve-overlay-track-icon"><i class="fa-solid ${o.type === 'video' ? 'fa-video' : 'fa-image'}"></i></div>
            <div class="ve-overlay-track-info">
                <div class="ve-overlay-track-name">${o.name}</div>
            </div>
            <button class="ve-bg-track-btn danger delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>`;
        el.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (o.el) o.el.remove();
            overlays = overlays.filter(x => x.id !== o.id);
            renderOverlayList();
        });
        veOverlayList.appendChild(el);
    });
}

// ================= INIT =================
renderFilterGrid();
renderEffectGrid();
renderTransitionGrid();
renderStickerGrid();
renderPresetGrid();
renderAudioTimeline();

console.log('✅ Video Editor v6 loaded — Dynamic Audio System');
console.log(`✅ Audio tracks: ${audioTracks.length}`);