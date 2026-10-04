import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiPlusCircle } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 lg:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-5 transform skew-x-12 translate-x-20"></div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight">
          Explore the World of <br className="hidden md:block" />
          <span className="text-yellow-300">AI & Development</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-blue-50 leading-relaxed font-medium">
          Stay updated with the latest tutorials, guides, and insights in AI, machine learning, and software development.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link 
            href="/articles"
            className="group bg-white text-blue-700 hover:bg-blue-50 px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all duration-300 shadow-xl shadow-blue-900/20 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <FiBookOpen className="text-xl" />
            Explore Articles
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/admin/login"
            className="group bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all duration-300 shadow-xl shadow-yellow-500/10 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <FiPlusCircle className="text-xl" />
            Write Article
          </Link>
        </div>
      </div>
      
      {/* Bottom wave-like fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
}
