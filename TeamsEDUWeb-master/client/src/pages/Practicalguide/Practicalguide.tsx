import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  ArrowRight, Bell, UserCircle, FolderUp, FileEdit, Layers,
  Search, CheckCircle2, MessageSquare, Video, VolumeX,
  Image as ImageIcon, CalendarDays, Activity, Target, Hammer,
  Phone, Cloud, Sparkles, LayoutGrid, Users
} from 'lucide-react';
import { MotionContainer, PageTransition } from '@/components/MotionContainer';

const T = {
  purple: '#5B5EA6',
  purpleDark: '#4A4D8F',
  purpleDeep: '#2D2B5A',
  purpleLight: '#ECEDF8',
  purpleMid: '#9B9DD4',
  yellow: '#F2C811',
  teal: '#036C70',
  orange: '#D83B01',
  red: '#A80000',
  blue: '#0078D4',
};

const GRID = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg stroke='%239B9DD4' stroke-width='0.3' opacity='0.25'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

type TipType = 'info' | 'warning' | 'success';

interface TipBlock {
  type: TipType;
  text: string;
}

interface Shortcut {
  action: string;
  keys: string[];
}

interface GuideStep {
  icon: React.ReactNode; 
  title: string;
  action: string;
  concept: string;
  actionSteps: string[];
  imagePlaceholder?: string;
  shortcuts?: Shortcut[];
  tips?: TipBlock[];
  customComponent?: React.ReactNode;
}

// ── 新增：垂直導覽列互動元件 ──────────────────────────────────────────────
const INTERACTIVE_NAV_ITEMS = [
  {
    id: 'activity',
    label: '活動',
    icon: <Bell className="w-6 h-6" />,
    concept: '你的專屬通知中心。所有與你「直接相關」的動態（@提及、回覆、未接來電）都會在這裡。把它當成工作收件匣來清空。',
    actionSteps: ['點擊「活動」，查看未讀的紅色數字標籤。', '點擊任意一條通知，右側會直接跳轉到該訊息的發生地。'],
    shortcuts: ['Ctrl', '1']
  },
  {
    id: 'chat',
    label: '聊天',
    icon: <MessageSquare className="w-6 h-6" />,
    concept: '就像 LINE 一樣，適合一對一或臨時小群組的快速問答、打屁。這裡傳的檔案會存在個人 OneDrive。',
    actionSteps: ['點擊上方「新增聊天」圖示，輸入同事名字發起對話。', '若討論逐漸變成正式專案，請停止在這裡討論，改去「團隊」。'],
    shortcuts: ['Ctrl', '2']
  },
  {
    id: 'teams',
    label: '團隊',
    icon: <Users className="w-6 h-6" />,
    concept: '這才是 Teams 的靈魂！基於部門或專案建立的正式空間。新成員加入可以回溯歷史紀錄，檔案統一存放在 SharePoint。',
    actionSteps: ['點開你們部門的團隊頻道。', '閱讀「貼文」頁籤的歷史公告。'],
    shortcuts: ['Ctrl', '3']
  },
  {
    id: 'calendar',
    label: '行事曆',
    icon: <CalendarDays className="w-6 h-6" />,
    concept: '與 Outlook 雙向完全同步。你不用開 Outlook 也能在這裡排程或加入線上會議。',
    actionSteps: ['點擊右上角「新增會議」來排程。', '找到即將開始的會議，點擊「加入」。'],
    shortcuts: ['Ctrl', '4']
  },
  {
    id: 'calls',
    label: '通話',
    icon: <Phone className="w-6 h-6" />,
    concept: '查看通話紀錄、快速撥打語音電話給同事。',
    actionSteps: ['輸入同事名稱撥打語音電話。', '查看左側的未接來電與語音信箱紀錄。'],
    shortcuts: ['Ctrl', '5']
  },
  {
    id: 'onedrive',
    label: 'OneDrive',
    icon: <Cloud className="w-6 h-6" />,
    concept: '快速存取你最近在 Teams 裡開啟過、或是存在雲端的所有個人檔案。',
    actionSteps: ['點擊查看「最近」開啟的檔案清單。']
  },
  {
    id: 'copilot',
    label: 'Copilot',
    icon: <Sparkles className="w-6 h-6" />,
    concept: '你的 AI 助理。可以幫你摘要冗長的聊天紀錄、尋找公司內部文件資訊。',
    actionSteps: ['點開向 Copilot 提問：「幫我總結昨天錯過的訊息」。']
  }
];

