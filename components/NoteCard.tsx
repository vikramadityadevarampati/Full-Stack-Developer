import React from 'react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => {
  const formattedDate = new Date(note.updatedAt).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      onClick={onClick}
      className="bg-form-bg p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-300 flex flex-col h-48 hover:-translate-y-1"
    >
      <h3 className="font-bold text-lg mb-2 truncate text-dark-text">{note.title}</h3>
      <p className="text-gray-600 text-sm flex-grow overflow-hidden break-words">
        {note.content}
      </p>
      <p className="text-xs text-gray-500 mt-auto pt-2 text-right">
        Last Modified: {formattedDate}
      </p>
    </div>
  );
};

export default NoteCard;