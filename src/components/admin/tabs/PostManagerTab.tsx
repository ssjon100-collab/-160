import React, { useState } from 'react';
import { useSite } from '../../../context/SiteContext';
import { Post } from '../../../types';
import { Plus, Edit2, Trash2, Pin, PinOff, Eye, Image as ImageIcon, Check } from 'lucide-react';

const CATEGORIES: Post['category'][] = ['공지사항', '분양일정', '프리미엄소식', '보도자료', '현장스케치'];

export const PostManagerTab: React.FC = () => {
  const { posts, addPost, updatePost, deletePost, showToast } = useSite();
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    category: '공지사항' as Post['category'],
    summary: '',
    content: '',
    author: '분양운영팀',
    isPinned: false,
    imageUrl: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      category: '공지사항',
      summary: '',
      content: '',
      author: '분양운영팀',
      isPinned: false,
      imageUrl: '',
    });
    setEditingPostId(null);
    setIsCreating(false);
  };

  const startCreate = () => {
    resetForm();
    setIsCreating(true);
  };

  const startEdit = (post: Post) => {
    setEditingPostId(post.id);
    setIsCreating(false);
    setFormData({
      title: post.title,
      category: post.category,
      summary: post.summary,
      content: post.content,
      author: post.author,
      isPinned: post.isPinned,
      imageUrl: post.imageUrl || '',
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('제목을 입력해 주세요.');
      return;
    }
    if (!formData.content.trim()) {
      alert('게시글 내용을 입력해 주세요.');
      return;
    }

    if (editingPostId) {
      updatePost(editingPostId, {
        title: formData.title,
        category: formData.category,
        summary: formData.summary,
        content: formData.content,
        author: formData.author,
        isPinned: formData.isPinned,
        imageUrl: formData.imageUrl.trim() || undefined,
      });
    } else {
      addPost({
        title: formData.title,
        category: formData.category,
        summary: formData.summary,
        content: formData.content,
        author: formData.author,
        isPinned: formData.isPinned,
        imageUrl: formData.imageUrl.trim() || undefined,
      });
    }
    resetForm();
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`'${title}' 게시글을 삭제하시겠습니까?`)) {
      deletePost(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
        <div>
          <h3 className="text-base font-bold text-white">게시글 및 분양소식 관리 시스템</h3>
          <p className="text-xs text-gray-400">
            공지사항, 보도자료, 현장 스케치를 손쉽게 등록하고 관리하세요.
          </p>
        </div>
        {!isCreating && !editingPostId && (
          <button
            onClick={startCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>새 게시글 작성</span>
          </button>
        )}
      </div>

      {/* Editor Form (Create or Edit Mode) */}
      {(isCreating || editingPostId) && (
        <form onSubmit={handleSave} className="p-5 rounded-2xl bg-[#141026] border border-purple-500/30 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
            <h4 className="text-sm font-bold text-purple-300">
              {editingPostId ? '게시글 수정하기' : '새 게시글 작성하기'}
            </h4>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-gray-400 hover:text-white"
            >
              취소
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">카테고리</label>
              <select
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as Post['category'] }))}
                className="w-full px-3 py-2 rounded-lg bg-[#0e0c1a] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">작성자</label>
              <input
                type="text"
                value={formData.author}
                onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-[#0e0c1a] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* Pinned switch */}
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                <input
                  type="checkbox"
                  checked={formData.isPinned}
                  onChange={e => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
                  className="rounded text-purple-600 focus:ring-purple-500 bg-[#0e0c1a] border-gray-600"
                />
                <span className="font-semibold text-amber-300">★ 상단 고정 (주요 공지)</span>
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              게시글 제목 <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="예: [공지] 동탄그웬 160 모델하우스 오픈 안내"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-[#0e0c1a] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              대표 썸네일 이미지 URL (선택)
            </label>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-purple-400 shrink-0" />
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.imageUrl}
                onChange={e => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-[#0e0c1a] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              한 줄 요약 (목록에 노출)
            </label>
            <input
              type="text"
              placeholder="게시글의 핵심 내용을 간략히 요약해 주세요."
              value={formData.summary}
              onChange={e => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-[#0e0c1a] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Body Content */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              게시글 본문 내용 <span className="text-purple-400">*</span>
            </label>
            <textarea
              required
              rows={6}
              placeholder="게시글 상세 내용을 입력하세요."
              value={formData.content}
              onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg bg-[#0e0c1a] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400 resize-y font-light leading-relaxed"
            />
          </div>

          {/* Submit buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg bg-[#1e1933] text-gray-300 hover:text-white text-xs"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>{editingPostId ? '수정 완료' : '게시글 등록하기'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Posts Table List */}
      <div className="rounded-xl border border-purple-500/20 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#141026] text-gray-400 border-b border-purple-900/40">
            <tr>
              <th className="py-3 px-3">분류</th>
              <th className="py-3 px-3">제목</th>
              <th className="py-3 px-3 hidden sm:table-cell">작성일</th>
              <th className="py-3 px-3 hidden sm:table-cell">조회수</th>
              <th className="py-3 px-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-950/40 text-gray-300">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-purple-950/20 transition-colors">
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-900/50 text-purple-300 border border-purple-500/30">
                    {post.category}
                  </span>
                </td>
                <td className="py-3 px-3 max-w-xs sm:max-w-md">
                  <div className="flex items-center gap-1.5">
                    {post.isPinned && <Pin className="w-3 h-3 text-amber-400 shrink-0 fill-current" />}
                    <span className="font-medium text-white truncate">{post.title}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-gray-400 hidden sm:table-cell whitespace-nowrap">
                  {post.date}
                </td>
                <td className="py-3 px-3 text-gray-400 hidden sm:table-cell whitespace-nowrap">
                  {post.views}
                </td>
                <td className="py-3 px-3 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() =>
                        updatePost(post.id, { isPinned: !post.isPinned })
                      }
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        post.isPinned
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-[#171229] text-gray-400 border-purple-500/20 hover:text-white'
                      }`}
                      title={post.isPinned ? '고정 해제' : '상단 고정'}
                    >
                      {post.isPinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => startEdit(post)}
                      className="p-1.5 rounded-lg bg-[#171229] border border-purple-500/20 text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors"
                      title="수정"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="p-1.5 rounded-lg bg-[#171229] border border-purple-500/20 text-red-400 hover:text-red-200 hover:bg-red-950/40 transition-colors"
                      title="삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
