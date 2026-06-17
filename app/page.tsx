"use client";

import { useState } from "react";
import Image from "next/image";

const BOOK = {
  title: "Grammar POP Plus 2",
  subtitle: "초등 문법 완성",
  thumbnail: "/images/book-cover.png",
  publisher: "YBM솔루션",
};

const TEACHER_MATERIALS = [
  "강의용 본책 PDF",
  "워크북 PDF",
  "지문 텍스트 파일",
  "지문 해석 텍스트 파일",
  "수업용 PPT",
  "영작 Worksheet",
];

const STUDENT_MATERIALS = [
  "해설집 PDF",
  "워크북 직독직해 정답 PDF",
  "지문 MP3",
  "어휘 리스트",
  "어휘 테스트",
  "정오표",
];

const YBM_BLUE = "#0057A8";
const YBM_RED = "#E8002D";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Home() {
  const [tab, setTab] = useState<"teacher" | "student">("teacher");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const canSubmit = isValidEmail(email);
  const materials = tab === "teacher" ? TEACHER_MATERIALS : STUDENT_MATERIALS;
  const colLabel = tab === "teacher" ? "수업지원자료명" : "학습자료명";

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F5F5" }}>

      {/* Header */}
      <header className="px-5 py-3.5 flex items-center gap-3" style={{ backgroundColor: "#111111" }}>
        <div className="bg-white rounded px-2 py-0.5">
          <span className="text-xs font-black tracking-tighter" style={{ color: "#111111" }}>YBM</span>
        </div>
        <span className="text-white font-semibold text-sm">
          선생님용 부가자료 다운로드 서비스
        </span>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-5 w-full">
        <div className="w-full max-w-md flex flex-col gap-4">

          {/* Greeting */}
          <div
            className="rounded-lg px-4 py-3.5 text-sm leading-relaxed text-gray-600 border-l-4"
            style={{ backgroundColor: "#fff", borderColor: YBM_BLUE }}
          >
            안녕하세요. YBM 교재를 이용해 주셔서 감사합니다.<br />
            부가자료 다운로드를 위해 이메일 주소를 입력해 주세요.<br />
            입력하신 이메일로 자료 링크를 보내드립니다.
          </div>

          {/* Book Card */}
          <div className="bg-white rounded-xl overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
            <div className="flex gap-4 p-4 border-b border-gray-100">
              <div className="flex-shrink-0 w-20 h-28 relative rounded overflow-hidden shadow bg-gray-100 flex items-center justify-center">
                {!imgError ? (
                  <Image
                    src={BOOK.thumbnail}
                    alt={BOOK.title}
                    fill
                    className="object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span className="text-gray-400 text-[10px] text-center px-1 leading-relaxed">교재<br />표지</span>
                )}
              </div>
              <div className="flex flex-col justify-center gap-0.5">
                <p className="text-xs text-gray-400">{BOOK.subtitle}</p>
                <h1 className="text-base font-bold text-gray-900 leading-snug">{BOOK.title}</h1>
                <p className="text-xs text-gray-400 mt-1">{BOOK.publisher}</p>
              </div>
            </div>

            {/* Materials */}
            <div className="px-4 pt-4 pb-3">
              {/* Tabs */}
              <div className="flex rounded overflow-hidden mb-4" style={{ border: "1px solid #E5E7EB" }}>
                {(["teacher", "student"] as const).map((t) => {
                  const active = tab === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className="flex-1 py-2.5 text-xs font-bold transition-all duration-150"
                      style={{
                        backgroundColor: active ? "#111111" : "#fff",
                        color: active ? "#fff" : "#9CA3AF",
                        borderRight: t === "teacher" ? "1px solid #E5E7EB" : "none",
                      }}
                    >
                      {t === "teacher" ? "선생님 수업 지원 자료" : "일반 학습자용 자료"}
                    </button>
                  );
                })}
              </div>

              {/* Table */}
              <div style={{ borderTop: "2px solid #111111" }}>
                <div className="flex py-2.5 border-b border-gray-200" style={{ backgroundColor: "#FAFAFA" }}>
                  <span className="w-12 text-xs text-gray-500 font-medium pl-1">번호</span>
                  <span className="flex-1 text-xs text-gray-500 font-medium">{colLabel}</span>
                </div>
                {materials.map((item, i) => (
                  <div key={i} className="flex items-center py-3 border-b border-gray-100">
                    <span className="w-12 text-sm pl-1" style={{ color: YBM_BLUE, fontWeight: 600 }}>{i + 1}</span>
                    <span className="flex-1 text-sm text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Email Section */}
          {!submitted ? (
            <div className="bg-white rounded-xl px-4 pt-4 pb-5" style={{ border: "1px solid #E5E7EB" }}>
              <h2 className="text-sm font-bold text-gray-900 mb-3">
                메일 주소를 입력해주세요.
              </h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 text-sm bg-gray-50 rounded-lg outline-none transition mb-3"
                style={{ border: "1px solid #E5E7EB" }}
                onFocus={(e) => { e.target.style.borderColor = YBM_BLUE; }}
                onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; }}
              />
              <label className="flex items-start gap-2 mb-4 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors"
                  style={{
                    borderColor: consent ? YBM_BLUE : "#D1D5DB",
                    backgroundColor: consent ? YBM_BLUE : "#fff",
                  }}
                >
                  {consent && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={3}>
                      <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-gray-400 leading-relaxed">
                  메일 발송 여부를 확인하고자 입력하신 메일 주소가 1년간 보관됩니다. 동의하십니까? (선택)
                </span>
              </label>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || loading}
                className="w-full py-3.5 rounded-lg text-sm font-bold text-white transition-all"
                style={{
                  backgroundColor: canSubmit ? YBM_BLUE : "#D1D5DB",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
              >
                {loading ? "발송 중…" : "자료 발송하기"}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl px-4 py-7 text-center" style={{ border: "1px solid #E5E7EB" }}>
              <div className="text-4xl mb-3">✉️</div>
              <p className="text-sm font-bold text-gray-900 mb-1.5">발송이 완료되었습니다!</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                <span className="font-semibold text-gray-700">{email}</span>으로<br />
                자료 링크를 보내드렸습니다. 메일함을 확인해 주세요.
              </p>
            </div>
          )}

          {/* Promo Button */}
          <a
            href="https://www.ybmbooksam.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center py-4 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: YBM_RED }}
          >
            YBM 북샘에서 더 많은 서비스 이용하기 →
          </a>

          <p className="text-center text-xs text-gray-300 pb-4">© YBM. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}
