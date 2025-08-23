// Dashboard page code

import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Tag, University, List, Grid, Plus, Search, Filter } from 'lucide-react';

// Sample data - replace with your actual data source
const samplePrograms = [
  {
    id: 1,
    name: "MS Computer Science",
    university: "UT Austin",
    location: "Austin, TX",
    deadline: new Date(2025, 11, 15), // December 15, 2025
    keywords: ["AI", "Systems", "Theory"],
    funding: ["RA/TA", "Fellowships"],
    status: "Not Started",
    notes: ""
  },
  {
    id: 2,
    name: "PhD Computer Science",
    university: "Stanford University",
    location: "Stanford, CA",
    deadline: new Date(2025, 11, 1), // December 1, 2025
    keywords: ["Machine Learning", "AI", "Robotics"],
    funding: ["Research Assistantship", "Fellowship"],
    status: "In Progress",
    notes: "Need to complete SOP"
  },
  {
    id: 3,
    name: "MS Data Science",
    university: "MIT",
    location: "Cambridge, MA",
    deadline: new Date(2025, 11, 31), // December 31, 2025
    keywords: ["Data Science", "Statistics", "ML"],
    funding: ["TA", "Partial Funding"],
    status: "Submitted",
    notes: "Application complete"
  },
  {
    id: 4,
    name: "PhD Artificial Intelligence",
    university: "Carnegie Mellon",
    location: "Pittsburgh, PA",
    deadline: new Date(2025, 10, 30), // November 30, 2025
    keywords: ["AI", "Deep Learning", "NLP"],
    funding: ["Full Funding", "Research Grant"],
    status: "Not Started",
    notes: ""
  }
];

const statusColors = {
  "Not Started": "bg-gray-100 text-gray-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  "Submitted": "bg-green-100 text-green-800",
  "Rejected": "bg-red-100 text-red-800",
  "Accepted": "bg-blue-100 text-blue-800"
};

