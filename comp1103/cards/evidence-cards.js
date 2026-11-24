/**
 * UX RESCUE LAB — REUSABLE EVIDENCE CARD DECK
 * Swap out the EVIDENCE_CARDS array to reuse this deck for any scenario or week.
 */

const EVIDENCE_CARDS = [
  {
    id: "EC-01",
    source: "Server Analytics Log (Past 90 Days)",
    date: "Auto-Export // Web Analytics",
    statement: "4,120 unique visitors loaded register-step2.html. Only 618 reached register-complete.html. Average time spent on step2 before exiting: 4 minutes, 12 seconds.",
    userPerspective: "Residents are not bouncing immediately—they are investing over four minutes trying to complete the enrolment form before giving up in frustration.",
    auditPrompt: "What does this tell you about WHERE the problem happens vs. WHY it happens?"
  },
  {
    id: "EC-02",
    source: "Director of Marketing (Internal Email)",
    date: "Sent: Monday 09:14 AM",
    statement: "Residents are leaving because the site doesn't have a live social chat feed or dark mode. Young people expect social features on every site.",
    userPerspective: "No residents were consulted for this email. It assumes visitors want a social network rather than a fast, stress-free way to book a local class.",
    auditPrompt: "Is this verified user evidence or an untested stakeholder opinion?"
  },
  {
    id: "EC-03",
    source: "Central Library Helpdesk Incident Log",
    date: "Compiled: Week 1–4 Front Desk",
    statement: "Observed 14 older residents this week click the bright green 'Apply Filter / Register Interest' button thinking it would enrol them in a class. Nothing changed on screen.",
    userPerspective: "Residents looking for a clear 'Register' button naturally gravitated to the only bright green control on the page—then assumed the site was frozen and walked to the library for help.",
    auditPrompt: "Which side of the Execution/Evaluation Cycle broke down here?"
  },
  {
    id: "EC-04",
    source: "IT Contractor Handover Note",
    date: "System Launch Documentation v0.94",
    statement: "All 42 community programs are listed alphabetically in a single dropdown menu on the registration form so users only have to interact with one control.",
    userPerspective: "A resident who just wants a 'beginner weekend class' has to scan all 42 ungrouped titles from 'Acoustic Guitar' to 'Ukulele' inside a tiny scrolling menu.",
    auditPrompt: "How does this design choice conflict with Miller's Law and Hick's Law?"
  },
  {
    id: "EC-05",
    source: "Resident Support Ticket #409",
    date: "Submitted via Phone Callback",
    statement: "I filled out all 19 boxes to sign my son up for Saturday soccer during my lunch break, clicked Submit, and the page just refreshed blank. Did he get in or not?!",
    userPerspective: "A time-poor parent invested significant effort completing a long form, only to be left anxious and uncertain whether their child has a spot.",
    auditPrompt: "How does this failure affect the user's memory of the service (Peak-End Rule)?"
  },
  {
    id: "EC-06",
    source: "Deputy Mayor (Committee Meeting Quote)",
    date: "Minutes: Community Services Board",
    statement: "Nobody over 65 uses smartphones for council services anyway; they only use desktop computers at home with a mouse.",
    userPerspective: "Designing exclusively for desktop mice ignores residents who rely on phones or tablets—potentially locking out a huge portion of the community.",
    auditPrompt: "Does another card in this deck confirm or refute this claim?"
  },
  {
    id: "EC-07",
    source: "Server Device & Viewport Breakdown",
    date: "Auto-Export // Past 90 Days",
    statement: "58% of traffic to Community Connect arrives via mid-range Android mobile browsers (screen width under 412px), frequently over 4G mobile connections.",
    userPerspective: "More than half of all residents are trying to read tiny desktop-width text and tap crowded 11px links on a narrow phone screen while on the go.",
    auditPrompt: "How should this quantitative fact shape your PACT 'Technologies' pillar?"
  },
  {
    id: "EC-08",
    source: "Front-Desk Staff Member (Casual Chat)",
    date: "Staff Tea Room // Informal Note",
    statement: "I think people give up because the council logo at the top of the page is too small and the blue colour feels a bit cold.",
    userPerspective: "While visual warmth matters, no resident has reported abandoning a registration because of the logo size.",
    auditPrompt: "Would fixing the logo colour solve the 64% registration drop-off?"
  },
  {
    id: "EC-09",
    source: "Usability Clip #02 (Screen Recording)",
    date: "Pilot Observation // Library Kiosk",
    statement: "Participant typed '(08) 8200 1234' into the Phone field. The form wiped the box and displayed red text: 'ERROR: INT_8_CHAR_ONLY'. Participant sighed and closed the tab.",
    userPerspective: "The resident entered a completely normal Australian phone number, was punished with cryptic developer jargon, had their work erased, and felt blamed by the computer.",
    auditPrompt: "How would applying Postel's Law prevent this user from abandoning the task?"
  },
  {
    id: "EC-10",
    source: "Community Pop-Up Survey (n = 3)",
    date: "Triggered on Confirmation Page Only",
    statement: "2 out of 3 respondents who completed our voluntary pop-up survey rated the website 'Easy to use'.",
    userPerspective: "Because the survey only appeared AFTER someone successfully finished the 19-field form, the 85% of residents who gave up in frustration were never asked.",
    auditPrompt: "Why is this sample size and survey placement unreliable?"
  },
  {
    id: "EC-11",
    source: "Program Coordinator Note",
    date: "Parks & Recreation Team",
    statement: "To register for a free Saturday park yoga session, the current form requires a 10-digit Medicare Number, IRN, Emergency Street Address, and Council Ward Code.",
    userPerspective: "Residents signing up for a casual, free outdoor class feel uncomfortable handing over sensitive medical IDs and hunting down council codes they don't know.",
    auditPrompt: "Which fields are genuinely needed for the user's goal vs. unnecessary friction?"
  },
  {
    id: "EC-12",
    source: "Anonymous Library Suggestion Box",
    date: "Handwritten Slip // Last Month",
    statement: "It would be nice if the website could automatically recommend new hobbies based on my personality.",
    userPerspective: "One resident shared a fun blue-sky idea, but it does not address why hundreds of residents currently cannot register for programs they already want.",
    auditPrompt: "Should a single outlier wish drive your core Phase 1 redesign?"
  }
];

