(function () {
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    const DPR = window.devicePixelRatio || 1;
    canvas.width = 900 * DPR;
    canvas.height = 600 * DPR;
    canvas.style.width = '900px';
    canvas.style.height = '600px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const runBtn = document.getElementById('runBtn');
    const resetBtn = document.getElementById('resetBtn');

    let running = false;

    function clear() {
        ctx.clearRect(0, 0, 900, 600);
        ctx.save();
        ctx.fillStyle = '#ffdfe8';
        ctx.fillRect(18, 18, 900 - 36, 600 - 36);
        ctx.restore();
    }

    function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

    function drawBackgroundFlowers(progress) {
        const cols = 6, rows = 3;
        const spacingX = (900 - 120) / cols;
        const spacingY = (600 - 160) / rows;
        const baseX = 60; const baseY = 80;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const idx = r * cols + c;
                const revealT = (idx + 1) / (cols * rows);
                if (progress < revealT) continue;
                const cx = baseX + c * spacingX + Math.sin((r + c) / 2) * 6;
                const cy = baseY + r * spacingY + Math.cos((r + c) / 3) * 6;
                drawLotus(cx, cy, 24 + (r % 2) * 4, '#ff99d3', '#ff6fa8');
            }
        }
    }

    function drawLotus(cx, cy, r, petalColor, centerColor) {
        for (let i = 0; i < 6; i++) {
            const a = i * (Math.PI * 2) / 6 - Math.PI / 2;
            ctx.beginPath();
            ctx.ellipse(cx + Math.cos(a) * 6, cy + Math.sin(a) * 2, r * 0.6, r, a, 0, Math.PI * 2);
            ctx.fillStyle = petalColor;
            ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = centerColor;
        ctx.fill();
    }

    function facePathKrishna() {
        const p = new Path2D();
        p.moveTo(420, 160);
        p.bezierCurveTo(380, 180, 370, 260, 400, 320);
        p.bezierCurveTo(435, 370, 485, 380, 520, 350);
        p.bezierCurveTo(520, 300, 500, 220, 420, 160);
        return p;
    }
    function facePathRadha() {
        const p = new Path2D();
        p.moveTo(520, 170);
        p.bezierCurveTo(560, 185, 610, 235, 610, 295);
        p.bezierCurveTo(610, 340, 570, 380, 520, 370);
        p.bezierCurveTo(480, 330, 495, 220, 520, 170);
        return p;
    }

    function drawFaceFill(path, fillStyle) {
        ctx.save();
        ctx.fillStyle = fillStyle;
        ctx.fill(path);
        ctx.restore();
    }

    function drawEyes() {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(450, 230, 20, 10, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.ellipse(452, 232, 6, 6, 0, 0, Math.PI * 2); ctx.fillStyle = '#000'; ctx.fill();
        ctx.beginPath(); ctx.ellipse(562, 245, 18, 9, 0, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.ellipse(565, 247, 6, 6, 0, 0, Math.PI * 2); ctx.fillStyle = '#000'; ctx.fill();
        ctx.restore();
    }

    function drawMouths() {
        ctx.save();
        ctx.beginPath(); ctx.moveTo(445, 275); ctx.quadraticCurveTo(455, 285, 470, 280); ctx.strokeStyle = '#7f3f98'; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(545, 300); ctx.quadraticCurveTo(560, 315, 580, 308); ctx.stroke();
        ctx.restore();
    }

    function drawShawl() {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(420, 320);
        ctx.bezierCurveTo(480, 360, 560, 360, 640, 320);
        ctx.lineTo(640, 390);
        ctx.bezierCurveTo(560, 420, 480, 420, 420, 390);
        ctx.closePath();
        ctx.fillStyle = '#6dd3f2'; ctx.fill();
        for (let x = 440; x < 620; x += 18) for (let y = 338; y < 380; y += 18) {
            ctx.beginPath(); ctx.arc(x + Math.sin(x / 10) * 3, y + Math.cos(y / 10) * 3, 2, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
        }
        ctx.restore();
    }

    function drawDecorativeBorder() {
        ctx.save();
        ctx.lineWidth = 6; ctx.strokeStyle = '#f6b8c8';
        ctx.strokeRect(24, 24, 900 - 48, 600 - 48);
        for (let i = 0; i < 30; i++) {
            const x = 30 + i * ((900 - 60) / 30);
            ctx.beginPath(); ctx.arc(x, 600 - 24, 8, Math.PI, Math.PI * 2); ctx.fillStyle = '#fff2f8'; ctx.fill();
        }
        ctx.restore();
    }

    function drawPeacockFeather() {
        // green feather on Krishna's head
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(435, 145, 20, 40, Math.PI / 6, 0, Math.PI * 2);
        ctx.fillStyle = '#228b22';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(435, 140, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#006400';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(435, 140, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#1e90ff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(435, 140, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.restore();
    }

    async function stepBackground() {
        for (let t = 0; t <= 1; t += 0.03) {
            clear();
            drawBackgroundFlowers(t);
            drawDecorativeBorder();
            await wait(160);
        }
    }

    async function stepFaces() {
        const pK = facePathKrishna();
        const pR = facePathRadha();
        ctx.save();
        ctx.lineWidth = 4; ctx.strokeStyle = '#333';
        for (let dash = 1500; dash >= 0; dash -= 20) {
            clear(); drawBackgroundFlowers(1);
            ctx.setLineDash([dash, 1500]);
            ctx.stroke(pK);
            drawDecorativeBorder();
            await wait(80);
        }
        drawFaceFill(pK, '#1f97d1');
        for (let dash = 1500; dash >= 0; dash -= 20) {
            clear(); drawBackgroundFlowers(1);
            drawFaceFill(pK, '#1f97d1');
            ctx.setLineDash([dash, 1500]);
            ctx.stroke(pR);
            drawDecorativeBorder();
            await wait(80);
        }
        drawFaceFill(pR, '#ffcc4d');
        ctx.setLineDash([]);
        ctx.restore();
    }

    async function stepDetails() {
        for (let i = 0; i <= 1; i += 0.03) {
            clear(); drawBackgroundFlowers(1);
            drawFaceFill(facePathKrishna(), '#1f97d1');
            drawFaceFill(facePathRadha(), '#ffcc4d');
            ctx.save(); ctx.globalAlpha = i; drawShawl(); ctx.restore();
            drawDecorativeBorder();
            await wait(140);
        }
        drawEyes(); drawMouths();
        drawPeacockFeather();
        ctx.save();
        ctx.fillStyle = '#ffd700';
        ctx.beginPath(); ctx.arc(495, 195, 6, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(508, 210, 4, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        for (let k = 0; k < 80; k++) {
            const x = 80 + Math.random() * 740;
            const y = 80 + Math.random() * 420;
            ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fillStyle = (Math.random() > 0.6 ? '#fff' : '#ffd6e8'); ctx.fill();
            await wait(30);
        }
    }

    async function runPainting() {
        if (running) return; running = true;
        runBtn.disabled = true;
        resetBtn.disabled = true;
        try {
            await stepBackground();
            await stepFaces();
            await stepDetails();
        } catch (e) { console.error(e) }
        runBtn.disabled = false; resetBtn.disabled = false; running = false;
    }

    runBtn.addEventListener('click', () => { runPainting(); });
    resetBtn.addEventListener('click', () => { running = false; runBtn.disabled = false; resetBtn.disabled = false; clear(); });

    clear(); drawDecorativeBorder();
})();
