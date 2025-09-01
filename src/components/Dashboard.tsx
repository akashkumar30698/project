

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Sparkles, Plus, Trash2, User, Calendar, Mail, LogOut, Edit3 } from 'lucide-react'


interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}


export function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [creating, setCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({ name: 'Not provided', email: 'Not provided' });

 
  useEffect(()=>{
    console.log("setNotes: ",setNotes)
  },[setNotes])

  // Fetch notes on mount
  useEffect(() => {
    fetchNotes();
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/auth/user', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch user info');
      const data = await res.json();
      setUserInfo({ name: data.name, email: data.email });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch('http://localhost:4000/notes', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch notes');
      const data = await res.json();
      setNotes(data.notes);
    } catch (err) {
      console.error(err);
    }
  };

  const createNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) {
      setError('Both title and content are required');
      return;
    }

    setCreating(true);
    setError('');

    try {
      const res = await fetch('http://localhost:4000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newNote),
      });

      if (!res.ok) throw new Error('Failed to create note');
      const createdNote = await res.json();
      setNotes([createdNote, ...notes]);
      setNewNote({ title: '', content: '' });
    } catch (err) {
      setError('Failed to create note');
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/notes/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete note');
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      setError('Failed to delete note');
      console.error(err);
    }
  };

  const handleLogout =async ( ) =>{
     try {
      const res = await fetch(`http://localhost:4000/auth/logout`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to logout');
      navigate("/")
    } catch (err) {
      setError('Failed to delete note');
      console.error(err);
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-xl font-semibold text-gray-800">HD Notes</span>
            </div>
            <button
            onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome back, ! {userInfo?.name}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-blue-600" />
              <span>{userInfo?.email || 'Not provided'}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-blue-600" />
              <span></span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              <span>{formatDate(new Date().toISOString())}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Create Note Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-blue-600" />
            Create New Note
          </h2>

          <form onSubmit={createNote} className="space-y-4">
            <input
              type="text"
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              disabled={creating}
            />
            <textarea
              placeholder="Write your note content here..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
              disabled={creating}
            />
            <button
              type="submit"
              disabled={creating || !newNote.title.trim() || !newNote.content.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? 'Creating...' : 'Create Note'}
            </button>
          </form>
        </div>

        {/* Notes Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Edit3 className="h-5 w-5 mr-2 text-blue-600" />
            Your Notes ({notes.length})
          </h2>

          {notes.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Edit3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No notes yet. Create your first note above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                <div key={note._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{note.title}</h3>
                    <button
                      className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                      onClick={() => deleteNote(note._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
                  <p className="text-xs text-gray-400">{formatDate(note.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}