function formatDate(date) {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function getDaysUntilDeadline(deadline) {
  const today = new Date();
  const timeDiff = deadline.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
}

function ProgramCard({ program }) {
  const daysLeft = getDaysUntilDeadline(program.deadline);
  const isUrgent = daysLeft <= 30 && daysLeft > 0;
  const isOverdue = daysLeft < 0;

  return (
    <div className={`bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-200 ${
      isOverdue ? 'border-red-300' : isUrgent ? 'border-yellow-300' : 'border-gray-200'
    }`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{program.name}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <University className="w-4 h-4 mr-2" />
              <span className="font-medium">{program.university}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{program.location}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[program.status]}`}>
            {program.status}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : isUrgent ? 'text-yellow-600 font-medium' : 'text-gray-600'}`}>
              {formatDate(program.deadline)}
              {daysLeft > 0 && ` (${daysLeft} days left)`}
              {daysLeft === 0 && ' (Today!)'}
              {daysLeft < 0 && ` (${Math.abs(daysLeft)} days overdue)`}
            </span>
          </div>

          <div className="flex items-start">
            <Tag className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
            <div className="flex flex-wrap gap-1">
              {program.keywords.map((keyword, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-start">
            <DollarSign className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
            <div className="flex flex-wrap gap-1">
              {program.funding.map((fund, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  {fund}
                </span>
              ))}
            </div>
          </div>
        </div>

        {program.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
            <strong>Notes:</strong> {program.notes}
          </div>
        )}
      </div>
    </div>
  );
}

function ProgramListItem({ program }) {
  const daysLeft = getDaysUntilDeadline(program.deadline);
  const isUrgent = daysLeft <= 30 && daysLeft > 0;
  const isOverdue = daysLeft < 0;

  return (
    <div className={`bg-white border rounded p-3 hover:shadow-sm transition-shadow duration-200 ${
      isOverdue ? 'border-red-300' : isUrgent ? 'border-yellow-300' : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between gap-6 w-full">
        {/* Program & University */}
        <div className="flex-1 min-w-0 max-w-xs">
          <h3 className="font-medium text-gray-900 text-sm truncate">{program.name}</h3>
          <p className="text-xs text-gray-600 truncate">{program.university}</p>
        </div>
        
        {/* Location */}
        <div className="flex-shrink-0 w-24 text-xs text-gray-500 truncate">
          {program.location}
        </div>
        
        {/* Deadline */}
        <div className={`flex-shrink-0 w-28 text-xs text-right ${isOverdue ? 'text-red-600 font-medium' : isUrgent ? 'text-yellow-600 font-medium' : 'text-gray-600'}`}>
          <div>{formatDate(program.deadline)}</div>
          <div className="opacity-75">
            {daysLeft > 0 && `${daysLeft}d left`}
            {daysLeft === 0 && 'Today!'}
            {daysLeft < 0 && `${Math.abs(daysLeft)}d over`}
          </div>
        </div>
        
        {/* Keywords */}
        <div className="flex-1 min-w-0 max-w-xs">
          <div className="flex flex-wrap gap-1">
            {program.keywords.slice(0, 3).map((keyword, index) => (
              <span key={index} className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded truncate">
                {keyword}
              </span>
            ))}
            {program.keywords.length > 3 && (
              <span className="text-xs text-gray-500">+{program.keywords.length - 3}</span>
            )}
          </div>
        </div>
        
        {/* Funding */}
        <div className="flex-1 min-w-0 max-w-xs">
          <div className="flex flex-wrap gap-1">
            {program.funding.slice(0, 2).map((fund, index) => (
              <span key={index} className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded truncate">
                {fund}
              </span>
            ))}
            {program.funding.length > 2 && (
              <span className="text-xs text-gray-500">+{program.funding.length - 2}</span>
            )}
          </div>
        </div>
        
        {/* Status */}
        <div className="flex-shrink-0">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[program.status]}`}>
            {program.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [programs, setPrograms] = useState(samplePrograms);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter programs based on search and status
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort by deadline (earliest first)
  const sortedPrograms = [...filteredPrograms].sort((a, b) => a.deadline - b.deadline);

  const stats = {
    total: programs.length,
    notStarted: programs.filter(p => p.status === 'Not Started').length,
    inProgress: programs.filter(p => p.status === 'In Progress').length,
    submitted: programs.filter(p => p.status === 'Submitted').length
  };

  const upcomingDeadlines = programs
    .filter(p => getDaysUntilDeadline(p.deadline) <= 30 && getDaysUntilDeadline(p.deadline) >= 0)
    .sort((a, b) => a.deadline - b.deadline);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Graduate School Application Dashboard</h1>
          <p className="text-gray-600">Track and manage your graduate program applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <University className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Programs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Not Started</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.notStarted}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.inProgress}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.submitted}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines Alert */}
        {upcomingDeadlines.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
              <h3 className="font-medium text-yellow-800">Upcoming Deadlines (Next 30 Days)</h3>
            </div>
            <div className="space-y-1">
              {upcomingDeadlines.map(program => (
                <div key={program.id} className="text-sm text-yellow-700">
                  <strong>{program.university}</strong> - {program.name} 
                  <span className="ml-2 text-yellow-600">({formatDate(program.deadline)} - {getDaysUntilDeadline(program.deadline)} days left)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search programs, universities, or keywords..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-lg ${
                  viewMode === 'cards' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              
              <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Program</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {sortedPrograms.length} of {programs.length} programs
          </p>
        </div>

        {/* Programs Display */}
        {sortedPrograms.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <University className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No programs found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        ) : (
          <div className={viewMode === 'cards' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {sortedPrograms.map(program => (
              viewMode === 'cards' 
                ? <ProgramCard key={program.id} program={program} />
                : <ProgramListItem key={program.id} program={program} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}