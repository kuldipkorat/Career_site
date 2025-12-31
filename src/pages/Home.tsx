import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Upload, DollarSign, Building2, MessageSquare, Briefcase, Users, TrendingUp, Shield, AlertCircle } from 'lucide-react';
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

const MOCK_JOBS: Job[] = [
  {
    id: 'mock-1',
    job_title: 'Software Developer',
    company_name: 'Tech Solutions Kutch',
    job_location: 'Bhuj, Kutch',
    job_category: 'IT',
    job_description: 'We are looking for an experienced software developer to join our growing team in Kutch. Experience with React, Node.js, and databases required.',
    created_at: new Date().toISOString(),
    is_featured: true,
  },
  {
    id: 'mock-2',
    job_title: 'Sales Manager',
    company_name: 'Kutch Industries Ltd',
    job_location: 'Gandhidham, Kutch',
    job_category: 'Sales',
    job_description: 'Lead our sales team in the Kutch region. Minimum 3 years experience in B2B sales required.',
    created_at: new Date().toISOString(),
    is_featured: false,
  },
  {
    id: 'mock-3',
    job_title: 'Fresher Trainee',
    company_name: 'Gujarat Manufacturing Co',
    job_location: 'Mundra, Kutch',
    job_category: 'Freshers',
    job_description: 'Training program for fresh graduates. Great opportunity to start your career in manufacturing sector.',
    created_at: new Date().toISOString(),
    is_featured: false,
  },
];

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
  'Manufacturing',
  'Government',
  'Freshers',
  'Other',
];

export function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        setJobs(data);
        setFilteredJobs(data);
      } else {
        setJobs(MOCK_JOBS);
        setFilteredJobs(MOCK_JOBS);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Unable to load jobs from server. Showing sample jobs.');
      setJobs(MOCK_JOBS);
      setFilteredJobs(MOCK_JOBS);
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

  const jobCategories = [
    { name: 'IT & Software', icon: '💻', count: filteredJobs.filter(j => j.job_category === 'IT').length, category: 'IT' },
    { name: 'Sales & Marketing', icon: '📊', count: filteredJobs.filter(j => ['Sales', 'Marketing'].includes(j.job_category)).length, category: 'Sales' },
    { name: 'Manufacturing', icon: '🏭', count: filteredJobs.filter(j => j.job_category === 'Manufacturing').length, category: 'Manufacturing' },
    { name: 'Government', icon: '🏛️', count: filteredJobs.filter(j => j.job_category === 'Government').length, category: 'Government' },
    { name: 'Freshers', icon: '🎓', count: filteredJobs.filter(j => j.job_category === 'Freshers').length, category: 'Freshers' },
    { name: 'Healthcare', icon: '⚕️', count: filteredJobs.filter(j => j.job_category === 'Healthcare').length, category: 'Healthcare' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Professional workspace"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-white/30">
              <span>🌟</span>
              <span>Kutch's Premier Job Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
              Find Jobs in <span className="text-yellow-300">Kutch</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 text-blue-50 font-light px-4 sm:px-0" style={{ lineHeight: '1.6' }}>
              Local jobs and career opportunities in the Kutch region. Connect with top employers and grow your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link
                to="/submit-resume"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-base sm:text-lg"
              >
                <Upload className="w-5 h-5" />
                Submit Resume
              </Link>
              <Link
                to="/post-job"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-all hover:scale-105 hover:shadow-2xl text-base sm:text-lg"
              >
                <Briefcase className="w-5 h-5" />
                Post a Job
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

        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-lg">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
            <button
              onClick={() => {
                setSearchKeyword('');
                setSelectedLocation('');
                setSelectedCategory('');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Clear all filters
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

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Browse by <span className="text-blue-600">Category</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Find opportunities in your field of expertise
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {jobCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => {
                  setSelectedCategory(cat.category);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-blue-200 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{cat.name}</h3>
                <p className="text-xs text-gray-500">{cat.count} {cat.count === 1 ? 'job' : 'jobs'}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Why Choose <span className="text-yellow-300">Kutch Career Platform?</span>
            </h2>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
              Your trusted partner for local employment in the Kutch region
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Focus</h3>
              <p className="text-blue-100 text-sm">
                Jobs exclusively from Kutch region companies and industries
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Employers</h3>
              <p className="text-blue-100 text-sm">
                All companies are verified to ensure genuine opportunities
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Hiring</h3>
              <p className="text-blue-100 text-sm">
                Fast-track application process with direct employer connect
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-2">Free for All</h3>
              <p className="text-blue-100 text-sm">
                100% free job search and resume submission for candidates
              </p>
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
