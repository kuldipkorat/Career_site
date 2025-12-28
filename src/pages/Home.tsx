import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Upload, DollarSign, Building2, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { JobCard } from '../components/JobCard';

interface Job {
  id: string;
  job_title: string;
  company_name: string;
  job_location: string;
  job_category: string;
  job_description: string;
  created_at: string;
  is_featured: boolean;
}

const categories = [
  'IT',
  'Sales',
  'Marketing',
  'HR',
  'Finance',
  'Healthcare',
  'Education',
  'Engineering',
  'Operations',
  'Customer Service',
  'Other',
];

export function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchKeyword, selectedLocation, selectedCategory]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
      setFilteredJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (searchKeyword) {
      filtered = filtered.filter(
        (job) =>
          job.job_title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.job_description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.company_name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter((job) =>
        job.job_location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((job) => job.job_category === selectedCategory);
    }

    setFilteredJobs(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterJobs();
  };

  const quickLinks = [
    {
      title: 'Submit Your Resume',
      description: 'Upload your resume and let employers find you.',
      icon: Upload,
      buttonText: 'Submit Now',
      link: '/submit-resume',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Paid Service for Hiring',
      description: 'Companies & consultancies: Get premium hiring support.',
      icon: DollarSign,
      buttonText: 'Learn More',
      link: '/paid-service',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Fleet for Companies',
      description: 'Register your company and build a trusted profile.',
      icon: Building2,
      buttonText: 'Register',
      link: '/fleet',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Contact Us',
      description: 'Have questions or need support? Get in touch.',
      icon: MessageSquare,
      buttonText: 'Contact',
      link: '/contact',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-blue-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Professional workspace"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-700/90"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 animate-fade-in">
              🎯 Your Trusted Career Partner
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 animate-fade-in leading-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Find the <span className="text-orange-300">Best Jobs</span> Anywhere
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 text-blue-50 animate-fade-in font-light px-4 sm:px-0" style={{ lineHeight: '1.6' }}>
              Browse open positions, submit your resume, or connect as a company or consultancy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in px-4 sm:px-0">
              <Link
                to="/submit-resume"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-white transition-all duration-300 hover:scale-105 hover:shadow-xl text-base sm:text-lg border-2 border-blue-200 hover:border-blue-400 text-center"
              >
                Submit Your Resume
              </Link>
              <Link
                to="/post-job"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all hover:scale-105 hover:shadow-xl text-base sm:text-lg text-center"
              >
                Post a Job
              </Link>
              <Link
                to="/contact"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition-all hover:scale-105 hover:shadow-xl text-base sm:text-lg border-2 border-white text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 border-2 border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            Search Jobs
          </h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  placeholder="Job title, skills, or company..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City or region..."
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-10 py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] hover:scale-105 flex items-center justify-center gap-2 mx-auto shadow-lg relative overflow-hidden group"
            >
              <Search className="w-5 h-5" />
              Search Jobs
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Latest Open <span className="text-blue-600">Jobs</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exciting career opportunities from top companies and consultancies
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No jobs found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchKeyword('');
                setSelectedLocation('');
                setSelectedCategory('');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                jobTitle={job.job_title}
                companyName={job.company_name}
                location={job.job_location}
                category={job.job_category}
                description={job.job_description}
                isFeatured={job.is_featured}
              />
            ))}
          </div>
        )}
      </section>

      <section className="relative bg-blue-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 sm:mb-2">500+</div>
              <div className="text-blue-100 text-sm sm:text-base md:text-lg">Active Jobs</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 sm:mb-2">200+</div>
              <div className="text-blue-100 text-sm sm:text-base md:text-lg">Companies</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 sm:mb-2">1000+</div>
              <div className="text-blue-100 text-sm sm:text-base md:text-lg">Candidates</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 sm:mb-2">95%</div>
              <div className="text-blue-100 text-sm sm:text-base md:text-lg">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Explore <span className="text-teal-600">More Options</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're looking for a job or hiring talent, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((item, index) => {
              const images = [
                'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
              ];
              return (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="absolute inset-0">
                    <img
                      src={images[index]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${item.bgColor.replace('bg-', 'bg-gradient-to-br from-')} to-white opacity-95`}></div>
                  </div>
                  <div className="relative z-10 p-8">
                    <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md`}>
                      <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{item.description}</p>
                    <Link
                      to={item.link}
                      className={`inline-block w-full text-center px-6 py-3 ${item.iconColor.replace('text-', 'bg-')} text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl`}
                    >
                      {item.buttonText}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
