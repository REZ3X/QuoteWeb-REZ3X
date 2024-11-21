// QuoteApp.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import SearchBar from './SearchBar';
import QuoteList from './QuoteList';
import AdminApp from '../admin/AdminApp';
import Footer from './Footer';
import quoteData from '../../utils/quoteData';

const QuoteApp = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuotes = quoteData().filter(quote =>
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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default QuoteApp;