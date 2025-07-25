// D:\agency-website\src\components\Admin.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdDashboard, 
  MdEmail, 
  MdPerson, 
  MdBusiness, 
  MdMessage,
  MdVisibility,
  MdDelete,
  MdReply,
  MdSearch,
  MdFilterList,
  MdDownload,
  MdClose,
  MdCalendarToday,
  MdTrendingUp,
  MdCheckCircle,
  MdPending,
  MdLogout,
} from 'react-icons/md';
import Link from 'next/link';

interface Contact {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  status: 'new' | 'replied' | 'pending';
  date: string;
  time: string;
  created_at?: string;
}

interface Stats {
  pending: number;
  total: number;
  new: number;
  replied: number;
  thisMonth: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: number;
}

interface ContactModalProps {
  contact: Contact;
  onClose: () => void;
}

const AdminPanel: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'contacts'>('dashboard');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'replied' | 'pending'>('all');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    replied: 0,
    pending: 0,
    thisMonth: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/submissions');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data: Contact[] = await response.json();
        
        const normalizedData = data.map(item => ({
          ...item,
          company: item.company || '', // Normalize null to empty string
        }));

        const currentMonth = new Date().toISOString().slice(0, 7);
        const thisMonthContacts = normalizedData.filter(contact => 
          contact.date.slice(0, 7) === currentMonth
        );

        setContacts(normalizedData);
        setStats({
          total: normalizedData.length,
          new: normalizedData.filter(c => c.status === 'new').length,
          replied: normalizedData.filter(c => c.status === 'replied').length,
          pending: normalizedData.filter(c => c.status === 'pending').length,
          thisMonth: thisMonthContacts.length,
        });
        setError(null);
      } catch (err) {
        setError('Failed to load contacts. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setContacts(prev => prev.filter(contact => contact.id !== id));
        setStats(prev => ({
          ...prev,
          total: prev.total - 1,
          new: prev.new - (contacts.find(c => c.id === id)?.status === 'new' ? 1 : 0),
          replied: prev.replied - (contacts.find(c => c.id === id)?.status === 'replied' ? 1 : 0),
          pending: prev.pending - (contacts.find(c => c.id === id)?.status === 'pending' ? 1 : 0),
          thisMonth: prev.thisMonth - (contacts.find(c => c.id === id)?.date.slice(0, 7) === new Date().toISOString().slice(0, 7) ? 1 : 0),
        }));
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleStatusChange = async (id: number, newStatus: Contact['status']) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setContacts(prev =>
          prev.map(contact =>
            contact.id === id ? { ...contact, status: newStatus } : contact
          )
        );
        setStats(prev => ({
          ...prev,
          new: prev.new + (newStatus === 'new' ? 1 : contacts.find(c => c.id === id)?.status === 'new' ? -1 : 0),
          replied: prev.replied + (newStatus === 'replied' ? 1 : contacts.find(c => c.id === id)?.status === 'replied' ? -1 : 0),
          pending: prev.pending + (newStatus === 'pending' ? 1 : contacts.find(c => c.id === id)?.status === 'pending' ? -1 : 0),
        }));
        if (selectedContact?.id === id) {
          setSelectedContact(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesFilter = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Contact['status']): string => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'replied': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: Contact['status']): JSX.Element => {
    switch (status) {
      case 'new': return <MdEmail className="w-4 h-4" />;
      case 'replied': return <MdCheckCircle className="w-4 h-4" />;
      case 'pending': return <MdPending className="w-4 h-4" />;
      default: return <MdEmail className="w-4 h-4" />;
    }
  };

  const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg hover:shadow-orange-500/10 transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-green-500">
              <MdTrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+{trend}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const ContactModal: React.FC<ContactModalProps> = ({ contact, onClose }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Contact Details</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm font-medium">Name</label>
                <p className="text-white text-lg">{contact.name}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm font-medium">Status</label>
                <select
                  value={contact.status}
                  onChange={(e) => handleStatusChange(contact.id, e.target.value as Contact['status'])}
                  className="mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none w-full"
                >
                  <option value="new">New</option>
                  <option value="replied">Replied</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-sm font-medium">Email</label>
              <p className="text-white text-lg">{contact.email}</p>
            </div>

            <div>
              <label className="text-gray-400 text-sm font-medium">Company</label>
              <p className="text-white text-lg">{contact.company || 'N/A'}</p>
            </div>

            <div>
              <label className="text-gray-400 text-sm font-medium">Date & Time</label>
              <p className="text-white text-lg">{contact.date} at {contact.time}</p>
            </div>

            <div>
              <label className="text-gray-400 text-sm font-medium">Message</label>
              <div className="bg-gray-800 p-4 rounded-lg mt-2">
                <p className="text-white text-base">{contact.message}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => handleStatusChange(contact.id, 'replied')}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <MdReply className="w-4 h-4" />
              Mark as Replied
            </button>
            <button
              onClick={() => handleDelete(contact.id)}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <MdDelete className="w-4 h-4" />
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-800 z-40 shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-500">ENHC</span>
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-orange-500 transition-colors text-base font-medium">
              Home
            </Link>
            <Link href="/#about" className="text-gray-300 hover:text-orange-500 transition-colors text-base font-medium">
              About
            </Link>
            <Link href="/#services" className="text-gray-300 hover:text-orange-500 transition-colors text-base font-medium">
              Services
            </Link>
            <Link href="/#works" className="text-gray-300 hover:text-orange-500 transition-colors text-base font-medium">
              Works
            </Link>
            <Link href="/#contact" className="text-gray-300 hover:text-orange-500 transition-colors text-base font-medium">
              Contact
            </Link>
            <span className="text-orange-500 font-semibold">Admin</span>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-orange-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen fixed h-screen">
          <nav className="p-4 mt-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-base font-medium ${
                    activeTab === 'dashboard' ? 'bg-orange-500 text-white' : 'text-gray-300 hover:text-orange-500 hover:bg-gray-800'
                  }`}
                >
                  <MdDashboard className="w-5 h-5" />
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-base font-medium ${
                    activeTab === 'contacts' ? 'bg-orange-500 text-white' : 'text-gray-300 hover:text-orange-500 hover:bg-gray-800'
                  }`}
                >
                  <MdEmail className="w-5 h-5" />
                  Contacts
                </button>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-red-500 hover:bg-gray-800 transition-colors text-base font-medium"
                >
                  <MdLogout className="w-5 h-5" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 ml-64">
          {isLoading && (
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading contacts...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          {!isLoading && !error && activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Contacts"
                  value={stats.total}
                  icon={<MdEmail className="w-6 h-6 text-white" />}
                  color="bg-blue-500"
                  trend={12}
                />
                <StatCard
                  title="New Messages"
                  value={stats.new}
                  icon={<MdMessage className="w-6 h-6 text-white" />}
                  color="bg-green-500"
                  trend={8}
                />
                <StatCard
                  title="Replied"
                  value={stats.replied}
                  icon={<MdCheckCircle className="w-6 h-6 text-white" />}
                  color="bg-orange-500"
                />
                <StatCard
                  title="This Month"
                  value={stats.thisMonth}
                  icon={<MdCalendarToday className="w-6 h-6 text-white" />}
                  color="bg-purple-500"
                  trend={15}
                />
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">Recent Contacts</h3>
                <div className="space-y-3">
                  {contacts.slice(0, 5).map((contact) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                          <MdPerson className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{contact.name}</p>
                          <p className="text-gray-400 text-sm">{contact.company || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs text-white ${getStatusColor(contact.status)}`}>
                          {getStatusIcon(contact.status)}
                          <span className="ml-1 capitalize">{contact.status}</span>
                        </span>
                        <span className="text-gray-400 text-sm">{contact.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {!isLoading && !error && activeTab === 'contacts' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-white">Contact Submissions</h2>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 h-10 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as 'all' | 'new' | 'replied' | 'pending')}
                    className="px-4 h-10 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Contacts</option>
                    <option value="new">New</option>
                    <option value="replied">Replied</option>
                    <option value="pending">Pending</option>
                  </select>
                  <button
                    onClick={() => {
                      const csv = [
                        'ID,Name,Email,Company,Message,Status,Date,Time',
                        ...contacts.map(c =>
                          `${c.id},"${c.name.replace(/"/g, '""')}","${c.email.replace(/"/g, '""')}","${(c.company || '').replace(/"/g, '""')}","${c.message.replace(/"/g, '""')}",${c.status},${c.date},${c.time}`
                        ),
                      ].join('\n');
                      const blob = new Blob([csv], { type: 'text/csv' });
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'contacts.csv';
                      a.click();
                      window.URL.revokeObjectURL(url);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    <MdDownload className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Contacts Table */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Name</th>
                        <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Email</th>
                        <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Company</th>
                        <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Status</th>
                        <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Date</th>
                        <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map((contact) => (
                        <tr key={contact.id} className="border-t border-gray-800 hover:bg-gray-700 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                <MdPerson className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-white font-medium">{contact.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm">{contact.email}</td>
                          <td className="px-6 py-4 text-gray-400 text-sm">{contact.company || 'N/A'}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs text-white ${getStatusColor(contact.status)}`}>
                              {getStatusIcon(contact.status)}
                              <span className="ml-1 capitalize">{contact.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm">{contact.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setSelectedContact(contact)}
                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
                              >
                                <MdVisibility className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleStatusChange(contact.id, 'replied')}
                                className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-800 rounded-lg transition-colors"
                              >
                                <MdReply className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(contact.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-lg transition-colors"
                              >
                                <MdDelete className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Contact Modal */}
          {selectedContact && (
            <ContactModal
              contact={selectedContact}
              onClose={() => setSelectedContact(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;