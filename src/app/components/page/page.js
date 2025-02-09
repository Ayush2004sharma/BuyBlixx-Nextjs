'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import Image from 'next/image';

const LoginSignup = () => {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
  });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    gsap.fromTo(
      ".form-container",
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isSignup) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleButtonClick = (e) => {
    gsap.to(e.target, {
      scale: 0.9,
      duration: 0.1,
      ease: "power3.out",
      onComplete: () => {
        gsap.to(e.target, { scale: 1, duration: 0.1, ease: "power3.out" });
      },
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    handleButtonClick(e);
    const { username, email, password, fullName, phoneNumber } = formData;
    if (!username || !email || !password || !fullName || !phoneNumber) {
      setError('Please fill out all fields.');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
      setError('Username already exists. Choose another.');
      return;
    }
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    setError('');
    alert('Signup successful!');
    setIsSignup(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    handleButtonClick(e);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === loginData.username && user.password === loginData.password);
    if (user) {
      setError('');
      alert(`Welcome back, ${user.fullName}!`);
      router.push('/profile');
    } else {
      setError('Invalid username or password.');
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    gsap.to(".form-container", {
      opacity: 0,
      x: 100,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        setTimeout(() => {
          gsap.fromTo(
            ".form-container",
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
          );
        }, 100);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8c58c] px-4">
      <div className="w-[800px] h-[600px] bg-white flex flex-col md:flex-row justify-between items-center rounded-lg shadow-2xl overflow-hidden">
        <div className="hidden md:flex w-1/2 h-full justify-center items-center">
          <Image src="/login.jpg" alt="Login Illustration" width={400} height={600} className="object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-8 flex justify-center items-center bg-white">
          <div className="form-container w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#1c8995]">
              {isSignup ? 'Create Your Account' : 'Log In'}
            </h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {isSignup && (
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="input-field mb-4 w-full p-3 border-2 border-[#1c8995] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c8995]"
              />
            )}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={isSignup ? formData.username : loginData.username}
              onChange={handleChange}
              className="input-field mb-4 w-full p-3 border-2 border-[#1c8995] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c8995]"
            />
            {isSignup && (
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input-field mb-4 w-full p-3 border-2 border-[#1c8995] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c8995]"
              />
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={isSignup ? formData.password : loginData.password}
              onChange={handleChange}
              className="input-field mb-4 w-full p-3 border-2 border-[#1c8995] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c8995]"
            />
            <button
              onClick={isSignup ? handleSignup : handleLogin}
              className="w-full py-3 bg-[#1c8995] text-white font-bold rounded-lg hover:bg-opacity-80 transition"
            >
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>
            <p className="mt-4 text-center text-[#1c8995] text-sm">
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <button
                onClick={toggleForm}
                className="underline hover:text-opacity-80"
              >
                {isSignup ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;