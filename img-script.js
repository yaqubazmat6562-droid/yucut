/* ============================================================
   YUCUT - ADVANCED IMAGE EDITOR (FINAL FIXED)
   Upload + Shapes + Filters + Text (100+ Fonts) + Zoom/Pan
   + Enhance + 4K Export
   Fully Dynamic • Mobile Friendly
   ============================================================ */

// ================= ELEMENTS (TOP LEVEL) =================
const exportBtn     = document.getElementById('export-btn');
const backBtn       = document.getElementById('back-btn');
const clearBtn      = document.getElementById('clear-btn');

const toolUpload    = document.getElementById('tool-upload');
const toolShapes    = document.getElementById('tool-shapes');
const toolFilters   = document.getElementById('tool-filters');
const toolText      = document.getElementById('tool-text');

const panelUpload   = document.getElementById('panel-upload');
const panelShapes   = document.getElementById('panel-shapes');
const panelFilters  = document.getElementById('panel-filters');
const panelText     = document.getElementById('panel-text');
const panelProps    = document.getElementById('panel-properties');

const canvas        = document.getElementById('canvas');
const emptyHint     = document.getElementById('empty-hint');

// Upload
const fileInput     = document.getElementById('file-input');
const cameraInput   = document.getElementById('camera-input');
const chooseFileBtn = document.getElementById('choose-file-btn');
const cameraBtn     = document.getElementById('camera-btn');
const dropZone      = document.getElementById('drop-zone');
const uploadedList  = document.getElementById('uploaded-list');
const noImages      = document.getElementById('no-images');

// Shapes
const shapeList     = document.getElementById('shape-list');
const colorPalette  = document.getElementById('color-palette');

// Filters
const filterGrid    = document.getElementById('filter-grid');
const brightness    = document.getElementById('brightness');
const contrast      = document.getElementById('contrast');
const saturation    = document.getElementById('saturation');
const temperature   = document.getElementById('temperature');
const blur          = document.getElementById('blur');
const sharpen       = document.getElementById('sharpen');
const grayscale     = document.getElementById('grayscale');
const sepia         = document.getElementById('sepia');
const hue           = document.getElementById('hue');
const invert        = document.getElementById('invert');
const vignette      = document.getElementById('vignette');
const resetFilters  = document.getElementById('reset-filters');

// Text (Advanced)
const textInput      = document.getElementById('text-input');
const fontFamily     = document.getElementById('font-family');
const fsRange        = document.getElementById('fs-range');
const fwRange        = document.getElementById('fw-range');
const textColor      = document.getElementById('text-color');
const textBg         = document.getElementById('text-bg');
const textBgTransp   = document.getElementById('text-bg-transparent');
const lsRange        = document.getElementById('ls-range');
const lhRange        = document.getElementById('lh-range');
const outlineRange   = document.getElementById('outline-range');
const outlineColor   = document.getElementById('outline-color');
const addTextBtn     = document.getElementById('add-text-btn');
const updateTextBtn  = document.getElementById('update-text-btn');

// Properties
const emptyMsg      = document.getElementById('empty-msg');
const controls      = document.getElementById('controls');
const fillColor     = document.getElementById('fill-color');
const wRange        = document.getElementById('w-range');
const hRange        = document.getElementById('h-range');
const rRange        = document.getElementById('r-range');
const oRange        = document.getElementById('o-range');
const brRange       = document.getElementById('br-range');
const wVal          = document.getElementById('w-val');
const hVal          = document.getElementById('h-val');
const rVal          = document.getElementById('r-val');
const oVal          = document.getElementById('o-val');
const brVal         = document.getElementById('br-val');
const cgFill        = document.getElementById('cg-fill');
const cgRadius      = document.getElementById('cg-radius');
const duplicateBtn  = document.getElementById('duplicate-btn');
const deleteBtn     = document.getElementById('delete-btn');

// ================= STATE =================
let selectedEl    = null;
let counter       = 0;
let currentFilter = 'none';
let currentTool   = 'upload';

// Text state
let editingTextEl = null;
let currentAlign  = 'center';
let currentStyles = { bold: false, italic: false, underline: false, strike: false, uppercase: false };
let currentShadow = 'none';

// Zoom / Pan state (declared here to avoid conflicts)
let currentZoom  = 1;
let minZoom      = 0.3;
let maxZoom      = 3;
let panX         = 0;
let panY         = 0;
let currentMode  = 'edit';

const activePointers = new Map();
let lastPanX = 0;
let lastPanY = 0;
let lastPinchDist = 0;

// Enhance state
const originalFilters = new WeakMap();