function InteractiveVerticalNav() {
  const [activeTab, setActiveTab] = useState(INTERACTIVE_NAV_ITEMS[0].id);
  const activeData = INTERACTIVE_NAV_ITEMS.find(item => item.id === activeTab)!;

  return (
    <div className="flex flex-col md:flex-row bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm mt-4">
      {/* 左側模擬 Teams 垂直導覽列 */}
      <div className="flex md:flex-col items-center bg-[#EBEBEB] dark:bg-[#202020] border-b md:border-b-0 md:border-r border-border/40 p-2 md:py-4 md:w-20 overflow-x-auto no-scrollbar shrink-0 gap-2 md:gap-4">
        {INTERACTIVE_NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl transition-all duration-200 shrink-0 ${
                isActive 
                  ? 'bg-background text-primary shadow-sm ring-1 ring-border/50' 
                  : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <div className={isActive ? 'text-[#5B5EA6]' : ''}>
                {item.icon}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-[#5B5EA6]' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
        
        {/* 模擬下方的應用程式按鈕 */}
        <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-xl text-muted-foreground mt-auto">
          <LayoutGrid className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">應用程式</span>
        </div>
      </div>

      {/* 右側動態說明區塊 */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center min-h-75">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-lg bg-[#5B5EA6]/10 text-[#5B5EA6]">
            {activeData.icon}
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            {activeData.label} 
          </h3>
          {activeData.shortcuts && (
            <div className="ml-auto flex gap-1">
              {activeData.shortcuts.map((k, i) => (
                <span key={i} className="px-2 py-1 text-xs font-mono rounded border border-border bg-muted/30 text-muted-foreground shadow-sm">
                  {k}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              <h4 className="text-sm font-bold text-foreground">核心觀念</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {activeData.concept}
            </p>
          </div>

          <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Hammer className="w-4 h-4 text-foreground" />
              <h4 className="text-sm font-bold text-foreground">你可以試著這樣做：</h4>
            </div>
            <ul className="space-y-2">
              {activeData.actionSteps.map((act, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center text-xs font-bold text-muted-foreground mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-foreground leading-relaxed">{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
// ──────────────────────────────────────────────────────────────────────────

const IMPLEMENTATION_PHASES = [
  {
    id: 'phase-1',
    phaseNum: '01',
    title: '左側導覽列：Teams 的神經中樞',
    desc: '點擊左側模擬面板的按鈕，看看各個功能到底在做什麼。',
    color: T.teal,
    steps: [
      {
        icon: <Layers className="w-5 h-5" />,
        title: '認識功能切換列 (互動圖解)',
        action: '這條工具列是你操作 Teams 的起點。',
        concept: '不要死背功能，直接點擊下方的模擬選單，看看每個 Icon 對應的使用場景與操作步驟。',
        actionSteps: ['在下方點擊不同的圖示切換說明。', '特別注意「聊天」與「團隊」的差異。'],
        customComponent: <InteractiveVerticalNav /> // 插入自訂互動元件
      } as GuideStep,
      {
        icon: <Search className="w-5 h-5" />,
        title: '頂端搜尋列：找人與下指令',
        action: '找不到檔案或訊息？往最上面打字就對了。',
        concept: '這條搜尋列是全域的，可以跨群組找訊息、找檔案。而且它還是一個「指令列」，只要輸入斜線 (/) 就能快速觸發各種設定。',
        actionSteps: [
          '游標點擊頂端搜尋列 (或按 Ctrl+E)。',
          '輸入同事的名字，快速發起對話。',
          '輸入「/」，看看系統跳出了哪些快捷指令。'
        ],
        shortcuts: [{ action: '聚焦搜尋列', keys: ['Ctrl', 'E'] }]
      } as GuideStep,
    ],
  },
  {
    id: 'phase-2',
    phaseNum: '02',
    title: '檔案分享與共同編輯',
    desc: '弄懂檔案到底存去哪，你才不會遇到權限打不開的問題。',
    color: T.orange,
    steps: [
      {
        icon: <FolderUp className="w-5 h-5" />,
        title: '上傳檔案與底層邏輯',
        action: '傳檔案之前，先知道它被存到了哪裡。',
        concept: 'Teams 只是個溝通的殼。你在「聊天」傳的檔案，其實是存進你個人的 OneDrive；你在「團隊頻道」傳的檔案，是存進部門共用的 SharePoint 網站。',
        actionSteps: [
          '在任何一個對話框下方，點擊「迴紋針圖示」上傳一個檔案。',
          '如果是傳到頻道裡，切換到該頻道上方的「檔案」頁籤，你會看到剛剛傳的檔案已經自動歸檔在那裡了。'
        ],
      } as GuideStep,
      {
        icon: <FileEdit className="w-5 h-5" />,
        title: '多人即時共同編輯',
        action: '直接點開檔案修改，不用再下載重傳。',
        concept: '傳到 Teams 裡的 Office 檔案 (Word/Excel/PPT)，點擊就會直接在 Teams 內部開啟，而且允許多人同時編輯。系統會即時幫你存檔。',
        actionSteps: [
          '點擊對話中任何一個 Word 或 Excel 檔案。',
          '在畫面內直接打字，觀察左上角是否顯示「已儲存」。',
          '編輯完畢後，直接點擊右上角的「關閉」，檔案就會自動更新。'
        ],
        tips: [
          { type: 'success' as TipType, text: '真的不用在那邊狂按 Ctrl+S，雲端會自己幫你存好。' },
        ],
      } as GuideStep,
    ],
  },
  {
    id: 'phase-3',
    phaseNum: '03',
    title: '馴服通知 (防干擾設定)',
    desc: '被 Teams 吵到無法工作？因為你沒做這一步。',
    color: T.red,
    steps: [
      {
        icon: <Bell className="w-5 h-5" />,
        title: '調整全域通知與靜音',
        action: '把無關緊要的提醒關掉，保留你的專注力。',
        concept: 'Teams 預設會把所有新訊息都彈出視窗吵你。你必須自己把不重要的頻道設定為「隱藏」或「靜音」，只保留直接 @提及你 的通知。',
        actionSteps: [
          '滑鼠移到左側某個不重要、只是掛名的聊天群組上。',
          '點擊旁邊的「...」圖示，選擇【靜音】(Mute)。',
          '點擊右上角的頭像旁的「...」>「設定」>「通知」，把一般頻道的通知改成【僅在活動中顯示】。'
        ],
      } as GuideStep,
    ],
  },
];

const SPOTLIGHT_GUIDES = [
  {
    title: '聊天與頻道操作細節',
    summary: '怎麼建立頻道、怎麼善用回覆功能、如何正確使用 @提及，已整理到專屬頁面。',
    href: '/concepts/chat-channels',
    icon: <MessageSquare className="w-5 h-5" />,
    color: T.blue,
  },
  {
    title: '線上會議完整指南',
    summary: '如何排程會議、分享螢幕、開啟錄影與使用 AI 會議摘要，已整理到專屬頁面。',
    href: '/concepts/meetings',
    icon: <Video className="w-5 h-5" />,
    color: '#7C3AED',
  },
];

const tipStyle: Record<TipType, { bg: string; border: string; text: string; icon: string }> = {
  info:    { bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8', icon: 'ℹ' },
  warning: { bg: '#FFFBEB', border: '#FDE68A', text: '#B45309', icon: '⚠' },
  success: { bg: '#ECFDF5', border: '#A7F3D0', text: '#065F46', icon: '✓' },
};

function StepCard({ step, color }: { step: GuideStep; color: string }) {
  return (
    <div className="group flex flex-col gap-0 rounded-2xl border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all duration-300 overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-4 p-5 sm:p-6 border-b border-border/50">
        <div className="shrink-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${color}15`, color }}>
            {step.icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
          <p className="text-sm font-semibold" style={{ color }}>{step.action}</p>
        </div>
      </div>

      <div className="p-5 sm:p-6 grid gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <h4 className="text-sm font-bold text-foreground">核心觀念</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {step.concept}
          </p>
        </div>

        {/* 這裡渲染自訂的互動元件 */}
        {step.customComponent && (
          <div className="w-full">
            {step.customComponent}
          </div>
        )}

        {step.actionSteps && step.actionSteps.length > 0 && (
          <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Hammer className="w-4 h-4 text-foreground" />
              <h4 className="text-sm font-bold text-foreground">你要做的動作</h4>
            </div>
            <ul className="space-y-2">
              {step.actionSteps.map((act, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center text-xs font-bold text-muted-foreground mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-foreground leading-relaxed">{act}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="px-5 sm:px-6 pb-5 space-y-4">
        {step.shortcuts && step.shortcuts.length > 0 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {step.shortcuts.map((sc: Shortcut, i: number) => (
                <div key={i} className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2">
                  <span className="text-xs text-muted-foreground">{sc.action}</span>
                  <div className="flex items-center gap-1">
                    {sc.keys.map((k, ki) => (
                      <span key={ki} className="px-2 py-0.5 text-xs font-mono rounded border border-border bg-background text-foreground shadow-sm">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step.tips && step.tips.length > 0 && (
          <div className="space-y-2">
            {step.tips.map((tip: TipBlock, i: number) => {
              const s = tipStyle[tip.type];
              return (
                <div key={i} className="flex gap-2 items-start rounded-xl border px-4 py-3 text-sm leading-relaxed"
                  style={{ backgroundColor: s.bg, borderColor: s.border, color: s.text }}>
                  <span className="font-bold shrink-0">{s.icon}</span>
                  <span>{tip.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PracticalGuide() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground pb-24">
        <section
          className="relative overflow-hidden py-24 mb-12"
          style={{ background: `linear-gradient(135deg, ${T.purpleDeep} 0%, ${T.purpleDark} 60%, ${T.purple} 100%)` }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: GRID }} />
          <div className="absolute left-0 top-0 w-1 h-full" style={{ background: `linear-gradient(to bottom, ${T.yellow}, ${T.purple}, transparent)` }} />
          <div className="relative z-10 container max-w-4xl text-center">
            <MotionContainer direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 text-xs font-bold uppercase tracking-widest" style={{ borderColor: `${T.purpleMid}50`, background: `${T.purpleMid}15`, color: '#C8C9E8' }}>
                <Layers className="w-4 h-4" />
                CviLux M365 內部指南
              </div>
            </MotionContainer>
            <MotionContainer direction="up" delay={0.2}>
              <h1 className="font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
                Teams 介面邏輯與操作
              </h1>
            </MotionContainer>
            <MotionContainer direction="up" delay={0.3}>
              <p className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto" style={{ color: '#B0B2D4' }}>
                別再瞎點了。先玩一下第一章節的「互動工具列」，搞懂左側按鈕在幹嘛，再往下看操作。
              </p>
            </MotionContainer>
          </div>
        </section>

        <div className="container max-w-4xl mb-12">
          <MotionContainer direction="up" delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">章節導覽</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {IMPLEMENTATION_PHASES.map((phase) => (
                  <a key={phase.id} href={`#${phase.id}`} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-muted/30 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm text-foreground no-underline">
                    <span className="text-xs font-bold" style={{ color: phase.color }}>{phase.phaseNum}</span>
                    <span className="text-xs text-muted-foreground leading-tight">{phase.title.split('：')[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </MotionContainer>
        </div>

        <div className="container max-w-4xl">
          <div className="space-y-24">
            {IMPLEMENTATION_PHASES.map((phase, phaseIdx) => (
              <MotionContainer key={phase.id} direction="up" delay={phaseIdx * 0.05}>
                <div id={phase.id} className="scroll-mt-8">
                  <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl font-black opacity-20 select-none" style={{ color: phase.color, letterSpacing: '-0.05em' }}>
                        {phase.phaseNum}
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{phase.title}</h2>
                      </div>
                    </div>
                    <p className="text-muted-foreground md:ml-auto md:mb-1 font-medium">{phase.desc}</p>
                  </div>
                  <div className="grid gap-5">
                    {phase.steps.map((step, stepIdx) => (
                      <StepCard key={stepIdx} step={step} color={phase.color} />
                    ))}
                  </div>
                </div>
              </MotionContainer>
            ))}
          </div>
        </div>

        <div className="container max-w-4xl mt-24">
          <MotionContainer direction="up" delay={0.2}>
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">延伸主題</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">深入了解協作與會議</h2>
              <p className="text-muted-foreground">
                搞懂基本邏輯後，更進階的頻道怎麼開、會議怎麼設定，請直接參考以下專屬頁面。
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {SPOTLIGHT_GUIDES.map((guide) => (
                <div key={guide.href} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${guide.color}15`, color: guide.color }}>
                    {guide.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{guide.summary}</p>
                  <Link href={guide.href}>
                    <Button variant="outline" className="font-bold">
                      前往頁面
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </MotionContainer>
        </div>

        <MotionContainer direction="up" delay={0.4}>
          <div className="container max-w-4xl mt-24">
            <div className="p-10 md:p-12 rounded-3xl text-center border border-border bg-card shadow-sm" style={{ background: `linear-gradient(to bottom right, var(--card), ${T.purpleLight}20)` }}>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                掌握邏輯，接著實戰
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                你現在已經具備了 Teams 的基礎架構觀念，去點開底下的進階教學，開始發揮真正的協作效率吧。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/concepts/chat-channels">
                  <Button size="lg" className="font-bold">
                    前往聊天與頻道
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/concepts/meetings">
                  <Button size="lg" variant="outline" className="font-bold">
                    前往會議教學
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </MotionContainer>
      </div>
    </PageTransition>
  );
}