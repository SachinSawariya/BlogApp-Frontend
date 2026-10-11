import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-700 via-blue-600 to-indigo-800 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 text-white relative overflow-hidden transition-colors border-t border-transparent dark:border-gray-800/60">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -ml-32 -mt-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-10 dark:opacity-5 rounded-full blur-3xl -mr-48 -mb-48"></div>
      <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight">Ready to dive in?</h2>
        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-blue-50 dark:text-slate-300 font-medium">
          Join our community of developers and stay updated with the latest in technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link 
            href="/articles"
            className="bg-white text-blue-700 hover:bg-blue-50 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-blue-900/10 dark:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center"
          >
            Browse All Articles
          </Link>
          <Link 
            href="/contact"
            className="border-2 border-white/30 dark:border-gray-700 text-white hover:bg-white hover:text-indigo-900 dark:hover:bg-gray-800 dark:hover:text-white px-10 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105 active:scale-95 text-center"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
