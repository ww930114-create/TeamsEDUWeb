import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight, Factory, ShieldCheck, FlaskConical,
  Globe2, Truck, GraduationCap, AlertTriangle,
  CheckCircle2, Users, Video, MessageSquare, BarChart3
} from 'lucide-react';
import { MotionContainer, HoverScale } from '@/components/MotionContainer';

const PRIMARY = '#5B5EA6';
const PRIMARY_LIGHT = '#E8E6F5';
const PRIMARY_DARK = '#4B49A1';

// ──────────────────────────────────────────────
// 型別定義
// ──────────────────────────────────────────────
interface PainPoint {
  label: string;
}
interface Scenario {
  num: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  painTitle: string;       // 痛點標題
  painDesc: string;        // 描述遇到的問題
  solutionDesc: string;    // Teams 如何解決
  features: string[];
  color: string;
}

// ──────────────────────────────────────────────
// 情境資料（針對瀚荃 CviLux 量身撰寫）
// ──────────────────────────────────────────────
const scenarios: Scenario[] = [
  {
    num: '01',
    icon: <Factory className="w-8 h-8" />,
    title: '跨廠區生產協調',
    subtitle: 'Multi-Site Production',
    painTitle: '台灣、中國、寮國各廠各說各話',
    painDesc:
      '淡水總部、東莞、蘇州、重慶、安徽、寮國六個生產基地，訂單急件需要跨廠調料，只能靠電話、微信、Email 輾轉傳達，資訊落差造成生產延誤、插單衝突屢見不鮮。現場主管常常不清楚其他廠的產能狀況，更難即時掌握物料缺口。',
    solutionDesc:
      'Teams 頻道以廠區為單位，搭配即時訊息與影片通話，讓總部 PMC 與各廠現場主管同步生產動態；緊急插單直接在頻道發起討論並指派任務，所有決策與修改紀錄自動留存，不再靠口頭確認。',
    features: [
      '各廠房專屬頻道，訊息集中不漏接',
      '急件即時視訊，跨時區排班討論',
      '生產異常照片直傳頻道，快速會診',
      '與 ERP 整合，自動推送關鍵庫存警示',
    ],
    color: PRIMARY,
  },
  {
    num: '02',
    icon: <ShieldCheck className="w-8 h-8" />,
    title: '品質管理與稽核',
    subtitle: 'Quality & Compliance',
    painTitle: '異常通報靠 Email，稽核資料四散難追蹤',
    painDesc:
      '連接器精密製程對品質要求極嚴，客訴或製程異常發生時，QE、PE、現場主管三方得靠 Email 來回釐清責任，往往一天過去才能完成 8D 初版。ISO 稽核季節更頭痛——查核文件分散在各廠 NAS，稽核委員臨時索取某版 SOP，現場根本找不到正確版本。',
    solutionDesc:
      'Teams 結合 SharePoint 將 SOP、品保紀錄集中管理，版本清晰；異常通報直接在頻道建立任務卡，指定負責人與 Due Date，通知自動推送手機，讓 8D 閉環速度大幅提升，ISO 稽核時委員直接線上瀏覽最新文件。',
    features: [
      '異常回報即時貼圖，現場秒速上傳',
      '8D 任務追蹤，責任人一目了然',
      'SOP 集中版控，稽核零翻箱倒櫃',
      'UL / ISO 稽核文件快速存取',
    ],
    color: '#4B49A1',
  },
  {
    num: '03',
    icon: <FlaskConical className="w-8 h-8" />,
    title: '研發工程協作',
    subtitle: 'R&D Engineering',
    painTitle: '圖檔版本混亂，工程變更通知不到位',
    painDesc:
      '設計部門推出新款連接器或 FFC 軟排線時，CAD 圖檔、BOM、樣品規格書在 Email 裡反覆傳送，工程師常常拿到舊版圖面就下去開模；ECN（工程變更通知）若沒有確認機制，各廠製程工程師根本不知道規格已更新，導致不良品出現才發現問題。',
    solutionDesc:
      'Teams 整合 SharePoint 文件庫統一存放設計檔案，每次更版自動通知相關人員；ECN 以 Teams 任務發出，必須由各廠 PE 確認後才算關閉，確保第一線人員都看過最新變更，大幅減少圖面不符造成的重工。',
    features: [
      'CAD / BOM 集中存儲，版本一次搞定',
      'ECN 任務必讀確認，不怕漏接變更',
      '樣品會議線上召開，縮短決策週期',
      '專利與技術文件安全存取控管',
    ],
    color: '#7B79C4',
  },
  {
    num: '04',
    icon: <Globe2 className="w-8 h-8" />,
    title: '全球業務客戶服務',
    subtitle: 'Global Sales & CRM',
    painTitle: '歐亞美三洲業務，客戶資訊各自為政',
    painDesc:
      '瀚荃業務遍及歐、亞、美三大洲，各區業務靠個人信箱管理客戶往來，一旦業務離職或交接，報價單、客戶特殊需求全部跟著消失。不同時區的業務要在同一個專案上協作幾乎不可能，遇到大客戶 RFQ 需要技術支援，跨部門溝通更是一場混戰。',
    solutionDesc:
      'Teams 以大客戶或地區建立專屬頻道，報價單、往來郵件、會議記錄全部集中；業務、PM、研發即時在同一頻道討論，跨時區也能非同步追蹤；與 Power Automate 串接，客戶詢價自動建立任務並指派負責人，讓 RFQ 回覆速度明顯提升。',
    features: [
      '客戶頻道集中管理，交接零斷層',
      '跨時區非同步協作，歐美客戶不再等隔天',
      'RFQ 自動派件，報價週期縮短',
      '業績追蹤儀表板整合 Power BI',
    ],
    color: PRIMARY_DARK,
  },
  {
    num: '05',
    icon: <Truck className="w-8 h-8" />,
    title: '供應鏈採購協調',
    subtitle: 'Supply Chain & Procurement',
    painTitle: '料況緊張時，採購與廠區各自跑資訊',
    painDesc:
      '連接器原物料（銅料、塑膠粒、五金沖壓件）市況波動，採購部門若無法即時將料況變化通知各廠 PMC，就會出現一廠大量追料、另一廠庫存過多的情形；供應商交期異常時，採購靠電話一個個通知廠區，等全部人知道往往已過了最佳應變時機。',
    solutionDesc:
      'Teams 建立「採購快報」頻道，採購一則訊息、六廠同步收到；供應商交期異常可立即發起視訊討論，PMC 與採購即時決策替代料或調配庫存；Power Automate 可在 ERP 安全庫存觸發時自動推送 Teams 警示，讓供應鏈反應速度超過同業。',
    features: [
      '料況快報同步六廠，資訊不再延遲',
      '交期異常即時視訊應變，減少停線風險',
      'ERP 庫存警示自動推送 Teams',
      '供應商稽核資料數位化共享',
    ],
    color: PRIMARY,
  },
  {
    num: '06',
    icon: <GraduationCap className="w-8 h-8" />,
    title: '員工訓練與 SOP 上線',
    subtitle: 'Training & Onboarding',
    painTitle: '三千員工分布六廠，教育訓練標準難統一',
    painDesc:
      '瀚荃員工逾三千人，分散於台灣與中國多個廠區，每逢新機種量產、製程改善或法規更新，訓練資料靠 USB 或紙本傳遞各廠，版本不一致且紀錄難以查核；新進作業員的 SOP 訓練完全仰賴師傅口頭傳授，品質因人而異，稽核時也無法證明訓練已確實完成。',
    solutionDesc:
      'Teams 整合 Viva Learning，將產品組裝 SOP 影片、安全衛生課程、法規訓練一次發布至全體員工；主管可追蹤各廠訓練完成率，新進員工在 Teams 完成線上課程即留下紀錄，ISO 稽核時直接匯出訓練完成報表，不再手忙腳亂。',
    features: [
      'SOP 教學影片雲端統一發布',
      '新進員工線上訓練紀錄自動留存',
      '各廠訓練完成率儀表板',
      '法規更新即時通知全員閱讀確認',
    ],
    color: '#7B79C4',
  },
];

