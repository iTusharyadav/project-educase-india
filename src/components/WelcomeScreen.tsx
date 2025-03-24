import { useNavigate } from 'react-router-dom';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center md:items-center sm:items-end justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        <div className="space-y-3 text-center">
          <h1 className="text-[28px] font-medium text-[#1D2226] leading-tight">
            Welcome to PopX
          </h1>
          <p className="text-lg text-[#1D2226] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </p>
        </div>
        
        <div className="space-y-4 mb-8 sm:mb-16">
          <button 
            onClick={() => navigate('/create-account')}
            className="btn-primary"
          >
            Create Account
          </button>
          
          <button
            onClick={() => navigate('/sign-in')}
            className="btn-secondary"
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;