// ================= SHAPES DATA =================
const SHAPES = [
    { type: 'square',   name: 'Square',   css: {} },
    { type: 'circle',   name: 'Circle',   css: { borderRadius: '50%' } },
    { type: 'rounded',  name: 'Rounded',  css: { borderRadius: '20%' } },
    { type: 'triangle', name: 'Triangle', css: { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } },
    { type: 'diamond',  name: 'Diamond',  css: { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' } },
    { type: 'star',     name: 'Star',     css: { clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' } },
    { type: 'pentagon', name: 'Pentagon', css: { clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' } },
    { type: 'hexagon',  name: 'Hexagon',  css: { clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' } },
    { type: 'octagon',  name: 'Octagon',  css: { clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' } },
    { type: 'heart',    name: 'Heart',    css: { clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")' } },
    { type: 'arrow',    name: 'Arrow',    css: { clipPath: 'polygon(0% 30%, 65% 30%, 65% 0%, 100% 50%, 65% 100%, 65% 70%, 0% 70%)' } },
    { type: 'cross',    name: 'Cross',    css: { clipPath: 'polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)' } },
    { type: 'ring',     name: 'Ring',     css: { borderRadius: '50%', borderWidth: '18px', borderStyle: 'solid', background: 'transparent', boxSizing: 'border-box' } },
    { type: 'line',     name: 'Line',     css: { height: '12px', borderRadius: '6px' } }
];

const COLORS = [
    '#00d2d3','#5e5ce6','#ff3b30','#ff9500','#ffcc00',
    '#34c759','#00c7be','#af52de','#ff2d55','#8e8e93',
    '#1a1a1a','#ffffff','#f5cba7','#a2d9ce','#d7bde2'
];

const FILTERS = {
    basic: [
        { name: 'None',     value: 'none',                icon: 'fa-ban' },
        { name: 'Bright',   value: 'brightness(130%)',    icon: 'fa-sun' },
        { name: 'Dark',     value: 'brightness(70%)',     icon: 'fa-moon' },
        { name: 'Contrast', value: 'contrast(150%)',      icon: 'fa-adjust' }
    ],
    vintage: [
        { name: 'Sepia', value: 'sepia(80%)',                     icon: 'fa-camera-retro' },
        { name: 'Fade',  value: 'opacity(0.8)',                   icon: 'fa-cloud' },
        { name: 'Old',   value: 'sepia(60%) contrast(90%)',       icon: 'fa-hourglass' },
        { name: 'Retro', value: 'sepia(30%) saturate(150%)',      icon: 'fa-film' }
    ],
    bw: [
        { name: 'B&W',      value: 'grayscale(100%)',                 icon: 'fa-circle-half-stroke' },
        { name: 'B&W Soft', value: 'grayscale(60%)',                  icon: 'fa-circle' },
        { name: 'B&W Hard', value: 'grayscale(100%) contrast(150%)',  icon: 'fa-square' },
        { name: 'Noir',     value: 'grayscale(100%) contrast(180%) brightness(80%)', icon: 'fa-mask' }
    ],
    warm: [
        { name: 'Warm',  value: 'sepia(40%) saturate(140%)',  icon: 'fa-fire' },
        { name: 'Sunny', value: 'saturate(160%) brightness(110%)', icon: 'fa-cloud-sun' },
        { name: 'Gold',  value: 'sepia(60%) saturate(180%) brightness(105%)', icon: 'fa-star' }
    ],
    cool: [
        { name: 'Cool',  value: 'hue-rotate(180deg)',         icon: 'fa-snowflake' },
        { name: 'Ice',   value: 'hue-rotate(160deg) saturate(120%) brightness(105%)', icon: 'fa-icicles' },
        { name: 'Ocean', value: 'hue-rotate(200deg) saturate(150%)', icon: 'fa-water' }
    ]
};

// ================= 100+ FONTS LIBRARY =================
const FONTS = [
    { name: 'Default Sans', css: 'system-ui, sans-serif' },
    { name: 'Arial', css: 'Arial, sans-serif' },
    { name: 'Helvetica', css: 'Helvetica, sans-serif' },
    { name: 'Verdana', css: 'Verdana, sans-serif' },
    { name: 'Tahoma', css: 'Tahoma, sans-serif' },
    { name: 'Trebuchet MS', css: '"Trebuchet MS", sans-serif' },
    { name: 'Times New Roman', css: '"Times New Roman", serif' },
    { name: 'Georgia', css: 'Georgia, serif' },
    { name: 'Courier New', css: '"Courier New", monospace' },
    { name: 'Consolas', css: 'Consolas, monospace' },
    { name: 'Bebas Neue', css: '"Bebas Neue", sans-serif', google: true },
    { name: 'Anton', css: '"Anton", sans-serif', google: true },
    { name: 'Oswald', css: '"Oswald", sans-serif', google: true },
    { name: 'Lobster', css: '"Lobster", cursive', google: true },
    { name: 'Pacifico', css: '"Pacifico", cursive', google: true },
    { name: 'Dancing Script', css: '"Dancing Script", cursive', google: true },
    { name: 'Great Vibes', css: '"Great Vibes", cursive', google: true },
    { name: 'Satisfy', css: '"Satisfy", cursive', google: true },
    { name: 'Sacramento', css: '"Sacramento", cursive', google: true },
    { name: 'Allura', css: '"Allura", cursive', google: true },
    { name: 'Caveat', css: '"Caveat", cursive', google: true },
    { name: 'Kalam', css: '"Kalam", cursive', google: true },
    { name: 'Indie Flower', css: '"Indie Flower", cursive', google: true },
    { name: 'Permanent Marker', css: '"Permanent Marker", cursive', google: true },
    { name: 'Shadows Into Light', css: '"Shadows Into Light", cursive', google: true },
    { name: 'Amatic SC', css: '"Amatic SC", cursive', google: true },
    { name: 'Roboto', css: '"Roboto", sans-serif', google: true },
    { name: 'Open Sans', css: '"Open Sans", sans-serif', google: true },
    { name: 'Lato', css: '"Lato", sans-serif', google: true },
    { name: 'Montserrat', css: '"Montserrat", sans-serif', google: true },
    { name: 'Poppins', css: '"Poppins", sans-serif', google: true },
    { name: 'Raleway', css: '"Raleway", sans-serif', google: true },
    { name: 'Nunito', css: '"Nunito", sans-serif', google: true },
    { name: 'Rubik', css: '"Rubik", sans-serif', google: true },
    { name: 'Work Sans', css: '"Work Sans", sans-serif', google: true },
    { name: 'Inter', css: '"Inter", sans-serif', google: true },
    { name: 'Karla', css: '"Karla", sans-serif', google: true },
    { name: 'Josefin Sans', css: '"Josefin Sans", sans-serif', google: true },
    { name: 'Quicksand', css: '"Quicksand", sans-serif', google: true },
    { name: 'Barlow', css: '"Barlow", sans-serif', google: true },
    { name: 'Mulish', css: '"Mulish", sans-serif', google: true },
    { name: 'Manrope', css: '"Manrope", sans-serif', google: true },
    { name: 'Outfit', css: '"Outfit", sans-serif', google: true },
    { name: 'Sora', css: '"Sora", sans-serif', google: true },
    { name: 'Urbanist', css: '"Urbanist", sans-serif', google: true },
    { name: 'Plus Jakarta Sans', css: '"Plus Jakarta Sans", sans-serif', google: true },
    { name: 'Playfair Display', css: '"Playfair Display", serif', google: true },
    { name: 'Merriweather', css: '"Merriweather", serif', google: true },
    { name: 'Lora', css: '"Lora", serif', google: true },
    { name: 'PT Serif', css: '"PT Serif", serif', google: true },
    { name: 'Crimson Text', css: '"Crimson Text", serif', google: true },
    { name: 'EB Garamond', css: '"EB Garamond", serif', google: true },
    { name: 'Libre Baskerville', css: '"Libre Baskerville", serif', google: true },
    { name: 'Cormorant Garamond', css: '"Cormorant Garamond", serif', google: true },
    { name: 'Bitter', css: '"Bitter", serif', google: true },
    { name: 'Noto Serif', css: '"Noto Serif", serif', google: true },
    { name: 'Roboto Mono', css: '"Roboto Mono", monospace', google: true },
    { name: 'JetBrains Mono', css: '"JetBrains Mono", monospace', google: true },
    { name: 'Fira Code', css: '"Fira Code", monospace', google: true },
    { name: 'Source Code Pro', css: '"Source Code Pro", monospace', google: true },
    { name: 'Space Mono', css: '"Space Mono", monospace', google: true },
    { name: 'IBM Plex Mono', css: '"IBM Plex Mono", monospace', google: true },
    { name: 'Noto Sans (Universal)', css: '"Noto Sans", sans-serif', google: true },
    { name: 'Noto Sans Arabic (عربي)', css: '"Noto Sans Arabic", sans-serif', google: true },
    { name: 'Noto Nastaliq Urdu (اردو)', css: '"Noto Nastaliq Urdu", serif', google: true },
    { name: 'Noto Sans Devanagari (हिन्दी)', css: '"Noto Sans Devanagari", sans-serif', google: true },
    { name: 'Noto Sans SC (中文)', css: '"Noto Sans SC", sans-serif', google: true },
    { name: 'Noto Sans JP (日本語)', css: '"Noto Sans JP", sans-serif', google: true },
    { name: 'Noto Sans KR (한국어)', css: '"Noto Sans KR", sans-serif', google: true },
    { name: 'Noto Sans Thai (ไทย)', css: '"Noto Sans Thai", sans-serif', google: true },
    { name: 'Noto Sans Hebrew (עברית)', css: '"Noto Sans Hebrew", sans-serif', google: true },
    { name: 'Noto Sans Bengali (বাংলা)', css: '"Noto Sans Bengali", sans-serif', google: true },
    { name: 'Noto Sans Tamil (தமிழ்)', css: '"Noto Sans Tamil", sans-serif', google: true },
    { name: 'Noto Sans Telugu (తెలుగు)', css: '"Noto Sans Telugu", sans-serif', google: true },
    { name: 'Noto Sans Gujarati (ગુજરાતી)', css: '"Noto Sans Gujarati", sans-serif', google: true },
    { name: 'Noto Sans Punjabi (ਪੰਜਾਬੀ)', css: '"Noto Sans Gurmukhi", sans-serif', google: true },
    { name: 'Noto Sans Malayalam', css: '"Noto Sans Malayalam", sans-serif', google: true },
    { name: 'Noto Sans Kannada', css: '"Noto Sans Kannada", sans-serif', google: true },
    { name: 'Noto Sans Sinhala (සිංහල)', css: '"Noto Sans Sinhala", sans-serif', google: true },
    { name: 'Noto Sans Myanmar', css: '"Noto Sans Myanmar", sans-serif', google: true },
    { name: 'Noto Sans Khmer (ខ្មែរ)', css: '"Noto Sans Khmer", sans-serif', google: true },
    { name: 'Noto Sans Armenian', css: '"Noto Sans Armenian", sans-serif', google: true },
    { name: 'Noto Sans Georgian', css: '"Noto Sans Georgian", sans-serif', google: true },
    { name: 'Noto Sans Ethiopic', css: '"Noto Sans Ethiopic", sans-serif', google: true },
    { name: 'Amiri (Arabic Classical)', css: '"Amiri", serif', google: true },
    { name: 'Cairo (Arabic Modern)', css: '"Cairo", sans-serif', google: true },
    { name: 'Tajawal (Arabic)', css: '"Tajawal", sans-serif', google: true },
    { name: 'Almarai (Arabic)', css: '"Almarai", sans-serif', google: true },
    { name: 'Lateef (Urdu)', css: '"Lateef", serif', google: true },
    { name: 'Gulzar (Urdu Nastaliq)', css: '"Gulzar", serif', google: true },
    { name: 'Hind Siliguri (Bengali)', css: '"Hind Siliguri", sans-serif', google: true },
    { name: 'Mukta (Devanagari)', css: '"Mukta", sans-serif', google: true },
    { name: 'Baloo 2 (Devanagari)', css: '"Baloo 2", cursive', google: true },
    { name: 'ZCOOL KuaiLe (中文)', css: '"ZCOOL KuaiLe", cursive', google: true },
    { name: 'Ma Shan Zheng (中文)', css: '"Ma Shan Zheng", cursive', google: true },
    { name: 'Long Cang (中文)', css: '"Long Cang", cursive', google: true },
    { name: 'Zhi Mang Xing (中文)', css: '"Zhi Mang Xing", cursive', google: true },
    { name: 'M PLUS Rounded 1c (日本)', css: '"M PLUS Rounded 1c", sans-serif', google: true },
    { name: 'Kosugi Maru (日本)', css: '"Kosugi Maru", sans-serif', google: true },
    { name: 'Yomogi (日本)', css: '"Yomogi", cursive', google: true },
    { name: 'Nanum Gothic (한국)', css: '"Nanum Gothic", sans-serif', google: true },
    { name: 'Nanum Pen Script (한국)', css: '"Nanum Pen Script", cursive', google: true },
    { name: 'Gaegu (한국)', css: '"Gaegu", cursive', google: true },
    { name: 'Russo One (РУС)', css: '"Russo One", sans-serif', google: true },
    { name: 'Play (РУС)', css: '"Play", sans-serif', google: true },
    { name: 'Comfortaa', css: '"Comfortaa", cursive', google: true },
    { name: 'Cinzel', css: '"Cinzel", serif', google: true },
    { name: 'Abril Fatface', css: '"Abril Fatface", cursive', google: true },
    { name: 'Righteous', css: '"Righteous", cursive', google: true },
    { name: 'Fredoka One', css: '"Fredoka", cursive', google: true },
    { name: 'Bungee', css: '"Bungee", cursive', google: true },
    { name: 'Chewy', css: '"Chewy", cursive', google: true },
    { name: 'Creepster', css: '"Creepster", cursive', google: true },
    { name: 'Monoton', css: '"Monoton", cursive', google: true },
    { name: 'Press Start 2P', css: '"Press Start 2P", monospace', google: true }
];

// ================= TOOLBAR =================
function switchTool(tool) {
    currentTool = tool;
    document.querySelectorAll('.tool-item').forEach(t => t.classList.remove('active'));
    const toolEl = document.querySelector(`[data-tool="${tool}"]`);
    if (toolEl) toolEl.classList.add('active');

    [panelUpload, panelShapes, panelFilters, panelText, panelProps].forEach(p => {
        if (p) p.style.display = 'none';
    });

    if (tool === 'upload'  && panelUpload)  panelUpload.style.display  = 'block';
    if (tool === 'shapes'  && panelShapes)  panelShapes.style.display  = 'block';
    if (tool === 'filters' && panelFilters) panelFilters.style.display = 'block';
    if (tool === 'text'    && panelText)    panelText.style.display    = 'block';
}

toolUpload.addEventListener('click',  () => switchTool('upload'));
toolShapes.addEventListener('click',  () => switchTool('shapes'));
toolFilters.addEventListener('click', () => switchTool('filters'));
toolText.addEventListener('click',    () => switchTool('text'));

// ================= UPLOAD =================
chooseFileBtn.addEventListener('click', () => fileInput.click());
cameraBtn.addEventListener('click', () => cameraInput.click());
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
cameraInput.addEventListener('change', (e) => handleFiles(e.target.files));

dropZone.addEventListener('click', () => fileInput.click());
['dragenter','dragover'].forEach(evt => {
    dropZone.addEventListener(evt, (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
});
['dragleave','drop'].forEach(evt => {
    dropZone.addEventListener(evt, (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); });
});
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
});
canvas.addEventListener('dragover', (e) => e.preventDefault());
canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
});

// ================= HANDLE FILES (ALL FORMATS) =================
function handleFiles(files) {
    Array.from(files).forEach(file => {
        // Check karo ki file image hai ya nahi (HEIC, AVIF, etc. bhi support karo)
        const isImage = file.type.startsWith('image/') ||
                        /\.(jpg|jpeg|png|gif|webp|bmp|svg|heic|heif|avif)$/i.test(file.name);
        if (!isImage) {
            alert(`"${file.name}" image nahi hai!`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            const dataURL = ev.target.result;

            // Test karo ki browser is image ko read kar sakta hai ya nahi
            const testImg = new Image();
            testImg.onload = () => {
                addImage(dataURL);
                addThumb(dataURL);
            };
            testImg.onerror = () => {
                // Agar HEIC hai aur browser support nahi karta
                alert(`❌ "${file.name}" ka format aapka browser support nahi karta.\nPlease JPG ya PNG me convert karein.`);
            };
            testImg.src = dataURL;
        };

        reader.onerror = () => {
            alert(`❌ "${file.name}" ko read nahi kar sakte.`);
        };

        reader.readAsDataURL(file);
    });

    fileInput.value = '';
    cameraInput.value = '';
}

// ================= ADD IMAGE (AUTO-FIT) =================
function addImage(src) {
    emptyHint.style.display = 'none';
    counter++;

    // Create a temp image to get natural dimensions
    const tempImg = new Image();
    tempImg.onload = () => {
        const naturalW = tempImg.naturalWidth;
        const naturalH = tempImg.naturalHeight;

        // Canvas ki current dimensions
        const canvasW = canvas.clientWidth;
        const canvasH = canvas.clientHeight;

        // 90% of canvas (thoda padding ke sath)
        const maxW = canvasW * 0.9;
        const maxH = canvasH * 0.9;

        // Calculate scale to fit while preserving aspect ratio
        const scaleW = maxW / naturalW;
        const scaleH = maxH / naturalH;
        const scale  = Math.min(scaleW, scaleH, 1); // Don't upscale small images too much

        // Final displayed size
        const finalW = naturalW * scale;
        const finalH = naturalH * scale;

        // Center position
        const left = (canvasW - finalW) / 2;
        const top  = (canvasH - finalH) / 2;

        // Create the element
        const el = document.createElement('div');
        el.className = 'canvas-el image-el';
        el.dataset.id = counter;
        el.dataset.kind = 'image';
        el.dataset.rotation = 0;
        el.dataset.flipH = '1';
        el.dataset.flipV = '1';
        el.dataset.naturalW = naturalW;
        el.dataset.naturalH = naturalH;

        el.style.width = finalW + 'px';
        el.style.height = finalH + 'px';
        el.style.left = left + 'px';
        el.style.top  = top + 'px';
        el.style.backgroundImage = `url("${src}")`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
        el.style.backgroundRepeat = 'no-repeat';

        addHandle(el);
        bindEvents(el);
        canvas.appendChild(el);
        selectEl(el);
    };

    tempImg.onerror = () => {
        // Fallback: agar image load na ho, default size use karo
        const el = document.createElement('div');
        el.className = 'canvas-el image-el';
        el.dataset.id = counter;
        el.dataset.kind = 'image';
        el.dataset.rotation = 0;
        el.dataset.flipH = '1';
        el.dataset.flipV = '1';

        const size = 200;
        const left = (canvas.clientWidth - size) / 2;
        const top  = (canvas.clientHeight - size) / 2;

        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.left = left + 'px';
        el.style.top  = top + 'px';
        el.style.backgroundImage = `url("${src}")`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';

        addHandle(el);
        bindEvents(el);
        canvas.appendChild(el);
        selectEl(el);
    };

    tempImg.src = src;
}

function addThumb(src) {
    if (noImages) noImages.style.display = 'none';
    const thumb = document.createElement('div');
    thumb.className = 'uploaded-thumb';
    thumb.innerHTML = `<img src="${src}">`;
    thumb.addEventListener('click', () => addImage(src));
    uploadedList.appendChild(thumb);
}

// ================= SHAPES =================
function renderShapes() {
    shapeList.innerHTML = '';
    SHAPES.forEach(sh => {
        const item = document.createElement('div');
        item.className = 'shape-item';
        item.title = sh.name;

        const prev = document.createElement('div');
        prev.className = 'shape-preview';
        Object.assign(prev.style, sh.css);
        if (sh.type === 'ring') {
            prev.style.width = '20px';
            prev.style.height = '20px';
            prev.style.borderWidth = '4px';
        }

        const lbl = document.createElement('span');
        lbl.textContent = sh.name;

        item.appendChild(prev);
        item.appendChild(lbl);
        item.addEventListener('click', () => addShape(sh.type));
        shapeList.appendChild(item);
    });
}

function renderPalette() {
    colorPalette.innerHTML = '';
    COLORS.forEach(c => {
        const sw = document.createElement('div');
        sw.className = 'color-swatch';
        sw.style.background = c;
        sw.addEventListener('click', () => {
            if (selectedEl) {
                if (selectedEl.dataset.kind === 'shape') {
                    if (selectedEl.dataset.type === 'ring') {
                        selectedEl.style.borderColor = c;
                    } else {
                        selectedEl.style.background = c;
                    }
                    fillColor.value = c;
                } else if (selectedEl.dataset.kind === 'text') {
                    selectedEl.style.color = c;
                    textColor.value = c;
                }
            }
        });
        colorPalette.appendChild(sw);
    });
}

function addShape(type) {
    emptyHint.style.display = 'none';
    const sh = SHAPES.find(s => s.type === type);
    counter++;

    const el = document.createElement('div');
    el.className = 'canvas-el shape-el';
    el.dataset.id = counter;
    el.dataset.kind = 'shape';
    el.dataset.type = type;
    el.dataset.rotation = 0;
    el.dataset.flipH = '1';
    el.dataset.flipV = '1';

    const size = 120;
    const maxX = Math.max(0, canvas.clientWidth - size);
    const maxY = Math.max(0, canvas.clientHeight - size);

    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = (Math.random() * maxX) + 'px';
    el.style.top  = (Math.random() * maxY) + 'px';
    el.style.background = '#00d2d3';

    Object.assign(el.style, sh.css);
    if (type === 'ring') el.style.borderColor = '#00d2d3';

    addHandle(el);
    bindEvents(el);
    canvas.appendChild(el);
    selectEl(el);
}

// ================= FILTERS =================
function renderFilters(cat) {
    filterGrid.innerHTML = '';
    FILTERS[cat].forEach(f => {
        const card = document.createElement('div');
        card.className = 'filter-card';
        card.innerHTML = `<i class="fa-solid ${f.icon}"></i><span>${f.name}</span>`;
        card.addEventListener('click', () => {
            document.querySelectorAll('.filter-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentFilter = f.value;
            updatePreviewFilter();
        });
        filterGrid.appendChild(card);
    });
}

document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderFilters(btn.dataset.cat);
    });
});

function buildFilterString() {
    const b   = brightness.value;
    const c   = contrast.value;
    const s   = saturation.value;
    const bl  = blur.value;
    const g   = grayscale.value;
    const sp  = sepia.value;
    const h   = hue.value;
    const inv = invert.value;
    const tmp = temperature.value;

    let tempFilter = '';
    if (tmp > 0) {
        tempFilter = `sepia(${tmp * 0.3}%) saturate(${100 + tmp * 0.5}%)`;
    } else if (tmp < 0) {
        tempFilter = `hue-rotate(${Math.abs(tmp) * 0.5}deg) saturate(${100 + tmp * 0.3}%)`;
    }

    let combined = '';
    if (currentFilter !== 'none') combined += currentFilter + ' ';
    combined += `brightness(${b}%) contrast(${c}%) saturate(${s}%) blur(${bl}px) grayscale(${g}%) sepia(${sp}%) hue-rotate(${h}deg) invert(${inv}%) ${tempFilter}`;

    if (parseInt(sharpen.value) > 0) {
        const sVal = 100 + parseInt(sharpen.value) * 0.5;
        combined += ` contrast(${sVal}%)`;
    }

    return combined;
}

function updatePreviewFilter() {
    if (!selectedEl || selectedEl.dataset.kind !== 'image') return;

    selectedEl.style.filter = buildFilterString();

    const v = parseInt(vignette.value);
    if (v > 0) {
        const spread = 20 + v * 1.5;
        selectedEl.style.boxShadow = `inset 0 0 ${spread}px ${spread * 0.3}px rgba(0,0,0,${v / 100 * 0.7})`;
    } else {
        selectedEl.style.boxShadow = '';
    }
}

const sliders = [
    { el: brightness,  out: 'brightness-val',  unit: '%' },
    { el: contrast,    out: 'contrast-val',    unit: '%' },
    { el: saturation,  out: 'saturation-val',  unit: '%' },
    { el: temperature, out: 'temperature-val', unit: ''  },
    { el: blur,        out: 'blur-val',        unit: 'px'},
    { el: sharpen,     out: 'sharpen-val',     unit: '%' },
    { el: grayscale,   out: 'grayscale-val',   unit: '%' },
    { el: sepia,       out: 'sepia-val',       unit: '%' },
    { el: hue,         out: 'hue-val',         unit: '°' },
    { el: invert,      out: 'invert-val',      unit: '%' },
    { el: vignette,    out: 'vignette-val',    unit: '%' }
];

sliders.forEach(s => {
    s.el.addEventListener('input', () => {
        document.getElementById(s.out).textContent = s.el.value + s.unit;
        updatePreviewFilter();
    });
});

resetFilters.addEventListener('click', () => {
    brightness.value = 100;
    contrast.value = 100;
    saturation.value = 100;
    temperature.value = 0;
    blur.value = 0;
    sharpen.value = 0;
    grayscale.value = 0;
    sepia.value = 0;
    hue.value = 0;
    invert.value = 0;
    vignette.value = 0;
    currentFilter = 'none';

    document.getElementById('brightness-val').textContent = '100%';
    document.getElementById('contrast-val').textContent = '100%';
    document.getElementById('saturation-val').textContent = '100%';
    document.getElementById('temperature-val').textContent = '0';
    document.getElementById('blur-val').textContent = '0px';
    document.getElementById('sharpen-val').textContent = '0%';
    document.getElementById('grayscale-val').textContent = '0%';
    document.getElementById('sepia-val').textContent = '0%';
    document.getElementById('hue-val').textContent = '0°';
    document.getElementById('invert-val').textContent = '0%';
    document.getElementById('vignette-val').textContent = '0%';

    document.querySelectorAll('.filter-card').forEach(c => c.classList.remove('active'));

    if (selectedEl && selectedEl.dataset.kind === 'image') {
        selectedEl.style.filter = 'none';
        selectedEl.style.boxShadow = '';
    }
});

// ================= ADVANCED TEXT SYSTEM =================

function loadGoogleFonts() {
    const googleFonts = FONTS.filter(f => f.google);
    const fontFamilies = googleFonts.map(f => {
        const match = f.css.match(/"([^"]+)"/);
        return match ? match[1].replace(/ /g, '+') : '';
    }).filter(Boolean).join('|');

    if (!fontFamilies) return;

    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;
    document.head.appendChild(link);
}

function populateFonts() {
    fontFamily.innerHTML = '';
    FONTS.forEach((f, i) => {
        const opt = document.createElement('option');
        opt.value = f.css;
        opt.textContent = f.name;
        opt.style.fontFamily = f.css;
        if (i === 0) opt.selected = true;
        fontFamily.appendChild(opt);
    });
    document.getElementById('font-count').textContent = FONTS.length + '+';
}

function isRTLLanguage(text) {
    const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/;
    return rtlRegex.test(text);
}

function buildTextStyles() {
    const styles = {};
    styles.fontFamily = fontFamily.value;
    styles.fontSize = fsRange.value + 'px';
    styles.fontWeight = fwRange.value;
    styles.color = textColor.value;

    if (textBgTransp.checked) {
        styles.background = 'transparent';
    } else {
        styles.background = textBg.value;
    }

    styles.textAlign = currentAlign;
    styles.letterSpacing = lsRange.value + 'px';
    styles.lineHeight = lhRange.value;
    styles.fontStyle = currentStyles.italic ? 'italic' : 'normal';

    styles.textDecoration = '';
    if (currentStyles.underline) styles.textDecoration += 'underline ';
    if (currentStyles.strike)    styles.textDecoration += 'line-through ';
    styles.textDecoration = styles.textDecoration.trim() || 'none';

    styles.textTransform = currentStyles.uppercase ? 'uppercase' : 'none';

    switch (currentShadow) {
        case 'soft':   styles.textShadow = '0 2px 4px rgba(0,0,0,0.3)'; break;
        case 'hard':   styles.textShadow = '2px 2px 0 rgba(0,0,0,0.9)'; break;
        case 'glow':   styles.textShadow = '0 0 10px ' + textColor.value + ', 0 0 20px ' + textColor.value; break;
        default:       styles.textShadow = 'none';
    }

    const outlineW = parseFloat(outlineRange.value);
    if (outlineW > 0) {
        styles.webkitTextStroke = `${outlineW}px ${outlineColor.value}`;
    } else {
        styles.webkitTextStroke = '0';
    }

    return styles;
}

function applyStylesToTextEl(el) {
    const styles = buildTextStyles();
    Object.assign(el.style, styles);

    const text = el.textContent || el.innerText;
    el.dir = isRTLLanguage(text) ? 'rtl' : 'ltr';

    if (parseInt(fwRange.value) >= 600) {
        el.style.fontWeight = fwRange.value;
    }
}

// Add Text
addTextBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (!text) { alert('Pehle kuch text likhein!'); return; }

    emptyHint.style.display = 'none';
    counter++;

    const el = document.createElement('div');
    el.className = 'canvas-el text-el';
    el.dataset.id = counter;
    el.dataset.kind = 'text';
    el.dataset.rotation = 0;
    el.dataset.flipH = '1';
    el.dataset.flipV = '1';
    el.textContent = text;

    el.style.left = '50%';
    el.style.top  = '50%';
    el.style.transform = 'translate(-50%, -50%)';

    applyStylesToTextEl(el);

    addHandle(el);
    bindEvents(el);
    canvas.appendChild(el);
    selectEl(el);

    showToast('✅ Text added! Drag to position');
});

// Update Text
updateTextBtn.addEventListener('click', () => {
    if (!editingTextEl) {
        alert('Koi text select nahi hai!');
        return;
    }

    const text = textInput.value.trim();
    if (!text) { alert('Text empty nahi ho sakta!'); return; }

    editingTextEl.textContent = text;
    applyStylesToTextEl(editingTextEl);
    showToast('✅ Text updated!');
});

// Edit existing text
function editTextEl(el) {
    editingTextEl = el;

    textInput.value = el.textContent;
    fontFamily.value = el.style.fontFamily || FONTS[0].css;
    fsRange.value = parseInt(el.style.fontSize) || 48;
    fwRange.value = el.style.fontWeight || 700;
    textColor.value = rgbToHex(el.style.color) || '#1a1a1a';

    document.getElementById('fs-val').textContent = fsRange.value + 'px';
    document.getElementById('fw-val').textContent = fwRange.value;
    document.getElementById('ls-val').textContent = (el.style.letterSpacing || '0px');
    document.getElementById('lh-val').textContent = el.style.lineHeight || '1.2';

    lsRange.value = parseFloat(el.style.letterSpacing) || 0;
    lhRange.value = parseFloat(el.style.lineHeight) || 1.2;

    updateTextBtn.style.display = 'flex';
    addTextBtn.style.display = 'none';

    switchTool('text');
}

// Live preview
textInput.addEventListener('input', () => {
    if (editingTextEl) {
        const text = textInput.value.trim();
        if (text) {
            editingTextEl.textContent = text;
            const isRTL = isRTLLanguage(text);
            editingTextEl.dir = isRTL ? 'rtl' : 'ltr';
        }
    }
});

// Slider live updates
fsRange.addEventListener('input', (e) => {
    document.getElementById('fs-val').textContent = e.target.value + 'px';
    if (editingTextEl) applyStylesToTextEl(editingTextEl);
});
fwRange.addEventListener('input', (e) => {
    document.getElementById('fw-val').textContent = e.target.value;
    if (editingTextEl) applyStylesToTextEl(editingTextEl);
});
lsRange.addEventListener('input', (e) => {
    document.getElementById('ls-val').textContent = e.target.value + 'px';
    if (editingTextEl) applyStylesToTextEl(editingTextEl);
});
lhRange.addEventListener('input', (e) => {
    document.getElementById('lh-val').textContent = e.target.value;
    if (editingTextEl) applyStylesToTextEl(editingTextEl);
});
outlineRange.addEventListener('input', (e) => {
    document.getElementById('outline-val').textContent = e.target.value + 'px';
    if (editingTextEl) applyStylesToTextEl(editingTextEl);
});

textColor.addEventListener('input', () => {
    if (editingTextEl) applyStylesToTextEl(editingTextEl);
});
textBg.addEventListener('input', () => {
    textBgTransp.checked = false;
    if (editingTextEl) applyStylesToTextEl(editingTextEl);
});
textBgTransp.addEventListener('change', () => {
    if (editingTextEl) applyStylesToTextEl(editingTextEl);
});
outlineColor.addEventListener('input', () => {
    if (editingTextEl) applyStylesToTextEl(editingTextEl);
});

// Alignment
document.querySelectorAll('.align-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.align-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentAlign = btn.dataset.align;

        if (editingTextEl) {
            editingTextEl.style.textAlign = currentAlign;
        }
    });
});

// Style buttons
document.querySelectorAll('.style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const style = btn.dataset.style;
        currentStyles[style] = !currentStyles[style];
        btn.classList.toggle('active', currentStyles[style]);
        if (editingTextEl) applyStylesToTextEl(editingTextEl);
    });
});

