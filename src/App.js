import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';

function App() {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use environment variable or fallback to localhost
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/person';
    
    fetch(API_URL)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setPerson(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-xl text-red-600 mb-4">Error: {error}</div>
          <div className="text-gray-600">Make sure the backend is running!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <User size={48} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{person.name}</h1>
                <p className="text-blue-100 mt-1">{person.occupation}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed">{person.bio}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h2>
              
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="text-blue-600" size={20} />
                <span>{person.email}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="text-blue-600" size={20} />
                <span>{person.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="text-blue-600" size={20} />
                <span>{person.location}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Briefcase className="text-blue-600" size={20} />
                <span>{person.occupation}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="text-blue-600" size={20} />
                <span>{person.dateOfBirth}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;