import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  ArrowRight, MessageSquare, Video, Hash, BrainCircuit,
  FolderOpen, CheckSquare, ChevronRight, Sparkles,
  Clock, FileText, Users, Bell, Search, Zap,
  Database, PieChart,
} from 'lucide-react';
import { MotionContainer, PageTransition, HoverScale } from '@/components/MotionContainer';
import { useState, useEffect } from 'react';

// ── 品牌色（Teams 紫） ────────────────────────────────────────────────────
const T = {
  purple:      '#5B5EA6',
  purpleDark:  '#4A4D8F',
  purpleDeep:  '#2D2B5A',
  purpleLight: '#ECEDF8',
  purpleMid:   '#9B9DD4',
  yellow:      '#F2C811',
};

// ── 深色模式梯度 ─────────────────────────────────────────────────────────
const getDarkModeGradient = (isDark: boolean) => {
  if (isDark) {
    return 'linear-gradient(135deg, #3a3855 0%, #5a5995 60%, #7b7cb4 100%)';
  }
  return `linear-gradient(135deg, ${T.purpleDeep} 0%, ${T.purpleDark} 60%, ${T.purple} 100%)`;
};

// ── 噪點網格裝飾 ──────────────────────────────────────────────────────────
const GRID = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg stroke='%239B9DD4' stroke-width='0.3' opacity='0.25'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

// ── 公司內痛點情境 → Teams 解法 ──────────────────────────────────────────
const PAIN_POINTS = [
  {
    pain: '開完會忘了誰說要做什麼？',
    solution: 'Copilot 自動生成會議摘要與待辦清單，散會就好。',
    icon: <BrainCircuit className="w-5 h-5" />,
    color: '#7C3AED',
  },
  {
    pain: '同一件事 Email 來回十幾封？',
    solution: '在頻道討論串串接所有脈絡，找資料不用翻信件。',
    icon: <MessageSquare className="w-5 h-5" />,
    color: T.purple,
  },
  {
    pain: '檔案版本永遠搞不清楚？',
    solution: 'Teams 頻道的檔案由 SharePoint 統一管理，即時共同編輯、自動保留版本。',
    icon: <FolderOpen className="w-5 h-5" />,
    color: '#036C70',
  },
  {
    pain: '會議通知散落在各平台？',
    solution: '行事曆整合 Outlook，Teams 會議一鍵加入，不再錯過任何通知。',
    icon: <Bell className="w-5 h-5" />,
    color: '#C4262E',
  },
  {
    pain: '跨部門溝通找不到人？',
    solution: '@提及直接通知對方，不需要知道 Email 也能立即聯繫。',
    icon: <Users className="w-5 h-5" />,
    color: '#107C10',
  },
  {
    pain: '想找半年前的決議找不到？',
    solution: '搜尋功能橫跨訊息、檔案、會議記錄，幾秒定位關鍵資訊。',
    icon: <Search className="w-5 h-5" />,
    color: '#CA5010',
  },
];