// Shadow buttons
document.querySelectorAll('.shadow-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.shadow-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentShadow = btn.dataset.shadow;
        if (editingTextEl) applyStylesToTextEl(editingTextEl);
    });
});

// Language quick buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const lang = btn.dataset.lang;

        const fontMap = {
            'en': 'Roboto', 'ur': 'Noto Nastaliq Urdu', 'ar': 'Cairo',
            'hi': 'Mukta', 'zh': 'Noto Sans SC', 'ja': 'Noto Sans JP',
            'ko': 'Noto Sans KR', 'ru': 'Roboto'
        };

        const targetFontName = fontMap[lang];
        if (targetFontName) {
            const fontObj = FONTS.find(f => f.name.includes(targetFontName));
            if (fontObj) {
                fontFamily.value = fontObj.css;
                if (editingTextEl) applyStylesToTextEl(editingTextEl);
            }
        }

        const placeholders = {
            'en': 'Hello World', 'ur': 'اردو میں لکھیں', 'ar': 'اكتب بالعربية',
            'hi': 'हिन्दी में लिखें', 'zh': '输入中文', 'ja': '日本語で入力',
            'ko': '한국어로 입력', 'ru': 'Напишите по-русски'
        };
        textInput.placeholder = placeholders[lang] || '';
    });
});

