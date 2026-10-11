'use client'
import React from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaRocket, FaUsers, FaShieldAlt, FaArrowRight, FaInstagram } from 'react-icons/fa';
import { FiAward } from 'react-icons/fi';
import Link from 'next/link';
import { useCategory } from '../Categories/hooks/useCategory';

const AboutUs = () => {
  const { 
    categories, 
  } = useCategory();
  console.log("categories => ", categories)
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200 overflow-hidden">
      {/* Hero Section with Mesh Gradient */}
      <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-20">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-indigo-100/50 dark:bg-indigo-900/10 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-purple-100/40 dark:bg-purple-900/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6 animate-fade-in">
            <FiAward className="text-blue-500" />
            <span>Discover Our Story</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-[1.1]">
            Bridging the Gap Between <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              AI & Innovation
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-10">
            We are dedicated to exploring the frontiers of technology, sharing deep insights, and building a community of forward-thinking developers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/articles"
              className="group bg-gray-900 dark:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300 hover:bg-black dark:hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-2xl shadow-gray-900/20"
            >
              Explore Our Work
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact"
              className="px-8 py-4 rounded-xl font-bold text-lg text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 active:scale-95"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section - Glassmorphism */}
      <section className="py-16 lg:py-24 bg-gray-50/50 dark:bg-gray-900/40 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative aspect-video lg:aspect-square bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-gray-100 dark:ring-gray-700">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
                  alt="Our Mission"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                Our Mission is to <br />
                <span className="text-blue-600 dark:text-blue-400">Empower Humanity</span> thru Tech.
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  We believe that technology should be accessible, understandable, and ethical. Our mission is to create a platform where complex ideas in AI and Software Engineering are distilled into actionable knowledge.
                </p>
                <div className="grid grid-cols-2 gap-4 lg:gap-6 pt-2">
                  <div className="p-6 bg-white dark:bg-gray-850 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 text-center lg:text-left">
                    <h4 className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">100+</h4>
                    <p className="text-sm lg:text-base text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Readers</p>
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-850 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 text-center lg:text-left">
                    <h4 className="text-3xl lg:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                      {categories.reduce((sum, cat) => sum + cat.postCount, 0)}+
                    </h4>
                    <p className="text-sm lg:text-base text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Articles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            The Values that Drive Us
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Core principles that guide every story we tell and every line of code we share.
          </p>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div key={index} className="group p-8 lg:p-10 bg-white dark:bg-gray-900 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-50 dark:border-gray-800 hover:border-blue-100 dark:hover:border-blue-900/60 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/60 dark:to-indigo-950/60 rounded-2xl lg:rounded-3xl flex items-center justify-center mb-8 lg:mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <value.icon className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-gray-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-base lg:text-lg leading-relaxed font-medium">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 lg:mb-20 gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 lg:mb-6 tracking-tight">
                Meet the Creative <br /> Minds Behind.
              </h2>
              <p className="text-lg lg:text-xl text-gray-500 dark:text-gray-400 font-medium">
                A diverse team of engineers, writers, and visionaries committed to tech excellence.
              </p>
            </div>
            <Link className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
              href="/contact"
            >
              Join Our Team
              <FaArrowRight />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="group relative">
                <div className="relative aspect-[4/5] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden mb-6 lg:mb-8 shadow-2xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <div className="flex gap-4">
                      {member.socials.github && (
                        <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all">
                          <FaGithub size={24} />
                        </a>
                      )}
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-blue-600 hover:text-white transition-all">
                          <FaLinkedin size={24} />
                        </a>
                      )}
                      {member.socials.instagram && (
                        <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-blue-400 hover:text-white transition-all">
                          <FaInstagram size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold mb-4">{member.role}</p>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 rounded-[2.5rem] lg:rounded-[4rem] p-8 md:p-16 lg:p-20 text-center text-white relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">Stay Connected with <br /> the Future.</h2>
            <p className="max-w-xl mx-auto text-lg text-blue-100 font-medium mb-10 opacity-80 leading-relaxed">
              Join thousands of developers receiving our weekly curated content on AI and modern workflows.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-80 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md text-base lg:text-lg font-bold"
              />
              <button className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl active:scale-95 leading-none h-[58px] lg:h-[62px]">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const teamMembers = [
  {
    name: 'Sachin Kumar',
    role: 'Founder & Software Engineer',
    bio: 'Focused on building premium digital experiences and exploring AI automation.',
    image: '/images/sachin-pic.png',
    socials: {
      github: 'https://github.com/SachinSawariya',
      linkedin: 'https://www.linkedin.com/in/sachin-kumar-a91a62223/',
      instagram: 'https://www.instagram.com/sachin_.sawariya/'
    }
  },
  {
    name: 'Satish Kumar',
    role: 'Content Writer',
    bio: 'Focused on building premium articles and exploring Content Writing.',
    image: '/images/satish-pic.jpeg',
    socials: {
      // github: 'https://github.com',
      // linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/satishmoriya361'
    }
  },
  {
    name: 'Alex Rivera',
    role: 'UI/UX Designer',
    bio: 'Crafting beautiful, intuitive interfaces that make technology feel human and accessible.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1974',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  }
];

const values = [
  {
    title: 'Innovation',
    description: 'We constantly push the boundaries of what is possible in AI and development.',
    icon: FaRocket
  },
  {
    title: 'Community',
    description: 'Tech is better together. We foster a space for collaboration and shared growth.',
    icon: FaUsers
  },
  {
    title: 'Integrity',
    description: 'We prioritize ethical AI and transparent information sharing above all else.',
    icon: FaShieldAlt
  }
];

export default AboutUs;