// Deck State
let deck = [...EVIDENCE_CARDS];
let drawnCards = [];
let activeCardId = null;

// DOM References
const deckStackEl = document.getElementById("deck-stack");
const cardStageEl = document.getElementById("card-stage");
const drawnTrayEl = document.getElementById("drawn-tray");
const remainingCountEl = document.getElementById("remaining-count");
const drawnCountEl = document.getElementById("drawn-count");
const btnDraw = document.getElementById("btn-draw");
const btnShuffle = document.getElementById("btn-shuffle");
const btnReset = document.getElementById("btn-reset");

/**
 * Reusable Index Card Renderer
 */
function renderIndexCard(card) {
  return `
    <article class="index-card" aria-label="Evidence Card ${card.id}">
      <header class="index-card-header">
        <div class="card-meta-block">
          <div class="card-source">${card.source}</div>
          <div class="card-date">${card.date}</div>
        </div>
        <div class="card-id-stamp">${card.id}</div>
      </header>

      <div class="index-card-body">
        <div class="card-section">
          <span class="card-section-label">Recorded Statement / Data</span>
          <blockquote class="card-quote">"${card.statement}"</blockquote>
        </div>

        <div class="card-section">
          <span class="card-section-label">User Perspective &amp; Context</span>
          <p class="card-perspective">${card.userPerspective}</p>
        </div>
      </div>

      <footer class="index-card-footer">
        <div class="audit-prompt">
          <strong>Audit Question:</strong> ${card.auditPrompt}
        </div>
        <span>Log in <code>00-evidence-register.md</code></span>
      </footer>
    </article>
  `;
}

function updateUI() {
  remainingCountEl.textContent = deck.length;
  drawnCountEl.textContent = drawnCards.length;

  const isEmpty = deck.length === 0;
  btnDraw.disabled = isEmpty;
  btnShuffle.disabled = deck.length <= 1;
  deckStackEl.classList.toggle("is-empty", isEmpty);

  // Render Drawn Case File Tray
  drawnTrayEl.innerHTML = drawnCards
    .map(
      (card) => `
      <button
        type="button"
        class="tray-chip ${card.id === activeCardId ? "is-active" : ""}"
        data-id="${card.id}"
      >
        <span class="tray-chip-id">${card.id}</span>
        <span class="tray-chip-src">${card.source}</span>
      </button>
    `
    )
    .join("");
}

function showCard(card) {
  activeCardId = card.id;
  cardStageEl.innerHTML = renderIndexCard(card);
  updateUI();
}

function drawNextCard() {
  if (deck.length === 0) return;
  const nextCard = deck.shift();
  drawnCards.push(nextCard);
  showCard(nextCard);
}

function shuffleRemainingDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  // Subtle visual feedback on the deck
  deckStackEl.style.transform = "scale(0.96)";
  setTimeout(() => {
    deckStackEl.style.transform = "";
  }, 140);
}

function resetDeck() {
  deck = [...EVIDENCE_CARDS];
  drawnCards = [];
  activeCardId = null;
  cardStageEl.innerHTML = `
    <div class="empty-stage-prompt">
      <p><strong>Deck reset.</strong></p>
      <p>Click the deck on the left (or press <em>Draw Next Card</em>) to begin auditing the evidence.</p>
    </div>
  `;
  updateUI();
}

// Event Listeners
btnDraw.addEventListener("click", drawNextCard);
deckStackEl.addEventListener("click", drawNextCard);
deckStackEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    drawNextCard();
  }
});

btnShuffle.addEventListener("click", shuffleRemainingDeck);
btnReset.addEventListener("click", resetDeck);

drawnTrayEl.addEventListener("click", (e) => {
  const chip = e.target.closest(".tray-chip");
  if (!chip) return;
  const found = drawnCards.find((c) => c.id === chip.dataset.id);
  if (found) showCard(found);
});

// Initial render
updateUI();
