import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/validation';
import { saveUser } from '../utils/storage';

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  companyName: string;
  isAgency: boolean;
}

function CreateAccountScreen() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value === 'true' : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName) newErrors.fullName = 'Name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.companyName) newErrors.companyName = 'Company name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      saveUser({
        ...formData,
        profilePicture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.fullName)}`
      });
      navigate('/account-settings');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fadeIn pt-8">
        <div className="space-y-3">
          <h1 className="text-[28px] font-medium text-[#1D2226] leading-tight">
            Create your PopX account
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="form-label">Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`input-field ${errors.fullName ? 'input-field-error' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="error-text">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="form-label">Phone number (Optional)</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="form-label">Email address*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'input-field-error' : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="error-text">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="form-label">Password*</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'input-field-error' : ''}`}
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="form-label">Company name*</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={`input-field ${errors.companyName ? 'input-field-error' : ''}`}
              placeholder="Enter company name"
            />
            {errors.companyName && (
              <p className="error-text">{errors.companyName}</p>
            )}
          </div>

          <div className="space-y-3">
            <p className="form-label">Are you an Agency?*</p>
            <div className="space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isAgency"
                  value="true"
                  checked={formData.isAgency === true}
                  onChange={handleChange}
                  className="radio-button"
                />
                <span className="ml-2 text-sm font-medium text-[#1D2226]">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isAgency"
                  value="false"
                  checked={formData.isAgency === false}
                  onChange={handleChange}
                  className="radio-button"
                />
                <span className="ml-2 text-sm font-medium text-[#1D2226]">No</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary mt-8"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountScreen;