import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  ArrowRight, Factory, ShieldCheck, FlaskConical,
  Globe2, Truck, GraduationCap, AlertTriangle,
  CheckCircle2, Users, Video, MessageSquare, BarChart3,
  X, Sparkles,
} from 'lucide-react';
import { MotionContainer, HoverScale } from '@/components/MotionContainer';

const PRIMARY = '#5B5EA6';
const PRIMARY_LIGHT = '#E8E6F5';
const PRIMARY_DARK = '#4B49A1';

// ──────────────────────────────────────────────
// 型別定義
// ──────────────────────────────────────────────
interface Scenario {
  num: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  painTitle: string;
  painPoints: string[];
  solutionDesc: string;
  features: string[];
  color: string;
}

// ──────────────────────────────────────────────
// 情境資料
// ──────────────────────────────────────────────
const scenarios: Scenario[] = [
  {
    num: '01',
    icon: <Factory className="w-7 h-7" />,
    title: '跨廠區生產協調',
    subtitle: 'Multi-Site Production',
    painTitle: '六廠各說各話，急件靠電話追',
    painPoints: [
      '訂單急件需跨廠調料，靠電話微信輾轉傳達，資訊落差常造成停線',
      '總部 PMC 無法即時掌握各廠產能與物料缺口',
      '插單決策口頭確認，事後找不到紀錄、無法追責',
    ],
    solutionDesc:
      'Teams 以廠區為單位建立專屬頻道，搭配即時訊息與視訊通話，讓總部 PMC 與六廠現場主管同步生產動態。緊急插單在頻道直接發起討論、指派任務，所有決策與修改記錄自動保存，不再靠口頭確認。並可與 ERP 整合，在安全庫存觸發時自動推送 Teams 警示。',
    features: [
      '各廠房專屬頻道，訊息集中不漏接',
      '急件即時視訊，跨時區排班討論',
      '生產異常照片直傳頻道，快速跨廠會診',
      '與 ERP 整合，自動推送關鍵庫存警示',
    ],
    color: PRIMARY,
  },
  {
    num: '02',
    icon: <ShieldCheck className="w-7 h-7" />,
    title: '品質管理與稽核',
    subtitle: 'Quality & Compliance',
    painTitle: '異常處理靠 Email 往返，SOP 版本亂',
    painPoints: [
      '品質異常發生後，QE、PE、現場主管三方靠 Email 釐清，一天過去才能完成 8D 初版',
      'ISO 稽核季節，SOP 文件散落各廠 NAS，稽核委員索取時找不到正確版本',
      '各廠 SOP 版本不一致，製程依舊沿用舊規格導致不良品',
    ],
    solutionDesc:
      'Teams 結合 SharePoint 將 SOP、品保紀錄集中管理，版本清晰唯一。異常通報直接在頻道建立任務卡，指定負責人與 Due Date，通知自動推送手機，讓 8D 閉環速度大幅提升。ISO 稽核時，委員直接線上瀏覽最新文件，無需翻找。',
    features: [
      '異常回報即時貼圖，現場秒速上傳',
      '8D 任務追蹤，責任人與期限一目了然',
      'SOP 集中版控，稽核零翻箱倒櫃',
      'UL / ISO 稽核文件快速存取與權限管控',
    ],
    color: '#4B49A1',
  },
  {
    num: '03',
    icon: <FlaskConical className="w-7 h-7" />,
    title: '研發工程協作',
    subtitle: 'R&D Engineering',
    painTitle: '圖檔版本混亂，ECN 沒人確認',
    painPoints: [
      '設計圖、BOM 在 Email 中反覆傳送，工程師拿到舊版圖面就下去開模',
      'ECN 工程變更通知沒有確認機制，各廠 PE 不知道規格已更新',
      '重工、報廢發生才發現圖面與製程不符，損失難以追回',
    ],
    solutionDesc:
      'Teams 整合 SharePoint 文件庫統一存放設計檔案，每次更版自動通知相關人員。ECN 以 Teams 任務發出，必須由各廠 PE 確認後才算關閉，確保第一線人員都已看過最新變更，從源頭杜絕版本不符造成的重工。',
    features: [
      'CAD / BOM 集中存儲，版本一次搞定',
      'ECN 任務必讀確認，不怕漏接工程變更',
      '樣品會議線上召開，縮短跨廠決策週期',
      '專利與技術文件安全存取控管',
    ],
    color: '#7B79C4',
  },
  {
    num: '04',
    icon: <Globe2 className="w-7 h-7" />,
    title: '全球業務客戶服務',
    subtitle: 'Global Sales & CRM',
    painTitle: '歐亞美三洲業務，客戶資訊各自為政',
    painPoints: [
      '業務靠個人信箱管理客戶往來，一旦離職或交接，報價與特殊需求全部消失',
      '不同時區的業務無法在同一專案上即時協作',
      '大客戶 RFQ 需技術支援，跨部門溝通耗時，回覆速度輸給競爭對手',
    ],
    solutionDesc:
      'Teams 以大客戶或地區建立專屬頻道，報價單、往來郵件、會議記錄全部集中。業務、PM、研發即時在同一頻道討論，跨時區也能非同步追蹤。與 Power Automate 串接，客戶詢價自動建立任務並指派負責人，讓 RFQ 回覆速度明顯提升。',
    features: [
      '客戶頻道集中管理，人員交接零斷層',
      '跨時區非同步協作，歐美客戶不再等隔天',
      'RFQ 自動派件，報價週期縮短',
      '業績追蹤儀表板整合 Power BI',
    ],
    color: PRIMARY_DARK,
  },
  {
    num: '05',
    icon: <Truck className="w-7 h-7" />,
    title: '供應鏈採購協調',
    subtitle: 'Supply Chain & Procurement',
    painTitle: '料況異常通知太慢，各廠各自應變',
    painPoints: [
      '銅料、塑膠粒等原物料市況波動，採購無法即時通知六廠 PMC，造成一廠追料、另一廠庫存過剩',
      '供應商交期異常靠電話一個個通知，等所有人知道已錯過最佳應變時機',
      '替代料決策沒有統一討論平台，各廠自行決定導致規格不一',
    ],
    solutionDesc:
      'Teams 建立「採購快報」頻道，採購一則訊息、六廠同步收到。供應商交期異常可立即發起視訊討論，PMC 與採購即時決定替代料或調配庫存。Power Automate 可在 ERP 安全庫存觸發時自動推送 Teams 警示，讓供應鏈反應速度超過同業。',
    features: [
      '料況快報同步六廠，資訊不再延遲',
      '交期異常即時視訊應變，減少停線風險',
      'ERP 庫存警示自動推送 Teams 頻道',
      '供應商稽核資料數位化共享',
    ],
    color: PRIMARY,
  },
  {
    num: '06',
    icon: <GraduationCap className="w-7 h-7" />,
    title: '員工訓練與 SOP 上線',
    subtitle: 'Training & Onboarding',
    painTitle: '三千員工分六廠，訓練標準難統一',
    painPoints: [
      '新機種量產或法規更新時，訓練資料靠 USB 或紙本傳遞，版本不一致且紀錄難查核',
      '新進作業員 SOP 訓練完全仰賴師傅口頭傳授，品質因人而異',
      'ISO 稽核時無法提供完整訓練完成紀錄，臨時補件手忙腳亂',
    ],
    solutionDesc:
      'Teams 整合 Viva Learning，將產品組裝 SOP 影片、安全衛生課程、法規訓練一次發布至全體員工。主管可追蹤各廠訓練完成率，新進員工在 Teams 完成線上課程即留下紀錄，ISO 稽核時直接匯出訓練完成報表，不再手忙腳亂。',
    features: [
      'SOP 教學影片雲端統一發布，版本一致',
      '新進員工線上訓練紀錄自動留存',
      '各廠訓練完成率儀表板即時查看',
      '法規更新即時通知全員閱讀確認',
    ],
    color: '#7B79C4',
  },
];

