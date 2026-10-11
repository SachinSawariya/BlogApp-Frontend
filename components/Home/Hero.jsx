import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiPlusCircle } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 text-white py-24 lg:py-32 overflow-hidden border-b border-transparent dark:border-gray-800/60 transition-colors">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-5 transform skew-x-12 translate-x-20"></div>
      {/* Dark mode subtle ambient glow */}
      <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/15 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight">
          Explore the World of <br className="hidden md:block" />
          <span className="text-yellow-300 dark:text-yellow-400">AI & Development</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-blue-50 dark:text-slate-300 leading-relaxed font-medium">
          Stay updated with the latest tutorials, guides, and insights in AI, machine learning, and software development.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link 
            href="/articles"
            className="group bg-white text-blue-700 hover:bg-blue-50 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all duration-300 shadow-xl shadow-blue-900/20 dark:shadow-blue-500/20 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <FiBookOpen className="text-xl" />
            Explore Articles
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/admin/login"
            className="group bg-yellow-400 text-gray-900 hover:bg-yellow-300 dark:bg-yellow-400 dark:text-gray-950 dark:hover:bg-yellow-300 px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all duration-300 shadow-xl shadow-yellow-500/10 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <FiPlusCircle className="text-xl" />
            Write Article
          </Link>
        </div>
      </div>
      
      {/* Bottom wave-like fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent"></div>
    </section>
  );
}
