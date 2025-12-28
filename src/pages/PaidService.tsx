import { useState } from 'react';
import { DollarSign, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FormInput } from '../components/FormInput';
import { SuccessMessage } from '../components/SuccessMessage';
import { ErrorMessage } from '../components/ErrorMessage';

const typeOptions = [
  { value: 'Company', label: 'Company' },
  { value: 'Consultancy', label: 'Consultancy' },
];

export function PaidService() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    type: '',
    contactPersonName: '',
    email: '',
    companyName: '',
    phone: '',
    message: '',
  });

  const [formData, setFormData] = useState({
    type: '',
    contactPersonName: '',
    email: '',
    companyName: '',
    phone: '',
    hiringVolume: '',
    message: '',
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
      type: '',
      contactPersonName: '',
      email: '',
      companyName: '',
      phone: '',
      message: '',
    };
    let isValid = true;

    if (!formData.type) {
      newErrors.type = 'Please select company or consultancy';
      isValid = false;
    }

    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = 'Contact person name is required';
      isValid = false;
    } else if (formData.contactPersonName.trim().length < 2) {
      newErrors.contactPersonName = 'Name must be at least 2 characters';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company/Consultancy name is required';
      isValid = false;
    } else if (formData.companyName.trim().length < 2) {
      newErrors.companyName = 'Name must be at least 2 characters';
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

    if (!formData.message.trim()) {
      newErrors.message = 'Please describe your hiring requirements';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
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
      const { error } = await supabase.from('paid_service_requests').insert([
        {
          type: formData.type,
          contact_person_name: formData.contactPersonName,
          email: formData.email,
          company_name: formData.companyName,
          phone: formData.phone,
          hiring_volume: formData.hiringVolume || null,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        type: '',
        contactPersonName: '',
        email: '',
        companyName: '',
        phone: '',
        hiringVolume: '',
        message: '',
      });
      setErrors({
        type: '',
        contactPersonName: '',
        email: '',
        companyName: '',
        phone: '',
        message: '',
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const features = [
    'Dedicated account manager for your hiring needs',
    'Access to curated candidate database',
    'Pre-screened and qualified candidates',
    'Custom job posting visibility',
    'Priority customer support',
    'Bulk hiring solutions',
    'Recruitment process consulting',
    'Competitive pricing packages',
  ];

  return (
    <div className="min-h-screen relative py-16 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Business meeting"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/95 via-orange-50/95 to-red-50/95"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl shadow-lg mb-6 transform hover:scale-105 transition-transform">
            <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-600">
            Premium Hiring Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get dedicated hiring support with our premium services. We help companies and consultancies
            find the perfect talent quickly and efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Premium services"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 h-fit lg:sticky lg:top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 sm:h-10 bg-gradient-to-b from-orange-500 to-yellow-600 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What We Offer</h2>
            </div>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
              <p className="text-sm text-gray-700 font-medium">
                Contact us today to discuss custom pricing packages based on your hiring volume and requirements.
              </p>
            </div>
          </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 sm:h-10 bg-gradient-to-b from-orange-500 to-yellow-600 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Request Information</h2>
            </div>

            {success && (
              <div className="mb-6 animate-fade-in">
                <SuccessMessage message="Thank you! We will contact you shortly about our paid hiring services." />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <FormInput
                  label="I am a"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  options={typeOptions}
                  required
                  error={errors.type}
                />
                <ErrorMessage message={errors.type} />
              </div>

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
                  label="Email Address"
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

              <FormInput
                label="Number of Positions / Hiring Volume (Optional)"
                name="hiringVolume"
                value={formData.hiringVolume}
                onChange={handleChange}
                placeholder="e.g., 5-10 positions per month"
              />

              <div>
                <FormInput
                  label="Message / Requirements"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your hiring needs..."
                  multiline
                  rows={5}
                  required
                  error={errors.message}
                />
                <ErrorMessage message={errors.message} />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-bold text-lg rounded-xl hover:from-orange-700 hover:to-yellow-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? 'Submitting Request...' : 'Submit Request for Premium Service'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Our team will review your request and contact you within 12-24 hours with a customized solution.</p>
        </div>
      </div>
    </div>
  );
}