// ================= DRAG / RESIZE =================
function addHandle(el) {
    el.querySelectorAll('.resize-handle').forEach(h => h.remove());
    const h = document.createElement('div');
    h.className = 'resize-handle';
    el.appendChild(h);
    h.addEventListener('mousedown', startResize);
    h.addEventListener('touchstart', startResize, { passive: false });
}

function bindEvents(el) {
    el.addEventListener('mousedown', startDrag);
    el.addEventListener('touchstart', startDrag, { passive: false });
    el.addEventListener('click', (e) => {
        e.stopPropagation();
        selectEl(el);
    });
}

let dragData = null;
function startDrag(e) {
    if (e.target.classList.contains('resize-handle')) return;
    e.preventDefault();
    e.stopPropagation();

    const el = e.currentTarget;
    selectEl(el);

    const cx = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const cy = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    dragData = { el, sx: cx, sy: cy, ox: el.offsetLeft, oy: el.offsetTop };

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
}

function onDrag(e) {
    if (!dragData) return;
    e.preventDefault();
    const cx = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const cy = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    let nl = dragData.ox + (cx - dragData.sx);
    let nt = dragData.oy + (cy - dragData.sy);

    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const ew = dragData.el.offsetWidth, eh = dragData.el.offsetHeight;

    if (nl < 0) nl = 0;
    if (nt < 0) nt = 0;
    if (nl + ew > cw) nl = cw - ew;
    if (nt + eh > ch) nt = ch - eh;

    dragData.el.style.left = nl + 'px';
    dragData.el.style.top  = nt + 'px';
}

function endDrag() {
    dragData = null;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
}

let resizeData = null;
function startResize(e) {
    e.preventDefault();
    e.stopPropagation();

    const el = e.currentTarget.parentElement;
    selectEl(el);

    const cx = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const cy = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    resizeData = { el, sx: cx, sy: cy, ow: el.offsetWidth, oh: el.offsetHeight };

    document.addEventListener('mousemove', onResize);
    document.addEventListener('touchmove', onResize, { passive: false });
    document.addEventListener('mouseup', endResize);
    document.addEventListener('touchend', endResize);
}

function onResize(e) {
    if (!resizeData) return;
    e.preventDefault();
    const cx = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const cy = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    let nw = resizeData.ow + (cx - resizeData.sx);
    let nh = resizeData.oh + (cy - resizeData.sy);

    if (nw < 30) nw = 30; if (nh < 30) nh = 30;
    if (nw > 1000) nw = 1000; if (nh > 1000) nh = 1000;

    resizeData.el.style.width = nw + 'px';
    resizeData.el.style.height = nh + 'px';

    wRange.value = nw; wVal.textContent = nw + 'px';
    hRange.value = nh; hVal.textContent = nh + 'px';
}

function endResize() {
    resizeData = null;
    document.removeEventListener('mousemove', onResize);
    document.removeEventListener('touchmove', onResize);
    document.removeEventListener('mouseup', endResize);
    document.removeEventListener('touchend', endResize);
}

// ================= SELECT =================
function selectEl(el) {
    document.querySelectorAll('.canvas-el').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    selectedEl = el;

    // Text edit mode toggle
    if (el.dataset.kind === 'text') {
        editTextEl(el);
    } else {
        editingTextEl = null;
        if (updateTextBtn) updateTextBtn.style.display = 'none';
        if (addTextBtn) addTextBtn.style.display = 'flex';
    }

    // Reset enhance reset btn visibility
    if (el.dataset.kind === 'image' && originalFilters.has(el)) {
        if (resetEnhanceBtn) resetEnhanceBtn.style.display = 'flex';
    } else {
        if (resetEnhanceBtn) resetEnhanceBtn.style.display = 'none';
    }

    // Show properties
    if (el.dataset.kind === 'image') {
        if (currentTool !== 'filters') switchTool('shapes');
    } else if (el.dataset.kind === 'text') {
        // Text panel already open
    } else {
        panelUpload.style.display = 'none';
        panelShapes.style.display = 'none';
        panelFilters.style.display = 'none';
        panelText.style.display = 'none';
        panelProps.style.display = 'block';
        document.querySelectorAll('.tool-item').forEach(t => t.classList.remove('active'));
        emptyMsg.style.display = 'none';
        controls.style.display = 'block';
    }

    updateControls(el);
}

