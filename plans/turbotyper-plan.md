# TurboTyper — Product & Implementatieplan

## 1. Productvisie

**Wat:** Een publiek beschikbare web app waarmee complete beginners stap voor stap blind leren typen — van vingerzetting tot hoge WPM.

**Voor wie:** Publiek product, iedereen die blind wil leren typen.

**Kernbelofte:** Een adaptief AI-gestuurd leertraject dat motiverend en verslavend aanvoelt.

**Naam:** TurboTyper

---

## 2. UI/UX Requirements

### Visuele Stijl
- **Minimalistisch** — strak, professioneel, veel witruimte (referentie: Monkeytype)
- Geen visuele ruis, elk element heeft een doel
- Bespoke typografie, geen template-feel

### Typografie
- **Primair font:** Uniek, bij de app passend font (selectie bij implementatie — criteria: moderne monospace of semi-mono voor typing, leesbaar display font voor UI)
- Font moet karakter uitstralen dat past bij snelheid & precisie

### Iconen
- **Uitsluitend Font Awesome** — geen andere icon libraries
- Consistente icon-stijl door hele app (solid/regular/light kiezen en vasthouden)

### Toetsenbord Weergave
- Visueel on-screen QWERTY toetsenbord
- Handpositie-indicatie (welke vinger op welke toets)
- Actieve toets highlighted
- Layout: alleen QWERTY

### Thema's
- Meerdere kleurthema's (dark, light, custom varianten)
- Gebruiker kiest zelf

### Platform
- Desktop only (geen mobiel support nodig)
- Geen responsive mobile layout vereist
- **PWA (Progressive Web App):** Installeerbaar als standalone desktop app
  - Service worker voor offline caching
  - Web app manifest met app-iconen
  - Offline-first: alle oefeningen werken zonder internet (data is lokaal)

### App Iconen
- Custom TurboTyper app icoon (alle formaten: 192x192, 512x512, maskable)
- Favicon set (favicon.ico, apple-touch-icon, etc.)
- OG image voor social sharing

### Audio
- Geen geluid — puur visuele ervaring

---

## 3. Functionele Requirements

### Must-haves (P0)

#### Adaptief Leertraject
- AI-gestuurd curriculum dat zwakke toetsen detecteert
- Automatisch aanpassen van oefenmateriaal op basis van foutpatronen
- Opbouwend materiaal: letters → lettercombinaties → woorden → zinnen → teksten
- Start bij home row, breid rij voor rij uit

#### Typing Engine
- Real-time karakter-voor-karakter input matching
- WPM (words per minute) live berekening
- Accuracy percentage live berekening
- Visuele feedback bij fouten (kleur, highlight)
- Cursor positie tracking

#### Visueel Toetsenbord + Handen
- SVG/Canvas toetsenbord representatie
- Vingerplaatsing indicatie per toets
- Highlight van de volgende te typen toets
- Highlight van de correcte vinger

#### Taalondersteuning
- Nederlands en Engels
- Gebruiker kiest taal voor oefenteksten
- Taal-specifieke woordenlijsten en zinnen

#### Oefenmodes
- **Curriculum mode:** Gestructureerde lessen, adaptief
- **Tijdrace:** 15 / 30 / 60 seconden, maximale WPM scoren
- **Zen mode:** Geen timer, geen druk, ontspannen oefenen
- **Daily challenge:** Elke dag dezelfde challenge voor alle gebruikers

### Must-haves (P1) — Gamification

#### Streaks
- Dagelijkse streak counter
- Visuele streak indicator (vlammetje / kalender)
- Streak verloren = motivatie-trigger

#### XP & Levels
- XP per voltooide les/oefening
- Level systeem met progressie
- XP schaling op basis van moeilijkheid en accuracy

#### Achievements / Badges
- Milestone badges (eerste les, 50 WPM, 100 WPM, 7-day streak, 30-day streak, etc.)
- Visueel badges-overzicht / trophy case
- Unlock-animaties

#### Combo / Multiplier
- Combo-meter die oploopt bij foutloze reeksen
- Multiplier op XP bij hoge combo's
- Visuele combo-indicator (counter + glow/pulse)

