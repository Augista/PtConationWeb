"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Team member type
interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

// FAQ type
interface FAQ {
  id: number;
  question: string;
  answer: string;
  isOpen?: boolean;
}

// Testimonial type
interface Testimonial {
  id: number;
  name: string;
  position: string;
  image: string;
  text: string;
}

// Blog post type
// interface BlogPost {
//   id: number;
//   title: string;
//   author: string;
//   category: string;
//   date: string;
//   image: string;
//   url: string;
// }

// Mission item type
interface MissionItem {
  id: string;
  text: string;
}

const AboutUs: React.FC = () => {
  // Team members data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Wulan',
      position: 'Operation',
      image: '/teams/team-coo.png',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
      },
    },
    {
      id: 2,
      name: 'Dina',
      position: 'Marketing',
      image: '/teams/team-cmo.png',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
      },
    },
    {
      id: 3,
      name: 'Andiar',
      position: 'CEO',
      image: '/teams/team-ceo.png',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
      },
    },
    {
      id: 4,
      name: 'Abimanyu',
      position: 'Finance',
      image: '/teams/team-cfo.png',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
      },
    },
    {
      id: 5,
      name: 'Augista',
      position: 'Technology',
      image: '/teams/team-cto.png',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
      },
    },
  ];

  // Features data
  const features = [
    {
      id: 1,
      icon: '/images/coffee.jpg',
      title: 'Technological Innovation',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    },
    {
      id: 2,
      icon: '/images/coffee.jpg',
      title: 'Environmental Sustainability',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    },
    {
      id: 3,
      icon: '/images/coffee.jpg',
      title: 'Product Diversification',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    },
  ];

  // Mission items data
  const missionItems: MissionItem[] = [
    {
      id: "01",
      text: "Menyediakan layanan pemesanan kopi yang dapat disesuaikan dengan kebutuhan dan preferensi pelanggan, memungkinkan mereka untuk memesan sesuai dengan kebutuhan mereka"
    },
    {
      id: "02",
      text: "Membantu petani kopi dalam mengimplementasikan standar pengolahan yang tinggi, untuk memastikan kualitas kopi yang konsisten dan unggul"
    },
    {
      id: "03",
      text: "Menerapkan teknologi digital dalam manajemen sistem informasi dan proses bisnis, untuk meningkatkan efisiensi operasional"
    },
    {
      id: "04",
      text: "Mengoptimalkan manajemen rantai pasok kopi, untuk memastikan keseimbangan antara permintaan dan pasokan kopi yang efisien serta produktivitas yang terjamin"
    }
  ];

  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Smith Alexander',
      position: 'Customer',
      image: '/images/testipeeps.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      name: 'Jacob William',
      position: 'Customer',
      image: '/images/testipeeps.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 3,
      name: 'David Johnson',
      position: 'Customer',
      image: '/images/testipeeps.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  // FAQs data
  const faqsData: FAQ[] = [
    {
      id: 1,
      question: 'How to buy a product?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isOpen: false,
    },
    {
      id: 2,
      question: 'How can I make refund from your website?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isOpen: true,
    },
    {
      id: 3,
      question: 'I am a new user. How should I start?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isOpen: false,
    },
    {
      id: 4,
      question: 'Returns and refunds',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isOpen: false,
    },
    {
      id: 5,
      question: 'Are my details secured?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isOpen: false,
    },
  ];

  // State for FAQs
  const [faqs, setFaqs] = React.useState<FAQ[]>(faqsData);

  // Toggle FAQ open/close
  const toggleFAQ = (id: number) => {
    setFaqs(
      faqs.map((faq) => {
        if (faq.id === id) {
          return { ...faq, isOpen: !faq.isOpen };
        }
        return faq;
      })
    );
  };

  // Newsletter email state
  const [email, setEmail] = React.useState('');

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
    <div>
      <section className="bg-white py-16">
        <div className="items-center flex">
          <div className="w-1/2 flex flex-col mx-24 mb-10 md:mb-0">
            <div className="flex logo-container mb-6 w-1/2">
              <Image 
                src="/images/logo.png" 
                alt="Co Nation Logo" 
                width={250} 
                height={100} 
                className="logo"
              />
            </div>
            <div className='w-full'>
            <h1 className="text-3xl font-bold mb-4 text-yellow-600">Co Nation</h1>
            <p className="text-gray-700 mb-6">
            PT Coffee Nation Prosperity adalah perusahaan yang berkomitmen untuk membawa perubahan dalam industri kopi Indonesia. Dengan visi untuk memberdayakan petani kopi lokal dan menghubungkan mereka dengan pasar yang lebih luas, kami berfokus pada inovasi dalam pengolahan dan distribusi kopi. Kami memahami tantangan yang dihadapi oleh petani kopi Indonesia, seperti keterbatasan pengetahuan tentang standar terbaru dalam pengolahan kopi serta kesulitan dalam memenuhi permintaan pasar yang semakin spesifik.
            </p>
            <p className="text-gray-700 mb-6">
            PT Coffee Nation Prosperity menyediakan solusi yang mencakup layanan pemesanan kopi yang dapat disesuaikan dengan kebutuhan spesifik pelanggan. Kami juga mendampingi mitra petani dalam menerapkan standar pengolahan yang lebih baik, guna memastikan kualitas kopi yang tinggi dan konsisten. Selain itu, kami juga mendorong digitalisasi dalam manajemen operasional dan rantai pasokan untuk meningkatkan efisiensi.
            </p>
            <p className="text-gray-700 mb-6">
            Komitmen kami adalah memastikan keberlanjutan dalam setiap langkah yang kami ambil, serta menjadikan kopi Indonesia lebih dihargai di pasar global.
            </p>
            <div className="hashtag text-blue-600 font-bold">
              #RootToRoast
            </div>
            </div>
          </div>
          <div className="flex w-[43%] h-[10%] mt-16 items-center justify-center">
            <div className="image-container relative">
              <Image 
                src="/images/about-header.jpg" 
                alt="About Us Header" 
                width={500} 
                height={400} 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission py-16 bg-cyan-600">
        <div className="container mx-auto px-4">
     
          <div className="vision mb-16">
            <div className="flex items-center mb-6">
              <div className="dots flex space-x-1 mr-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
              <h2 className="text-4xl font-bold text-center border-b-2 border-yellow-500 pb-2 flex-grow">Vision</h2>
            </div>
            <div className="bg-blue-800 text-white p-8 rounded-lg">
              <p className="text-xl">
                Menjadi platform digital terdepan yang mampu mengintegrasikan seluruh ekosistem kopi Indonesia, melalui solusi inovatif yang berfokus pada keberlanjutan, kesejahteraan petani, dan perkembangan industri kopi Indonesia secara menyeluruh.
              </p>
            </div>
          </div>
          
          {/* Mission */}
          <div className="mission">
            <h2 className="text-4xl font-bold border-b-2 border-yellow-500 pb-2 mb-8 pl-14">Mission</h2>
            <div className="mission-items space-y-4">
              {missionItems.map((item) => (
                <div key={item.id} className="mission-item bg-yellow-400 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="mission-number text-3xl font-bold text-blue-800 mr-4">{item.id}.</div>
                    <p className="text-blue-800 font-medium">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us section */}
      <section className="why-choose-us bg-blue-500 py-16">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-12">
            <span className="text-yellow-300 text-sm uppercase font-bold">FEATURES</span>
            <h2 className="text-white text-3xl font-bold mt-2">Why Choose Us.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="feature-card bg-white p-6 rounded-lg shadow-md">
                <div className="icon-container mb-4">
                  <Image 
                    src={feature.icon} 
                    alt={feature.title} 
                    width={60} 
                    height={60}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-yellow-600">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members section */}
      
    <section className="team-members py-8 bg-gray-200">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Team Members
        </h2>
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          modules={[Autoplay]}
          loop
          className="pb-8"
        >
          {teamMembers.map((member) => (
            <SwiperSlide key={member.id}>
              <div className="team-member-card text-center">
                <div className="image-container mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={250}
                    height={250}
                    className="rounded-lg mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-yellow-600">
                  {member.name}
                </h3>
                <p className="mb-3 text-cyan-500">{member.position}</p>
                <div className="social-links flex justify-center space-x-3">
                  {member.socialLinks.facebook && (
                    <Link
                      href={member.socialLinks.facebook}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  )}
                  {member.socialLinks.twitter && (
                    <Link
                      href={member.socialLinks.twitter}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <i className="fab fa-twitter"></i>
                    </Link>
                  )}
                  {member.socialLinks.instagram && (
                    <Link
                      href={member.socialLinks.instagram}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <i className="fab fa-instagram"></i>
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>

      {/* Testimonials section */}
      <section className="testimonials bg-blue-600 py-16">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-12">
            <span className="text-yellow-300 text-sm uppercase font-bold">TESTIMONIALS</span>
            <h2 className="text-white text-3xl font-bold mt-2">Clients Feedbacks.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="image-container mr-4">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      width={60} 
                      height={60} 
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-600">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="faq py-16 bg-cyan-950">
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl font-bold text-center mb-12">Some Questions</h2>
          <div className="faq-container max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item mb-4">
                <div 
                  className="faq-question p-4 flex justify-between items-center cursor-pointer border-l-4 border-blue-600"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <h3 className="font-bold">{faq.question}</h3>
                  <div className="w-6 h-6 bg-blue-600 flex items-center justify-center">
                    <span className="text-white">{faq.isOpen ? '-' : '+'}</span>
                  </div>
                </div>
                {faq.isOpen && (
                  <div className="faq-answer p-4 bg-gray-100">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="logo-container mt-12 text-center">
            <Image 
              src="/images/logoOutline.png" 
              alt="Co Nation Logo" 
              width={250} 
              height={100} 
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="newsletter py-16 bg-blue-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">We make your inbox better</h2>
          <p className="mb-6">Sign up for our newsletter for upcoming tips, daily inspirations, exclusive access to pre-launch product pricing and more.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Email" 
              className="flex-1 p-2 text-gray-200 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="bg-gray-500 text-white px-4 py-2 uppercase text-sm font-bold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Blog section */}
      {/* <section className="blog py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Latest Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BlogPost.map((post) => (
              <div key={post.id} className="blog-card">
                <div className="image-container mb-4">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    width={400} 
                    height={250} 
                    className="rounded-lg"
                  />
                </div>
                <div className="post-meta flex mb-2">
                  <span className="mr-4 text-sm text-gray-600">By {post.author}</span>
                  <span className="text-sm text-gray-600">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <div className="post-footer flex justify-between items-center">
                  <span className="text-sm text-gray-600">{post.date}</span>
                  <Link href={post.url} className="text-yellow-600 uppercase text-sm font-bold">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default AboutUs;