# SigiLife

An app for creating and sharing magically imbued sigils.

## 🌟 About
SigiLife is an augmented reality, location-based, social, ritualized lifestyle game where emotional intention becomes digitally visible. Inspired by the concept of sigil magic — the practice of distilling an intention into a symbol — SigiLife lets you create, charge, place, and destroy personal sigils in the real world.

## 📖 How It Works

### ✍️ Write a Sigil
Every sigil begins with a statement — a want, a fear, a promise, or something you cannot let go of. You reduce it, distill it, and the system transforms it into something symbolic, abstract, and entirely yours.

![Write Sigil](src/Assets/Write%20Sigil.svg)

### 👥 Share with Friends
Choose to share your sigil with trusted contacts, or keep it completely private. SigiLife is built around intentional connection — your sigils reach only the people you allow.

![Sigil Friends](src/Assets/SigilFriends.svg)

### ⚡ Charge Your Sigil
Once placed, a sigil can be charged with emotion — hope, grief, relief, joy, longing. Emotion leaves residue. That residue gives the sigil weight.

![Sigil Charge](src/Assets/SigiCharge.svg)

### 🗺️ Place It Somewhere Real
Pin your sigil to a real-world location — a street corner, your apartment, a place you can't stop thinking about. Over time the world fills with invisible layers of human intention.

![Sigil Map](src/Assets/TheOffice.svg)

### 💀 Destroy and Let Go
When the time comes, you may destroy your sigil. Not delete — destroy. The charge breaks, the symbol collapses, the intention dissolves. And that matters.

![Sigil Destroy](src/Assets/SigiDestroy.svg)

---

## 🚀 Getting Started

### Prerequisites
* Node.js
* npm or yarn

### Installation
1. Clone the repository:
```bash
   git clone https://github.com/your-username/sigilife.git
```
2. Install dependencies:
```bash
   npm install
```
3. Start the frontend and backend:
```bash
   npm start
```

## 🛠 Tech Stack

### Frontend
* React 19 / Vite
* TypeScript
* TailwindCSS v4
* React Router v7
* Shadcn/UI + Radix UI
* Embla Carousel
* Lucide React + HugeIcons
* Fabric.js (sigil canvas)
* Three.js / OGL (3D/WebGL)
* Mapbox GL / react-map-gl
* Fontsource (Figtree, Roboto)

### Backend
* Node.js + Express v5
* MySQL2 + Prisma ORM (MariaDB adapter)
* express-session + express-mysql-session
* Google OAuth (google-auth-library)
* Axios
* dotenv

### Dev Tools
* TypeScript + tsx + ts-node
* ESLint
* Jest
* Concurrently

## 🤝 Contributing
This app was made by Alex 'Bernie' Bern and Hope Clarke, while in Operation Spark's coding program.
SigiLife will be managed in collaboration with MallowBunnyLabs🐇, May 2026.

---

### Naming Conventions

For our components, we use a specific naming convention based on the root word "Sigil":

* **Words starting with 'L':** The 'l' from sigil is dropped to create a PascalCase `SigiLxxx` component.
  * *Example:* `List` -> `SigiList`
  * *Example:* `Layout` -> `SigiLayout`
* **All other letters:** The component is named PascalCase `SigilXxxx`.
  * *Example:* `Card` -> `SigilCard`
  * *Example:* `Button` -> `SigilButton`