function updateControls(el) {
    const kind = el.dataset.kind;
    const w  = parseInt(el.style.width)  || el.offsetWidth  || 100;
    const h  = parseInt(el.style.height) || el.offsetHeight || 100;
    const r  = parseInt(el.dataset.rotation || 0);
    const o  = Math.round((parseFloat(el.style.opacity) || 1) * 100);
    const br = parseInt(el.style.borderRadius) || 0;

    wRange.value = w; wVal.textContent = w + 'px';
    hRange.value = h; hVal.textContent = h + 'px';
    rRange.value = r; rVal.textContent = r + '°';
    oRange.value = o; oVal.textContent = o + '%';
    brRange.value = br; brVal.textContent = br + 'px';

    if (kind === 'image') {
        cgFill.style.display = 'none';
        cgRadius.style.display = 'block';
    } else if (kind === 'shape') {
        cgFill.style.display = 'block';
        cgRadius.style.display = (el.dataset.type === 'square' || el.dataset.type === 'rounded') ? 'block' : 'none';
        const bg = el.style.background;
        if (bg && bg !== 'transparent') fillColor.value = rgbToHex(bg);
        else if (el.style.borderColor) fillColor.value = rgbToHex(el.style.borderColor);
    } else if (kind === 'text') {
        cgFill.style.display = 'none';
        cgRadius.style.display = 'none';
    }
}

// ================= PROPERTY CONTROLS =================
wRange.addEventListener('input', (e) => {
    if (!selectedEl) return;
    selectedEl.style.width = e.target.value + 'px';
    wVal.textContent = e.target.value + 'px';
});
hRange.addEventListener('input', (e) => {
    if (!selectedEl) return;
    selectedEl.style.height = e.target.value + 'px';
    hVal.textContent = e.target.value + 'px';
});
rRange.addEventListener('input', (e) => {
    if (!selectedEl) return;
    selectedEl.dataset.rotation = e.target.value;
    applyElTransform(selectedEl);
    rVal.textContent = e.target.value + '°';
});
oRange.addEventListener('input', (e) => {
    if (!selectedEl) return;
    selectedEl.style.opacity = e.target.value / 100;
    oVal.textContent = e.target.value + '%';
});
brRange.addEventListener('input', (e) => {
    if (!selectedEl) return;
    selectedEl.style.borderRadius = e.target.value + 'px';
    selectedEl.style.overflow = 'hidden';
    brVal.textContent = e.target.value + 'px';
});
fillColor.addEventListener('input', (e) => {
    if (!selectedEl) return;
    if (selectedEl.dataset.type === 'ring') {
        selectedEl.style.borderColor = e.target.value;
    } else {
        selectedEl.style.background = e.target.value;
    }
});

// RENAMED: applyTransform → applyElTransform (to avoid clash with zoom)
function applyElTransform(el) {
    const rot = el.dataset.rotation || 0;
    const fh  = el.dataset.flipH || '1';
    const fv  = el.dataset.flipV || '1';
    el.style.transform = `rotate(${rot}deg) scale(${fh}, ${fv})`;
}

// ================= DUPLICATE / DELETE =================
duplicateBtn.addEventListener('click', () => {
    if (!selectedEl) return;
    const clone = selectedEl.cloneNode(true);
    clone.classList.remove('selected');
    clone.dataset.id = ++counter;

    const nl = Math.min(parseInt(selectedEl.style.left) + 25, canvas.clientWidth - 100);
    const nt = Math.min(parseInt(selectedEl.style.top)  + 25, canvas.clientHeight - 100);
    clone.style.left = Math.max(0, nl) + 'px';
    clone.style.top  = Math.max(0, nt) + 'px';

    clone.querySelectorAll('.resize-handle').forEach(h => h.remove());
    addHandle(clone);
    bindEvents(clone);

    canvas.appendChild(clone);
    selectEl(clone);
});

deleteBtn.addEventListener('click', () => {
    if (!selectedEl) return;
    selectedEl.remove();
    selectedEl = null;
    emptyMsg.style.display = 'block';
    controls.style.display = 'none';
    if (canvas.querySelectorAll('.canvas-el').length === 0) {
        emptyHint.style.display = 'block';
    }
});

// ================= CANVAS CLICK =================
canvas.addEventListener('click', (e) => {
    if (e.target === canvas || e.target === emptyHint) {
        document.querySelectorAll('.canvas-el').forEach(el => el.classList.remove('selected'));
        selectedEl = null;
        emptyMsg.style.display = 'block';
        controls.style.display = 'none';
        panelProps.style.display = 'none';
        switchTool(currentTool);
    }
});

// ================= CLEAR ALL =================
clearBtn.addEventListener('click', () => {
    if (canvas.querySelectorAll('.canvas-el').length === 0) {
        alert('Canvas already empty!');
        return;
    }
    if (confirm('Clear everything?')) {
        canvas.querySelectorAll('.canvas-el').forEach(el => el.remove());
        emptyHint.style.display = 'block';
        selectedEl = null;
        emptyMsg.style.display = 'block';
        controls.style.display = 'none';
    }
});

// ================= BACK =================
backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// ================= HELPERS =================
function rgbToHex(rgb) {
    if (!rgb) return '#000000';
    if (rgb.startsWith('#')) return rgb;
    const m = rgb.match(/\d+/g);
    if (!m || m.length < 3) return '#000000';
    return '#' + [m[0], m[1], m[2]].map(x => {
        const h = parseInt(x).toString(16);
        return h.length === 1 ? '0' + h : h;
    }).join('');
}

// ================= KEYBOARD =================
document.addEventListener('keydown', (e) => {
    if (!selectedEl) return;
    if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        selectedEl.remove();
        selectedEl = null;
        emptyMsg.style.display = 'block';
        controls.style.display = 'none';
        if (canvas.querySelectorAll('.canvas-el').length === 0) {
            emptyHint.style.display = 'block';
        }
    }
});

// ================= TOAST NOTIFICATION =================
function showToast(message) {
    const existing = document.querySelector('.enhance-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'enhance-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ============================================================
// ================= ZOOM / PAN SYSTEM =========================
// ============================================================

const canvasWrap     = document.getElementById('canvas-wrap');
const zoomLayer      = document.getElementById('canvas-zoom-layer');
const zoomInBtn      = document.getElementById('zoom-in-btn');
const zoomOutBtn     = document.getElementById('zoom-out-btn');
const fitBtn         = document.getElementById('fit-btn');
const resetZoomBtn   = document.getElementById('reset-zoom-btn');
const zoomLevel      = document.getElementById('zoom-level');
const modeToggle     = document.getElementById('mode-toggle');
const modeBtns       = document.querySelectorAll('.mode-btn');

function applyZoomTransform(useTransition = true) {
    if (!zoomLayer) return;
    if (useTransition) {
        zoomLayer.classList.remove('no-transition');
    } else {
        zoomLayer.classList.add('no-transition');
    }
    zoomLayer.style.transform = `translate(${panX}px, ${panY}px) scale(${currentZoom})`;
    if (zoomLevel) zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
}

function zoomStep(delta) {
    const newZoom = Math.min(maxZoom, Math.max(minZoom, currentZoom + delta));
    if (newZoom === currentZoom) return;
    currentZoom = newZoom;
    applyZoomTransform();
}

if (zoomInBtn)  zoomInBtn.addEventListener('click', () => zoomStep(0.2));
if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => zoomStep(-0.2));

if (fitBtn) {
    fitBtn.addEventListener('click', () => {
        const wrapRect = canvasWrap.getBoundingClientRect();
        const naturalW = canvas.offsetWidth;
        const naturalH = canvas.offsetHeight;

        const paddingX = 40;
        const paddingY = 40;

        const scaleX = (wrapRect.width - paddingX) / naturalW;
        const scaleY = (wrapRect.height - paddingY) / naturalH;

        currentZoom = Math.min(scaleX, scaleY, 1);
        panX = 0;
        panY = 0;

        applyZoomTransform();
    });
}

if (resetZoomBtn) {
    resetZoomBtn.addEventListener('click', () => {
        currentZoom = 1;
        panX = 0;
        panY = 0;
        applyZoomTransform();
    });
}

modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;

        if (currentMode === 'pan') {
            canvasWrap.style.cursor = 'grab';
        } else {
            canvasWrap.style.cursor = 'default';
        }
    });
});

if (canvasWrap) {
    canvasWrap.addEventListener('pointerdown', (e) => {
        if (e.target.closest('.zoom-controls') || e.target.closest('.mode-toggle')) return;
        if (currentMode === 'edit' && e.target.closest('.canvas-el')) return;

        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (activePointers.size === 1) {
            lastPanX = e.clientX;
            lastPanY = e.clientY;
        } else if (activePointers.size === 2) {
            const pts = Array.from(activePointers.values());
            lastPinchDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        }

        canvasWrap.setPointerCapture(e.pointerId);
        canvasWrap.style.cursor = 'grabbing';
    });

    canvasWrap.addEventListener('pointermove', (e) => {
        if (!activePointers.has(e.pointerId)) return;

        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (activePointers.size === 1) {
            if (currentMode === 'edit' && e.target.closest('.canvas-el')) return;

            const dx = e.clientX - lastPanX;
            const dy = e.clientY - lastPanY;

            panX += dx;
            panY += dy;

            lastPanX = e.clientX;
            lastPanY = e.clientY;

            applyZoomTransform(false);

        } else if (activePointers.size === 2) {
            const pts = Array.from(activePointers.values());
            const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);

            if (lastPinchDist > 0) {
                const delta = dist / lastPinchDist;
                const newZoom = Math.min(maxZoom, Math.max(minZoom, currentZoom * delta));

                const midX = (pts[0].x + pts[1].x) / 2;
                const midY = (pts[0].y + pts[1].y) / 2;
                const wrapRect = canvasWrap.getBoundingClientRect();
                const centerX = wrapRect.width / 2;
                const centerY = wrapRect.height / 2;

                const zoomFactor = newZoom / currentZoom;

                panX = midX - wrapRect.left - centerX - (midX - wrapRect.left - centerX - panX) * zoomFactor;
                panY = midY - wrapRect.top  - centerY - (midY - wrapRect.top  - centerY - panY) * zoomFactor;

                currentZoom = newZoom;
                applyZoomTransform(false);
            }

            lastPinchDist = dist;
        }
    });

    canvasWrap.addEventListener('pointerup', (e) => {
        activePointers.delete(e.pointerId);

        if (activePointers.size < 2) lastPinchDist = 0;

        if (activePointers.size === 1) {
            const remaining = Array.from(activePointers.values())[0];
            lastPanX = remaining.x;
            lastPanY = remaining.y;
        }

        if (activePointers.size === 0) {
            canvasWrap.style.cursor = currentMode === 'pan' ? 'grab' : 'default';
        }
    });

    canvasWrap.addEventListener('pointercancel', (e) => {
        activePointers.delete(e.pointerId);
        lastPinchDist = 0;
    });

    canvasWrap.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });

    canvasWrap.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });

    canvasWrap.addEventListener('wheel', (e) => {
        e.preventDefault();

        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newZoom = Math.min(maxZoom, Math.max(minZoom, currentZoom + delta));

        if (newZoom === currentZoom) return;

        const wrapRect = canvasWrap.getBoundingClientRect();
        const mouseX = e.clientX - wrapRect.left;
        const mouseY = e.clientY - wrapRect.top;
        const centerX = wrapRect.width / 2;
        const centerY = wrapRect.height / 2;

        const zoomFactor = newZoom / currentZoom;

        panX = mouseX - centerX - (mouseX - centerX - panX) * zoomFactor;
        panY = mouseY - centerY - (mouseY - centerY - panY) * zoomFactor;

        currentZoom = newZoom;
        applyZoomTransform(false);
    }, { passive: false });
}

