import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Building2, Tag, Star } from 'lucide-react';

interface JobCardProps {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  category: string;
  description: string;
  isFeatured?: boolean;
}

export function JobCard({
  id,
  jobTitle,
  companyName,
  location,
  category,
  description,
  isFeatured = false,
}: JobCardProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={`bg-white border rounded-lg p-4 sm:p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative ${
      isFeatured ? 'border-orange-400 border-2 shadow-lg' : 'border-gray-200 hover:border-blue-200'
    }`}>
      {isFeatured && (
        <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1 shadow-xl animate-pulse">
          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white" />
          TOP JOB
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div className={`p-2.5 sm:p-3 rounded-lg shadow-md ${isFeatured ? 'bg-gradient-to-br from-orange-50 to-orange-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
          <Briefcase className={`w-5 h-5 sm:w-6 sm:h-6 ${isFeatured ? 'text-orange-600' : 'text-blue-600'}`} />
        </div>
        <div className="flex-1 w-full">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{jobTitle}</h3>

          <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{companyName}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{category}</span>
            </div>
          </div>

          <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
            {truncateText(description, 150)}
          </p>

          <Link
            to={`/job/${id}`}
            className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
