import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Post } from '../../types';
import { Newspaper, Search, Eye, Calendar, PlusCircle, ArrowUpRight, Pin } from 'lucide-react';

const CATEGORIES = ['전체', '공지사항', '분양일정', '프리미엄소식', '보도자료', '현장스케치'] as const;

export const NewsSection: React.FC = () => {
  const { posts, setSelectedPost, incrementPostViews, setIsAdminOpen } = useSite();
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const matchesCat = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handlePostClick = (post: Post) => {
    incrementPostViews(post.id);
    setSelectedPost(post);
  };

  return (
    <section id="news" className="relative py-24 bg-[#08070d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/35 text-purple-300 text-xs font-semibold mb-3">
              <Newspaper className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-montserrat tracking-widest uppercase">NEWS & ANNOUNCEMENT</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              동탄그웬 160 <span className="text-purple-400">분양 소식 및 공지사항</span>
            </h2>
            <p className="text-sm text-gray-400 font-light mt-2">
              최신 분양 소식, 언론 보도자료, 현장 스케치를 실시간으로 확인하실 수 있습니다.
            </p>
          </div>

          {/* Quick Admin New Post Action */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all self-start md:self-auto hover:text-white"
          >
            <PlusCircle className="w-4 h-4 text-purple-400" />
            <span>새 게시글 작성 (관리자)</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-[#151125] text-gray-400 hover:text-white border border-purple-500/15'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="제목, 내용 검색..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141026] border border-purple-500/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
            />
          </div>
        </div>

        {/* Posts List Grid */}
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl glass-card border border-purple-500/20 text-gray-400 text-sm">
            등록된 게시글이 없거나 검색 결과가 일치하지 않습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post)}
                className={`group rounded-2xl glass-card border transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer ${
                  post.isPinned
                    ? 'border-purple-500/60 bg-[#161129]/80 shadow-lg'
                    : 'border-purple-500/20 hover:border-purple-400/60 hover:shadow-xl'
                }`}
              >
                <div>
                  {/* Thumbnail if present */}
                  {post.imageUrl && (
                    <div className="relative h-44 overflow-hidden bg-black/40">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c18] via-transparent to-black/30" />
                      {post.isPinned && (
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-amber-500/90 text-black text-[10px] font-bold flex items-center gap-1 shadow-md">
                          <Pin className="w-3 h-3 fill-current" />
                          <span>주요공지</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-purple-400 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-purple-400" />
                        {post.date}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug mb-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-gray-300 font-light line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="px-5 py-3 border-t border-purple-900/30 flex items-center justify-between text-[11px] text-gray-400 bg-black/20">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-purple-400" />
                    조회 {post.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-purple-300 group-hover:text-white font-medium">
                    자세히 보기
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
