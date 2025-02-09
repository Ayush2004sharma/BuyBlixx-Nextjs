"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Profile = () => {
  const profileRef = useRef(null);

  useEffect(() => {
    gsap.from(profileRef.current, {
      duration: 1,
      opacity: 0,
      y: -50,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        ref={profileRef}
        className="bg-white p-6 rounded-lg shadow-lg w-96 text-center"
      >
        <img
          src="/profile-pic.jpg"
          alt="Profile Picture"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
        <p className="text-gray-600">johndoe@example.com</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
