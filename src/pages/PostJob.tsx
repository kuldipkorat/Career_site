import { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FormInput } from '../components/FormInput';
import { SuccessMessage } from '../components/SuccessMessage';
import { ErrorMessage } from '../components/ErrorMessage';

const companyTypeOptions = [
  { value: 'Company', label: 'Company' },
  { value: 'Consultancy', label: 'Consultancy' },
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
  'Customer Service',
  'Other',
];

const employmentTypes = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Temporary', label: 'Temporary' },
];

const experienceLevels = [
  { value: 'Fresher', label: 'Fresher' },
  { value: '0-2 years', label: '0-2 years' },
  { value: '2-5 years', label: '2-5 years' },
  { value: '5+ years', label: '5+ years' },
];

export function PostJob() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    companyType: '',
    companyName: '',
    contactPersonName: '',
    contactEmail: '',
    contactPhone: '',
    jobTitle: '',
    jobLocation: '',
    jobCategory: '',
    employmentType: '',
    experienceLevel: '',
    jobDescription: '',
    responsibilities: '',
    requiredSkills: '',
    applicationEmail: '',
  });

  const [formData, setFormData] = useState({
    companyType: '',
    companyName: '',
    contactPersonName: '',
    contactPersonDesignation: '',
    contactEmail: '',
    contactPhone: '',
    companyWebsite: '',
    companyAddress: '',
    jobTitle: '',
    jobLocation: '',
    jobCategory: '',
    employmentType: '',
    experienceLevel: '',
    salaryRange: '',
    numberOfOpenings: '1',
    jobDescription: '',
    responsibilities: '',
    requiredSkills: '',
    preferredJoiningDate: '',
    applicationEmail: '',
    applicationUrl: '',
    applicationDeadline: '',
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
      companyType: '',
      companyName: '',
      contactPersonName: '',
      contactEmail: '',
      contactPhone: '',
      jobTitle: '',
      jobLocation: '',
      jobCategory: '',
      employmentType: '',
      experienceLevel: '',
      jobDescription: '',
      responsibilities: '',
      requiredSkills: '',
      applicationEmail: '',
    };
    let isValid = true;

    if (!formData.companyType) {
      newErrors.companyType = 'Please select company or consultancy';
      isValid = false;
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
      isValid = false;
    } else if (formData.companyName.trim().length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters';
      isValid = false;
    }

    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = 'Contact person name is required';
      isValid = false;
    } else if (formData.contactPersonName.trim().length < 2) {
      newErrors.contactPersonName = 'Name must be at least 2 characters';
      isValid = false;
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Phone number is required';
      isValid = false;
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid phone number';
      isValid = false;
    } else if (formData.contactPhone.replace(/\D/g, '').length < 10) {
      newErrors.contactPhone = 'Phone number must be at least 10 digits';
      isValid = false;
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
      isValid = false;
    }

    if (!formData.jobLocation.trim()) {
      newErrors.jobLocation = 'Job location is required';
      isValid = false;
    }

    if (!formData.jobCategory) {
      newErrors.jobCategory = 'Please select a job category';
      isValid = false;
    }

    if (!formData.employmentType) {
      newErrors.employmentType = 'Please select employment type';
      isValid = false;
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Please select experience level';
      isValid = false;
    }

    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
      isValid = false;
    } else if (formData.jobDescription.trim().length < 50) {
      newErrors.jobDescription = 'Please provide more details (at least 50 characters)';
      isValid = false;
    }

    if (!formData.responsibilities.trim()) {
      newErrors.responsibilities = 'Key responsibilities are required';
      isValid = false;
    } else if (formData.responsibilities.trim().length < 20) {
      newErrors.responsibilities = 'Please provide more details (at least 20 characters)';
      isValid = false;
    }

    if (!formData.requiredSkills.trim()) {
      newErrors.requiredSkills = 'Required skills are required';
      isValid = false;
    } else if (formData.requiredSkills.trim().length < 10) {
      newErrors.requiredSkills = 'Please provide more details (at least 10 characters)';
      isValid = false;
    }

    if (!formData.applicationEmail.trim()) {
      newErrors.applicationEmail = 'Application email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.applicationEmail)) {
      newErrors.applicationEmail = 'Please enter a valid email address';
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
      const { error } = await supabase.from('jobs').insert([
        {
          company_type: formData.companyType,
          company_name: formData.companyName,
          contact_person_name: formData.contactPersonName,
          contact_person_designation: formData.contactPersonDesignation || null,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          company_website: formData.companyWebsite || null,
          company_address: formData.companyAddress || null,
          job_title: formData.jobTitle,
          job_location: formData.jobLocation,
          job_category: formData.jobCategory,
          employment_type: formData.employmentType,
          experience_level: formData.experienceLevel,
          salary_range: formData.salaryRange || null,
          number_of_openings: parseInt(formData.numberOfOpenings) || 1,
          job_description: formData.jobDescription,
          responsibilities: formData.responsibilities,
          required_skills: formData.requiredSkills,
          preferred_joining_date: formData.preferredJoiningDate || null,
          application_email: formData.applicationEmail,
          application_url: formData.applicationUrl || null,
          application_deadline: formData.applicationDeadline || null,
          status: 'active',
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        companyType: '',
        companyName: '',
        contactPersonName: '',
        contactPersonDesignation: '',
        contactEmail: '',
        contactPhone: '',
        companyWebsite: '',
        companyAddress: '',
        jobTitle: '',
        jobLocation: '',
        jobCategory: '',
        employmentType: '',
        experienceLevel: '',
        salaryRange: '',
        numberOfOpenings: '1',
        jobDescription: '',
        responsibilities: '',
        requiredSkills: '',
        preferredJoiningDate: '',
        applicationEmail: '',
        applicationUrl: '',
        applicationDeadline: '',
      });
      setErrors({
        companyType: '',
        companyName: '',
        contactPersonName: '',
        contactEmail: '',
        contactPhone: '',
        jobTitle: '',
        jobLocation: '',
        jobCategory: '',
        employmentType: '',
        experienceLevel: '',
        jobDescription: '',
        responsibilities: '',
        requiredSkills: '',
        applicationEmail: '',
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative py-12 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Job posting"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/95 via-white/95 to-red-50/95"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 shadow-2xl transform hover:scale-110 transition-transform">
            <Briefcase className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Post a <span className="text-orange-600">Job</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fill in the details below to post your job opening and connect with talented candidates
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-700 font-medium">
              <Briefcase className="w-4 h-4" />
              <span>Reach 1000+ candidates</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full text-blue-700 font-medium shadow-md hover:shadow-lg transition-all hover:scale-105 border border-blue-200">
              <span>Free posting</span>
            </div>
          </div>
        </div>

        {success && (
          <div className="mb-8 animate-fade-in">
            <SuccessMessage message="Your job has been submitted successfully. It will be reviewed and listed shortly." />
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 border-2 border-orange-100">
          <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                  1
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Company / Consultancy Details</h2>
              </div>
              <div className="h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-8"></div>
              <div className="space-y-4">
                <div>
                  <FormInput
                    label="Select Type"
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    options={companyTypeOptions}
                    required
                    error={errors.companyType}
                  />
                  <ErrorMessage message={errors.companyType} />
                </div>

                <div>
                  <FormInput
                    label="Company/Consultancy Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="ABC Company Pvt Ltd"
                    required
                    error={errors.companyName}
                  />
                  <ErrorMessage message={errors.companyName} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormInput
                      label="Contact Person Name"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      error={errors.contactPersonName}
                    />
                    <ErrorMessage message={errors.contactPersonName} />
                  </div>

                  <FormInput
                    label="Designation / Role"
                    name="contactPersonDesignation"
                    value={formData.contactPersonDesignation}
                    onChange={handleChange}
                    placeholder="HR Manager"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormInput
                      label="Official Email Address"
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      placeholder="hr@company.com"
                      required
                      error={errors.contactEmail}
                    />
                    <ErrorMessage message={errors.contactEmail} />
                  </div>

                  <div>
                    <FormInput
                      label="Contact Phone Number"
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      placeholder="+91 1234567890"
                      required
                      error={errors.contactPhone}
                    />
                    <ErrorMessage message={errors.contactPhone} />
                  </div>
                </div>

                <FormInput
                  label="Company Website (Optional)"
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://www.company.com"
                />

                <FormInput
                  label="Company Address (Optional)"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  placeholder="123, Business Park, City, State - 400001"
                  multiline
                  rows={3}
                />
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                  2
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Job Details</h2>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-8"></div>
              <div className="space-y-4">
                <div>
                  <FormInput
                    label="Job Title"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Senior Software Engineer"
                    required
                    error={errors.jobTitle}
                  />
                  <ErrorMessage message={errors.jobTitle} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormInput
                      label="Job Location"
                      name="jobLocation"
                      value={formData.jobLocation}
                      onChange={handleChange}
                      placeholder="Mumbai, Maharashtra or Remote"
                      required
                      error={errors.jobLocation}
                    />
                    <ErrorMessage message={errors.jobLocation} />
                  </div>

                  <div>
                    <FormInput
                      label="Job Category"
                      name="jobCategory"
                      value={formData.jobCategory}
                      onChange={handleChange}
                      options={categories.map((cat) => ({ value: cat, label: cat }))}
                      required
                      error={errors.jobCategory}
                    />
                    <ErrorMessage message={errors.jobCategory} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormInput
                      label="Employment Type"
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                      options={employmentTypes}
                      required
                      error={errors.employmentType}
                    />
                    <ErrorMessage message={errors.employmentType} />
                  </div>

                  <div>
                    <FormInput
                      label="Experience Level"
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      options={experienceLevels}
                      required
                      error={errors.experienceLevel}
                    />
                    <ErrorMessage message={errors.experienceLevel} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Salary Range (Optional)"
                    name="salaryRange"
                    value={formData.salaryRange}
                    onChange={handleChange}
                    placeholder="e.g., 5-7 LPA or 50,000-70,000 per month"
                  />

                  <FormInput
                    label="Number of Openings"
                    type="number"
                    name="numberOfOpenings"
                    value={formData.numberOfOpenings}
                    onChange={handleChange}
                    min={1}
                    required
                  />
                </div>

                <div>
                  <FormInput
                    label="Job Description"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    placeholder="Provide a detailed description of the job role..."
                    multiline
                    rows={6}
                    required
                    error={errors.jobDescription}
                  />
                  <ErrorMessage message={errors.jobDescription} />
                </div>

                <div>
                  <FormInput
                    label="Key Responsibilities"
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    placeholder="List the main responsibilities (use bullet points or line breaks)"
                    multiline
                    rows={6}
                    required
                    error={errors.responsibilities}
                  />
                  <ErrorMessage message={errors.responsibilities} />
                </div>

                <div>
                  <FormInput
                    label="Required Skills / Qualifications"
                    name="requiredSkills"
                    value={formData.requiredSkills}
                    onChange={handleChange}
                    placeholder="List required skills, qualifications, and experience"
                    multiline
                    rows={5}
                    required
                    error={errors.requiredSkills}
                  />
                  <ErrorMessage message={errors.requiredSkills} />
                </div>

                <FormInput
                  label="Preferred Joining Date / Notice Period (Optional)"
                  name="preferredJoiningDate"
                  value={formData.preferredJoiningDate}
                  onChange={handleChange}
                  placeholder="e.g., Immediate, 30 days, 1st March 2024"
                />
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                  3
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Application Settings</h2>
              </div>
              <div className="h-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full mb-8"></div>
              <div className="space-y-4">
                <div>
                  <FormInput
                    label="Application Email"
                    type="email"
                    name="applicationEmail"
                    value={formData.applicationEmail}
                    onChange={handleChange}
                    placeholder="applications@company.com"
                    required
                    error={errors.applicationEmail}
                  />
                  <ErrorMessage message={errors.applicationEmail} />
                </div>

                <FormInput
                  label="Application URL (Optional)"
                  type="url"
                  name="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={handleChange}
                  placeholder="https://careers.company.com/apply"
                />

                <FormInput
                  label="Application Deadline (Optional)"
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pt-6 border-t-2 border-gray-100">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-5 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-xl rounded-xl hover:from-orange-700 hover:to-red-700 transition-all hover:shadow-2xl hover:scale-105 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {submitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Posting Your Job...</span>
                  </>
                ) : (
                  <>
                    <Briefcase className="w-6 h-6" />
                    <span>Post Job Opening</span>
                  </>
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Your job will be reviewed and published within 24 hours
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