const tools = [
  { icon: <Users className="w-5 h-5" />, name: 'Microsoft 365', desc: 'Word、Excel、Outlook 與 SharePoint 無縫整合，文件集中管理' },
  { icon: <Video className="w-5 h-5" />, name: 'Microsoft Stream', desc: 'SOP 訓練影片、產線教學錄製與管理' },
  { icon: <MessageSquare className="w-5 h-5" />, name: 'Power Automate', desc: '異常通報、ECN 發送、ERP 庫存警示自動化' },
  { icon: <BarChart3 className="w-5 h-5" />, name: 'Power BI', desc: '生產效率、品質指標、業績達成率整合視覺化' },
];

// ──────────────────────────────────────────────
// Modal 元件
// ──────────────────────────────────────────────
function SolutionModal({ scenario, onClose }: { scenario: Scenario; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'var(--background, #fff)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* 色條頂部 */}
        <div className="h-2 w-full" style={{ background: scenario.color }} />

        <div className="p-7">
          {/* 關閉按鈕 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* 標頭 */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${scenario.color}15`, color: scenario.color }}
            >
              {scenario.icon}
            </div>
            <div>
              <div className="text-xs font-medium mb-0.5" style={{ color: scenario.color }}>
                {scenario.subtitle}
              </div>
              <h3 className="text-xl font-bold text-foreground">{scenario.title}</h3>
            </div>
          </div>

          {/* Teams 如何解決 */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles className="w-4 h-4" style={{ color: scenario.color }} />
              <span className="text-sm font-semibold text-foreground">Teams 如何解決</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{scenario.solutionDesc}</p>
          </div>

          {/* 具體功能 */}
          <div className="rounded-xl p-4" style={{ background: `${scenario.color}0A` }}>
            <div className="text-xs font-semibold mb-3" style={{ color: scenario.color }}>
              具體功能
            </div>
            <div className="space-y-2.5">
              {scenario.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: scenario.color }} />
                  <span className="text-sm text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// 主頁面
// ──────────────────────────────────────────────
export default function Scenarios() {
  const [selected, setSelected] = useState<Scenario | null>(null);

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2D2B5A, #4B49A1, #5B5EA6)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,.05) 40px, rgba(255,255,255,.05) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,.05) 40px, rgba(255,255,255,.05) 41px)',
          }}
        />
        <div className="container relative z-10 max-w-4xl text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: `${PRIMARY_LIGHT}25`, color: '#E8E6F5' }}
          >
            <Factory className="w-4 h-4" />
            瀚荃 × Microsoft Teams 應用情境
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            解決製造現場的真實痛點
          </h1>
          <p className="text-lg text-white/70 mb-6 max-w-2xl mx-auto leading-relaxed">
            瀚荃擁有台灣、中國、東協多個廠區，員工逾三千人，全球業務遍及歐亞美三洲。
            以下六個情境對應日常最真實的溝通挑戰——點擊卡片，查看 Teams 的具體解法。
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[{ num: '6', label: '生產廠區' }, { num: '3,000+', label: '名員工' }, { num: '3', label: '大洲銷售據點' }].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{s.num}</div>
                <div className="text-sm text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/practicalguide">
              <Button size="lg" className="px-10 font-semibold" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                操作教學 <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/chat-channel">
              <Button size="lg" variant="outline" className="px-10 font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent">
                聊天與頻道
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 情境卡片 ── */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>
              六大應用情境
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              瀚荃各部門正在面對的挑戰
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              每張卡片呈現一個真實痛點。<span className="font-medium text-foreground">點擊卡片</span>，查看 Teams 的具體解決方案。
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario, idx) => (
              <HoverScale key={idx}>
                <button className="w-full text-left" onClick={() => setSelected(scenario)}>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
                    {/* 色條 */}
                    <div className="h-1.5 w-full" style={{ background: scenario.color }} />

                    <div className="p-6">
                      {/* 圖示 + 編號 */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${scenario.color}15`, color: scenario.color }}
                        >
                          {scenario.icon}
                        </div>
                        <span className="text-3xl font-black opacity-10 leading-none" style={{ color: scenario.color }}>
                          {scenario.num}
                        </span>
                      </div>

                      {/* 標題 */}
                      <div className="text-xs font-medium mb-1" style={{ color: scenario.color }}>
                        {scenario.subtitle}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-4">{scenario.title}</h3>

                      {/* 痛點 bullets */}
                      <div
                        className="rounded-xl p-4 mb-4"
                        style={{ background: `${scenario.color}08`, border: `1px solid ${scenario.color}20` }}
                      >
                        <div className="flex items-center gap-1.5 mb-2.5">
                          <AlertTriangle className="w-3.5 h-3.5" style={{ color: scenario.color }} />
                          <span className="text-xs font-semibold" style={{ color: scenario.color }}>現在的問題</span>
                        </div>
                        <div className="space-y-2">
                          {scenario.painPoints.map((pt, pi) => (
                            <div key={pi} className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ background: scenario.color }} />
                              <span className="text-xs text-muted-foreground leading-relaxed">{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA hint */}
                      <div
                        className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-2.5 transition-all"
                        style={{ color: scenario.color }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        查看 Teams 解法
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </button>
              </HoverScale>
            ))}
          </div>
        </div>
      </section>

      {/* ── 廠區覆蓋 ── */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>全球廠區覆蓋</p>
            <h2 className="text-3xl font-bold text-foreground mb-4">Teams 串聯瀚荃六大廠區</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              無論是台灣淡水總部、中國各廠，還是東協寮國廠，所有人在同一個平台上協作。
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { site: '台灣 淡水', role: '營運總部 ／ R&D', flag: '🇹🇼' },
              { site: '中國 東莞', role: '主要生產基地', flag: '🇨🇳' },
              { site: '中國 蘇州', role: '生產基地', flag: '🇨🇳' },
              { site: '中國 重慶', role: '生產基地', flag: '🇨🇳' },
              { site: '中國 安徽', role: '生產基地', flag: '🇨🇳' },
              { site: '東協 寮國', role: '新興生產基地', flag: '🇱🇦' },
            ].map((loc, i) => (
              <MotionContainer key={i} direction="up" delay={i * 0.05}>
                <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 hover:shadow-sm transition">
                  <span className="text-2xl">{loc.flag}</span>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{loc.site}</div>
                    <div className="text-xs text-muted-foreground">{loc.role}</div>
                  </div>
                </div>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ── 整合工具 ── */}
      <section className="py-20 bg-background">
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>生態系整合</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">與 Microsoft 365 無縫整合</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Teams 不是孤立工具，它與整個 Microsoft 365 生態系緊密結合，打造瀚荃完整的數位製造協作平台。
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {tools.map((tool, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.05}>
                <div className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-sm transition">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${PRIMARY}15`, color: PRIMARY }}>
                    {tool.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{tool.name}</h4>
                    <p className="text-sm text-muted-foreground">{tool.desc}</p>
                  </div>
                </div>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #2D2B5A, #4B49A1)' }}>
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">準備好讓瀚荃的協作升級了嗎？</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            從跨廠協調、品質管理到全球業務，Teams 是讓瀚荃各廠、各部門真正連在一起的核心平台。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/meeting">
              <Button size="lg" className="px-10 font-semibold" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                會議管理 <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/faq">
              <Button size="lg" variant="outline" className="px-10 font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent">
                查看常見問題
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {selected && (
        <SolutionModal scenario={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