#### Visuele Feedback
- Particles / glow bij goed typen
- Subtiele effecten, niet overdreven (past bij minimalistisch thema)
- Combo-break feedback

### Must-haves (P2) — Analytics

#### Volledig Dashboard
- WPM over tijd (lijn-grafiek)
- Accuracy over tijd (lijn-grafiek)
- Heatmap per toets (welke toetsen zijn zwak/sterk)
- Meest gemaakte fouten
- Sessie-historie
- Verbeterpunten en suggesties
- Totale oefentijd

---

## 4. Technische Architectuur

### Stack
- **Framework:** SvelteKit
- **Taal:** TypeScript
- **Styling:** Tailwind CSS
- **Iconen:** Font Awesome (enige icon library)
- **Typografie:** Custom font (uniek, passend bij speed/precision thema)
- **Data opslag:** Lokaal (localStorage / IndexedDB) — geen backend, geen accounts
- **PWA:** Service worker + web app manifest (offline-first, installeerbaar)
- **Deployment:** Vercel
- **Package manager:** npm

### Projectstructuur
```
turbotyper/
├── src/
│   ├── lib/
│   │   ├── components/        # UI componenten
│   │   │   ├── keyboard/      # Visueel toetsenbord + handen
│   │   │   ├── typing/        # Typing engine UI
│   │   │   ├── dashboard/     # Stats & analytics
│   │   │   ├── gamification/  # XP, streaks, badges, combo
│   │   │   └── ui/            # Generieke UI (buttons, modals, theme switcher)
│   │   ├── stores/            # Svelte stores (state management)
│   │   │   ├── typing.ts      # Huidige sessie state
│   │   │   ├── progress.ts    # Voortgang & curriculum positie
│   │   │   ├── stats.ts       # Historische statistieken
│   │   │   ├── gamification.ts# XP, level, streaks, badges
│   │   │   └── settings.ts    # Thema, taal, voorkeuren
│   │   ├── engine/            # Core logica (geen UI)
│   │   │   ├── typing-engine.ts    # Input matching, WPM, accuracy
│   │   │   ├── adaptive.ts         # Adaptief algoritme (zwakke toetsen)
│   │   │   ├── curriculum.ts       # Les-structuur & progressie
│   │   │   ├── daily-challenge.ts  # Daily challenge generatie (seed-based)
│   │   │   └── word-generator.ts   # Woord/zin generatie per niveau
│   │   ├── data/              # Statische data
│   │   │   ├── words-nl.ts    # Nederlandse woordenlijst
│   │   │   ├── words-en.ts    # Engelse woordenlijst
│   │   │   ├── lessons.ts     # Curriculum definitie
│   │   │   └── achievements.ts# Badge definities
│   │   └── utils/             # Helpers
│   │       ├── storage.ts     # localStorage / IndexedDB wrapper
│   │       ├── keyboard-layout.ts  # QWERTY mapping + vinger-toewijzing
│   │       └── theme.ts       # Thema management
│   ├── routes/
│   │   ├── +layout.svelte     # Root layout (nav, theme)
│   │   ├── +page.svelte       # Home / typing scherm
│   │   ├── dashboard/
│   │   │   └── +page.svelte   # Analytics dashboard
│   │   ├── lessons/
│   │   │   └── +page.svelte   # Curriculum overzicht
│   │   └── settings/
│   │       └── +page.svelte   # Instellingen (thema, taal, layout)
│   └── app.css                # Tailwind + globale styles
├── static/                    # Statische assets
│   ├── icons/                 # PWA app iconen (192x192, 512x512, maskable)
│   ├── favicon.ico            # Favicon
│   └── manifest.json          # PWA web app manifest
├── plans/                     # Dit plan
├── package.json
├── svelte.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

### Data Model (lokaal)

```typescript
// Opgeslagen in IndexedDB

interface UserProgress {
  currentLesson: number;
  completedLessons: number[];
  unlockedLevels: number;
  weakKeys: Record<string, number>;     // toets → fout-ratio
  strongKeys: Record<string, number>;   // toets → accuracy
}

