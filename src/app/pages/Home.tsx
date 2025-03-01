import React, { FC } from 'react';
import Image from 'next/image';

// Tipe data untuk anggota tim, fitur, testimoni, FAQ, dan blog posts
interface TeamMember {
  id: number;
  name: string;
  position: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  position: string;
  text: string;
}

interface FAQ {
  id: number;
  question: string;
  isOpen: boolean;
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  category: string;
}

const AboutUsPreview: FC = () => {
  const teamMembers: TeamMember[] = [
    { id: 1, name: 'Rosalina D. William', position: 'Founder' },
    { id: 2, name: 'Kelian Anderson', position: 'Co-Founder' },
    { id: 3, name: 'Miranda H. Halim', position: 'Farm Manager' },
    { id: 4, name: 'Dominic D. Ronald', position: 'Quality Supervisor' }
  ];

  const features: Feature[] = [
    { id: 1, title: 'All Kind Brand', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, title: 'Curated Products', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 3, title: 'Pesticide Free Foods', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
  ];

  const testimonials: Testimonial[] = [
    { id: 1, name: 'Smith Alexander', position: 'Customer', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, name: 'Jacob William', position: 'Customer', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 3, name: 'David Johnson', position: 'Customer', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
  ];

  const faqs: FAQ[] = [
    { id: 1, question: 'How to buy a product?', isOpen: false },
    { id: 2, question: 'How can I make refund from your website?', isOpen: true },
    { id: 3, question: 'I am a new user. How should I start?', isOpen: false },
    { id: 4, question: 'Returns and refunds', isOpen: false },
    { id: 5, question: 'Are my details secured?', isOpen: false }
  ];

  const blogPosts: BlogPost[] = [
    { id: 1, title: 'Memanen dan memilih cherry terbaik', date: 'June 20, 2025', author: 'Admin', category: 'Business' },
    { id: 2, title: 'Merawat lahan air dalam tumbuhan', date: 'June 22, 2025', author: 'Admin', category: 'Business' },
    { id: 3, title: 'Penyiraman yang terstandar pada hasil', date: 'June 24, 2025', author: 'Admin', category: 'Manufacture' }
  ];

  return (
    <div className="flex flex-col w-full bg-white font-sans">
      {/* Header Section */}
      <div className="border-b-2 border-gray-200 py-8">
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4">
          <div className="md:w-1/2 pr-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center mr-3">
                <div className="w-6 h-8 bg-yellow-400 rounded-full"></div>
              </div>
              <h1 className="text-xl font-bold text-blue-800">NATION</h1>
            </div>
            <h2 className="text-2xl font-bold mb-4">Co Nation</h2>
            <p className="text-gray-600 mb-3">Derived from the "Coffee Nation" which means we want to introduce a new coffee culture in the world.</p>
            <p className="text-gray-600 mb-4">Coffee who aspire to be good, do good, and spread goodness. We deliver crafty, self-sustaining, fair-traded marketplace who thrives on local products.</p>
            <p className="text-blue-600 font-bold">#MeetToRoast</p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <div className="bg-gray-200 w-full h-64 rounded flex items-center justify-center">
              <span className="text-gray-500">Header Image</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <div className="bg-blue-600 py-12 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-yellow-300 text-sm font-bold">FEATURES</span>
            <h2 className="text-3xl font-bold mt-2">Why Choose Us.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(feature => (
              <div key={feature.id} className="bg-white p-6 rounded-lg text-black">
                <div className="w-12 h-12 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Icon</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Team Member</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map(member => (
              <div key={member.id} className="text-center">
                <div className="bg-gray-200 w-full h-48 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Team Photo</span>
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
                <div className="flex justify-center mt-2 space-x-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 text-white">
            <span className="text-yellow-300 text-sm font-bold">TESTIMONIALS</span>
            <h2 className="text-3xl font-bold mt-2">Clients Feedbacks.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg">
                <p className="text-gray-600 mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Photo</span>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Some Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map(faq => (
              <div key={faq.id} className="mb-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 border-l-4 border-blue-600">
                  <h3 className="font-medium">{faq.question}</h3>
                  <div className="w-6 h-6 bg-blue-600 flex items-center justify-center text-white">
                    {faq.isOpen ? '-' : '+'}
                  </div>
                </div>
                {faq.isOpen && (
                  <div className="p-4 bg-gray-100">
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">We make your inbox better</h2>
          <p className="mb-6 max-w-2xl mx-auto">Sign up for our newsletter for upcoming tips, daily inspirations, exclusive access to pre-launch product pricing and more.</p>
          <div className="flex max-w-md mx-auto">
            <input type="email" placeholder="Email" className="flex-1 p-2 text-black" />
            <button className="bg-gray-600 px-4 py-2 uppercase text-sm font-bold">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Our Latest Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <div key={post.id}>
                <div className="bg-gray-200 w-full h-48 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Blog Image</span>
                </div>
                <div className="flex text-sm text-gray-600 mb-2">
                  <span className="mr-4">By {post.author}</span>
                  <span>{post.category}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{post.date}</span>
                  <span className="text-yellow-600 uppercase text-sm font-bold">Read More</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPreview;
