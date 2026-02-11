import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, CheckCircle, Circle, RefreshCw, Trash2 } from 'lucide-react';

// Replace with your Supabase credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const AdminPanel = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts?order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError('Failed to load messages. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id, currentStatus) => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          read: !currentStatus
        })
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (err) {
      console.error('Failed to update message:', err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'read') return msg.read;
    return true;
  });

  const stats = {
    total: messages.length,
    unread: messages.filter(m => !m.read).length,
    read: messages.filter(m => m.read).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Contact Messages
            </span>
          </h1>
          <p className="text-slate-400">Manage your portfolio contact form submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Messages</p>
                <p className="text-3xl font-bold text-slate-100">{stats.total}</p>
              </div>
              <Mail className="text-cyan-400" size={40} />
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Unread</p>
                <p className="text-3xl font-bold text-emerald-400">{stats.unread}</p>
              </div>
              <Circle className="text-emerald-400" size={40} />
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Read</p>
                <p className="text-3xl font-bold text-blue-400">{stats.read}</p>
              </div>
              <CheckCircle className="text-blue-400" size={40} />
            </div>
          </div>
        </div>

        {/* Filters and Refresh */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'unread'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              Unread ({stats.unread})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'read'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              Read ({stats.read})
            </button>
          </div>

          <button
            onClick={fetchMessages}
            disabled={loading}
            className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-lg hover:bg-slate-700/50 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <RefreshCw size={40} className="animate-spin mx-auto text-cyan-400 mb-4" />
            <p className="text-slate-400">Loading messages...</p>
          </div>
        )}

        {/* Messages List */}
        {!loading && filteredMessages.length === 0 && (
          <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <Mail size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">No messages found</p>
            <p className="text-slate-500 text-sm mt-2">
              {filter === 'unread' && 'All messages have been read'}
              {filter === 'read' && 'No read messages yet'}
              {filter === 'all' && 'No contact form submissions yet'}
            </p>
          </div>
        )}

        {!loading && filteredMessages.length > 0 && (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`bg-slate-800/50 border rounded-xl p-6 transition-all hover:border-cyan-500/50 ${
                  message.read ? 'border-slate-700/50' : 'border-emerald-500/30'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-100">{message.name}</h3>
                      {!message.read && (
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
                          New
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-cyan-400" />
                        <a href={`mailto:${message.email}`} className="hover:text-cyan-400 transition-colors">
                          {message.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-500" />
                        {new Date(message.created_at).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => markAsRead(message.id, message.read)}
                      className={`p-2 rounded-lg transition-all ${
                        message.read
                          ? 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
                          : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                      }`}
                      title={message.read ? 'Mark as unread' : 'Mark as read'}
                    >
                      {message.read ? <Circle size={20} /> : <CheckCircle size={20} />}
                    </button>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                      title="Delete message"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={`mailto:${message.email}?subject=Re: Your message from ${message.name}`}
                    className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all text-sm font-medium"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
