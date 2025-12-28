import { useState } from 'react';
import { Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FormInput } from '../components/FormInput';
import { SuccessMessage } from '../components/SuccessMessage';
import { ErrorMessage } from '../components/ErrorMessage';

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

const experienceOptions = [
  { value: '0', label: 'Fresher' },
  { value: '1', label: '1 year' },
  { value: '2', label: '2 years' },
  { value: '3', label: '3 years' },
  { value: '4', label: '4 years' },
  { value: '5', label: '5 years' },
  { value: '6', label: '6-10 years' },
  { value: '10', label: '10+ years' },
];

export function SubmitResume() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    totalExperience: '',
    jobCategory: '',
    lastCompanyName: '',
    lastJobTitle: '',
    lastCompanyDuration: '',
    lastCompanyResponsibilities: '',
    skills: '',
    preferredLocations: '',
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    totalExperience: '',
    jobCategory: '',
    currentSalary: '',
    expectedSalary: '',
    lastCompanyName: '',
    lastJobTitle: '',
    lastCompanyDuration: '',
    lastCompanyResponsibilities: '',
    reasonForLeaving: '',
    skills: '',
    preferredLocations: '',
    additionalComments: '',
  });

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
      location: '',
      totalExperience: '',
      jobCategory: '',
      lastCompanyName: '',
      lastJobTitle: '',
      lastCompanyDuration: '',
      lastCompanyResponsibilities: '',
      skills: '',
      preferredLocations: '',
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

    if (!formData.location.trim()) {
      newErrors.location = 'Current location is required';
      isValid = false;
    }

    if (!formData.totalExperience) {
      newErrors.totalExperience = 'Please select your experience level';
      isValid = false;
    }

    if (!formData.jobCategory) {
      newErrors.jobCategory = 'Please select a job category';
      isValid = false;
    }

    if (!formData.lastCompanyName.trim()) {
      newErrors.lastCompanyName = 'Last company name is required';
      isValid = false;
    }

    if (!formData.lastJobTitle.trim()) {
      newErrors.lastJobTitle = 'Job title is required';
      isValid = false;
    }

    if (!formData.lastCompanyDuration.trim()) {
      newErrors.lastCompanyDuration = 'Duration is required';
      isValid = false;
    }

    if (!formData.lastCompanyResponsibilities.trim()) {
      newErrors.lastCompanyResponsibilities = 'Key responsibilities are required';
      isValid = false;
    } else if (formData.lastCompanyResponsibilities.trim().length < 20) {
      newErrors.lastCompanyResponsibilities = 'Please provide more details (at least 20 characters)';
      isValid = false;
    }

    if (!formData.skills.trim()) {
      newErrors.skills = 'Skills are required';
      isValid = false;
    }

    if (!formData.preferredLocations.trim()) {
      newErrors.preferredLocations = 'Preferred locations are required';
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
      const { error } = await supabase.from('resumes').insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          total_experience_years: parseFloat(formData.totalExperience) || 0,
          job_category: formData.jobCategory,
          current_salary: formData.currentSalary || null,
          expected_salary: formData.expectedSalary || null,
          last_company_name: formData.lastCompanyName,
          last_job_title: formData.lastJobTitle,
          last_company_duration: formData.lastCompanyDuration,
          last_company_responsibilities: formData.lastCompanyResponsibilities,
          reason_for_leaving: formData.reasonForLeaving || null,
          resume_url: 'pending',
          skills: formData.skills,
          preferred_locations: formData.preferredLocations,
          additional_comments: formData.additionalComments || null,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        totalExperience: '',
        jobCategory: '',
        currentSalary: '',
        expectedSalary: '',
        lastCompanyName: '',
        lastJobTitle: '',
        lastCompanyDuration: '',
        lastCompanyResponsibilities: '',
        reasonForLeaving: '',
        skills: '',
        preferredLocations: '',
        additionalComments: '',
      });
      setErrors({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        totalExperience: '',
        jobCategory: '',
        lastCompanyName: '',
        lastJobTitle: '',
        lastCompanyDuration: '',
        lastCompanyResponsibilities: '',
        skills: '',
        preferredLocations: '',
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('Failed to submit resume. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative py-12 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Professional growth"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-white/95 to-teal-50/95"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 animate-fade-in px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-2xl transform hover:scale-110 transition-transform">
            <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Submit Your <span className="text-blue-600">Resume</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Share your professional details and let top employers discover your talent
          </p>
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Step 1 of 3</span>
            </div>
            <span className="text-gray-300">•</span>
            <span>Takes about 5 minutes</span>
          </div>
        </div>

        {success && (
          <div className="mb-8 animate-fade-in">
            <SuccessMessage message="Thank you! Your resume has been submitted successfully. We will review it and connect you with relevant opportunities." />
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border-2 border-blue-100">
          <form onSubmit={handleSubmit}>
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                  1
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Personal Details</h2>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormInput
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    error={errors.fullName}
                  />
                  <ErrorMessage message={errors.fullName} />
                </div>

                <div>
                  <FormInput
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    error={errors.email}
                  />
                  <ErrorMessage message={errors.email} />
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
                  <ErrorMessage message={errors.phone} />
                </div>

                <div>
                  <FormInput
                    label="Current City/Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Mumbai, Maharashtra"
                    required
                    error={errors.location}
                  />
                  <ErrorMessage message={errors.location} />
                </div>

                <div>
                  <FormInput
                    label="Total Years of Experience"
                    name="totalExperience"
                    value={formData.totalExperience}
                    onChange={handleChange}
                    options={experienceOptions}
                    required
                    error={errors.totalExperience}
                  />
                  <ErrorMessage message={errors.totalExperience} />
                </div>

                <div>
                  <FormInput
                    label="Preferred Job Category"
                    name="jobCategory"
                    value={formData.jobCategory}
                    onChange={handleChange}
                    options={categories.map((cat) => ({ value: cat, label: cat }))}
                    required
                    error={errors.jobCategory}
                  />
                  <ErrorMessage message={errors.jobCategory} />
                </div>

                <FormInput
                  label="Current Salary (Optional)"
                  name="currentSalary"
                  value={formData.currentSalary}
                  onChange={handleChange}
                  placeholder="e.g., 5-6 LPA"
                />

                <FormInput
                  label="Expected Salary (Optional)"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  placeholder="e.g., 7-8 LPA"
                />
              </div>
            </div>

            <div className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                  2
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Last / Current Company Details</h2>
              </div>
              <div className="h-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full mb-8"></div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormInput
                      label="Last Company Name"
                      name="lastCompanyName"
                      value={formData.lastCompanyName}
                      onChange={handleChange}
                      placeholder="ABC Company Pvt Ltd"
                      required
                      error={errors.lastCompanyName}
                    />
                    <ErrorMessage message={errors.lastCompanyName} />
                  </div>

                  <div>
                    <FormInput
                      label="Job Title / Designation"
                      name="lastJobTitle"
                      value={formData.lastJobTitle}
                      onChange={handleChange}
                      placeholder="Senior Software Engineer"
                      required
                      error={errors.lastJobTitle}
                    />
                    <ErrorMessage message={errors.lastJobTitle} />
                  </div>
                </div>

                <div>
                  <FormInput
                    label="Duration at Last Company"
                    name="lastCompanyDuration"
                    value={formData.lastCompanyDuration}
                    onChange={handleChange}
                    placeholder="e.g., Jan 2020 - Dec 2023 or 3 years 6 months"
                    required
                    error={errors.lastCompanyDuration}
                  />
                  <ErrorMessage message={errors.lastCompanyDuration} />
                </div>

                <div>
                  <FormInput
                    label="Key Responsibilities"
                    name="lastCompanyResponsibilities"
                    value={formData.lastCompanyResponsibilities}
                    onChange={handleChange}
                    placeholder="Describe your main responsibilities and achievements..."
                    multiline
                    rows={5}
                    required
                    error={errors.lastCompanyResponsibilities}
                  />
                  <ErrorMessage message={errors.lastCompanyResponsibilities} />
                </div>

                <FormInput
                  label="Reason for Leaving (Optional)"
                  name="reasonForLeaving"
                  value={formData.reasonForLeaving}
                  onChange={handleChange}
                  placeholder="e.g., Career growth, relocation, etc."
                  multiline
                  rows={3}
                />
              </div>
            </div>

            <div className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                  3
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Additional Information</h2>
              </div>
              <div className="h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-8"></div>
              <div className="space-y-4">
                <div>
                  <FormInput
                    label="Skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g., JavaScript, React, Node.js, Project Management"
                    multiline
                    rows={3}
                    required
                    error={errors.skills}
                  />
                  <ErrorMessage message={errors.skills} />
                </div>

                <div>
                  <FormInput
                    label="Preferred Location(s)"
                    name="preferredLocations"
                    value={formData.preferredLocations}
                    onChange={handleChange}
                    placeholder="e.g., Mumbai, Pune, Remote"
                    required
                    error={errors.preferredLocations}
                  />
                  <ErrorMessage message={errors.preferredLocations} />
                </div>

                <FormInput
                  label="Additional Comments / Message (Optional)"
                  name="additionalComments"
                  value={formData.additionalComments}
                  onChange={handleChange}
                  placeholder="Any additional information you'd like to share..."
                  multiline
                  rows={4}
                />
              </div>
            </div>

            <div className="pt-6 border-t-2 border-gray-100">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 sm:py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 text-white font-bold text-lg sm:text-xl rounded-xl hover:from-blue-700 hover:via-blue-600 hover:to-teal-600 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] hover:scale-105 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 sm:gap-3 shadow-lg relative overflow-hidden group"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting Your Resume...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Submit Resume</span>
                  </>
                )}
              </button>
              <p className="text-center text-xs sm:text-sm text-gray-500 mt-4">
                By submitting, you agree to our terms and privacy policy
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
