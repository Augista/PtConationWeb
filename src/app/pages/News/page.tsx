"use client"
import React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  views: number;
  comments: number;
  category: string;
}

interface Author {
  name: string;
  image: string;
  bio: string;
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
}

interface PopularTag {
  id: number;
  name: string;
}

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const posts: Post[] = [
    {
      id: 1,
      title: 'Menanam dan memilih cherry terbaik',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      date: 'June 10, 2024',
      author: 'Eko Prasetyo',
      image: '/images/news/news1.png',
      views: 129,
      comments: 24,
      category: 'Farming'
    },
    {
      id: 2,
      title: 'Merawat kadar air dalam tumbuhan kopi',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      date: 'June 8, 2024',
      author: 'Bambang',
      image: '/images/news/news1.png',
      views: 432,
      comments: 15,
      category: 'Farming'
    },
    {
      id: 3,
      title: 'Penyiraman yang terdistribusi pada Kopi',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      date: 'June 5, 2024',
      author: 'Bambang',
      image: '/images/coffee.jpg',
      views: 309,
      comments: 17,
      category: 'Farming'
    },
    {
      id: 4,
      title: 'How to Prepare for your First Track Day!',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      date: 'June 2, 2024',
      author: 'Aston',
      image: '/images/news/news1.png',
      views: 567,
      comments: 32,
      category: 'Sports'
    },
    {
      id: 5,
      title: 'How to Make Your Tires Last Longer',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      date: 'May 28, 2024',
      author: 'Aston',
      image: '/images/news/news1.png',
      views: 421,
      comments: 19,
      category: 'Automotive'
    },
    {
      id: 6,
      title: 'Common Engine Oil Problems and Solutions',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: 'May 25, 2024',
      author: 'Aston',
      image: '/images/news/news1.png',
      views: 356,
      comments: 28,
      category: 'Automotive'
    },
    {
      id: 7,
      title: 'How and when to replace brake rotors',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: 'May 20, 2024',
      author: 'Aston',
      image: '/images/news/news1.png',
      views: 299,
      comments: 25,
      category: 'Automotive'
    },
  ];

  const popularPosts = [
    {
      id: 1,
      title: 'Menanam cabai di dalam greenhouse saat musim hujan',
      image: '/images/coffee.jpg',
      date: 'June 15, 2024'
    },
    {
      id: 2,
      title: 'Pemupukan yang berdistribusi pada kopi',
      image: '/images/coffee.jpg',
      date: 'June 10, 2024'
    },
    {
      id: 3,
      title: 'How to Prepare for your First Track Day!',
      image: '/images/coffee.jpg',
      date: 'June 2, 2024'
    },
    {
      id: 4,
      title: 'How to Make Your Tires Last Longer',
      image: '/images/coffee.jpg',
      date: 'May 28, 2024'
    }
  ];

  const categories = [
    { id: 1, name: 'Farming', count: 45 },
    { id: 2, name: 'Automotive', count: 38 },
    { id: 3, name: 'Education', count: 24 },
    { id: 4, name: 'Finance', count: 19 },
    { id: 5, name: 'Tech', count: 32 },
    { id: 6, name: 'Technology', count: 29 }
  ];

  const twitterFeeds = [
    {
      id: 1,
      account: 'CarsUK',
      content: '#Amazing easily discoverable Tires for Car owners. Save Parts, Car Speed',
      time: '2 minutes ago',
      link: 'https://t.co/link1'
    },
    {
      id: 2,
      account: 'CarsUK',
      content: '#Amazing easily discoverable Tires for Car owners. Save Parts, Car Speed',
      time: '10 minutes ago',
      link: 'https://t.co/link2'
    },
    {
      id: 3,
      account: 'CarsUK',
      content: '#Amazing easily discoverable Tires for Car owners. Save Parts, Car Speed',
      time: '30 minutes ago',
      link: 'https://t.co/link3'
    }
  ];

  const author: Author = {
    name: 'Pak Bambang',
    image: '/images/news/profile1.png',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel diam purus.',
    social: {
      facebook: 'https://facebook.com/pakbambang',
      twitter: 'https://twitter.com/pakbambang',
      instagram: 'https://instagram.com/pakbambang',
      youtube: 'https://youtube.com/pakbambang',
      linkedin: 'https://linkedin.com/in/pakbambang'
    }
  };

  const popularTags: PopularTag[] = [
    { id: 1, name: 'Business' },
    { id: 2, name: 'Farming' },
    { id: 3, name: 'Photography' },
    { id: 4, name: 'Travel' },
    { id: 5, name: 'Lifestyle' },
    { id: 6, name: 'Food' },
    { id: 7, name: 'Nature' },
    { id: 8, name: 'Animal' },
    { id: 9, name: 'Fitness' },
    { id: 10, name: 'Mountain' },
    { id: 11, name: 'Adventure' },
    { id: 12, name: 'Coffee' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="news-feed px-24 bg-amber-50">
      <Head>
        <title>News Feeds</title>
        <meta name="description" content="Latest news and blogs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="relative text-white bg-amber-100">
        <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
        <div className="relative z-10 px-4 py-6 container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">News Feeds</h1>
          <nav>
            <ul className="flex gap-8">
              <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
              <li><Link href="/blogs" className="text-yellow-400 font-medium">Blogs</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 bg-amber-50">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Posts Section */}
          <div className="lg:w-2/3">
            {posts.map((post) => (
              <article key={post.id} className="mb-8 pb-8 border-b border-gray-200">
                <div className="mb-4">
                  <div className="relative h-64 w-full rounded-lg overflow-hidden">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    {post.id === 2 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="category mb-2">
                  <span className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs font-medium rounded">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2">
                  <Link href={`/posts/${post.id}`} className="text-gray-800 hover:text-yellow-600">
                    {post.title}
                  </Link>
                </h2>
                <div className="flex text-gray-500 text-sm mb-3 items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span>👁️</span> {post.views} Views
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💬</span> {post.comments} Comments
                  </div>
                  <div>{post.date}</div>
                </div>
                <p className="text-gray-800 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative">
                      <Image 
                        src="/images/avatar.jpg" 
                        alt={post.author} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <span className="text-sm font-medium">By {post.author}</span>
                  </div>
                  <Link href={`/posts/${post.id}`} className="text-sm text-yellow-600 hover:underline">
                    +Read more
                  </Link>
                </div>
              </article>
            ))}

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex">
                <a href="#" className="px-3 py-1 bg-yellow-400 text-black font-medium mx-1">1</a>
                <a href="#" className="px-3 py-1 bg-gray-200 text-gray-700 mx-1">2</a>
                <a href="#" className="px-3 py-1 bg-gray-200 text-gray-700 mx-1">3</a>
                <a href="#" className="px-3 py-1 bg-gray-200 text-gray-700 mx-1">4</a>
                <a href="#" className="px-3 py-1 bg-gray-200 text-gray-700 mx-1">»</a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* About Me */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="font-bold text-lg mb-4 text-black">About Me</h3>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative text-black">
                  <Image 
                    src={author.image} 
                    alt={author.name} 
                    fill 
                    className="object-cover text-black" 
                  />
                </div>
                <h4 className="font-medium mb-2 text-black">{author.name}</h4>
                <p className="text-gray-600 text-sm text-center mb-4">{author.bio}</p>
                <div className="flex gap-3">
                  <a href={author.social.facebook} className="text-gray-500 hover:text-blue-600" aria-label="Facebook">
                    <span>🅵</span>
                  </a>
                  <a href={author.social.twitter} className="text-gray-500 hover:text-blue-400" aria-label="Twitter">
                    <span>𝕏</span>
                  </a>
                  <a href={author.social.instagram} className="text-gray-500 hover:text-pink-600" aria-label="Instagram">
                    <span>📷</span>
                  </a>
                  <a href={author.social.youtube} className="text-gray-500 hover:text-red-600" aria-label="YouTube">
                    <span>▶️</span>
                  </a>
                  <a href={author.social.linkedin} className="text-gray-500 hover:text-blue-800" aria-label="LinkedIn">
                    <span>🅻</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Search Widget */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="font-bold text-lg mb-4 text-black">Search Objects</h3>
              <form onSubmit={handleSearchSubmit}>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search your keywords..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l text-black focus:outline-none"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button type="submit" className="bg-yellow-400 px-4 py-2 rounded-r">
                    <span>🔍</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Popular Posts */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 text-gray-700">
              <h3 className="font-bold text-lg mb-4 text-black">Popular Posts</h3>
              <div className="space-y-4">
                {popularPosts.map((post) => (
                  <div key={post.id} className="flex gap-3">
                    <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">
                        <Link href={`/posts/${post.id}`} className="hover:text-yellow-600">
                          {post.title}
                        </Link>
                      </h4>
                      <div className="text-gray-500 text-xs">{post.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 text-gray-700">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <Link href={`/category/${category.name.toLowerCase()}`} className="hover:text-yellow-600">
                      {category.name}
                    </Link>
                    <span className="text-gray-500 text-sm">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Never Miss News */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 text-black">
              <h3 className="font-bold text-lg mb-4">Never Miss News</h3>
              <div className="flex gap-1 mb-2">
                <a href="#" className="w-8 h-8 bg-blue-900 text-white flex items-center justify-center">1</a>
                <a href="#" className="w-8 h-8 bg-blue-800 text-white flex items-center justify-center">2</a>
                <a href="#" className="w-8 h-8 bg-blue-700 text-white flex items-center justify-center">3</a>
                <a href="#" className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center">4</a>
                <a href="#" className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center">5</a>
              </div>
            </div>

            {/* Twitter Feeds */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 text-black">
              <h3 className="font-bold text-lg mb-4">Twitter Feeds</h3>
              <div className="space-y-6">
                {twitterFeeds.map((feed) => (
                  <div key={feed.id} className="flex gap-3">
                    <div className="text-yellow-400 flex-shrink-0">🔄</div>
                    <div>
                      <p className="text-sm mb-1">
                        <span className="font-medium">{feed.account}: </span>
                        {feed.content}
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{feed.time}</span>
                        <a href={feed.link} className="text-yellow-600 hover:underline">@twitter.com</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instagram Feeds */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="font-bold text-lg mb-4 text-black">Instagram Feeds</h3>
              {/* Instagram feed placeholder */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="font-bold text-lg mb-4 text-black">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <a 
                    key={tag.id} 
                    href={`/tag/${tag.name.toLowerCase()}`} 
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-yellow-400 hover:text-black"
                  >
                    {tag.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsPage;