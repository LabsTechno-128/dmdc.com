import { Calendar, User } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import SafeImage from './SafeImage';

export default function Articles() {
  const { content } = useLanding();
  const articles = content.articles;

  return (
    <section id="articles" className="py-14 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 tracking-tight">{articles.title}</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {articles.subtitle}
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex-shrink-0">
            <button className="text-[#1e56a0] font-semibold hover:text-blue-800 flex items-center space-x-2 cursor-pointer py-2 min-h-[44px] transition-colors">
              <span>View All Articles</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {(Array.isArray(articles?.items) ? articles.items : []).map((article, index) => (
            <div 
              key={article.id || index} 
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <SafeImage 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold text-[#1e56a0] shadow-xs">
                    {article.category}
                  </div>
                </div>
                <div className="p-5 sm:p-6 pb-2">
                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-gray-500 mb-2.5 sm:mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate max-w-[120px]">{article.author}</span>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 group-hover:text-[#1e56a0] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                </div>
              </div>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <span className="inline-flex items-center text-sm font-semibold text-[#1e56a0] group-hover:text-blue-800 transition-colors">
                  Read More
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
