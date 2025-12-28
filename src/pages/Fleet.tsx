import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FormInput } from '../components/FormInput';
import { SuccessMessage } from '../components/SuccessMessage';
import { ErrorMessage } from '../components/ErrorMessage';

export function Fleet() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    companyName: '',
    contactPersonName: '',
    designation: '',
    contactNumber: '',
    email: '',
    website: '',
  });

  const [formData, setFormData] = useState({
    companyName: '',
    contactPersonName: '',
    designation: '',
    contactNumber: '',
    email: '',
    address: '',
    website: '',
    description: '',
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
      companyName: '',
      contactPersonName: '',
      designation: '',
      contactNumber: '',
      email: '',
      website: '',
    };
    let isValid = true;

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

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
      isValid = false;
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
      isValid = false;
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid phone number';
      isValid = false;
    } else if (formData.contactNumber.replace(/\D/g, '').length < 10) {
      newErrors.contactNumber = 'Phone number must be at least 10 digits';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL (e.g., https://example.com)';
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
      const { error } = await supabase.from('companies').insert([
        {
          company_name: formData.companyName,
          contact_person_name: formData.contactPersonName,
          designation: formData.designation,
          contact_number: formData.contactNumber,
          email: formData.email,
          address: formData.address || null,
          website: formData.website || null,
          description: formData.description || null,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        companyName: '',
        contactPersonName: '',
        designation: '',
        contactNumber: '',
        email: '',
        address: '',
        website: '',
        description: '',
      });
      setErrors({
        companyName: '',
        contactPersonName: '',
        designation: '',
        contactNumber: '',
        email: '',
        website: '',
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting company registration:', error);
      alert('Failed to submit registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative py-16 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Business collaboration"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-cyan-50/95 to-teal-50/95"></div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl shadow-lg mb-6 transform hover:scale-105 transition-transform">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
            Fleet for Companies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our exclusive fleet network to access premium hiring opportunities
            and gain maximum visibility among qualified job seekers.
          </p>
        </div>

        {success && (
          <div className="mb-8 animate-fade-in">
            <SuccessMessage message="Thank you! Your company has been successfully registered in our fleet. We will contact you soon with more details." />
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-10 bg-gradient-to-b from-teal-500 to-blue-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Company Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <FormInput
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="ABC Company Pvt Ltd"
                required
                error={errors.companyName}
              />
              <ErrorMessage message={errors.companyName} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
                <FormInput
                  label="Designation / Role"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="HR Manager"
                  required
                  error={errors.designation}
                />
                <ErrorMessage message={errors.designation} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormInput
                  label="Contact Number"
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+91 1234567890"
                  required
                  error={errors.contactNumber}
                />
                <ErrorMessage message={errors.contactNumber} />
              </div>

              <div>
                <FormInput
                  label="Official Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contact@company.com"
                  required
                  error={errors.email}
                />
                <ErrorMessage message={errors.email} />
              </div>
            </div>

            <FormInput
              label="Company Address (Optional)"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123, Business Park, City, State - 400001"
              multiline
              rows={3}
            />

            <div>
              <FormInput
                label="Company Website (Optional)"
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://www.company.com"
                error={errors.website}
              />
              <ErrorMessage message={errors.website} />
            </div>

            <FormInput
              label="Short Description of Company (Optional)"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your company, industry, and what makes you unique..."
              multiline
              rows={5}
            />

            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-teal-700 hover:via-teal-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_rgba(20,184,166,0.5)] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-lg relative overflow-hidden group"
              >
                {submitting ? 'Registering...' : 'Register Company in Fleet'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>By registering, you agree to our terms and conditions. We will contact you within 24-48 hours.</p>
        </div>
      </div>
    </div>
  );
}
