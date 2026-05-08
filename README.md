# Qupid2.0

> *Pen, paper, and presence.*

A mobile web app that gives two people a reason to sit down, put their phones face-down, and actually talk. Qupid provides the questions. You provide the sticky notes, a pen, and each other.

---

## What it is

Qupid is a single-device experience designed to be used by two people together — at a picnic, on a long drive pulled over, at a kitchen table at midnight. It is not a chat app. There are no accounts, no servers, no data collected. It lives entirely in the browser and disappears when you close the tab, except for the pile of sticky notes you're left holding.

Each session runs through ten questions drawn from three depth levels — casual, personal, and very personal — rotating in a randomised order. Both people write their answers privately on real paper, swap notes, read in silence, then talk about it while a timer runs. When the timer ends, the next question appears.

That's the whole thing.

---

## File structure

```
qupid/
├── shared.css        # Design tokens, reset, curtain transition, shared components
├── app.js            # Shared navigate() function
├── login.html        # Name entry — who's here today?
├── login.css
├── instructions.html # How it works, ground rules, consent gate
├── instructions.css
├── session.html      # Core experience — questions, writing state, discussion timer
├── session.css
├── end.html          # Wrap-up, stats, reflection prompts
└── end.css
```

---

## How to run it

No build step. No dependencies. No install.

1. Download or clone the repository
2. Keep all files in the same folder
3. Open `login.html` in a browser

That's it. Works on any modern mobile browser. Designed for a 430px viewport.

---

## The session flow

```
Login → Instructions → Session → End
         (read once)   (10 Qs)   (wrap-up)
```

**Inside each question round:**

1. Question appears on screen — both people read it
2. Phone goes face-down — each person writes privately on a sticky note
3. Notes are swapped — read in silence before reacting
4. "Start discussion" is tapped — a timer begins
5. Timer ends — next question loads automatically

---

## Question levels

| Level | Colour | Timer | Focus |
|---|---|---|---|
| Casual | Grey | 2 min | Light, playful, low-stakes |
| Personal | Sky blue | 4 min | Reflective, values, history |
| Very personal | Dark plum | 6 min | The relationship itself |

Levels alternate in a randomised order across the ten questions. The very personal tier is intentionally relationship-facing — several questions are addressed directly to the other person in the room.

---

## Design decisions

**Why physical sticky notes?**
Because typing an answer into a phone while sitting next to someone is a performance. Writing by hand, privately, on paper — then handing it over — is an act. The physicality changes the quality of the answer.

**Why a timer?**
Not to rush. To contain. A time boundary gives people permission to go deep without worrying about how to end the conversation. When the timer runs out, the structure does the work.

**Why one device?**
Because this is about two people in a room, not two people on their phones. The app is a facilitator, not a participant. It should be picked up, used, and put back down.

**Why no accounts or saved data?**
The sticky notes are the data. They belong to the people who wrote them, not to a database.

---

## Customisation

### Changing the questions
All questions live in the `questions` object inside `session.html`. Three arrays: `casual`, `personal`, `veryPersonal`. Twelve questions per tier, ten drawn per session.

### Changing the number of questions
Find `MAX_QUESTIONS` in `session.html` and change the value.

### Changing timer durations
In the `levels` object in `session.html`, adjust the `duration` value (in seconds) for each level.

### Changing colours
All design tokens are CSS custom properties in `shared.css` under `:root`. The three level colours are `--grey-*`, `--blue-*`, and `--plum-*`.

---

## Browser support

Any modern mobile browser — Safari on iOS, Chrome on Android. The app uses `sessionStorage` to pass names and session stats between pages, which is supported everywhere.

The phone vibration on timer end uses the Vibration API — supported on Android, silently ignored on iOS.

---

## What to bring

- Sticky notes (at least 20 for a full session — two per question)
- A pen each, or one to share
- Somewhere quiet enough to be honest

---

*Built with HTML, CSS, and JavaScript. No frameworks. No backend. No tracking.*



