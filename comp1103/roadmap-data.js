/**
 * COMP1103 UX Fundamentals — Curriculum & Typed Concept Map Data
 * Three-assignment structure (A1, A2, A3; Week 12 non-assessed synthesis)
 * and 28 content-verified cross-module linkages across four typed layers.
 */

export const PHASES = [
  {
    id: 1,
    kicker: "Phase 1 · Weeks 1–5",
    title: "Discover, Define & Prototype",
    subtitle: "A1: Paper Prototypes and Design Documents"
  },
  {
    id: 2,
    kicker: "Phase 2 · Weeks 6–9",
    title: "Build the Interactive Web Stack",
    subtitle: "A2: Web Build Prototype"
  },
  {
    id: 3,
    kicker: "Phase 3 · Weeks 10–12",
    title: "Evaluate & Look Ahead",
    subtitle: "A3: Usability Evaluation Experiment & Report · W12 Synthesis"
  }
];

export const ASSIGNMENTS = {
  A1: "A1: Paper Prototypes and Design Documents",
  A2: "A2: Web Build Prototype",
  A3: "A3: Usability Evaluation Experiment and Report"
};

export const TLO_MAP = {
  TLO1: "Determine how human factor principles and system design affects usability",
  TLO2: "Implement user focused software solutions through the effective inclusion of users in the design and development process",
  TLO3: "Construct an evaluation procedure utilising the techniques of heuristic evaluations, usability testing and experimental evaluation",
  TLO4: "Reflect on ethical, legal and security issues related to web applications",
  TLO5: "Work independently and in a team on designing, creating and maintaining applications for the web",
  TLO6: "Communicate effectively to a diverse audience following professional practice standards"
};

export const LINK_TYPES = {
  handoff: { label: "Artefact Handoff", color: "#0D7A5F" },
  theory: { label: "Theory → Practice", color: "#CB9828" },
  spiral: { label: "Research & Eval Spiral", color: "#4F46E5" }
};

export const ETHICS_NOTES = {
  1: "TLO4 begins here: recognising ethical, legal, and inclusive responsibilities toward diverse users from day one.",
  2: "User research demands ethical observation, informed consent, privacy-safe notes, and unbiased questioning (TLO4).",
  3: "Evidence-backed Personas guard against stereotyping and exclusion by grounding design in real user data (TLO4).",
  9: "Back-end PHP and MySQL development requires defensive coding, sanitisation, and protection of stored user data.",
  11: "Recruiting live usability test participants requires ethical protocols, voluntary participation, and respectful reporting.",
  12: "Examines ethical, legal, and human-agency questions as AI tools reshape UX workflows (TLO4)."
};

