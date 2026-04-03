// User

export interface User {
  uid: string; // Firebase Auth user ID
  displayName: string;
  email: string;
  bio: string;
  skills: string[]; // e.g. ["React", "TypeScript"]
  avatarURL: string;
  githubUsername: string;
  followers: string[]; // array of uids
  following: string[]; // array of uids
  createdAt: Date;
}

// Post

export interface Post {
  id: string; // Firestore auto-generated ID
  authorId: string; // uid of the person who posted
  authorName: string; // stored here so no extra query needed
  authorAvatar: string;
  content: string; // the post text
  likes: string[]; // array of uids who liked
  createdAt: Date;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  createdAt: Date;
}
