// QuoteApp.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import SearchBar from './SearchBar';
import QuoteList from './QuoteList';
import AdminApp from '../admin/AdminApp';
import Footer from './Footer';
import Login from '../auth/Login';

const API_URL = import.meta.env.VITE_API_URL;

const QuoteApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/quotes`);
      setQuotes(response.data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const filteredQuotes = quotes.filter(quote =>
      quote.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <Router>
        <Header />
        <div className='flex flex-col min-h-screen'>
          <Routes>
            <Route
                path="/"
                element={
                  <>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <QuoteList quotes={filteredQuotes} />
                  </>
                }
            />
            <Route path="/admin" element={<AdminApp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </Router>
  );
};

export default QuoteApp;