import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: { title: string; content: string }) => void;
  onDelete?: () => void;
  noteToEdit?: Note | null;
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, onSave, onDelete, noteToEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [noteToEdit, isOpen]);

  const handleSave = () => {
    if (title.trim()) {
      onSave({ title, content });
    }
  };

  const isEditing = !!noteToEdit;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-5">
        <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-300">
          <h2 className="text-xl font-bold">{isEditing ? 'Edit Note' : 'Add Note'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder={isEditing ? noteToEdit.title : "Title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-semibold"
            />
          </div>
          <div>
            <textarea
              placeholder={isEditing ? noteToEdit.content : "Hello World"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-40 p-3 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-dark focus:border-teal-dark"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            {isEditing ? (
              <>
                <Button variant="primary" onClick={handleSave}>Save</Button>
                {onDelete && (
                  <Button variant="danger" onClick={onDelete}>Delete</Button>
                )}
              </>
            ) : (
               <>
                <Button variant="primary" onClick={handleSave}>Add</Button>
                <Button variant="danger" onClick={onClose}>Cancel</Button>
               </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NoteModal;