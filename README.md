# DevConnect 🚀

A developer networking platform where developers can connect, share posts, and showcase their GitHub projects.

🔗 **Live Demo:** [dev-connect-pied.vercel.app](https://dev-connect-pied.vercel.app/login)

<img width="694" height="616" alt="Screenshot 2026-04-08 170805" src="https://github.com/user-attachments/assets/76c36ac9-0edc-4412-b1df-f2b10fe4bb99" />

<img width="668" height="610" alt="Screenshot 2026-04-08 170813" src="https://github.com/user-attachments/assets/aef435fa-32a5-4e05-84ed-82e4bc271419" />

<img width="1365" height="622" alt="Screenshot 2026-04-08 170830" src="https://github.com/user-attachments/assets/ced480e4-6a38-4fbc-b1a8-a3956b6786a9" />

<img width="1352" height="619" alt="Screenshot 2026-04-08 170838" src="https://github.com/user-attachments/assets/36d98a99-8258-40de-8fb4-fddd5f4b2bd3" />
<img width="1356" height="616" alt="Screenshot 2026-04-08 170845" src="https://github.com/user-attachments/assets/160fa1c6-e2ba-498e-9e47-06bf79fbafb1" />
<img width="1355" height="616" alt="image" src="https://github.com/user-attachments/assets/f7f64696-3e41-4254-bd73-c3d02f6aacde" />

## Features


- 🔐 **Authentication** — Email/password via Firebase Auth
- 👤 **Developer Profiles** — Bio, skills as tags, GitHub username, avatar
- 📰 **Real-time Feed** — Create posts, like, comment, delete — all updates instantly
- 🤝 **Developer Connections** — Follow/unfollow developers, search by name, filter by skill
- 🐙 **GitHub Integration** — Automatically shows public repos, stars, and languages on profile
- 📱 **Fully Responsive** — Mobile sidebar, bottom navigation, works on all screen sizes
- 🔒 **Secure** — Firestore security rules, env variables, protected routes

---

## Tech Stack

| Tech | Usage |
|---|---|
| React 18 | UI library |
| TypeScript | Type safety throughout |
| Tailwind CSS | Styling |
| Firebase Auth | Authentication |
| Firestore | Real-time NoSQL database |
| Firebase Storage | File storage |
| React Router v6 | Client-side routing |
| Vite | Build tool |
| Vercel | Deployment |

---

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Layout.tsx        # Sidebar + Navbar shell
│   ├── PostCard.tsx       # Single post with likes/comments
│   ├── GithubRepos.tsx    # GitHub repos display
│   ├── PrivateRoute.tsx   # Auth route protection
│   └── Skeleton.tsx       # Loading skeleton components
├── pages/            # Route-level pages
│   ├── Dashboard.tsx      # Stats + recent activity
│   ├── Feed.tsx           # Real-time post feed
│   ├── Connections.tsx    # Developer directory
│   ├── Profile.tsx        # View + edit profile
│   ├── Login.tsx          # Login page
│   └── Register.tsx       # Register page
├── hooks/            # Custom React hooks
│   ├── useAuth.ts         # Access auth context
│   ├── usePosts.ts        # Posts CRUD + real-time
│   ├── useProfile.ts      # Fetch user profile
│   ├── useUsers.ts        # Fetch all users
│   ├── useFollow.ts       # Follow/unfollow logic
│   ├── useComments.ts     # Comments CRUD + real-time
│   └── useGithub.ts       # GitHub API integration
├── context/
│   └── AuthContext.tsx    # Global auth state
├── lib/
│   └── firebase.ts        # Firebase initialization
└── types/
    └── index.ts           # TypeScript interfaces
```

---

## Firestore Database Structure

```
users/
  {uid}/
    displayName, email, bio, skills[], avatarURL,
    githubUsername, followers[], following[], createdAt

posts/
  {postId}/
    authorId, authorName, authorAvatar,
    content, likes[], createdAt
    comments/
      {commentId}/
        authorId, authorName, text, createdAt
```

---

## Key Technical Decisions

**Why Firebase?**
Choose Firebase to focus on React architecture and real-time features without backend overhead. Firestore's onSnapshot provides live updates with zero extra code.

**Why Context API over Redux?**
Auth state is the only truly global state in this app. Context API is the right tool for this scope — Redux would be overkill.

**Why custom hooks?**
All Firebase logic lives in custom hooks, not components. Components only handle UI. This keeps code clean, reusable and easy to maintain.

**Data denormalization**
Author name and avatar are stored directly in post documents so the feed loads with a single Firestore query — no extra reads per post.

**Atomic writes with writeBatch**
Follow/unfollow updates to two user documents simultaneously. writeBatch ensures both succeed or both fail — no inconsistent data.

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/DevSourav01/devconnect.git
cd devconnect

# Install dependencies
npm install

# Create .env file with your Firebase config
cp .env.example .env

# Start dev server
npm run dev
```

### Environment Variables

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## Author

**Sourav Nandi**
- GitHub: [@Devsourav01](https://github.com/DevSourav01)
- LinkedIn: [linkedin.com/in/yourprofile](https://www.linkedin.com/in/sourav-nandi01/)
- Live App: [dev-connect-pied.vercel.app](https://dev-connect-pied.vercel.app/login)

---

⭐ If you found this project helpful, give it a star!