// ── 核心功能 ──────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: '即時訊息與頻道',
    desc: '私訊、群組對話、頻道討論串，支援 @提及、表情回應、釘選訊息。告別 Email 往返，讓對話留在工作脈絡中。',
    tags: ['私訊', '群組', '頻道', '@提及'],
    color: T.purple,
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: '視訊會議與通話',
    desc: '最多 1,000 人同時參與，支援螢幕共享、虛擬背景、即時字幕。Copilot 自動生成逐字稿與會議摘要，開完會直接拿行動清單。',
    tags: ['1,000人', '螢幕共享', 'Copilot 摘要', '錄製'],
    color: '#7C3AED',
  },
  {
    icon: <Hash className="w-6 h-6" />,
    title: '團隊與頻道管理',
    desc: '依部門、專案、主題建立頻道，資訊透明共享。私人頻道可限定成員，共用頻道可跨組織協作，結構彈性又有秩序。',
    tags: ['公開頻道', '私人頻道', '共用頻道', '跨組織'],
    color: '#036C70',
  },
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    title: 'AI Copilot 助理',
    desc: '會議期間即時問 Copilot「剛才說了什麼決議？」；訊息串太長請 Copilot 幫你摘要重點；用自然語言搜尋任何歷史對話。',
    tags: ['會議摘要', '訊息摘要', '自然語言搜尋', '待辦清單'],
    color: '#C4262E',
  },
  {
    icon: <FolderOpen className="w-6 h-6" />,
    title: '檔案共同作業',
    desc: 'Word、Excel、PowerPoint 直接在 Teams 內開啟並多人同步編輯，底層由 SharePoint 負責版本控制，永遠不再有「最終版_v3_真的最終」的問題。',
    tags: ['即時共編', '版本控制', 'SharePoint', 'OneDrive'],
    color: '#0078D4',
  },
  {
    icon: <CheckSquare className="w-6 h-6" />,
    title: 'Planner 任務整合',
    desc: '將 Planner 工作看板釘選在頻道頁籤，任務指派、截止日期、進度追蹤一目了然。開會決議完直接建任務，不怕忘記。',
    tags: ['任務看板', '截止日期', '指派成員', '進度追蹤'],
    color: '#31752F',
  },
];

// ── M365 生態系整合 ───────────────────────────────────────────────────────
const INTEGRATIONS = [
  { icon: <Database className="w-5 h-5" />,  name: 'SharePoint', desc: '檔案底層儲存，版本控制', color: '#036C70' },
  { icon: <CheckSquare className="w-5 h-5" />, name: 'Planner',    desc: '任務看板，釘選在頻道', color: '#31752F' },
  { icon: <PieChart className="w-5 h-5" />,   name: 'Power BI',   desc: '嵌入報表，邊開會邊看數據', color: T.yellow },
  { icon: <Zap className="w-5 h-5" />,        name: 'Power Automate', desc: '自動化工作流程通知', color: '#0066FF' },
  { icon: <FileText className="w-5 h-5" />,   name: 'OneNote',    desc: '會議筆記同步整合', color: '#7719AA' },
  { icon: <Clock className="w-5 h-5" />,      name: 'Outlook',    desc: '行事曆與會議邀請同步', color: '#0078D4' },
];