// ============================================================
// ================= 4K EXPORT SYSTEM =========================
// ============================================================

const exportModal       = document.getElementById('export-modal');
const closeExport       = document.getElementById('close-export');
const exportPreviewCv   = document.getElementById('export-preview-canvas');
const expResCards       = document.querySelectorAll('.res-card');
const expCustomGroup    = document.getElementById('custom-size-group');
const expCustomW        = document.getElementById('custom-w');
const expCustomH        = document.getElementById('custom-h');
const expFormatOpts     = document.querySelectorAll('.format-opt');
const expQualityGroup   = document.getElementById('quality-group');
const expQuality        = document.getElementById('exp-quality');
const expQualityVal     = document.getElementById('exp-quality-val');
const expBg             = document.getElementById('exp-bg');
const expTransparent    = document.getElementById('exp-transparent');
const expOutSize        = document.getElementById('exp-out-size');
const expOutFormat      = document.getElementById('exp-out-format');
const expOutEst         = document.getElementById('exp-out-est');
const expDownloadBtn    = document.getElementById('exp-download-btn');

let expRes    = '4k';
let expFormat = 'png';

const EXP_RESOLUTIONS = {
    '4k':    { w: 3840, h: 2160 },
    '2k':    { w: 2560, h: 1440 },
    '1080p': { w: 1920, h: 1080 },
    '720p':  { w: 1280, h: 720 }
};

exportBtn.addEventListener('click', () => {
    const count = canvas.querySelectorAll('.canvas-el').length;
    if (count === 0) {
        alert('❌ Canvas khali hai! Pehle kuch add karein.');
        return;
    }

    if (exportModal) {
        exportModal.classList.add('active');
        renderExportPreview();
        updateExportInfo();
    }
});

if (closeExport) {
    closeExport.addEventListener('click', () => {
        exportModal.classList.remove('active');
    });
}

if (exportModal) {
    exportModal.addEventListener('click', (e) => {
        if (e.target === exportModal) {
            exportModal.classList.remove('active');
        }
    });
}

function renderExportPreview() {
    if (!exportPreviewCv) return;

    const maxW = 600;
    const maxH = 400;
    const ratio = (expRes === 'custom')
        ? (parseInt(expCustomW.value) / parseInt(expCustomH.value))
        : (EXP_RESOLUTIONS[expRes].w / EXP_RESOLUTIONS[expRes].h);

    let pw, ph;
    if (ratio > 1) {
        pw = Math.min(maxW, maxH * ratio);
        ph = pw / ratio;
    } else {
        ph = Math.min(maxH, maxW / ratio);
        pw = ph * ratio;
    }

    exportPreviewCv.width = pw;
    exportPreviewCv.height = ph;

    const ctx = exportPreviewCv.getContext('2d');

    if (expFormat === 'png' && expTransparent.checked) {
        ctx.clearRect(0, 0, pw, ph);
    } else {
        ctx.fillStyle = expBg.value;
        ctx.fillRect(0, 0, pw, ph);
    }

    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const scaleX = pw / cw;
    const scaleY = ph / ch;

    const elements = canvas.querySelectorAll('.canvas-el');

    elements.forEach(el => {
        ctx.save();

        const elX = parseFloat(el.style.left) * scaleX || 0;
        const elY = parseFloat(el.style.top) * scaleY || 0;
        const elW = el.offsetWidth * scaleX;
        const elH = el.offsetHeight * scaleY;

        ctx.translate(elX + elW / 2, elY + elH / 2);

        const rot = parseFloat(el.dataset.rotation || 0);
        const fh = el.dataset.flipH === '-1' ? -1 : 1;
        const fv = el.dataset.flipV === '-1' ? -1 : 1;
        ctx.rotate(rot * Math.PI / 180);
        ctx.scale(fh, fv);

        ctx.globalAlpha = parseFloat(el.style.opacity) || 1;

        const kind = el.dataset.kind;

        if (kind === 'image') {
            const bgImage = el.style.backgroundImage;
            const url = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                drawImageCover(ctx, img, -elW / 2, -elH / 2, elW, elH);
            };
            img.src = url;
            ctx.restore();
            return;

        } else if (kind === 'shape') {
            ctx.fillStyle = el.style.background || '#00d2d3';
            drawExportShape(ctx, el.dataset.type, -elW / 2, -elH / 2, elW, elH, el);

        } else if (kind === 'text') {
            const fontSize = parseFloat(el.style.fontSize) * ((scaleX + scaleY) / 2);
            const fontFam = el.style.fontFamily || 'sans-serif';
            const fontWeight = el.style.fontWeight || 700;
            ctx.font = `${fontWeight} ${fontSize}px ${fontFam}`;
            ctx.fillStyle = el.style.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            if (isRTLLanguage(el.textContent)) {
                ctx.direction = 'rtl';
            }

            ctx.fillText(el.textContent, 0, 0);
        }

        ctx.restore();
    });
}

function drawExportShape(ctx, type, x, y, w, h, el) {
    switch (type) {
        case 'square': ctx.fillRect(x, y, w, h); break;
        case 'circle':
            ctx.beginPath();
            ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 'rounded':
            roundRect(ctx, x, y, w, h, Math.min(w, h) * 0.2);
            ctx.fill();
            break;
        case 'triangle':
            ctx.beginPath();
            ctx.moveTo(x + w / 2, y);
            ctx.lineTo(x, y + h);
            ctx.lineTo(x + w, y + h);
            ctx.closePath();
            ctx.fill();
            break;
        case 'diamond':
            ctx.beginPath();
            ctx.moveTo(x + w / 2, y);
            ctx.lineTo(x + w, y + h / 2);
            ctx.lineTo(x + w / 2, y + h);
            ctx.lineTo(x, y + h / 2);
            ctx.closePath();
            ctx.fill();
            break;
        case 'star':
            drawStarExport(ctx, x + w / 2, y + h / 2, 5, Math.min(w, h) / 2, Math.min(w, h) / 4);
            ctx.fill();
            break;
        case 'pentagon':
            drawPolygonExport(ctx, x + w / 2, y + h / 2, 5, Math.min(w, h) / 2);
            ctx.fill();
            break;
        case 'hexagon':
            drawPolygonExport(ctx, x + w / 2, y + h / 2, 6, Math.min(w, h) / 2);
            ctx.fill();
            break;
        case 'octagon':
            drawPolygonExport(ctx, x + w / 2, y + h / 2, 8, Math.min(w, h) / 2);
            ctx.fill();
            break;
        case 'heart':
            drawHeartExport(ctx, x + w / 2, y + h / 2, w, h);
            ctx.fill();
            break;
        case 'arrow':
            ctx.beginPath();
            ctx.moveTo(x, y + h * 0.3);
            ctx.lineTo(x + w * 0.65, y + h * 0.3);
            ctx.lineTo(x + w * 0.65, y);
            ctx.lineTo(x + w, y + h / 2);
            ctx.lineTo(x + w * 0.65, y + h);
            ctx.lineTo(x + w * 0.65, y + h * 0.7);
            ctx.lineTo(x, y + h * 0.7);
            ctx.closePath();
            ctx.fill();
            break;
        case 'cross':
            ctx.beginPath();
            ctx.moveTo(x + w * 0.4, y);
            ctx.lineTo(x + w * 0.6, y);
            ctx.lineTo(x + w * 0.6, y + h * 0.4);
            ctx.lineTo(x + w, y + h * 0.4);
            ctx.lineTo(x + w, y + h * 0.6);
            ctx.lineTo(x + w * 0.6, y + h * 0.6);
            ctx.lineTo(x + w * 0.6, y + h);
            ctx.lineTo(x + w * 0.4, y + h);
            ctx.lineTo(x + w * 0.4, y + h * 0.6);
            ctx.lineTo(x, y + h * 0.6);
            ctx.lineTo(x, y + h * 0.4);
            ctx.lineTo(x + w * 0.4, y + h * 0.4);
            ctx.closePath();
            ctx.fill();
            break;
        case 'ring':
            ctx.beginPath();
            ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2 - 4, 0, Math.PI * 2);
            ctx.lineWidth = 18 * (w / 120);
            ctx.strokeStyle = el.style.borderColor || '#00d2d3';
            ctx.stroke();
            break;
        case 'line':
            ctx.fillRect(x, y + h / 2 - 6, w, 12);
            break;
        default:
            ctx.fillRect(x, y, w, h);
    }
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function drawStarExport(ctx, cx, cy, spikes, outerR, innerR) {
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
        rot += step;
    }
    ctx.closePath();
}

function drawPolygonExport(ctx, cx, cy, sides, radius) {
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
}

function drawHeartExport(ctx, cx, cy, w, h) {
    ctx.beginPath();
    const topY = cy - h * 0.2;
    ctx.moveTo(cx, cy + h * 0.35);
    ctx.bezierCurveTo(cx - w * 0.7, cy - h * 0.1, cx - w * 0.35, cy - h * 0.5, cx, topY);
    ctx.bezierCurveTo(cx + w * 0.35, cy - h * 0.5, cx + w * 0.7, cy - h * 0.1, cx, cy + h * 0.35);
    ctx.closePath();
}

function drawImageCover(ctx, img, x, y, w, h) {
    const iw = img.width;
    const ih = img.height;
    const ratio = Math.max(w / iw, h / ih);
    const nw = iw * ratio;
    const nh = ih * ratio;
    const nx = x + (w - nw) / 2;
    const ny = y + (h - nh) / 2;
    ctx.drawImage(img, nx, ny, nw, nh);
}

expResCards.forEach(card => {
    card.addEventListener('click', () => {
        expResCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        expRes = card.dataset.res;

        if (expRes === 'custom') {
            expCustomGroup.style.display = 'block';
        } else {
            expCustomGroup.style.display = 'none';
        }

        updateExportInfo();
        renderExportPreview();
    });
});

expFormatOpts.forEach(opt => {
    opt.addEventListener('click', () => {
        expFormatOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        expFormat = opt.querySelector('input').value;

        if (expFormat === 'jpeg' || expFormat === 'webp') {
            expQualityGroup.style.display = 'block';
        } else {
            expQualityGroup.style.display = 'none';
        }

        if (expFormat !== 'png') {
            expTransparent.checked = false;
            expTransparent.disabled = true;
        } else {
            expTransparent.disabled = false;
        }

        updateExportInfo();
        renderExportPreview();
    });
});

expQuality.addEventListener('input', (e) => {
    expQualityVal.textContent = e.target.value + '%';
    updateExportInfo();
});

expBg.addEventListener('input', () => {
    renderExportPreview();
});

expTransparent.addEventListener('change', () => {
    expBg.disabled = expTransparent.checked;
    renderExportPreview();
});

expCustomW.addEventListener('input', () => {
    updateExportInfo();
    renderExportPreview();
});

expCustomH.addEventListener('input', () => {
    updateExportInfo();
    renderExportPreview();
});

