import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/validation';
import { checkCredentials } from '../utils/storage';

function SignInScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '', general: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      if (checkCredentials(formData.email, formData.password)) {
        navigate('/account-settings');
      } else {
        newErrors.general = 'Invalid email or password';
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fadeIn pt-8">
        <div className="space-y-3">
          <h1 className="text-[28px] font-medium text-[#1D2226] leading-tight">
            Signin to your PopX account
          </h1>
          <p className="text-lg text-[#1D2226] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="form-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'input-field-error' : ''}`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="error-text">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${
                errors.password || errors.general ? 'input-field-error' : ''
              }`}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="error-text">{errors.general}</p>
          )}

          <button
            type="submit"
            className={`btn-primary ${
              !(formData.email && formData.password) && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!formData.email || !formData.password}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInScreen;