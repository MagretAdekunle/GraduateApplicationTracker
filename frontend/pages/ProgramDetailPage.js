import React from 'react';
import { ArrowLeft, Calendar, MapPin, DollarSign, FileText, Users, University, Info, Tag } from 'lucide-react';

const statusColors = {
  "Not Started": "bg-gray-100 text-gray-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  "Submitted": "bg-green-100 text-green-800",
  "Rejected": "bg-red-100 text-red-800",
  "Accepted": "bg-blue-100 text-blue-800"
};

function getDaysUntilDeadline(deadline) {
  const today = new Date();
  const timeDiff = deadline.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export default function ProgramDetailPage({ program, onBack }) {
  const daysLeft = getDaysUntilDeadline(program.deadline);
  const isUrgent = daysLeft <= 30 && daysLeft > 0;
  const isOverdue = daysLeft < 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 sm:p-8">

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>

        {/* Program Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{program.name}</h1>
            <div className="flex items-center text-gray-600 mt-1">
              <University className="w-4 h-4 mr-1" />
              <span>{program.university}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{program.location}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[program.status]}`}>
            {program.status}
          </div>
        </div>

        {/* Deadline */}
        <div className={`flex items-center text-sm mb-4 ${isOverdue ? 'text-red-600 font-medium' : isUrgent ? 'text-yellow-600 font-medium' : 'text-gray-700'}`}>
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          <span>
            Deadline: {program.deadline.toLocaleDateString()} 
            {daysLeft > 0 && ` (${daysLeft} days left)`} 
            {daysLeft === 0 && ' (Today!)'}
            {daysLeft < 0 && ` (${Math.abs(daysLeft)} days overdue)`}
          </span>
        </div>

        {/* Application Essentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
            <span>Application Fee: $90</span>
          </div>
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-2 text-gray-400" />
            <span>Transcripts Required: 2</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            <span>Recommendation Letters: 3</span>
          </div>
          <div className="flex items-center">
            <Info className="w-4 h-4 mr-2 text-gray-400" />
            <span>SOP Required: Yes</span>
          </div>
          <div className="flex items-center">
            <Info className="w-4 h-4 mr-2 text-gray-400" />
            <span>GRE Required: Yes</span>
          </div>
        </div>

        {/* Keywords */}
        {program.keywords && program.keywords.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {program.keywords.map((keyword, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{keyword}</span>
              ))}
            </div>
          </div>
        )}

        {/* Funding Info */}
        {program.funding && program.funding.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Funding</h2>
            <div className="flex flex-wrap gap-2">
              {program.funding.map((fund, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  {fund}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Additional Notes</h2>
          <p className="text-gray-700 text-sm">{program.notes || "No notes available."}</p>
        </div>

        {/* Program Website */}
        <div>
          <a
            href={`https://www.${program.university.replace(/\s/g, '').toLowerCase()}.edu`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Visit Program Website
          </a>
        </div>
      </div>
    </div>
  );
}