// ── 學習路徑 ──────────────────────────────────────────────────────────────
const PATHS = [
  { num: '01', title: '5 分鐘入門',    href: '/practicalguide',         desc: '了解 Teams 介面與基本操作，馬上能用' },
  { num: '02', title: '聊天與頻道',   href: '/concepts/chat-channels', desc: '掌握訊息、頻道、@提及的正確用法' },
  { num: '03', title: '開一場好會議', href: '/concepts/meetings',      desc: '從排程到 Copilot 摘要，讓每次會議有產出' },
  { num: '04', title: '整合應用',      href: '/concepts/core',          desc: '將 Planner、SharePoint、Power BI 嵌進 Teams' },
];

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">

        {/* ══════════════════════════════════════════════════════════════
            HERO — 推廣訴求：不是功能說明，是解決工作困境
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden py-28"
          style={{ background: getDarkModeGradient(isDark) }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: GRID }} />
          {/* 左色線 */}
          <div className="absolute left-0 top-0 w-1 h-full"
            style={{ background: `linear-gradient(to bottom, ${T.yellow}, ${T.purple}, transparent)` }} />
          {/* 右上光暈 */}
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${T.purpleMid}, transparent)` }} />

          <div className="relative z-10 container max-w-5xl px-6 text-center">
            {/* Teams 品牌標籤 */}
            <MotionContainer direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-xs font-bold uppercase tracking-widest"
                style={{ borderColor: `${T.purpleMid}50`, background: `${T.purpleMid}15`, color: '#C8C9E8' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.yellow }} />
                CviLux內部 Microsoft Teams 教學平台
              </div>
            </MotionContainer>

            <MotionContainer direction="up" delay={0.2}>
              <h1 className="font-bold text-white leading-tight mb-6"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>
                工作更有效率<br />
                <span style={{
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundImage: `linear-gradient(90deg, ${T.yellow}, #FDE68A, ${T.yellow})`,
                  backgroundClip: 'text',
                }}>
                  從學會 Teams 開始
                </span>
              </h1>
            </MotionContainer>

            <MotionContainer direction="up" delay={0.3}>
              <p className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: '#B0B2D4' }}>
                訊息、會議、檔案、任務——全在一個地方。
                本教學平台幫助你從零開始，系統化掌握 Teams 的每一個實用功能。
              </p>
            </MotionContainer>

            <MotionContainer direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link href="/practicalguide">
                  <HoverScale>
                    <Button size="lg" className="px-10 font-bold text-base"
                      style={{ background: T.yellow, color: '#1a1a2e', border: 'none' }}>
                      5 分鐘快速入門
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </HoverScale>
                </Link>
                <Link href="/concepts/meetings">
                  <HoverScale>
                    <Button size="lg" variant="outline" className="px-10 font-semibold text-base bg-transparent"
                      style={{ borderColor: `${T.purpleMid}60`, color: '#C8C9E8' }}>
                      學開高效會議
                    </Button>
                  </HoverScale>
                </Link>
              </div>
            </MotionContainer>

            {/* 統計 */}
            <MotionContainer direction="up" delay={0.5}>
              <div className="flex flex-wrap justify-center gap-10 pt-8 border-t" style={{ borderColor: `${T.purpleMid}30` }}>
                {[
                  { num: '4', label: '系統化學習模組' },
                  { num: '1,000人', label: '會議人數上限' },
                  { num: '6+', label: 'M365 工具整合' },
                  { num: '24/7', label: '隨時學習，自訂步調' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>{s.num}</p>
                    <p className="text-xs mt-1" style={{ color: '#8B8DB8' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </MotionContainer>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            PAIN POINTS — 以工作痛點為切入，而非功能說明
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-background border-b border-border">
          <div className="container max-w-5xl">
            <MotionContainer direction="up">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: T.purple }}>
                你是不是也這樣？
              </p>
              <h2 className="text-4xl font-bold text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
                這些困境，Teams 能解決
              </h2>
              <p className="text-muted-foreground mb-12 max-w-xl">
                不是要你學一個新工具，而是幫你解決每天都在遇到的工作問題。
              </p>
            </MotionContainer>

            <div className="grid md:grid-cols-2 gap-4">
              {PAIN_POINTS.map((p, idx) => (
                <MotionContainer key={idx} direction="up" delay={idx * 0.07}>
                  <div className="group flex gap-5 p-5 rounded-xl border border-border bg-background hover:bg-muted/30 transition-colors duration-200 cursor-default">
                    {/* 圖示 */}
                    <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                      {p.icon}
                    </div>
                    <div>
                      {/* 痛點問句 */}
                      <p className="text-sm font-semibold text-foreground mb-1 flex items-center gap-1.5">
                        <span className="text-muted-foreground">→</span>
                        {p.pain}
                      </p>
                      {/* Teams 解法 */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-semibold" style={{ color: p.color }}>Teams 解法：</span>
                        {p.solution}
                      </p>
                    </div>
                  </div>
                </MotionContainer>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            FEATURES — 六大核心功能，無縫邊框卡片
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-muted/20 border-b border-border">
          <div className="container max-w-5xl">
            <MotionContainer direction="up">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: T.purple }}>核心功能</p>
              <h2 className="text-4xl font-bold text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
                六大功能，一次掌握
              </h2>
              <p className="text-muted-foreground mb-12 max-w-xl">
                每個功能都有完整的中文操作教學，點擊對應模組即可開始學習。
              </p>
            </MotionContainer>

            <div className="grid md:grid-cols-2 gap-0 border border-border rounded-2xl overflow-hidden bg-background">
              {FEATURES.map((f, idx) => (
                <MotionContainer key={idx} direction="up" delay={idx * 0.07}>
                  <div
                    className="p-8 h-full hover:bg-muted/40 transition-colors duration-200 flex flex-col"
                    style={{
                      borderRight: idx % 2 === 0 ? '1px solid var(--border)' : 'none',
                      borderBottom: idx < 4 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${f.color}15`, color: f.color }}>
                        {f.icon}
                      </div>
                      <h3 className="font-bold text-foreground">{f.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{f.desc}</p>
                    {/* 功能標籤 */}
                    <div className="mt-auto flex flex-wrap gap-2">
                      {f.tags.map(t => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </MotionContainer>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            AI COPILOT 重點推廣區 — 單獨拉出來強調
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-background border-b border-border">
          <div className="container max-w-5xl">
            <div className="rounded-2xl overflow-hidden border border-border"
              style={{ background: getDarkModeGradient(isDark) }}>
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRID }} />
              <div className="relative z-10 p-10 md:p-14">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* 左：文字說明 */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                      style={{ background: `${T.yellow}20`, color: T.yellow, border: `1px solid ${T.yellow}30` }}>
                      <Sparkles className="w-3.5 h-3.5" />
                      AI 功能亮點
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
                      Copilot 讓每次<br />會議都有產出
                    </h2>
                    <p className="text-sm leading-relaxed mb-8" style={{ color: '#B0B2D4' }}>
                      開會時 Copilot 即時記錄發言內容，會議結束後自動生成摘要、列出決議事項與待辦清單。
                      遲到的人可以問 Copilot「剛剛說了什麼」，不用打斷會議流程。
                    </p>
                    <Link href="/concepts/meetings">
                      <HoverScale>
                        <Button className="font-semibold px-8"
                          style={{ background: T.yellow, color: '#1a1a2e', border: 'none' }}>
                          學習會議 Copilot 功能
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </HoverScale>
                    </Link>
                  </div>

                  {/* 右：Copilot 功能列表 */}
                  <div className="space-y-4">
                    {[
                      { title: '自動會議摘要', desc: '結束就有一份整齊的摘要，不用自己記筆記' },
                      { title: '決議與待辦清單', desc: 'Copilot 自動整理誰要做什麼、截止日期是何時' },
                      { title: '遲到補課功能', desc: '加入會議超過 5 分鐘，Copilot 主動提供你趕快了解重點' },
                      { title: '訊息串摘要', desc: '頻道訊息太多？請 Copilot 幫你整理今天的重點' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3 p-4 rounded-xl"
                        style={{ background: `${T.purpleMid}15`, border: `1px solid ${T.purpleMid}25` }}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: `${T.yellow}20`, color: T.yellow }}>
                          <Sparkles className="w-3 h-3" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{item.title}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#9597C4' }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            M365 整合圈 — 視覺化呈現 Teams 作為中樞
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-muted/20 border-b border-border">
          <div className="container max-w-5xl">
            <MotionContainer direction="up">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: T.purple }}>生態系整合</p>
              <h2 className="text-4xl font-bold text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
                Teams 是你的工作中樞
              </h2>
              <p className="text-muted-foreground mb-12 max-w-xl">
                不只是通訊工具。Teams 串接了 Microsoft 365 所有生產力應用，讓你不需要在多個軟體之間切換。
              </p>
            </MotionContainer>

            {/* Teams 中心 + 六個工具 */}
            <div className="flex flex-col items-center gap-8">
              {/* 中心 */}
              <MotionContainer direction="up" delay={0.1}>
                <div className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center font-bold text-white text-sm shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${T.purple}, ${T.purpleDark})` }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mb-1">
                    <path d="M8 8.5C8 7.67 8.67 7 9.5 7H13C14.38 7 15.5 8.12 15.5 9.5V13C15.5 14.38 14.38 15.5 13 15.5H9.5C8.67 15.5 8 14.83 8 14V8.5Z" fill="white"/>
                    <path d="M18 12.5C18 11.67 18.67 11 19.5 11H20.5C22.54 11 24.17 12.63 24.17 14.67C24.17 16.71 22.54 18.33 20.5 18.33H19.5C18.67 18.33 18 17.67 18 16.83V12.5Z" fill="#C8C9E8"/>
                    <path d="M7.83 12.5C7.83 11.67 8.5 11 9.33 11H10.33C12.37 11 14 12.63 14 14.67C14 16.71 12.37 18.33 10.33 18.33H9.33C8.5 18.33 7.83 17.67 7.83 16.83V12.5Z" fill="#C8C9E8"/>
                  </svg>
                  Teams
                </div>
              </MotionContainer>

              {/* 六個整合工具 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full">
                {INTEGRATIONS.map((tool, idx) => (
                  <MotionContainer key={idx} direction="up" delay={idx * 0.07}>
                    <div className="p-4 rounded-xl border border-border bg-background hover:bg-muted/40 transition-colors duration-200 text-center">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-3"
                        style={{ backgroundColor: `${tool.color}15`, color: tool.color }}>
                        {tool.icon}
                      </div>
                      <p className="font-bold text-foreground text-xs mb-1">{tool.name}</p>
                      <p className="text-xs text-muted-foreground leading-tight">{tool.desc}</p>
                    </div>
                  </MotionContainer>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            LEARNING PATH — 四步驟學習路徑
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-background border-b border-border">
          <div className="container max-w-5xl">
            <MotionContainer direction="up">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: T.purple }}>學習路徑</p>
              <h2 className="text-4xl font-bold text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
                按步驟學，不走冤枉路
              </h2>
              <p className="text-muted-foreground mb-12 max-w-xl">
                從 5 分鐘入門到進階整合，每個模組都能獨立學習，也可以按順序完成。
              </p>
            </MotionContainer>

            <div className="rounded-2xl border border-border overflow-hidden bg-background">
              {PATHS.map((p, idx) => (
                <MotionContainer key={idx} direction="up" delay={idx * 0.08}>
                  <Link href={p.href}>
                    <div
                      className="group flex items-center gap-6 p-7 transition-colors duration-200 hover:bg-muted/30 cursor-pointer"
                      style={{
                        borderBottom: idx < PATHS.length - 1 ? '1px solid var(--border)' : 'none',
                        borderLeft: '3px solid transparent',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderLeftColor = T.purple)}
                      onMouseLeave={e => (e.currentTarget.style.borderLeftColor = 'transparent')}
                    >
                      <p className="text-4xl font-bold shrink-0 w-12"
                        style={{ color: T.purple, opacity: 0.2, letterSpacing: '-0.04em' }}>
                        {p.num}
                      </p>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground text-lg mb-0.5">{p.title}</h3>
                        <p className="text-sm text-muted-foreground">{p.desc}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </Link>
                </MotionContainer>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CTA — 呼應 Hero 推廣語氣
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-24 overflow-hidden"
          style={{ background: getDarkModeGradient(isDark) }}>
          <div className="absolute inset-0" style={{ backgroundImage: GRID }} />
          <div className="absolute left-0 top-0 w-1 h-full"
            style={{ background: `linear-gradient(to bottom, ${T.yellow}, transparent)` }} />

          <div className="relative z-10 container max-w-3xl text-center">
            <MotionContainer direction="up">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: T.yellow }}>
                現在就開始
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
                5 分鐘，<br />改變你的工作方式
              </h2>
              <p className="mb-10 leading-relaxed max-w-xl mx-auto" style={{ color: '#B0B2D4' }}>
                從入門指南開始，了解 Teams 的基本操作，
                然後按照你的需求深入學習會議、頻道或整合應用。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/practicalguide">
                  <HoverScale>
                    <Button size="lg" className="px-12 font-bold text-base"
                      style={{ background: T.yellow, color: '#1a1a2e', border: 'none' }}>
                      立即開始學習
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </HoverScale>
                </Link>
                <Link href="/support/faq">
                  <HoverScale>
                    <Button size="lg" variant="outline" className="px-12 font-semibold text-base bg-transparent"
                      style={{ borderColor: `${T.purpleMid}60`, color: '#C8C9E8' }}>
                      查看常見問題
                    </Button>
                  </HoverScale>
                </Link>
              </div>
            </MotionContainer>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
