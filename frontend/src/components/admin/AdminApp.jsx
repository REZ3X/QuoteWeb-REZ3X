// AdminApp.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = '/api/proxy'; // Adjusted to use the proxy

function AdminApp() {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({ quote: '', date: '', writer: '' });
  const [editingQuote, setEditingQuote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    if (!userId) {
      navigate('/login');
    } else {
      fetchQuotes(role);
    }
  }, []);

  const fetchQuotes = async (role) => {
    try {
      const response = await axios.get(`${API_URL}/quotes`, { withCredentials: true });
      if (role === 'admin') {
        setQuotes(response.data);
      } else {
        const userId = localStorage.getItem('userId');
        const userQuotes = response.data.filter(quote => quote.user_id === parseInt(userId));
        setQuotes(userQuotes);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuote({ ...newQuote, [name]: value });
  };

  const handleAddQuote = async () => {
    try {
      await axios.post(`${API_URL}/quotes`, newQuote, { withCredentials: true });
      fetchQuotes(localStorage.getItem('role'));
      setNewQuote({ quote: '', date: '', writer: '' });
    } catch (error) {
      console.error('Error adding quote:', error);
    }
  };

  const handleEditQuote = (quote) => {
    setEditingQuote(quote);
  };

  const handleUpdateQuote = async () => {
    try {
      await axios.put(`${API_URL}/quotes/${editingQuote.id}`, editingQuote, { withCredentials: true });
      fetchQuotes(localStorage.getItem('role'));
      setEditingQuote(null);
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  const handleDeleteQuote = async (id) => {
    try {
      await axios.delete(`${API_URL}/quotes/${id}`, { withCredentials: true });
      fetchQuotes(localStorage.getItem('role'));
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
      <div className="container mx-auto p-4 mt-16">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 mb-4">Logout</button>
        <div className="mt-4">
          <input
              type="text"
              name="quote"
              placeholder="Quote"
              value={newQuote.quote}
              onChange={handleInputChange}
              className="border p-2 mr-2"
          />
          <input
              type="date"
              name="date"
              placeholder="Date"
              value={newQuote.date}
              onChange={handleInputChange}
              className="border p-2 mr-2"
          />
          <input
              type="text"
              name="writer"
              placeholder="Writer"
              value={newQuote.writer}
              onChange={handleInputChange}
              className="border p-2 mr-2"
          />
          <button onClick={handleAddQuote} className="bg-blue-500 text-white p-2">Add Quote</button>
        </div>
        <div className="mt-4">
          {quotes.map((quote) => (
              <div key={quote.id} className="border p-2 my-2">
                <p>{quote.quote}</p>
                <p>{quote.date}</p>
                <p>{quote.writer}</p>
                <button onClick={() => handleEditQuote(quote)} className="bg-yellow-500 text-white p-2 mr-2">Edit</button>
                <button onClick={() => handleDeleteQuote(quote.id)} className="bg-red-500 text-white p-2">Delete</button>
              </div>
          ))}
        </div>
        {editingQuote && (
            <div className="mt-4">
              <input
                  type="text"
                  name="quote"
                  placeholder="Quote"
                  value={editingQuote.quote}
                  onChange={(e) => setEditingQuote({ ...editingQuote, quote: e.target.value })}
                  className="border p-2 mr-2"
              />
              <input
                  type="date"
                  name="date"
                  placeholder="Date"
                  value={editingQuote.date}
                  onChange={(e) => setEditingQuote({ ...editingQuote, date: e.target.value })}
                  className="border p-2 mr-2"
              />
              <input
                  type="text"
                  name="writer"
                  placeholder="Writer"
                  value={editingQuote.writer}
                  onChange={(e) => setEditingQuote({ ...editingQuote, writer: e.target.value })}
                  className="border p-2 mr-2"
              />
              <button onClick={handleUpdateQuote} className="bg-green-500 text-white p-2">Update Quote</button>
            </div>
        )}
      </div>
  );
}

export default AdminApp;
