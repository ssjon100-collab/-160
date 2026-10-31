import React, { useState } from 'react';
import { useSite } from '../../../context/SiteContext';
import { InquirySubmission } from '../../../types';
import { UserCheck, Download, Trash2, Phone, Calendar, Mail, MessageSquare, ExternalLink, CheckCircle2, Send, Globe, ShieldCheck } from 'lucide-react';

export const InquiriesTab: React.FC = () => {
  const { inquiries, updateInquiryStatus, deleteInquiry, showToast, content } = useSite();
  const [testingFormspree, setTestingFormspree] = useState(false);

  const formspreeUrl = content.contact.formspreeEndpoint || 'https://formspree.io/f/xeaalndz';

  const handleTestFormspree = async () => {
    setTestingFormspree(true);
    try {
      const res = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: '[시스템 테스트] 관리자 테스트',
          phone: '010-0000-0000',
          email: 'test@gwen160.com',
          preferredType: '102㎡ A-TYPE 테라스 스위트',
          preferredTime: '평일 오후',
          message: 'Formspree 연동 정상 작동 확인용 테스트 메시지입니다.',
          _subject: '[동탄그웬160] Formspree 웹사이트 데이터 수집 연동 테스트',
          testMode: true,
          sentAt: new Date().toLocaleString('ko-KR'),
        }),
      });

      if (res.ok) {
        showToast('Formspree에 테스트 데이터가 성공적으로 전송되었습니다!');
      } else {
        showToast(`Formspree 응답 상태코드: ${res.status} (연동 설정 확인)`);
      }
    } catch (e) {
      showToast('Formspree 테스트 전송 중 통신 오류가 발생했습니다.');
    } finally {
      setTestingFormspree(false);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      alert('내보낼 접수 내역이 없습니다.');
      return;
    }

    const headers = ['접수일시', '고객성명', '연락처', '이메일', '관심평형', '희망시간', '문의내용', '상담상태'];
    const rows = inquiries.map(i => [
      `"${i.createdAt}"`,
      `"${i.name}"`,
      `"${i.phone}"`,
      `"${i.email || ''}"`,
      `"${i.preferredType}"`,
      `"${i.preferredTime}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${i.status}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `동탄그웬160_관심고객접수_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('관심고객 명단 CSV 파일이 다운로드되었습니다.');
  };

  const getStatusStyle = (status: InquirySubmission['status']) => {
    switch (status) {
      case '신규접수':
        return 'bg-purple-600/30 text-purple-300 border-purple-500/40';
      case '상담완료':
        return 'bg-green-600/30 text-green-300 border-green-500/40';
      case '보류':
        return 'bg-amber-600/30 text-amber-300 border-amber-500/40';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Formspree Integration Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-[#15102a] to-emerald-950/30 border border-purple-500/35 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-white">Formspree 실시간 데이터 수집 연동</h4>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                활성화됨
              </span>
            </div>
            <p className="text-xs text-purple-200/80 mt-0.5 break-all">
              수집 엔드포인트: <span className="font-mono text-white underline">{formspreeUrl}</span>
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              방문자가 홈페이지에서 관심고객 사전등록 또는 상담을 신청하면 해당 Formspree 계정으로 실시간 자동 전송됩니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            type="button"
            onClick={handleTestFormspree}
            disabled={testingFormspree}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1f1938] hover:bg-purple-900/60 border border-purple-500/35 text-purple-200 hover:text-white text-xs font-semibold transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 text-purple-400" />
            <span>{testingFormspree ? '전송 확인 중...' : '연동 테스트 전송'}</span>
          </button>
          <a
            href="https://formspree.io/forms/xeaalndz/submissions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md hover:scale-105"
          >
            <span>Formspree 수신함 보기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-purple-400" />
            <span>VIP 관심고객 및 상담 접수 현황 ({inquiries.length}건)</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            홈페이지에서 신청된 VIP 사전 관람 및 분양 상담 고객 명단을 관리합니다. (Formspree 실시간 수집 + 로컬 백업)
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 text-xs font-semibold transition-all hover:text-white"
        >
          <Download className="w-4 h-4 text-purple-400" />
          <span>Excel / CSV 다운로드</span>
        </button>
      </div>

      {/* Inquiries List */}
      {inquiries.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#141026] border border-purple-500/20 text-gray-400 text-sm">
          현재 접수된 관심고객 상담 내역이 없습니다.
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#141026] border border-purple-500/20 hover:border-purple-500/40 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold text-sm">
                    {item.name.slice(0, 1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{item.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5 flex-wrap">
                      <a href={`tel:${item.phone}`} className="hover:text-purple-300 flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3 text-purple-400" />
                        {item.phone}
                      </a>
                      {item.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-purple-400" />
                          {item.email}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-purple-400" />
                        {item.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status selector & Delete */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <select
                    value={item.status}
                    onChange={e => updateInquiryStatus(item.id, e.target.value as InquirySubmission['status'])}
                    className="px-2.5 py-1.5 rounded-lg bg-[#0e0c1a] border border-purple-500/30 text-xs text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="신규접수">신규접수</option>
                    <option value="상담완료">상담완료</option>
                    <option value="보류">보류</option>
                  </select>
                  <button
                    onClick={() => {
                      if (confirm(`'${item.name}' 고객의 접수 내역을 삭제하시겠습니까?`)) {
                        deleteInquiry(item.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-[#1a142e] border border-purple-500/20 text-red-400 hover:text-red-200 transition-colors"
                    title="삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Preferences details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-black/30 p-3 rounded-xl border border-purple-950/60">
                <div>
                  <span className="text-gray-400">관심 평형: </span>
                  <span className="text-purple-300 font-medium">{item.preferredType}</span>
                </div>
                <div>
                  <span className="text-gray-400">상담 희망 시간: </span>
                  <span className="text-white font-medium">{item.preferredTime}</span>
                </div>
              </div>

              {/* Message if any */}
              {item.message && (
                <div className="text-xs text-gray-300 bg-purple-950/20 p-2.5 rounded-lg border border-purple-500/15 flex items-start gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item.message}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
