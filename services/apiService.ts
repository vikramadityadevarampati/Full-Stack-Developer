import { User, Note } from '../types';

// Type definitions for credentials from components
export type LoginCredentials = Pick<User, 'email'> & { password: string };
export type SignupCredentials = Pick<User, 'username' | 'email'> & { password: string };
export type NotePayload = Pick<Note, 'title' | 'content'>;

const USERS_KEY = 'keep_notes_users';
const NOTES_KEY = 'keep_notes_notes';
const CURRENT_USER_KEY = 'keep_notes_current_user';
const PASSWORDS_KEY = 'keep_notes_passwords'; // For mock auth

// Helper to get/set data from localStorage
const getFromStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return null;
  }
};

const setToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing to localStorage key “${key}”:`, error);
  }
};

// --- Auth Functions ---

export const signup = (credentials: SignupCredentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: User[] = getFromStorage<User[]>(USERS_KEY) || [];
      const userExists = users.some(user => user.email === credentials.email);

      if (userExists) {
        return reject(new Error('User with this email already exists.'));
      }
      
      const newUser: User = {
        id: crypto.randomUUID(),
        username: credentials.username,
        email: credentials.email,
      };
      
      const passwords = getFromStorage<Record<string, string>>(PASSWORDS_KEY) || {};
      passwords[newUser.id] = credentials.password; // In a real app, hash passwords!

      setToStorage(USERS_KEY, [...users, newUser]);
      setToStorage(PASSWORDS_KEY, passwords);
      setToStorage(CURRENT_USER_KEY, newUser);

      resolve(newUser);
    }, 500);
  });
};

export const login = (credentials: LoginCredentials): Promise<User> => {
   return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: User[] = getFromStorage<User[]>(USERS_KEY) || [];
      const passwords = getFromStorage<Record<string, string>>(PASSWORDS_KEY) || {};
      const user = users.find(u => u.email === credentials.email);

      if (user && passwords[user.id] === credentials.password) {
        setToStorage(CURRENT_USER_KEY, user);
        resolve(user);
      } else {
        reject(new Error('Invalid email or password.'));
      }
    }, 500);
  });
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  return getFromStorage<User>(CURRENT_USER_KEY);
};

// --- Notes Functions ---

export const getNotes = (userId: string): Promise<Note[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allNotes: Note[] = getFromStorage<Note[]>(NOTES_KEY) || [];
      const userNotes = allNotes
        .filter(note => note.userId === userId)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      resolve(userNotes);
    }, 300);
  });
};

export const createNote = (userId: string, data: NotePayload): Promise<Note> => {
  return new Promise((resolve) => {
    setTimeout(() => {
        const allNotes: Note[] = getFromStorage<Note[]>(NOTES_KEY) || [];
        const now = new Date().toISOString();
        const newNote: Note = {
            id: crypto.randomUUID(),
            userId,
            title: data.title,
            content: data.content,
            createdAt: now,
            updatedAt: now,
        };
        setToStorage(NOTES_KEY, [...allNotes, newNote]);
        resolve(newNote);
    }, 300);
  });
};

export const updateNote = (noteId: string, data: Partial<NotePayload>): Promise<Note> => {
   return new Promise((resolve, reject) => {
    setTimeout(() => {
        const allNotes: Note[] = getFromStorage<Note[]>(NOTES_KEY) || [];
        const noteIndex = allNotes.findIndex(n => n.id === noteId);

        if (noteIndex === -1) {
            return reject(new Error('Note not found.'));
        }

        const updatedNote = {
            ...allNotes[noteIndex],
            ...data,
            updatedAt: new Date().toISOString(),
        };

        allNotes[noteIndex] = updatedNote;
        setToStorage(NOTES_KEY, allNotes);
        resolve(updatedNote);
    }, 300);
  });
};

export const deleteNote = (noteId: string): Promise<void> => {
   return new Promise((resolve) => {
       setTimeout(() => {
        let allNotes: Note[] = getFromStorage<Note[]>(NOTES_KEY) || [];
        allNotes = allNotes.filter(n => n.id !== noteId);
        setToStorage(NOTES_KEY, allNotes);
        resolve();
       }, 300);
   });
};
