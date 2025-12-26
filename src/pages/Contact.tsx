import { useState } from 'react';
import { MessageSquare, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FormInput } from '../components/FormInput';
import { SuccessMessage } from '../components/SuccessMessage';
import { ErrorMessage } from '../components/ErrorMessage';

const reasonOptions = [
  { value: 'Help in candidate hiring', label: 'Help in candidate hiring' },
  { value: 'Looking for job', label: 'Looking for job' },
  { value: 'Collaboration', label: 'Collaboration' },
  { value: 'Advertisement', label: 'Advertisement' },
  { value: 'Query', label: 'Query' },
  { value: 'Suggestions', label: 'Suggestions' },
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
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
      name: '',
      email: '',
      phone: '',
      reason: '',
      message: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
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

    if (!formData.reason) {
      newErrors.reason = 'Please select a reason for contact';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          reason: formData.reason,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        reason: '',
        message: '',
      });
      setErrors({
        name: '',
        email: '',
        phone: '',
        reason: '',
        message: '',
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to submit contact form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-blue-50"></div>
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl mb-6 shadow-2xl transform hover:scale-110 transition-transform">
            <MessageSquare className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            We'd love to hear from you. Reach out for any queries, support, or collaboration opportunities.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-teal-700 font-medium">
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full text-blue-700 font-medium shadow-md hover:shadow-lg transition-all hover:scale-105 border border-blue-200">
              <span>Quick Response</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600 text-sm">contact@kutchcareer.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <Phone className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600 text-sm">+91 1234567890</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                  <p className="text-gray-600 text-sm">Kutch, Gujarat, India</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-3">Office Hours</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 border-2 border-teal-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-teal-600" />
                Send us a Message
              </h2>

              {success && (
                <div className="mb-6">
                  <SuccessMessage message="Thank you for contacting us! We will get back to you soon." />
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <FormInput
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    error={errors.name}
                  />
                  <ErrorMessage message={errors.name} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormInput
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
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
                </div>

                <div>
                  <FormInput
                    label="Reason for Contact"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    options={reasonOptions}
                    required
                    error={errors.reason}
                  />
                  <ErrorMessage message={errors.reason} />
                </div>

                <div>
                  <FormInput
                    label="Message / Comments"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    multiline
                    rows={6}
                    required
                    error={errors.message}
                  />
                  <ErrorMessage message={errors.message} />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 text-white font-bold text-xl rounded-xl hover:from-blue-700 hover:via-blue-600 hover:to-teal-600 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] hover:scale-105 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-lg relative overflow-hidden group"
                >
                  {submitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-6 h-6" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
