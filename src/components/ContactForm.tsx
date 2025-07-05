"use client";
import React, { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:kandarineha521@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${encodeURIComponent(form.name)}%0AEmail:%20${encodeURIComponent(form.email)}%0APhone:%20${encodeURIComponent(form.phone)}%0AMessage:%20${encodeURIComponent(form.message)}`;
    window.location.href = mailto;
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10">
      <h2 className="text-2xl mb-6">
        Let&apos;s work <span className="text-blue-500">together</span>.
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name *"
          className="w-full bg-black/20 backdrop-blur-sm rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-white/10"
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          className="w-full bg-black/40 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-800"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number *"
          className="w-full bg-black/40 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-800"
          required
          value={form.phone}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message *"
          rows={4}
          className="w-full bg-black/40 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-800"
          required
          value={form.message}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-black/20 backdrop-blur-sm text-white py-3 rounded-lg hover:bg-black/40 transition-colors border border-white/10"
        >
          Send Message
        </button>
      </form>
    </div>
  );
} 