interface UserStats {
  totalSessions: number;
  totalTimeMinutes: number;
  sessionsHistory: SessionResult[];
  bestWpm: number;
  averageWpm: number;
  averageAccuracy: number;
}

interface SessionResult {
  date: string;
  mode: 'lesson' | 'timed' | 'zen' | 'daily';
  wpm: number;
  accuracy: number;
  duration: number;
  keyErrors: Record<string, number>;
}

interface Gamification {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  longestStreak: number;
  unlockedBadges: string[];
  combo: {
    current: number;
    best: number;
  };
}

interface Settings {
  theme: string;
  language: 'nl' | 'en';
  showKeyboard: boolean;
  showHands: boolean;
}
```

### Adaptief Algoritme (kern)

```
1. Track per toets: correcte aanslagen vs fouten → fout-ratio
2. Toetsen met fout-ratio > 15% markeren als "zwak"
3. Oefeningsgenerator:
   - 60% nieuwe stof (curriculum)
   - 30% zwakke toetsen (herhaling)
   - 10% willekeurig (retention)
4. Na elke sessie: herbereken fout-ratio's
5. Lesson unlock: pas als accuracy > 90% op huidige les
```

### Daily Challenge
- Seed-based generatie: `seed = YYYY-MM-DD`
- Deterministische output → identiek voor alle gebruikers op dezelfde dag
- Resultaat vergelijken via hash (geen server nodig)

---

## 5. Implementatie Roadmap

### Fase 1: Foundation
1. SvelteKit project opzetten met TypeScript + Tailwind
2. Font Awesome installeren en configureren
3. Custom font selecteren en integreren
4. Projectstructuur aanmaken
5. Basis routing (home, dashboard, lessons, settings)
6. Thema systeem (meerdere thema's, switcher)
7. localStorage/IndexedDB wrapper
8. PWA setup: service worker, manifest.json, app iconen genereren
9. Favicon set aanmaken (ico, apple-touch-icon, SVG)

### Fase 2: Typing Engine
10. Core typing engine (input matching, WPM, accuracy berekening)
11. Typing UI component (tekst weergave, cursor, live stats)
12. Fout-highlighting en correctie-logica
13. Sessie-resultaat opslag

### Fase 3: Visueel Toetsenbord
14. SVG toetsenbord component (QWERTY layout)
15. Handpositie overlay (vinger-toewijzing per toets)
16. Actieve toets + correcte vinger highlighting
17. Toggle voor keyboard/handen zichtbaarheid

### Fase 4: Curriculum & Adaptief
18. Lesson data structuur (home row → top row → bottom row → cijfers → speciale tekens)
19. Woordenlijsten NL + EN
20. Woord/zin generator per niveau
21. Adaptief algoritme implementatie
22. Lesson flow UI (les kiezen, starten, afronden, resultaat)

### Fase 5: Oefenmodes
23. Zen mode (eindeloos, geen timer)
24. Timed race (15/30/60 sec countdown)
25. Daily challenge (seed-based generator)
26. Mode selectie UI

### Fase 6: Gamification
27. XP & level systeem (store + berekening)
28. Streak tracking (dagelijks, reset bij gemiste dag)
29. Combo/multiplier mechaniek (live tijdens typen)
30. Visuele combo feedback (particles, glow, pulse)
31. Achievement/badge systeem (definities + unlock logica)
32. Badge showcase UI

### Fase 7: Dashboard & Analytics
33. WPM over tijd grafiek
34. Accuracy over tijd grafiek
35. Toetsen heatmap (sterk/zwak per toets)
36. Sessie-historie lijst
37. Verbeterpunten & suggesties panel
38. Totale oefentijd & stats overview

### Fase 8: Polish & Deploy
39. Alle thema's finaliseren
40. Animaties & micro-interacties
41. Performance optimalisatie
42. PWA testen (installatie, offline werking, iconen)
43. Vercel deployment configuratie
44. Meta tags, OG image, favicon validatie
45. Final QA & bugfixes

### Fase 9: Plan Verificatie (GATE — geen release zonder groen licht)

Volledige controle of **elk punt uit dit plan** is gerealiseerd. Per sectie aftekenen:

#### 46. Functionele Verificatie
- [ ] Adaptief leertraject werkt (zwakke toetsen worden herhaald)
- [ ] Typing engine: WPM, accuracy, cursor, fout-highlighting correct
- [ ] Visueel toetsenbord + handpositie functioneel
- [ ] Taalondersteuning NL + EN werkend en schakelbaar
- [ ] Alle 4 oefenmodes werkend: Curriculum, Tijdrace, Zen, Daily Challenge
- [ ] Daily challenge is deterministisch (zelfde seed = zelfde output)

#### 47. Gamification Verificatie
- [ ] XP wordt correct toegekend en schaalt met moeilijkheid/accuracy
- [ ] Level systeem werkt met juiste grenzen
- [ ] Streak tracking: opbouw bij dagelijks gebruik, reset bij gemiste dag
- [ ] Combo/multiplier loopt op bij foutloze reeksen, reset bij fout
- [ ] Achievements unlocken op juiste triggers
- [ ] Badge showcase toont alle behaalde en locked badges

#### 48. Dashboard Verificatie
- [ ] WPM over tijd grafiek toont correcte historische data
- [ ] Accuracy over tijd grafiek correct
- [ ] Toetsen heatmap reflecteert daadwerkelijke sterkte/zwakte
- [ ] Sessie-historie is volledig en correct
- [ ] Verbeterpunten zijn relevant en gebaseerd op echte data

#### 49. Design & UX Standaarden Verificatie
- [ ] Pixel-perfect op 4px/8px grid — geen willekeurige waarden
- [ ] Typografische schaal consistent (geen losse font-sizes)
- [ ] Alle kleuren via design tokens — geen hardcoded hex
- [ ] Font Awesome iconen: één stijl, consistent door hele app
- [ ] Custom font correct geladen en toegepast
- [ ] WCAG 2.1 AA: contrast ratios, focus indicators, keyboard navigatie
- [ ] Feedback loop < 100ms op alle interacties
- [ ] Onboarding intuïtief zonder tutorial

#### 50. Code Quality Verificatie
- [ ] `strict: true` in tsconfig — nul type errors
- [ ] Geen component > 150 regels
- [ ] Geen dead code, geen unused imports/variables
- [ ] Engine-logica is puur en testbaar
- [ ] Lighthouse Performance ≥ 90
- [ ] First Contentful Paint < 1.5s
- [ ] Bundle size gecontroleerd — geen onnodige dependencies

#### 51. Security Verificatie
- [ ] Geen externe data-verbindingen (geen tracking/analytics/third-party)
- [ ] CSP headers geconfigureerd en actief
- [ ] SRI hashes op alle externe resources
- [ ] Input sanitization op alle gebruikersinput
- [ ] Secure headers aanwezig (X-Content-Type-Options, X-Frame-Options, etc.)
- [ ] `npm audit` schoon — geen bekende kwetsbaarheden
- [ ] HTTPS only — geen mixed content

#### 52. PWA & Deployment Verificatie
- [ ] PWA installeerbaar als desktop app
- [ ] Offline werking: alle oefeningen functioneel zonder internet
- [ ] App iconen correct (192x192, 512x512, maskable)
- [ ] Favicon set compleet (ico, apple-touch-icon, SVG)
- [ ] Vercel deployment live en functioneel
- [ ] OG image en meta tags correct voor social sharing

---

## 6. Kwaliteitsstandaarden

De app voldoet aan de **hoogste standaarden** op vier pijlers. Dit zijn geen richtlijnen maar harde eisen.

### Design

- **Pixel-perfectie:** Geen willekeurige waarden — alles op een consistent spacing/sizing systeem (4px/8px grid)
- **Visuele hiërarchie:** Elk scherm heeft één duidelijke primaire actie, ondersteund door secundaire en tertiaire elementen
- **Typografische schaal:** Gedefinieerde type scale (bijv. 1.25 ratio) — geen losse font-sizes
- **Kleurconsistentie:** Elke kleur heeft een semantische rol (primary, accent, success, error, muted) — geen hardcoded hex-waarden buiten het design token systeem
- **Whitespace als element:** Witruimte is bewust ontworpen, niet overgebleven ruimte
- **Animatie-discipline:** Elke animatie heeft een functioneel doel (feedback, oriëntatie, delight) — geen decoratieve beweging zonder reden
- **Icoon-consistentie:** Eén Font Awesome stijl (solid/regular) door de hele app — geen mix

### UX

- **WCAG 2.1 AA minimum:** Contrast ratios ≥ 4.5:1 (tekst), ≥ 3:1 (grote tekst/UI), focus indicators op alle interactieve elementen
- **Keyboard-first:** Volledige app bedienbaar met toetsenbord — logische tab-order, zichtbare focus states, skip links
- **Zero-confusion navigatie:** Gebruiker weet altijd: waar ben ik, hoe kwam ik hier, wat kan ik doen
- **Feedback loop < 100ms:** Elke gebruikersactie krijgt directe visuele respons (hover, active, loading states)
- **Error prevention boven error handling:** Voorkom fouten door slim UI-design (disabled states, bevestigingen, undo) in plaats van alleen foutmeldingen
- **Progressive disclosure:** Toon alleen wat relevant is voor het huidige moment — complexiteit ontvouwt zich geleidelijk
- **Onboarding zonder handleiding:** Eerste gebruik is intuïtief zonder tutorial-overlay of help-teksten
- **Consistent mental model:** Dezelfde actie werkt overal hetzelfde — geen contextafhankelijke verrassingen

### Code Quality

- **Strict TypeScript:** `strict: true` in tsconfig — geen `any`, geen `@ts-ignore`, geen type assertions tenzij mathematisch bewezen noodzakelijk
- **Componenten < 150 regels:** Overschrijding = splitsen. Geen uitzonderingen.
- **Single Responsibility:** Elke functie doet één ding. Elke store beheert één domein. Elke component rendert één concept.
- **Zero dead code:** Geen uitgecommentarieerde code, geen ongebruikte imports, geen unused variables
- **Naamgeving is documentatie:** Variabelen, functies en componenten zijn zo benoemd dat commentaar overbodig is
- **Pure functies waar mogelijk:** Engine-logica (WPM, accuracy, adaptief algoritme) is volledig puur en testbaar zonder DOM/store dependencies
- **Consistente patronen:** Eén manier om iets te doen door de hele codebase — geen stijlmix
- **Error boundaries:** Graceful degradation bij onverwachte fouten — nooit een wit scherm
- **Performance budgets:**
  - First Contentful Paint < 1.5s
  - Time to Interactive < 3s
  - Lighthouse Performance score ≥ 90
  - Bundle size bewaking — geen onnodige dependencies

### Security

- **Geen externe data-verbindingen:** Alle data blijft lokaal (IndexedDB/localStorage) — geen tracking, geen analytics, geen third-party scripts
- **Content Security Policy (CSP):** Strikte CSP headers — alleen eigen domein + Font Awesome CDN toegestaan
- **Subresource Integrity (SRI):** Hash-verificatie op alle externe resources (Font Awesome, fonts)
- **Input sanitization:** Alle gebruikersinput (naam, custom tekst) wordt gesanitized voor rendering — XSS preventie ook bij lokale data
- **Secure headers:** X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- **Dependency security:** Geen packages met bekende kwetsbaarheden — `npm audit` moet schoon zijn
- **Privacy by design:** Geen persoonlijke data vereist — app werkt volledig anoniem
- **HTTPS only:** Alle deployment via HTTPS, geen mixed content

---

## 7. Open Punten

- Exacte thema's bepalen (namen, kleuren)
- Specifieke achievement-lijst samenstellen
- Woordenlijst bronnen selecteren (frequentie-gebaseerd?)
- XP formule fine-tunen (hoeveel XP per les/mode?)
- Level-grenzen definiëren