// ──────────────────────────────────────────────
// 整合工具
// ──────────────────────────────────────────────
const tools = [
  {
    icon: <Users className="w-5 h-5" />,
    name: 'Microsoft 365',
    desc: 'Word、Excel、Outlook 與 SharePoint 無縫整合，文件集中管理',
  },
  {
    icon: <Video className="w-5 h-5" />,
    name: 'Microsoft Stream',
    desc: 'SOP 訓練影片、產線教學錄製與管理',
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    name: 'Power Automate',
    desc: '異常通報、ECN 發送、ERP 庫存警示自動化',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    name: 'Power BI',
    desc: '生產效率、品質指標、業績達成率整合視覺化',
  },
];

// ──────────────────────────────────────────────
// 元件主體
// ──────────────────────────────────────────────
export default function Scenarios() {
  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2D2B5A, #4B49A1, #5B5EA6)' }}
      >
        {/* 背景裝飾 */}
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
          <p className="text-lg text-white/70 mb-4 max-w-2xl mx-auto leading-relaxed">
            瀚荃（CviLux）擁有台灣、中國、東協多個廠區，員工逾三千人，全球業務遍及歐亞美三洲。
            以下六個情境，對應的是瀚荃日常最真實的溝通挑戰——以及 Teams 如何協助解決。
          </p>
          {/* 快速數據 */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 mt-6">
            {[
              { num: '6', label: '生產廠區' },
              { num: '3,000+', label: '名員工' },
              { num: '3', label: '大洲銷售據點' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.num}</div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/practicalguide">
              <Button
                size="lg"
                className="px-10 font-semibold"
                style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}
              >
                從入門開始
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/concepts/core">
              <Button
                size="lg"
                variant="outline"
                className="px-10 font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                核心概念
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 情境卡片 ── */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: PRIMARY }}
            >
              六大應用情境
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              瀚荃各部門的 Teams 實際使用場景
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              每個情境都從瀚荃的真實痛點出發，說明問題從何而來，以及 Teams 能帶來的具體改變。
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scenarios.map((scenario, idx) => (
              <HoverScale key={idx}>
                <Card className="bg-card border-border h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col">
                  <CardContent className="pt-7 pb-7 flex flex-col h-full">
                    {/* 裝飾角落色塊 */}
                    <div
                      className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10"
                      style={{ background: scenario.color }}
                    />

                    {/* 圖示 + 標題 */}
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${scenario.color}15`, color: scenario.color }}
                      >
                        {scenario.icon}
                      </div>
                      <div>
                        <div className="text-xs font-medium mb-1" style={{ color: scenario.color }}>
                          {scenario.subtitle}
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{scenario.title}</h3>
                      </div>
                    </div>

                    {/* 痛點區塊 */}
                    <div
                      className="rounded-lg p-3 mb-4 flex gap-2"
                      style={{ background: `${scenario.color}0D`, borderLeft: `3px solid ${scenario.color}` }}
                    >
                      <AlertTriangle
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: scenario.color }}
                      />
                      <div>
                        <div className="text-xs font-semibold mb-1" style={{ color: scenario.color }}>
                          痛點：{scenario.painTitle}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {scenario.painDesc}
                        </p>
                      </div>
                    </div>

                    {/* Teams 解決方案 */}
                    <div className="rounded-lg p-3 mb-5 bg-muted/50 flex gap-2">
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500"
                      />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {scenario.solutionDesc}
                      </p>
                    </div>

                    {/* 功能列表 */}
                    <div className="space-y-2 mt-auto">
                      {scenario.features.map((feature, fi) => (
                        <div key={fi} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <div
                            className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                            style={{ background: scenario.color }}
                          />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </div>
        </div>
      </section>

      {/* ── 廠區覆蓋視覺化 ── */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: PRIMARY }}
            >
              全球廠區覆蓋
            </p>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Teams 串聯瀚荃六大廠區
            </h2>
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
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: PRIMARY }}
            >
              生態系整合
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              與 Microsoft 365 無縫整合
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Teams 不是孤立工具，它與整個 Microsoft 365 生態系緊密結合，打造瀚荃完整的數位製造協作平台。
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {tools.map((tool, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.05}>
                <div className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-sm transition">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${PRIMARY}15`, color: PRIMARY }}
                  >
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
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #2D2B5A, #4B49A1)' }}
      >
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            準備好讓瀚荃的協作升級了嗎？
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            從跨廠協調、品質管理到全球業務，Teams 是讓瀚荃各廠、各部門真正連在一起的核心平台。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/concepts/core">
              <Button
                size="lg"
                className="px-10 font-semibold"
                style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}
              >
                學習核心概念
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/support/faq">
              <Button
                size="lg"
                variant="outline"
                className="px-10 font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                查看常見問題
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