function updateExportInfo() {
    let w, h;

    if (expRes === 'custom') {
        w = parseInt(expCustomW.value) || 2000;
        h = parseInt(expCustomH.value) || 2000;
    } else {
        w = EXP_RESOLUTIONS[expRes].w;
        h = EXP_RESOLUTIONS[expRes].h;
    }

    expOutSize.textContent = `${w} × ${h}`;
    expOutFormat.textContent = expFormat.toUpperCase();

    const pixels = w * h;
    let est = 0;
    if (expFormat === 'png') est = pixels * 0.0000006;
    else if (expFormat === 'jpeg') est = pixels * 0.0000003 * (expQuality.value / 100);
    else est = pixels * 0.0000002 * (expQuality.value / 100);

    expOutEst.textContent = est < 1
        ? `${(est * 1024).toFixed(0)} KB`
        : `~${est.toFixed(1)} MB`;
}

expDownloadBtn.addEventListener('click', async () => {
    const elements = canvas.querySelectorAll('.canvas-el');
    if (elements.length === 0) {
        alert('❌ Canvas khali hai!');
        return;
    }

    expDownloadBtn.disabled = true;
    const originalHTML = expDownloadBtn.innerHTML;
    expDownloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Exporting...';

    try {
        let w, h;
        if (expRes === 'custom') {
            w = parseInt(expCustomW.value) || 2000;
            h = parseInt(expCustomH.value) || 2000;
        } else {
            w = EXP_RESOLUTIONS[expRes].w;
            h = EXP_RESOLUTIONS[expRes].h;
        }

        const expCanvas = document.createElement('canvas');
        expCanvas.width = w;
        expCanvas.height = h;
        const ctx = expCanvas.getContext('2d');

        if (expFormat === 'png' && expTransparent.checked) {
            ctx.clearRect(0, 0, w, h);
        } else {
            ctx.fillStyle = expBg.value;
            ctx.fillRect(0, 0, w, h);
        }

        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        const scaleX = w / cw;
        const scaleY = h / ch;

        const imageElements = Array.from(elements).filter(el => el.dataset.kind === 'image');
        const loadedImages = {};

        await Promise.all(imageElements.map(el => {
            return new Promise(resolve => {
                const bgImage = el.style.backgroundImage;
                const url = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    loadedImages[el.dataset.id] = img;
                    resolve();
                };
                img.onerror = () => resolve();
                img.src = url;
            });
        }));

        for (const el of elements) {
            ctx.save();

            const elX = parseFloat(el.style.left) * scaleX || 0;
            const elY = parseFloat(el.style.top) * scaleY || 0;
            const elW = el.offsetWidth * scaleX;
            const elH = el.offsetHeight * scaleY;

            ctx.translate(elX + elW / 2, elY + elH / 2);

            const rot = parseFloat(el.dataset.rotation || 0);
            const fh = el.dataset.flipH === '-1' ? -1 : 1;
            const fv = el.dataset.flipV === '-1' ? -1 : 1;
            ctx.rotate(rot * Math.PI / 180);
            ctx.scale(fh, fv);

            ctx.globalAlpha = parseFloat(el.style.opacity) || 1;

            const kind = el.dataset.kind;

            if (kind === 'image') {
                const img = loadedImages[el.dataset.id];
                if (img) {
                    drawImageCover(ctx, img, -elW / 2, -elH / 2, elW, elH);
                }

            } else if (kind === 'shape') {
                ctx.fillStyle = el.style.background || '#00d2d3';
                drawExportShape(ctx, el.dataset.type, -elW / 2, -elH / 2, elW, elH, el);

            } else if (kind === 'text') {
                const fontSize = parseFloat(el.style.fontSize) * ((scaleX + scaleY) / 2);
                const fontFam = el.style.fontFamily || 'sans-serif';
                const fontWeight = el.style.fontWeight || 700;
                ctx.font = `${fontWeight} ${fontSize}px ${fontFam}`;
                ctx.fillStyle = el.style.color;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                if (isRTLLanguage(el.textContent)) {
                    ctx.direction = 'rtl';
                }

                ctx.fillText(el.textContent, 0, 0);
            }

            ctx.restore();
        }

        const mimeType = expFormat === 'png' ? 'image/png'
                        : expFormat === 'jpeg' ? 'image/jpeg'
                        : 'image/webp';
        const quality = expFormat === 'png' ? 1 : parseInt(expQuality.value) / 100;

        expCanvas.toBlob((blob) => {
            if (!blob) {
                alert('❌ Export failed!');
                resetBtn();
                return;
            }

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `yucut-${expRes}-${Date.now()}.${expFormat === 'jpeg' ? 'jpg' : expFormat}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(() => URL.revokeObjectURL(url), 1000);

            resetBtn();
            alert(`✅ Export Successful!\n\nSize: ${w} × ${h}\nFormat: ${expFormat.toUpperCase()}\nFile Size: ~${(blob.size / 1024 / 1024).toFixed(2)} MB`);

        }, mimeType, quality);

    } catch (err) {
        console.error(err);
        alert('❌ Export error: ' + err.message);
        resetBtn();
    }

    function resetBtn() {
        expDownloadBtn.disabled = false;
        expDownloadBtn.innerHTML = originalHTML;
    }
});

window.addEventListener('resize', () => {
    if (exportModal && exportModal.classList.contains('active')) {
        renderExportPreview();
    }
});

// ============================================================
// ================= ENHANCE SYSTEM ============================
// ============================================================

const enhanceBtn      = document.getElementById('enhance-btn');
const resetEnhanceBtn = document.getElementById('reset-enhance-btn');

function applyEnhance(el) {
    if (!el || el.dataset.kind !== 'image') return false;

    if (!originalFilters.has(el)) {
        originalFilters.set(el, {
            filter: el.style.filter || 'none',
            boxShadow: el.style.boxShadow || ''
        });
    }

    const currentBrightness = parseInt(brightness?.value || 100);
    const currentContrast   = parseInt(contrast?.value || 100);
    const currentSaturation = parseInt(saturation?.value || 100);
    const currentTemp       = parseInt(temperature?.value || 0);
    const currentSepia      = parseInt(sepia?.value || 0);
    const currentGrayscale  = parseInt(grayscale?.value || 0);

    const enhancedBrightness = Math.min(200, currentBrightness + 12);
    const enhancedContrast   = Math.min(200, currentContrast   + 18);
    const enhancedSaturation = Math.min(200, currentSaturation + 25);
    const enhancedTemp       = Math.max(-100, Math.min(100, currentTemp + 8));

    let enhanceFilter = `
        brightness(${enhancedBrightness}%)
        contrast(${enhancedContrast}%)
        saturate(${enhancedSaturation}%)
        sepia(${currentSepia + 4}%)
        grayscale(${currentGrayscale}%)
    `;

    if (enhancedTemp > 0) {
        enhanceFilter += ` hue-rotate(${-enhancedTemp * 0.2}deg)`;
    } else if (enhancedTemp < 0) {
        enhanceFilter += ` hue-rotate(${Math.abs(enhancedTemp) * 0.3}deg)`;
    }

    el.style.filter = enhanceFilter.replace(/\s+/g, ' ').trim();

    const existingShadow = el.style.boxShadow;
    if (!existingShadow || existingShadow === 'none') {
        el.style.boxShadow = 'inset 0 0 40px rgba(0,0,0,0.08)';
    }

    if (brightness) {
        brightness.value = enhancedBrightness;
        document.getElementById('brightness-val').textContent = enhancedBrightness + '%';
    }
    if (contrast) {
        contrast.value = enhancedContrast;
        document.getElementById('contrast-val').textContent = enhancedContrast + '%';
    }
    if (saturation) {
        saturation.value = enhancedSaturation;
        document.getElementById('saturation-val').textContent = enhancedSaturation + '%';
    }
    if (temperature) {
        temperature.value = enhancedTemp;
        document.getElementById('temperature-val').textContent = enhancedTemp;
    }

    return true;
}

function resetEnhance(el) {
    if (!el || el.dataset.kind !== 'image') return false;

    const original = originalFilters.get(el);
    if (original) {
        el.style.filter = original.filter;
        el.style.boxShadow = original.boxShadow;
    } else {
        el.style.filter = 'none';
        el.style.boxShadow = '';
    }
    return true;
}

if (enhanceBtn) {
    enhanceBtn.addEventListener('click', async () => {
        if (!selectedEl) {
            alert('❌ Pehle canvas se koi image select karein!');
            return;
        }

        if (selectedEl.dataset.kind !== 'image') {
            alert('❌ Ye feature sirf image ke liye hai. Pehle koi image select karein.');
            return;
        }

        enhanceBtn.disabled = true;
        enhanceBtn.classList.add('loading');
        const originalHTML = enhanceBtn.innerHTML;
        enhanceBtn.innerHTML = '<i class="fa-solid fa-spinner"></i> <span>Enhancing...</span>';

        await new Promise(resolve => setTimeout(resolve, 800));

        const success = applyEnhance(selectedEl);

        enhanceBtn.disabled = false;
        enhanceBtn.classList.remove('loading');
        enhanceBtn.innerHTML = originalHTML;

        if (success) {
            enhanceBtn.classList.add('success');
            setTimeout(() => enhanceBtn.classList.remove('success'), 700);

            if (resetEnhanceBtn) resetEnhanceBtn.style.display = 'flex';

            showToast('✨ Image Enhanced Successfully!');
        } else {
            alert('❌ Enhancement failed. Try again.');
        }
    });
}

if (resetEnhanceBtn) {
    resetEnhanceBtn.addEventListener('click', () => {
        if (!selectedEl || selectedEl.dataset.kind !== 'image') {
            alert('❌ Pehle koi image select karein!');
            return;
        }

        resetEnhance(selectedEl);
        resetEnhanceBtn.style.display = 'none';

        if (brightness) {
            brightness.value = 100;
            document.getElementById('brightness-val').textContent = '100%';
        }
        if (contrast) {
            contrast.value = 100;
            document.getElementById('contrast-val').textContent = '100%';
        }
        if (saturation) {
            saturation.value = 100;
            document.getElementById('saturation-val').textContent = '100%';
        }
        if (temperature) {
            temperature.value = 0;
            document.getElementById('temperature-val').textContent = '0';
        }

        showToast('↺ Enhancement reset');
    });
}

// ============================================================
// ================= INITIALIZATION ===========================
// ============================================================

loadGoogleFonts();
populateFonts();
renderShapes();
renderPalette();
renderFilters('basic');
switchTool('upload');

// Auto-fit canvas after load
window.addEventListener('load', () => {
    setTimeout(() => {
        if (fitBtn) fitBtn.click();
    }, 200);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth <= 768 && fitBtn) {
            fitBtn.click();
        }
    }, 300);
});

console.log('✅ Yucut Image Editor initialized successfully');
console.log(`✅ Loaded ${FONTS.length} fonts`);
/* ============================================================
   AUTO-SAVE DRAFTS SYSTEM
   Saves canvas state to localStorage whenever user changes it
   ============================================================ */

// ================= SAVE DRAFT FUNCTION =================
function saveDraft(autoSave = false) {
    const elements = canvas.querySelectorAll('.canvas-el');
    if (elements.length === 0) return false;

    // Serialize all canvas elements
    const data = [];
    elements.forEach(el => {
        const item = {
            id: el.dataset.id,
            kind: el.dataset.kind,
            type: el.dataset.type || null,
            rotation: el.dataset.rotation || 0,
            flipH: el.dataset.flipH || '1',
            flipV: el.dataset.flipV || '1',
            naturalW: el.dataset.naturalW || null,
            naturalH: el.dataset.naturalH || null,
            // Styles
            left: el.style.left,
            top: el.style.top,
            width: el.style.width,
            height: el.style.height,
            background: el.style.background || null,
            backgroundImage: el.style.backgroundImage || null,
            borderColor: el.style.borderColor || null,
            borderRadius: el.style.borderRadius || null,
            clipPath: el.style.clipPath || null,
            borderWidth: el.style.borderWidth || null,
            borderStyle: el.style.borderStyle || null,
            opacity: el.style.opacity || '1',
            transform: el.style.transform || 'none',
            filter: el.style.filter || 'none',
            boxShadow: el.style.boxShadow || null,
            // Text specific
            text: el.dataset.kind === 'text' ? el.textContent : null,
            fontFamily: el.style.fontFamily || null,
            fontSize: el.style.fontSize || null,
            fontWeight: el.style.fontWeight || null,
            color: el.style.color || null,
            textAlign: el.style.textAlign || null,
            letterSpacing: el.style.letterSpacing || null,
            lineHeight: el.style.lineHeight || null,
            textDecoration: el.style.textDecoration || null,
            textTransform: el.style.textTransform || null,
            textShadow: el.style.textShadow || null,
            webkitTextStroke: el.style.webkitTextStroke || null,
            dir: el.dir || null,
            textBg: el.style.background && el.dataset.kind === 'text' ? el.style.background : null
        };
        data.push(item);
    });

    // Generate thumbnail (small canvas)
    const thumb = generateThumbnail();

    // Create draft object
    const draft = {
        id: 'draft_' + Date.now(),
        timestamp: Date.now(),
        elementCount: elements.length,
        canvasWidth: canvas.clientWidth,
        canvasHeight: canvas.clientHeight,
        elements: data,
        thumbnail: thumb
    };

    // Get existing drafts
    let drafts = JSON.parse(localStorage.getItem('yucutDrafts')) || [];

    // Check: agar same canvas state hai to update karo (auto-save ke liye)
    if (autoSave && drafts.length > 0) {
        // Update the most recent draft instead of creating new one
        const lastDraft = drafts[0];
        // Agar 30 seconds ke andar ka hai to merge karo
        if (Date.now() - lastDraft.timestamp < 30000) {
            draft.id = lastDraft.id;
            draft.timestamp = lastDraft.timestamp; // Keep original
            drafts[0] = draft;
            localStorage.setItem('yucutDrafts', JSON.stringify(drafts.slice(0, 20)));
            return draft;
        }
    }

    // Add new draft at start
    drafts.unshift(draft);

    // Keep only latest 20 drafts
    drafts = drafts.slice(0, 20);

    localStorage.setItem('yucutDrafts', JSON.stringify(drafts));
    return draft;
}

// ================= GENERATE THUMBNAIL =================
function generateThumbnail() {
    try {
        const thumbW = 200;
        const thumbH = 150;
        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        const scaleX = thumbW / cw;
        const scaleY = thumbH / ch;

        const thumbCanvas = document.createElement('canvas');
        thumbCanvas.width = thumbW;
        thumbCanvas.height = thumbH;
        const ctx = thumbCanvas.getContext('2d');

        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, thumbW, thumbH);

        // Draw simple representation of elements
        const elements = canvas.querySelectorAll('.canvas-el');
        elements.forEach(el => {
            const elX = (parseFloat(el.style.left) || 0) * scaleX;
            const elY = (parseFloat(el.style.top) || 0) * scaleY;
            const elW = (el.offsetWidth || 50) * scaleX;
            const elH = (el.offsetHeight || 50) * scaleY;

            ctx.save();
            ctx.globalAlpha = parseFloat(el.style.opacity) || 1;

            if (el.dataset.kind === 'image') {
                const bgImage = el.style.backgroundImage;
                const url = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                // Try to draw image synchronously (cached)
                const cachedImg = imageCache[url];
                if (cachedImg) {
                    try {
                        ctx.drawImage(cachedImg, elX, elY, elW, elH);
                    } catch (e) {
                        ctx.fillStyle = '#ddd';
                        ctx.fillRect(elX, elY, elW, elH);
                    }
                } else {
                    ctx.fillStyle = '#ddd';
                    ctx.fillRect(elX, elY, elW, elH);
                }
            } else if (el.dataset.kind === 'shape') {
                ctx.fillStyle = el.style.background || '#00d2d3';
                ctx.fillRect(elX, elY, elW, elH);
            } else if (el.dataset.kind === 'text') {
                ctx.fillStyle = el.style.color || '#000';
                ctx.font = `bold ${Math.max(8, parseFloat(el.style.fontSize) * 0.2 || 10)}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(el.textContent.substring(0, 15), elX + elW / 2, elY + elH / 2);
            }

            ctx.restore();
        });

        return thumbCanvas.toDataURL('image/jpeg', 0.6);
    } catch (err) {
        console.error('Thumbnail generation failed:', err);
        return null;
    }
}

