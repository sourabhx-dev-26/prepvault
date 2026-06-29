<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DEMO Reservations</title>
  <style>
    :root {
      --bg: #020306;
      --glass: rgba(255, 255, 255, 0.07);
      --glass-strong: rgba(255, 255, 255, 0.12);
      --border: rgba(255, 255, 255, 0.13);
      --gold: #d6b25e;
      --gold2: #f8dc8f;
      --cyan: #4de7ff;
      --green: #52ff9f;
      --red: #ff5477;
      --text: #fff8e7;
      --muted: rgba(255, 248, 231, 0.62);
      --muted2: rgba(255, 248, 231, 0.38);
      --radius: 30px;
    }* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #020306;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 18% 12%, rgba(214,178,94,0.28), transparent 28%),
    radial-gradient(circle at 88% 18%, rgba(77,231,255,0.17), transparent 26%),
    radial-gradient(circle at 50% 95%, rgba(214,178,94,0.14), transparent 38%),
    linear-gradient(135deg, #020306, #090b14 50%, #020203);
  z-index: -5;
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,0.78), transparent 78%);
  z-index: -4;
  animation: gridFlow 18s linear infinite;
}

@keyframes gridFlow {
  from { transform: translateY(0); }
  to { transform: translateY(44px); }
}

.orb {
  position: fixed;
  width: 280px;
  height: 280px;
  border-radius: 999px;
  filter: blur(65px);
  opacity: 0.38;
  z-index: -3;
  animation: floatOrb 9s ease-in-out infinite alternate;
}

.orb.one {
  background: var(--gold);
  left: -110px;
  top: 12%;
}

.orb.two {
  background: var(--cyan);
  right: -130px;
  top: 42%;
  animation-delay: -3s;
}

.orb.three {
  background: #9e6f28;
  left: 35%;
  bottom: -160px;
  animation-delay: -6s;
}

@keyframes floatOrb {
  from { transform: translate3d(0,0,0) scale(1); }
  to { transform: translate3d(24px,-38px,0) scale(1.14); }
}

.noise {
  position: fixed;
  inset: 0;
  opacity: 0.12;
  pointer-events: none;
  z-index: -2;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E");
}

.app {
  width: min(100%, 540px);
  margin: 0 auto;
  padding: 18px 14px 40px;
  min-height: 100vh;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 22px;
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 10px 0;
  backdrop-filter: blur(18px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 48px;
  height: 48px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: #050505;
  font-weight: 1000;
  background: linear-gradient(135deg, var(--gold2), var(--gold), #9e6f28);
  box-shadow: 0 0 36px rgba(214,178,94,0.32);
  position: relative;
  overflow: hidden;
}

.logo::after {
  content: "";
  position: absolute;
  inset: -70%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
  transform: rotate(35deg);
  animation: shine 3.4s infinite;
}

@keyframes shine {
  0%, 35% { transform: translateX(-90%) rotate(35deg); }
  70%, 100% { transform: translateX(90%) rotate(35deg); }
}

.eyebrow {
  color: var(--gold2);
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.82;
}

h1 {
  font-size: 18px;
  letter-spacing: -0.04em;
  line-height: 1.1;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid rgba(82,255,159,0.25);
  background: rgba(82,255,159,0.08);
  color: #b9ffd8;
  border-radius: 999px;
  padding: 9px 12px;
  font-size: 11px;
  font-weight: 900;
  white-space: nowrap;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--green);
  box-shadow: 0 0 18px var(--green);
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(0.9); opacity: 0.45; }
  50% { transform: scale(1.25); opacity: 1; }
}

.glass {
  border: 1px solid var(--border);
  background: linear-gradient(145deg, rgba(255,255,255,0.105), rgba(255,255,255,0.035));
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 28px 90px rgba(0,0,0,0.52);
  border-radius: var(--radius);
  position: relative;
  overflow: hidden;
}

.glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(248,220,143,0.55), rgba(77,231,255,0.22), transparent 55%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.hero {
  padding: 24px 20px;
  animation: rise 0.7s ease both;
}

