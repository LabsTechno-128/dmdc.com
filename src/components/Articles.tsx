import { Calendar, User } from 'lucide-react';

const articles = [
  {
    title: '10 Foods to Keep Your Heart Healthy',
    category: 'Diet & Nutrition',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600&h=400',
    date: 'Oct 12, 2023',
    author: 'Dr. Sarah J.'
  },
  {
    title: 'Understanding Your Blood Test Results',
    category: 'Diagnostics',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600&h=400',
    date: 'Oct 10, 2023',
    author: 'Admin'
  },
  {
    title: 'How to Manage Stress During Work',
    category: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=600&h=400',
    date: 'Oct 08, 2023',
    author: 'Dr. Michael C.'
  },
  {
    title: 'The Importance of Annual Check-ups',
    category: 'Preventive Care',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=600&h=400',
    date: 'Oct 05, 2023',
    author: 'Dr. Emily W.'
  }
];

export default function Articles() {
  return (
    <section id="articles" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Health News & Tips</h2>
            <p className="text-lg text-gray-600">
              Stay informed with our latest articles on health, wellness, and medical advancements.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <button className="text-[#1e56a0] font-semibold hover:text-blue-800 flex items-center space-x-2">
              <span>View All Articles</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#1e56a0]">
                  {article.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{article.author}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-[#1e56a0] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <span className="inline-flex items-center text-sm font-semibold text-[#1e56a0]">
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
