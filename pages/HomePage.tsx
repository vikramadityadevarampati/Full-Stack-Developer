import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/apiService';
import { Note } from '../types';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';

const HomePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  const fetchNotes = useCallback(async () => {
    if (currentUser) {
      const userNotes = await api.getNotes(currentUser.id);
      setNotes(userNotes);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const openAddModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleSaveNote = async ({ title, content }: { title: string; content: string }) => {
    if (!currentUser) return;
    if (editingNote) {
      await api.updateNote(editingNote.id, { title, content });
    } else {
      await api.createNote(currentUser.id, { title, content });
    }
    closeModal();
    fetchNotes();
  };
  
  const handleDeleteNote = async () => {
    if (editingNote) {
      await api.deleteNote(editingNote.id);
      closeModal();
      fetchNotes();
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-dark-text mb-6">
        Good Morning {currentUser?.username}!
      </h2>
      
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onClick={() => openEditModal(note)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-gray-500">You have no notes yet. Create one!</p>
        </div>
      )}

      <button
        onClick={openAddModal}
        className="fixed bottom-8 right-8 bg-teal hover:bg-teal-dark text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-dark transition-transform duration-200 transform hover:scale-110"
        aria-label="Add new note"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <NoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveNote}
        onDelete={editingNote ? handleDeleteNote : undefined}
        noteToEdit={editingNote}
      />
    </div>
  );
};

export default HomePage;
