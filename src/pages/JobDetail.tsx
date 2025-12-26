import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  MapPin,
  Tag,
  Clock,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  ArrowLeft,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FormInput } from '../components/FormInput';
import { SuccessMessage } from '../components/SuccessMessage';

interface JobDetail {
  id: string;
  company_name: string;
  job_title: string;
  job_location: string;
  job_category: string;
  employment_type: string;
  experience_level: string;
  salary_range: string;
  job_description: string;
  responsibilities: string;
  required_skills: string;
  contact_email: string;
  contact_phone: string;
  created_at: string;
  number_of_openings: number;
}

export function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    if (id) {
      fetchJobDetail();
    }
  }, [id]);

  const fetchJobDetail = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .eq('status', 'active')
        .maybeSingle();

      if (error) throw error;
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      phone: '',
      message: '',
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from('job_applications').insert([
        {
          job_id: id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          resume_url: 'pending',
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
      });
      setErrors({
        fullName: '',
        email: '',
        phone: '',
        message: '',
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50"></div>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4 text-center font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50"></div>
        <div className="relative text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mb-6 shadow-2xl">
            <Briefcase className="w-12 h-12 text-white" />
          </div>
          <p className="text-gray-800 text-2xl font-bold mb-4">Job not found</p>
          <p className="text-gray-600 mb-6">This job posting may have expired or been removed</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all hover:shadow-lg">
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative py-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50"></div>
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-600 hover:text-blue-700 mb-8 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-blue-100"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Jobs
        </Link>

        {success && (
          <div className="mb-8 animate-fade-in">
            <SuccessMessage message="Thank you! Your application has been submitted successfully." />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 border-2 border-blue-100">
              <div className="flex items-start gap-6 mb-8">
                <div className="p-5 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl shadow-xl">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
                    {job.job_title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-700">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 border border-blue-100">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">{job.company_name}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-teal-600" />
                      <span className="font-medium">{job.job_location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Tag className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs font-medium mb-1">Category</p>
                    <p className="font-bold text-gray-900">{job.job_category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Clock className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs font-medium mb-1">Type</p>
                    <p className="font-bold text-gray-900">{job.employment_type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs font-medium mb-1">Experience</p>
                    <p className="font-bold text-gray-900">{job.experience_level}</p>
                  </div>
                </div>
                {job.salary_range && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-medium mb-1">Salary</p>
                      <p className="font-bold text-gray-900">{job.salary_range}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                      1
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Job Description</h2>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-4"></div>
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {job.job_description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                      2
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Key Responsibilities</h2>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full mb-4"></div>
                  <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {job.responsibilities}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                      3
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Required Skills & Qualifications</h2>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-4"></div>
                  <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {job.required_skills}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 border-blue-100 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Apply Now</h2>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mb-6"></div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <FormInput
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    error={errors.fullName}
                  />
                  {errors.fullName && (
                    <div className="mt-2 flex items-start gap-2 text-red-600 text-sm font-medium bg-red-50 border-2 border-red-300 rounded-lg px-3 py-2 animate-fade-in">
                      <span className="text-red-600 font-bold text-base">⚠</span>
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <FormInput
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    error={errors.email}
                  />
                  {errors.email && (
                    <div className="mt-2 flex items-start gap-2 text-red-600 text-sm font-medium bg-red-50 border-2 border-red-300 rounded-lg px-3 py-2 animate-fade-in">
                      <span className="text-red-600 font-bold text-base">⚠</span>
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <FormInput
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 1234567890"
                    required
                    error={errors.phone}
                  />
                  {errors.phone && (
                    <div className="mt-2 flex items-start gap-2 text-red-600 text-sm font-medium bg-red-50 border-2 border-red-300 rounded-lg px-3 py-2 animate-fade-in">
                      <span className="text-red-600 font-bold text-base">⚠</span>
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <FormInput
                    label="Cover Letter / Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us why you're a great fit..."
                    multiline
                    rows={5}
                    error={errors.message}
                  />
                  {errors.message && (
                    <div className="mt-2 flex items-start gap-2 text-red-600 text-sm font-medium bg-red-50 border-2 border-red-300 rounded-lg px-3 py-2 animate-fade-in">
                      <span className="text-red-600 font-bold text-base">⚠</span>
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:via-blue-600 hover:to-teal-600 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] hover:scale-105 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-lg relative overflow-hidden group"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Briefcase className="w-5 h-5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t-2 border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg hover:from-blue-100 hover:to-blue-50 transition-all duration-300 shadow-sm hover:shadow-md border border-blue-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <a
                      href={`mailto:${job.contact_email}`}
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {job.contact_email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Phone className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{job.contact_phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Calendar className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Posted {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