export const MODULES = [
  {
    id: 1,
    phase: 1,
    title: "What is UX?",
    journeyCue: "UX foundations, Execution/Evaluation Cycle & GitHub setup",
    overview:
      "Introduces the multidisciplinary field of User Experience (UX) and why real user input drives effective software design. You will apply the Execution/Evaluation Cycle to everyday interactions, configure your GitHub & Markdown workflow, and explore Jakob's Law.",
    theory: {
      short: "Execution/Evaluation Cycle & UX Ecosystem",
      detail:
        "Maps how psychology, design, and software engineering intersect in UX. Norman's Execution/Evaluation Cycle explains how users form goals, act on an interface, and interpret system feedback."
    },
    practice: {
      short: "GitHub Setup & Markdown Documentation",
      detail:
        "Configure your core software development environment, initialise GitHub repositories, and adopt structured Markdown documentation that supports team collaboration all semester."
    },
    law: {
      name: "Jakob's Law",
      summary:
        "Users spend most of their time on other sites, so they prefer your site to work the same way as sites they already know.",
      theoryLink:
        "Shows how transferable mental models narrow the Gulf of Execution in the Execution/Evaluation Cycle—reducing cognitive effort on first visit.",
      practiceLink:
        "Guides predictable interface patterns (navigation placement, icons) and familiar engineering conventions (standard README.md and repo layouts)."
    },
    objectives: [
      "Appreciate the diversity of fields that work within a UX system",
      "Identify the importance of user input into the design of our software systems",
      "Apply the execution/evaluation cycle to interaction",
      "Review Jakob's Law and its application to existing systems",
      "Set up your development environment, including GitHub repositories"
    ],
    tlos: ["TLO1", "TLO4", "TLO5", "TLO6"],
    assessments: ["A1", "A2"]
  },
  {
    id: 2,
    phase: 1,
    title: "User Research: Collecting Data",
    journeyCue: "Surveys, interviews, observations & PACT analysis",
    overview:
      "Replaces designer assumptions with evidence. You will define user groups, plan and conduct observations, combine quantitative surveys with qualitative interviews, and compile your findings into a structured PACT analysis.",
    theory: {
      short: "Qualitative & Quantitative Research · PACT",
      detail:
        "Establishes user research as the iterative backbone of user-centred design, pairing measurable survey patterns with rich interview insights across People, Activities, Contexts, and Technologies (PACT)."
    },
    practice: {
      short: "User Research Plan & PACT Analysis",
      detail:
        "Design an ethical research process using surveys, interviews, and observation notes, then synthesise raw findings into a clear PACT document."
    },
    law: {
      name: "Miller's Law",
      summary:
        "The average person can keep only about 7 (± 2) items in working memory; grouping content into meaningful chunks makes complex information manageable.",
      theoryLink:
        "Explains why human memory limits require structured synthesis—PACT itself chunks chaotic real-world observation into four clear analytical pillars.",
      practiceLink:
        "Shapes both survey design (short grouped sections to prevent fatigue) and later page architecture (chunking navigation and forms into scannable blocks)."
    },
    objectives: [
      "Design a user research process using a suite of tools and techniques",
      "Discuss the implications of Miller's Law as it relates to the design of our software systems",
      "Compile your user research notes into a PACT analysis"
    ],
    tlos: ["TLO1", "TLO2", "TLO4", "TLO5", "TLO6"],
    assessments: ["A1"]
  },
  {
    id: 3,
    phase: 1,
    title: "Who is the User?",
    journeyCue: "Turning PACT insights into target Personas",
    overview:
      "Moves beyond the vague label of 'the user' to define the actual people using your system. Building directly from your PACT analysis, you will craft an evidence-backed Persona poster and apply Hick's Law.",
    theory: {
      short: "User Modelling & Persona Definition",
      detail:
        "Translates abstract research data into empathetic, concrete representations of target users—anchoring team decisions in real goals, constraints, and contexts."
    },
    practice: {
      short: "Visual Persona Poster Artefact",
      detail:
        "Distil your PACT research into a clear, consumable Persona poster that communicates target user needs and pain points to designers and developers alike."
    },
    law: {
      name: "Hick's Law",
      summary:
        "The time it takes to make a decision increases with the number and complexity of choices.",
      theoryLink:
        "Explains why designing for 'everyone' causes feature bloat and decision paralysis—focused Personas justify streamlining choices.",
      practiceLink:
        "Guides both concise Persona posters (highlighting decisive goals rather than clutter) and leaner interface menus prioritising core tasks."
    },
    objectives: [
      "Define the specific details of the target users",
      "Apply Hick's Law to the design process",
      "Create a Persona poster that captures these features into a consumable form"
    ],
    tlos: ["TLO1", "TLO2", "TLO4", "TLO5", "TLO6"],
    assessments: ["A1"]
  },
  {
    id: 4,
    phase: 1,
    title: "Paper Prototyping",
    journeyCue: "Wireframes, storyboards, sitemaps & user flows",
    overview:
      "Takes your first tangible design step using rapid, cost-effective paper sketching and UX mapping. You will create annotated wireframes, interactive storyboards, sitemaps, and user flows before writing code.",
    theory: {
      short: "Low-Fidelity Ideation & UX Mapping",
      detail:
        "Validates design hypotheses cheaply before engineering lock-in. Sitemaps define page hierarchy, Process Maps (User Flows) detail decision paths, and Journey Maps chart chronological actions and emotions."
    },
    practice: {
      short: "Annotated Wireframes, Storyboards & Sitemap",
      detail:
        "Sketch multi-page wireframes with developer annotations, build interactive prototype storyboards, compile a sitemap, and trace typical user flows."
    },
    law: {
      name: "Postel's Law",
      summary:
        "Be liberal in what you accept, and conservative in what you send.",
      theoryLink:
        "Frames forgiving human-computer interaction: users bring varied inputs and paths, so systems should tolerate messy input while returning clear, concise responses.",
      practiceLink:
        "Informs wireframe annotations and user flows—planning flexible input handling, alternative user paths, and unambiguous confirmation/error states."
    },
    objectives: [
      "Understand the influence of Postel's Law on UX design",
      "Draft a number of wireframes that represent separate pages of our site",
      "Draft prototype storyboards that show interactivity",
      "Compile a sitemap",
      "Define the user flow of a typical operation"
    ],
    tlos: ["TLO1", "TLO2", "TLO5", "TLO6"],
    assessments: ["A1"]
  },
  {
    id: 5,
    phase: 1,
    title: "Evaluating the Design",
    journeyCue: "GOMS/KLM timing, card sorting & heuristic audits",
    overview:
      "Validates your paper design before development begins. You will run predictive GOMS/KLM analyses, check navigation and choices with card sorting and preference testing, and conduct heuristic evaluations.",
    theory: {
      short: "GOMS/KLM Predictive Modelling & Heuristics",
      detail:
        "Combines analytical human-performance modelling (estimating expert task times with GOMS/KLM) with early user validation (card sorting, preference testing, and heuristic inspection)."
    },
    practice: {
      short: "Pre-Code Audit & A1 Design Refinement",
      detail:
        "Time key operations using KLM, run card sorting and preference checks on paper prototypes, and log heuristic improvements to finalise your Assessment 1 design package."
    },
    law: {
      name: "Peak-End Rule",
      summary:
        "People judge an experience largely by how they felt at its most intense moment (peak) and at its conclusion (end), rather than its overall average.",
      theoryLink:
        "Complements objective KLM efficiency metrics with affective psychology: a fast workflow still fails if its key moment or completion screen leaves users anxious.",
      practiceLink:
        "Directs heuristic audits and preference tests toward high-stakes peaks (critical form actions) and clear, reassuring completion states."
    },
    objectives: [
      "Consider the psychological influence of the Peak-End Rule",
      "Use the GOMS/KLM process to conduct a predictive analysis of the design",
      "Test user features through card sorting and preference testing",
      "Apply heuristic evaluation techniques on a paper prototype"
    ],
    tlos: ["TLO1", "TLO2", "TLO3", "TLO5", "TLO6"],
    assessments: ["A1"]
  },
  {
    id: 6,
    phase: 2,
    title: "Conceptualising Interaction & HTML",
    journeyCue: "Shneiderman's Golden Rules & static HTML structure",
    overview:
      "Transitions from validated design into working web code. You will study Shneiderman's Principles and Eight Golden Rules, examine the Aesthetic-Usability Effect, and build interconnected semantic HTML pages.",
    theory: {
      short: "Shneiderman's Principles & Eight Golden Rules",
      detail:
        "Examines foundational interaction guidelines—consistency, feedback, closure, error prevention, reversal, and low memory load—and how they evolved alongside web systems."
    },
    practice: {
      short: "Static, Interconnected HTML5 Website",
      detail:
        "Translate your validated sitemap and wireframes into clean, semantic HTML pages with logical headings, forms, and working multi-page navigation inside GitHub."
    },
    law: {
      name: "Aesthetic-Usability Effect",
      summary:
        "Users often perceive visually attractive designs as more usable, which can mask real functional flaws during testing.",
      theoryLink:
        "Warns designers that visual polish can hide violations of Shneiderman's Golden Rules until users hit real edge cases.",
      practiceLink:
        "Justifies building bare semantic HTML first—testing content order, labels, and navigation structure without CSS glamour concealing broken architecture."
    },
    objectives: [
      "Identify Shneiderman's Principles",
      "Apply the Golden Rules to our implementation of an interactive system",
      "Appreciate the iteration and evolution of the Principles",
      "Consider how the Aesthetic-Usability Effect may cause faults to be missed during testing",
      "Implement a basic web site with static, interconnected pages"
    ],
    tlos: ["TLO2", "TLO5"],
    assessments: ["A2"]
  },
  {
    id: 7,
    phase: 2,
    title: "Web Development: CSS",
    journeyCue: "External stylesheets, selectors, layout & Fitts' Law",
    overview:
      "Transforms your raw HTML structure into a clear, readable interface using Cascading Style Sheets (CSS). You will compare inline, internal, and external styling, master selectors and pseudo-classes, and refine layout using Fitts' Law.",
    theory: {
      short: "CSS Cascade, Selectors & Motor Ergonomics",
      detail:
        "Explores styling hierarchy (inline vs. internal vs. external), specificity, pseudo-classes, and how spatial layout directly governs human pointing speed and accuracy."
    },
    practice: {
      short: "External CSS Styling & Layout Refinement",
      detail:
        "Target specific HTML elements with maintainable external stylesheets, interactive pseudo-classes (:hover, :focus), and ergonomic spacing across your website."
    },
    law: {
      name: "Fitts' Law",
      summary:
        "The time required to reach a target depends on the distance to the target and the size of the target.",
      theoryLink:
        "Connects human motor psychology directly to interface geometry—explaining why small, cramped, or far-flung controls inflate interaction time and errors.",
      practiceLink:
        "Governs practical CSS decisions: comfortable button padding, generous click/tap targets, placing related actions near inputs, and crisp :hover/:focus visual hit areas."
    },
    objectives: [
      "Articulate the differences between inline, internal, and external styling",
      "Appreciate the benefit and hierarchy of different styling approaches",
      "Implement solutions that allow for direct targeting of page content with specific styling",
      "Observe how Fitts' Law dictates the layout and structure of our interfaces",
      "Modify the existing HTML structure with style"
    ],
    tlos: ["TLO2", "TLO5"],
    assessments: ["A2"]
  },
  {
    id: 8,
    phase: 2,
    title: "Web Development: JavaScript",
    journeyCue: "JS fundamentals, DOM manipulation & interactivity",
    overview:
      "Adds live client-side interactivity on top of your HTML structure and CSS styling. You will learn JavaScript data types, scope, functions, control flow, and the Document Object Model (DOM) alongside the Von Restorff Effect.",
    theory: {
      short: "JS Language Logic & the DOM API",
      detail:
        "Covers variables, types, scoping, selection, loops, functions, and how the DOM exposes an independent, consistent programmatic tree for modifying live page elements."
    },
    practice: {
      short: "Targeted Client-Side Interactivity",
      detail:
        "Write modular JavaScript attached to DOM events to add responsive interactive behaviours, live validation, and dynamic UI feedback to your website."
    },
    law: {
      name: "Von Restorff Effect",
      summary:
        "When multiple similar items appear together, the one that visibly differs from the rest is most likely to be noticed and remembered.",
      theoryLink:
        "Grounds perceptual salience in cognitive psychology—attention is drawn immediately to purposeful visual contrast and dynamic state changes.",
      practiceLink:
        "Guides DOM class toggles in JavaScript: isolating an active tab, spotlighting a single validation error, or drawing focus to one primary call-to-action."
    },
    objectives: [
      "Distinguish between the various data types and their scope",
      "Implement functions, selection, and looping structures",
      "Implement key client-side interactivity with JavaScript",
      "Appreciate the benefit of the DOM as an independent, consistent API for accessing the structure of the page",
      "Explore the psychological concepts associated with the Von Restorff Effect",
      "Add targeted interactivity to the existing website"
    ],
    tlos: ["TLO2", "TLO5"],
    assessments: ["A2"]
  },
  {
    id: 9,
    phase: 2,
    title: "Web Development: PHP",
    journeyCue: "Server-side PHP, MySQL database & Tesler's Law",
    overview:
      "Completes the full-stack web prototype by introducing server-side rendering and persistent database storage with PHP and MySQL—balancing security, back-end complexity, and front-end simplicity through Tesler's Law.",
    theory: {
      short: "Server-Side Logic, MySQL & Data Security",
      detail:
        "Explores PHP data structures and control flow, relational MySQL database connectivity, and defensive server-side practices that safeguard stored user data."
    },
    practice: {
      short: "Full-Stack Dynamic Prototype (A2 Completion)",
      detail:
        "Connect your front-end pages to PHP scripts and a MySQL database to render dynamic, data-backed content securely—finalising Assessment 2."
    },
    law: {
      name: "Tesler's Law",
      summary:
        "Every system has an irreducible level of complexity; the design choice is whether the system or the user must handle it.",
      theoryLink:
        "Clarifies why effortless UX demands thoughtful software engineering—moving operational complexity off the user's shoulders and into reliable system logic.",
      practiceLink:
        "Shapes your PHP/MySQL architecture: handling database joins, safe query sanitisation, defaults, and state persistence automatically behind a simple user interface."
    },
    objectives: [
      "Identify the various data types, selection and repetition structures, arrays, and functions of the PHP language",
      "Setup database connectivity from PHP",
      "Appreciate the need for security and protection of database content and how PHP functions support this",
      "Explore the relationship between Tesler's Law and effective UX design",
      "Finalise the existing website with dynamic, back-end, data-supported functionality"
    ],
    tlos: ["TLO2", "TLO5"],
    assessments: ["A2"]
  },
  {
    id: 10,
    phase: 3,
    title: "Usefulness and Usability",
    journeyCue: "Effectiveness vs efficiency, affordances & Doherty Threshold",
    overview:
      "Critically evaluates your working system by distinguishing usefulness (accomplishing the right goal) from usability (doing so easily and efficiently), reinforced by affordances, metaphors, and the Doherty Threshold.",
    theory: {
      short: "Usefulness vs Usability · Affordance & Meta