@keyframes rise {
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.hero-title {
  margin-top: 14px;
  font-size: 50px;
  line-height: 0.86;
  letter-spacing: -0.09em;
  font-weight: 1000;
}

.gold {
  color: var(--gold);
  text-shadow: 0 0 38px rgba(214,178,94,0.38);
}

.hero p {
  margin-top: 17px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.65;
}

.scanner {
  height: 1px;
  margin: 22px 0;
  background: linear-gradient(90deg, transparent, rgba(248,220,143,0.8), rgba(77,231,255,0.65), transparent);
  animation: scanner 2.4s infinite;
}

@keyframes scanner {
  0%, 100% { opacity: 0.28; transform: scaleX(0.65); }
  50% { opacity: 1; transform: scaleX(1); }
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat {
  padding: 15px;
  border-radius: 22px;
  background: rgba(255,255,255,0.055);
  border: 1px solid rgba(255,255,255,0.1);
}

.stat strong {
  font-size: 22px;
  color: var(--gold2);
  display: block;
  letter-spacing: -0.04em;
}

.stat span {
  color: var(--muted2);
  font-size: 11px;
  display: block;
  margin-top: 6px;
  line-height: 1.35;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.section {
  margin-top: 18px;
  animation: rise 0.8s ease both;
}

.section-head {
  margin: 25px 0 12px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
}

.section-head h2 {
  font-size: 24px;
  letter-spacing: -0.05em;
  line-height: 1;
}

.section-head p {
  color: var(--muted2);
  font-size: 12px;
  margin-top: 5px;
}

.mode-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 8px;
  border-radius: 26px;
}

.mode-btn {
  border: 0;
  border-radius: 20px;
  padding: 14px 10px;
  color: rgba(255,255,255,0.54);
  background: transparent;
  font-weight: 1000;
  cursor: pointer;
  transition: 0.28s ease;
}

.mode-btn.active {
  color: #050505;
  background: linear-gradient(135deg, var(--gold2), var(--gold), #9e6f28);
  box-shadow: 0 0 35px rgba(214,178,94,0.22);
}

.visual-card {
  padding: 18px;
  margin-top: 14px;
  min-height: 220px;
}

.table-visual {
  width: 185px;
  height: 185px;
  margin: 16px auto 6px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle, rgba(248,220,143,0.25), transparent 43%),
    conic-gradient(from 90deg, rgba(214,178,94,0.14), rgba(77,231,255,0.18), rgba(214,178,94,0.14));
  border: 1px solid rgba(248,220,143,0.25);
  position: relative;
  animation: rotateGlow 8s linear infinite;
}

@keyframes rotateGlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.table-visual::before {
  content: "";
  width: 98px;
  height: 98px;
  border-radius: 999px;
  background: linear-gradient(145deg, rgba(255,255,255,0.13), rgba(255,255,255,0.04));
  border: 1px solid rgba(255,255,255,0.16);
  box-shadow: inset 0 0 28px rgba(0,0,0,0.35);
}

.seat {
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: var(--gold2);
  box-shadow: 0 0 20px rgba(248,220,143,0.55);
  position: absolute;
}

.s1 { top: 8px; left: 82px; }
.s2 { right: 17px; top: 48px; }
.s3 { right: 17px; bottom: 48px; }
.s4 { bottom: 8px; left: 82px; }
.s5 { left: 17px; bottom: 48px; }
.s6 { left: 17px; top: 48px; }

.form {
  padding: 18px;
}

.form-grid {
  display: grid;
  gap: 12px;
  margin-top: 14px;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.065);
  color: var(--text);
  border-radius: 20px;
  padding: 16px;
  outline: none;
  font-size: 15px;
}

input::placeholder,
textarea::placeholder {
  color: rgba(255,255,255,0.35);
}

select option {
  background: #080a10;
  color: white;
}

.row {
  display: grid;
  grid-template-columns: 1fr 110px;
  gap: 10px;
}

.amount-card {
  margin-top: 14px;
  padding: 16px;
  border-radius: 24px;
  background: rgba(214,178,94,0.1);
  border: 1px solid rgba(214,178,94,0.22);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
}

.amount-card span {
  color: var(--muted2);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 900;
}

.amount-card strong {
  display: block;
  margin-top: 4px;
  color: var(--gold2);
  font-size: 26px;
  letter-spacing: -0.05em;
}

.chip {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  padding: 8px 11px;
  font-size: 11px;
  font-weight: 900;
  white-space: nowrap;
}

.chip.gold {
  color: var(--gold2);
  background: rgba(214,178,94,0.09);
  border-color: rgba(214,178,94,0.28);
}

.chip.cyan {
  color: #aef7ff;
  background: rgba(77,231,255,0.09);
  border-color: rgba(77,231,255,0.25);
}

.btn {
  width: 100%;
  border: 0;
  border-radius: 22px;
  padding: 17px;
  margin-top: 14px;
  background: linear-gradient(135deg, var(--gold2), var(--gold), #9e6f28);
  color: #050505;
  font-weight: 1000;
  font-size: 15px;
  box-shadow: 0 20px 70px rgba(214,178,94,0.27);
  cursor: pointer;
  transition: 0.22s ease;
}

.btn:active {
  transform: scale(0.98);
}

.features {
  display: grid;
  gap: 12px;
  margin-top: 14px;
}

.feature {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 13px;
}

.icon {
  width: 43px;
  height: 43px;
  border-radius: 17px;
  display: grid;
  place-items: center;
  background: rgba(214,178,94,0.12);
  border: 1px solid rgba(214,178,94,0.18);
  flex: 0 0 auto;
}

.feature strong {
  display: block;
  font-size: 15px;
}

.feature p {
  color: var(--muted2);
  font-size: 12px;
  line-height: 1.45;
  margin-top: 4px;
}

.hidden {
  display: none;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%) translateY(140%);
  width: min(calc(100% - 28px), 500px);
  padding: 16px;
  border-radius: 22px;
  border: 1px solid rgba(82,255,159,0.25);
  background: rgba(6, 16, 13, 0.86);
  color: #caffde;
  backdrop-filter: blur(20px);
  z-index: 50;
  box-shadow: 0 24px 80px rgba(0,0,0,0.45);
  transition: 0.35s ease;
  font-weight: 800;
  font-size: 14px;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
}

@media (max-width: 360px) {
  .hero-title {
    font-size: 42px;
  }

  .hero-grid,
  .row {
    grid-template-columns: 1fr;
  }
}

  </style>
</head><body>
  <div class="orb one"></div>
  <div class="orb two"></div>
  <div class="orb three"></div>
  <div class="noise"></div>  <main class="app">
    <header class="topbar">
      <div class="brand">
        <div class="logo">D</div>
        <div>
          <div class="eyebrow">DEMO</div>
          <h1>Reservations</h1>
        </div>
      </div>
      <div class="pill"><span class="dot"></span> LIVE BOOKING</div>
    </header><section class="hero glass">
  <div class="eyebrow">Luxury Restaurant Booking OS</div>
  <div class="hero-title">
    Reserve<br />
    <span class="gold">The Moment.</span>
  </div>
  <p>
    A futuristic reservation experience for premium table bookings, banquet events,
    private rooms and luxury dining requests.
  </p>

  <div class="scanner"></div>

  <div class="hero-grid">
    <div class="stat">
      <strong>₹299</strong>
      <span>Table Advance</span>
    </div>
    <div class="stat">
      <strong>₹1,999</strong>
      <span>Hall Advance</span>
    </div>
    <div class="stat">
      <strong>Live</strong>
      <span>Reception Sync</span>
    </div>
    <div class="stat">
      <strong>VIP</strong>
      <span>Priority Request</span>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-head">
    <div>
      <h2>Choose Booking</h2>
      <p>Switch between table and event flow</p>
    </div>
    <span class="chip cyan">AI UI</span>
  </div>

  <div class="glass mode-switch">
    <button class="mode-btn active" id="tableBtn" onclick="setMode('table')">Table</button>
    <button class="mode-btn" id="hallBtn" onclick="setMode('hall')">Hall / Room</button>
  </div>

  <div class="glass visual-card">
    <div class="eyebrow" id="visualLabel">Royal Table Map</div>
    <div class="table-visual">
      <span class="seat s1"></span>
      <span class="seat s2"></span>
      <span class="seat s3"></span>
      <span class="seat s4"></span>
      <span class="seat s5"></span>
      <span class="seat s6"></span>
    </div>
    <p style="text-align:center; color:var(--muted); line-height:1.6; font-size:14px;" id="visualText">
      Smart table request with animated premium seating experience.
    </p>
  </div>
</section>

<section class="section">
  <div class="section-head">
    <div>
      <h2 id="formTitle">Royal Table Reservation</h2>
      <p>Fill details and preview payment flow</p>
    </div>
  </div>

  <form class="glass form" onsubmit="submitBooking(event)">
    <div class="form-grid">
      <input required type="text" placeholder="Customer Name" />
      <input required type="tel" placeholder="+91 Phone Number" />

      <div class="row">
        <input required type="date" />
        <input required type="time" />
      </div>

      <input required type="number" min="1" placeholder="Number of Guests" />

      <select id="eventType" class="hidden">
        <option value="">Select Event Type</option>
        <option>Birthday Party</option>
        <option>Family Function</option>
        <option>Corporate Dinner</option>
        <option>Engagement / Ring Ceremony</option>
        <option>Private Gathering</option>
      </select>

      <select id="spaceType" class="hidden">
        <option value="">Select Space Type</option>
        <option>Private Dining Room</option>
        <option>Banquet Hall</option>
        <option>Rooftop Setup</option>
        <option>Premium Lounge</option>
      </select>

      <textarea rows="3" placeholder="Special request: decoration, cake table, seating preference..."></textarea>
    </div>

    <div class="amount-card">
      <div>
        <span>Advance Amount</span>
        <strong id="amount">₹299</strong>
      </div>
      <span class="chip gold" id="statusText">Table Request</span>
    </div>

    <button class="btn" id="payBtn" type="submit">Pay ₹299 & Request Table</button>
  </form>
</section>

<section class="section">
  <div class="section-head">
    <div>
      <h2>Why It Feels Premium</h2>
      <p>Client-facing reservation experience</p>
    </div>
  </div>

  <div class="features">
    <div class="glass feature">
      <div class="icon">⚡</div>
      <div>
        <strong>High-tech animated booking</strong>
        <p>Moving background, scanner line, glowing cards and futuristic interface.</p>
      </div>
    </div>

    <div class="glass feature">
      <div class="icon">🏛️</div>
      <div>
        <strong>Table + banquet support</strong>
        <p>Single UI supports both normal table booking and event/hall booking.</p>
      </div>
    </div>

    <div class="glass feature">
      <div class="icon">✓</div>
      <div>
        <strong>Reception-ready flow</strong>
        <p>Later this request can connect directly with reception dashboard and payment status.</p>
      </div>
    </div>
  </div>
</section>

  </main>  <div class="toast" id="toast">Demo booking request created. Backend/payment will connect later.</div>  <script>
    let mode = "table";

    function setMode(nextMode) {
      mode = nextMode;

      const tableBtn = document.getElementById("tableBtn");
      const hallBtn = document.getElementById("hallBtn");
      const formTitle = document.getElementById("formTitle");
      const amount = document.getElementById("amount");
      const statusText = document.getElementById("statusText");
      const payBtn = document.getElementById("payBtn");
      const eventType = document.getElementById("eventType");
      const spaceType = document.getElementById("spaceType");
      const visualLabel = document.getElementById("visualLabel");
      const visualText = document.getElementById("visualText");

      tableBtn.classList.toggle("active", mode === "table");
      hallBtn.classList.toggle("active", mode === "hall");

      if (mode === "table") {
        formTitle.textContent = "Royal Table Reservation";
        amount.textContent = "₹299";
        statusText.textContent = "Table Request";
        payBtn.textContent = "Pay ₹299 & Request Table";
        eventType.classList.add("hidden");
        spaceType.classList.add("hidden");
        visualLabel.textContent = "Royal Table Map";
        visualText.textContent = "Smart table request with animated premium seating experience.";
      } else {
        formTitle.textContent = "Grand Hall / Event Booking";
        amount.textContent = "₹1,999";
        statusText.textContent = "Hall Request";
        payBtn.textContent = "Pay ₹1,999 & Request Hall";
        eventType.classList.remove("hidden");
        spaceType.classList.remove("hidden");
        visualLabel.textContent = "Private Event Zone";
        visualText.textContent = "Premium banquet, private room and event reservation experience.";
      }
    }

    function submitBooking(event) {
      event.preventDefault();

      const toast = document.getElementById("toast");
      toast.textContent =
        mode === "table"
          ? "Demo table request created. Payment/reception backend will connect later."
          : "Demo hall request created. Payment/reception backend will connect later.";

      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 2800);
    }
  </script></body>
</html>