// ================= IMAGE CACHE (for thumbnails) =================
const imageCache = {};
function cacheImage(src) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { imageCache[src] = img; };
    img.src = src;
}

// ================= AUTO-SAVE TRIGGERS =================
// Save draft on these actions:
let autoSaveTimeout;

function scheduleAutoSave() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        saveDraft(true);
        console.log('💾 Auto-saved draft');
    }, 2000); // 2 sec after last change
}

// Hook into existing actions
const _originalAddImage = addImage;
addImage = function(src) {
    _originalAddImage(src);
    cacheImage(src);
    scheduleAutoSave();
};

const _originalAddShape = addShape;
addShape = function(type) {
    _originalAddShape(type);
    scheduleAutoSave();
};

const _originalDeleteSelected = deleteBtn.click;
// Auto-save when element is deleted
document.addEventListener('click', (e) => {
    if (e.target.closest('#delete-btn') || e.target.closest('#clear-btn')) {
        setTimeout(scheduleAutoSave, 300);
    }
});

// Auto-save on drag/resize end
const _originalEndDrag = endDrag;
endDrag = function() {
    _originalEndDrag();
    scheduleAutoSave();
};

const _originalEndResize = endResize;
endResize = function() {
    _originalEndResize();
    scheduleAutoSave();
};

// Save when user clicks "Export" (definite save)
const _originalExportClick = exportBtn.onclick;
exportBtn.addEventListener('click', () => {
    setTimeout(() => {
        saveDraft(false); // Force new draft
    }, 100);
}, true);

// Save when user leaves the page
window.addEventListener('beforeunload', () => {
    if (canvas.querySelectorAll('.canvas-el').length > 0) {
        saveDraft(true);
    }
});

// Manual save button (if user adds one)
const saveDraftBtn = document.getElementById('save-draft-btn');
if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', () => {
        const draft = saveDraft(false);
        if (draft) {
            showToast('💾 Draft saved!');
        }
    });
}

// ================= LOAD DRAFT (when opening from dashboard) =================
function loadDraftFromStorage() {
    const draftId = localStorage.getItem('openDraftId');
    if (!draftId) return;

    // Clear the flag
    localStorage.removeItem('openDraftId');

    // Find the draft
    const drafts = JSON.parse(localStorage.getItem('yucutDrafts')) || [];
    const draft = drafts.find(d => d.id === draftId);
    if (!draft) return;

    // Load elements
    emptyHint.style.display = 'none';

    // Wait for canvas to be ready
    setTimeout(() => {
        draft.elements.forEach(item => {
            restoreElement(item);
        });
        console.log(`✅ Loaded draft with ${draft.elements.length} elements`);
        showToast(`📂 Loaded ${draft.elements.length} items from draft`);
    }, 500);
}

function restoreElement(item) {
    const el = document.createElement('div');
    el.className = 'canvas-el';
    el.dataset.id = item.id;
    el.dataset.kind = item.kind;
    if (item.type) el.dataset.type = item.type;
    el.dataset.rotation = item.rotation || 0;
    el.dataset.flipH = item.flipH || '1';
    el.dataset.flipV = item.flipV || '1';
    if (item.naturalW) el.dataset.naturalW = item.naturalW;
    if (item.naturalH) el.dataset.naturalH = item.naturalH;

    // Apply styles
    el.style.position = 'absolute';
    el.style.left = item.left || '0px';
    el.style.top = item.top || '0px';
    el.style.width = item.width || '100px';
    el.style.height = item.height || '100px';
    if (item.background) el.style.background = item.background;
    if (item.backgroundImage) el.style.backgroundImage = item.backgroundImage;
    if (item.backgroundImage) {
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
    }
    if (item.borderColor) el.style.borderColor = item.borderColor;
    if (item.borderRadius) el.style.borderRadius = item.borderRadius;
    if (item.borderWidth) el.style.borderWidth = item.borderWidth;
    if (item.borderStyle) el.style.borderStyle = item.borderStyle;
    if (item.clipPath) el.style.clipPath = item.clipPath;
    if (item.opacity) el.style.opacity = item.opacity;
    if (item.transform) el.style.transform = item.transform;
    if (item.filter) el.style.filter = item.filter;
    if (item.boxShadow) el.style.boxShadow = item.boxShadow;

    // Text specific
    if (item.kind === 'text') {
        el.classList.add('text-el');
        el.textContent = item.text || '';
        if (item.fontFamily) el.style.fontFamily = item.fontFamily;
        if (item.fontSize) el.style.fontSize = item.fontSize;
        if (item.fontWeight) el.style.fontWeight = item.fontWeight;
        if (item.color) el.style.color = item.color;
        if (item.textAlign) el.style.textAlign = item.textAlign;
        if (item.letterSpacing) el.style.letterSpacing = item.letterSpacing;
        if (item.lineHeight) el.style.lineHeight = item.lineHeight;
        if (item.textDecoration) el.style.textDecoration = item.textDecoration;
        if (item.textTransform) el.style.textTransform = item.textTransform;
        if (item.textShadow) el.style.textShadow = item.textShadow;
        if (item.webkitTextStroke) el.style.webkitTextStroke = item.webkitTextStroke;
        if (item.dir) el.dir = item.dir;
    }

    if (item.kind === 'image') el.classList.add('image-el');
    if (item.kind === 'shape') el.classList.add('shape-el');

    addHandle(el);
    bindEvents(el);
    canvas.appendChild(el);
}

// Auto-load draft on page load
window.addEventListener('load', () => {
    setTimeout(loadDraftFromStorage, 600);
});

// ================= UPDATE COUNTER =================
setTimeout(() => {
    // Ensure counter starts after existing elements
    const existing = canvas.querySelectorAll('.canvas-el');
    let maxId = 0;
    existing.forEach(el => {
        const id = parseInt(el.dataset.id);
        if (id > maxId) maxId = id;
    });
    counter = maxId + 1;
}, 1000);

console.log('✅ Draft auto-save system loaded');