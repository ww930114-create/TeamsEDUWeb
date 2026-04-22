import { type ReactNode, useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  ArrowRight, MessageSquare, Users, Hash, AtSign, Pin,
  Smile, Reply, Quote, Bell, Shield, Lock, Globe, CheckCircle2,
} from 'lucide-react';
import { MotionContainer, HoverScale } from '@/components/MotionContainer';

const PRIMARY       = '#5B5EA6';
const PRIMARY_DARK  = '#4B49A1';
const PRIMARY_DEEP  = '#2D2B5A';
const YELLOW        = '#F2C811';

const GRID = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg stroke='%239B9DD4' stroke-width='0.3' opacity='0.25'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const getDarkModeGradient = (isDark: boolean) => {
  if (isDark) {
    return 'linear-gradient(135deg, #3a3855 0%, #5a5995 60%, #7b7cb4 100%)';
  }
  return `linear-gradient(135deg, ${PRIMARY_DEEP}, ${PRIMARY_DARK}, ${PRIMARY})`;
};

// ── 訊息功能資料 ─────────────────────────────────────────────────────────
const CHAT_FEATURES = [
  { icon: <MessageSquare className="w-6 h-6" />, title: '私人訊息',    description: '與同事一對一或小範圍即時溝通，支援文字、表情、檔案傳輸。',              color: PRIMARY },
  { icon: <Users className="w-6 h-6" />,         title: '群組聊天',    description: '建立群組對話，方便專案團隊或跨部門快速協調。',                          color: '#7B79C4' },
  { icon: <Hash className="w-6 h-6" />,          title: '頻道訊息',    description: '在頻道中與團隊成員分享資訊，所有成員都能看到歷史訊息。',                color: PRIMARY_DARK },
  { icon: <AtSign className="w-6 h-6" />,        title: '@提及',       description: '使用 @ 提及特定人員或整個頻道，確保重要訊息被注意到。',                 color: PRIMARY },
  { icon: <Reply className="w-6 h-6" />,         title: '回覆與引用',  description: '直接回覆特定訊息，讓對話保持井然有序，討論脈絡一目了然。',             color: PRIMARY },
  { icon: <Smile className="w-6 h-6" />,         title: '表情符號回應', description: '使用表情符號快速回應訊息，讓溝通更生動多元。',                       color: '#7B79C4' },
];

// ── 頻道類型資料 ─────────────────────────────────────────────────────────
const CHANNEL_TYPES = [
  { title: '公開頻道', description: '組織中的任何人都能搜尋並加入，有助於資訊透明共享。', badge: '組織可見', badgeColor: PRIMARY },
  { title: '私人頻道', description: '僅限受邀請的成員可見，適合機密專案或敏感討論。',     badge: '僅成員可見', badgeColor: PRIMARY_DARK },
  { title: '共用頻道', description: '跨組織合作，與外部合作夥伴共享頻道，減少溝通障礙。',  badge: '跨組織',   badgeColor: '#7B79C4' },
];

// ── 進階功能資料 ─────────────────────────────────────────────────────────
const ADVANCED = [
  { icon: <Pin className="w-5 h-5" />,    title: '釘選重要訊息', desc: '將重要訊息釘選至頻道頂部，方便成員快速找到關鍵資訊。',              color: PRIMARY },
  { icon: <Quote className="w-5 h-5" />,  title: '訊息翻譯',     desc: '自動翻譯不同語言的訊息，跨國團隊溝通無障礙。',                     color: PRIMARY_DARK },
  { icon: <Bell className="w-5 h-5" />,   title: '自訂通知',     desc: '設定關鍵字通知，僅收到重要相關訊息，避免資訊過載。',               color: '#7B79C4' },
  { icon: <Shield className="w-5 h-5" />, title: '訊息保全',     desc: '支援敏感性標籤、資料外洩防護（DLP），確保機密資訊安全。',         color: PRIMARY_DARK },
];

// ── 團隊與頻道情境矩陣 ───────────────────────────────────────────────────
type TeamType = '公開' | '私人';
type ChannelType = '標準' | '私人' | '已共用';

interface ChannelScenario {
  teamType: TeamType;
  role: 'Owner' | 'Member';
  channelType: ChannelType;
  summary: string;
  description: string;
  useCase: string;
}

const CHANNEL_SCENARIOS: ChannelScenario[] = [
  {
    teamType: '公開',
    role: 'Owner',
    channelType: '標準',
    summary: '管理公開團隊中的一般討論頻道',
    description: '我是公開團隊的擁有者，我在標準頻道發布內容，所有團隊成員皆可使用此頻道；我可將公司內部成員或外部來賓加入團隊。',
    useCase: '公司公告、跨部門公開資訊',
  },
  {
    teamType: '公開',
    role: 'Member',
    channelType: '標準',
    summary: '參與公開團隊的標準協作頻道',
    description: '我是公開團隊的成員，我在標準頻道互動，所有團隊成員皆可使用此頻道；我可將公司內部成員加入團隊，但無法邀請外部成員。',
    useCase: '一般員工參與討論',
  },
  {
    teamType: '私人',
    role: 'Owner',
    channelType: '標準',
    summary: '管理私人團隊中的核心工作頻道',
    description: '我是私人團隊的擁有者，我在標準頻道管理內容，僅限團隊成員可使用此頻道；我可將公司內部成員或外部成員加入團隊。',
    useCase: '部門團隊（如 IT、財務）',
  },
  {
    teamType: '私人',
    role: 'Member',
    channelType: '標準',
    summary: '在私人團隊中參與固定成員協作',
    description: '我是私人團隊的成員，我在標準頻道互動，僅限團隊成員可使用此頻道；我無法新增成員。',
    useCase: '部門內部協作',
  },
  {
    teamType: '公開',
    role: 'Owner',
    channelType: '私人',
    summary: '在公開團隊內建立限成員可見的小組頻道',
    description: '我是公開團隊的擁有者，我建立私人頻道，僅限已加入團隊且被加入該頻道的成員可使用；我可管理頻道成員。',
    useCase: '公開團隊中的主管群或專案小組',
  },
  {
    teamType: '公開',
    role: 'Member',
    channelType: '私人',
    summary: '受邀加入公開團隊中的私人頻道',
    description: '我是公開團隊的成員，我被加入私人頻道後，僅能與頻道內成員共享內容；我無法管理頻道成員。',
    useCase: '被指派參與特定小組的人員',
  },
  {
    teamType: '私人',
    role: 'Owner',
    channelType: '私人',
    summary: '在私人團隊中管理高敏感度頻道',
    description: '我是私人團隊的擁有者，我建立私人頻道，僅限已加入團隊且被加入該頻道的成員可使用；我可管理頻道成員。',
    useCase: '高敏感資料（人資、薪資、法務）',
  },
  {
    teamType: '私人',
    role: 'Member',
    channelType: '私人',
    summary: '受邀進入私人團隊內的封閉頻道',
    description: '我是私人團隊的成員，我被加入私人頻道後，僅能存取該頻道內容；我無法管理頻道成員。',
    useCase: '機密小組成員',
  },
  {
    teamType: '公開',
    role: 'Owner',
    channelType: '已共用',
    summary: '讓公開團隊與其他團隊或外部成員協作',
    description: '我是公開團隊的擁有者，我建立已共用頻道，可指定團隊內成員、公司內未加入團隊的成員或外部成員使用；我可管理頻道成員。',
    useCase: '跨部門或對外專案合作',
  },
  {
    teamType: '公開',
    role: 'Member',
    channelType: '已共用',
    summary: '被納入公開團隊的跨團隊共享協作',
    description: '我是公開團隊的成員，我被加入已共用頻道後，可與團隊內成員、公司內未加入團隊的成員或外部成員協作；我無法管理頻道成員。',
    useCase: '被指派參與跨組合作的成員',
  },
  {
    teamType: '私人',
    role: 'Owner',
    channelType: '已共用',
    summary: '在私人團隊中建立對外或跨團隊共用頻道',
    description: '我是私人團隊的擁有者，我建立已共用頻道，可指定團隊內成員、公司內未加入團隊的成員或外部成員使用；我可管理頻道成員。',
    useCase: '核心團隊對外協作',
  },
  {
    teamType: '私人',
    role: 'Member',
    channelType: '已共用',
    summary: '在私人團隊中參與被分享的外部協作',
    description: '我是私人團隊的成員，我被加入已共用頻道後，僅能存取頻道內容，並可與團隊內成員、公司內未加入團隊的成員或外部成員協作；我無法管理頻道成員。',
    useCase: '跨部門或外部合作執行人員',
  },
];

const CHANNEL_META: Record<ChannelType, { icon: ReactNode; color: string; subtitle: string }> = {
  標準: {
    icon: <Hash className="w-5 h-5" />,
    color: PRIMARY,
    subtitle: '團隊的預設主頻道，所有團隊成員都能一起協作。',
  },
  私人: {
    icon: <Lock className="w-5 h-5" />,
    color: '#7C3AED',
    subtitle: '只開放被加入的成員存取，適合高敏感度議題。',
  },
  已共用: {
    icon: <Globe className="w-5 h-5" />,
    color: '#036C70',
    subtitle: '可跨團隊或跨組織協作，不必先加入整個團隊。',
  },
};

type GuideTipType = 'info' | 'warning' | 'success';

interface GuideTip {
  type: GuideTipType;
  text: string;
}

interface GuideStep {
  label: string;
  detail: string;
}

interface ChatGuide {
  icon: ReactNode;
  title: string;
  action: string;
  details: string;
  color: string;
  steps: GuideStep[];
  tips?: GuideTip[];
}

const GUIDE_TIP_STYLE: Record<GuideTipType, { bg: string; border: string; text: string; icon: string }> = {
  info: { bg: 'var(--tip-info-bg)', border: 'var(--tip-info-border)', text: 'var(--tip-info-text)', icon: 'ℹ' },
  warning: { bg: 'var(--tip-warning-bg)', border: 'var(--tip-warning-border)', text: 'var(--tip-warning-text)', icon: '⚠' },
  success: { bg: 'var(--tip-success-bg)', border: 'var(--tip-success-border)', text: 'var(--tip-success-text)', icon: '✓' },
};

const PRACTICAL_CHAT_GUIDES: ChatGuide[] = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: '發起一對一私訊',
    action: '找特定同事討論時使用，對話不會被其他人看到。',
    details: '點擊左側聊天後建立新聊天，輸入姓名或 Email 即可開始對話；也能一次加入多人形成群組聊天。',
    color: PRIMARY,
    steps: [
      { label: '開啟新聊天', detail: '點聊天頁左上角的新增聊天，或使用快捷鍵 Ctrl+N。' },
      { label: '搜尋聯絡人', detail: '輸入姓名、工號或 Email，從建議清單選對的人。' },
      { label: '送出與換行', detail: 'Enter 可送出訊息，Shift+Enter 可換行。' },
      { label: '建立群組聊天', detail: '一次新增多位收件人，就會變成群組聊天空間。' },
    ],
    tips: [
      { type: 'info', text: '想快速修改你上一則訊息時，可先按向上方向鍵進入編輯模式。' },
    ],
  },
  {
    icon: <Hash className="w-5 h-5" />,
    title: '在頻道中發布正式訊息',
    action: '讓整個部門或專案群組都能看到的公開討論。',
    details: '進入指定頻道後，建議使用格式化編輯器加上主旨與結構，讓頻道貼文更像正式公告而不是零散聊天。',
    color: PRIMARY_DARK,
    steps: [
      { label: '開啟新對話', detail: '進入頻道後，從下方新對話輸入框開始撰寫。' },
      { label: '展開格式工具', detail: '點左下角格式按鈕，打開完整富文字工具列。' },
      { label: '填寫主旨', detail: '加上清楚標題，讓成員一眼看懂這則貼文主題。' },
      { label: '設定重要性', detail: '必要時才使用重要或緊急標記，避免通知疲乏。' },
    ],
    tips: [
      { type: 'warning', text: '緊急通知會重複提醒對方，請只在真的緊急時使用。' },
      { type: 'success', text: '格式化後的頻道貼文更適合公告、流程說明與跨部門資訊同步。' },
    ],
  },
  {
    icon: <AtSign className="w-5 h-5" />,
    title: '精準使用 @提及',
    action: '確保對方真的收到通知，但不要過度打擾整個團隊。',
    details: '個人提及最精準，@頻道與 @team 影響範圍較大，應視公告層級與必要性決定。',
    color: PRIMARY,
    steps: [
      { label: '@個人', detail: '最適合指定特定人回覆或確認事項。' },
      { label: '@頻道', detail: '通知該頻道活躍成員，適合頻道層級的重要更新。' },
      { label: '@team', detail: '通知整個團隊成員，應只用在重大公告。' },
      { label: '多個提及', detail: '同一則訊息可同時提及多個人，但每個人都會收到通知。' },
    ],
    tips: [
      { type: 'warning', text: '濫用 @team 或 @頻道 很容易讓大家對通知失去敏感度。' },
    ],
  },
  {
    icon: <Reply className="w-5 h-5" />,
    title: '使用「回覆」保持討論串整潔',
    action: '針對原貼文回覆，不要另開新對話切斷脈絡。',
    details: '頻道的設計是討論串結構。跟著原貼文回覆，其他人才能快速看懂上下文。',
    color: PRIMARY,
    steps: [
      { label: '找到回覆位置', detail: '把滑鼠移到原貼文附近，就能看到回覆入口。' },
      { label: '在原串中留言', detail: '把討論收在同一串，避免版面散掉。' },
      { label: '需要時轉寄或引用', detail: '可用更多選單輔助帶入原始訊息內容。' },
    ],
    tips: [
      { type: 'warning', text: '看到某則貼文後直接去最底下重開新對話，會讓整段脈絡中斷。' },
    ],
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: '了解「團隊」與「頻道」的架構',
    action: '先搞懂架構，才知道應該把訊息發到哪裡。',
    details: '一個團隊底下可以有多個頻道；標準、私人與共用頻道的可見範圍和協作對象都不同。',
    color: PRIMARY,
    steps: [
      { label: '標準頻道', detail: '團隊所有成員都能看到，適合一般公開協作。' },
      { label: '私人頻道', detail: '只有被加入的人看得到，適合封閉小組或敏感議題。' },
      { label: '共用頻道', detail: '適合跨團隊或跨組織協作，不必加入整個團隊。' },
      { label: '頻道頁籤', detail: '除貼文外，還能加入檔案、Planner、Forms 等頁籤。' },
    ],
    tips: [
      { type: 'info', text: '頻道檔案通常儲存在 SharePoint，支援版本控制與後續擴充。' },
    ],
  },
  {
    icon: <Pin className="w-5 h-5" />,
    title: '釘選、隱藏與排列頻道',
    action: '把真正常用的頻道浮到前面，側邊欄會乾淨很多。',
    details: 'Teams 可以釘選常用頻道、隱藏次要頻道，也能拖拉調整順序，讓每天協作更有效率。',
    color: '#7B79C4',
    steps: [
      { label: '釘選頻道', detail: '常用頻道可放到最上方，減少來回尋找。' },
      { label: '隱藏頻道', detail: '不常用但仍要保留的頻道可先隱藏。' },
      { label: '調整順序', detail: '釘選後可依工作習慣重新排序。' },
      { label: '個別設定通知', detail: '頻道通知可針對不同頻道做差異化處理。' },
    ],
    tips: [
      { type: 'success', text: '把公告型頻道與每日作業頻道分開管理，會更不容易漏看重點。' },
    ],
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: '建立新頻道',
    action: '為新專案或主題建立專屬討論空間。',
    details: '新增頻道時要先想清楚範圍與權限，再決定是標準、私人還是共用頻道。',
    color: '#036C70',
    steps: [
      { label: '開啟新增頻道', detail: '從團隊旁的更多選單進入新增頻道。' },
      { label: '填寫名稱與說明', detail: '名稱應簡短清楚，讓成員一眼知道用途。' },
      { label: '選擇隱私類型', detail: '依協作範圍選標準、私人或共用。' },
      { label: '補上頁籤與版主設定', detail: '建立後可再加入工具頁籤或限制貼文權限。' },
    ],
    tips: [
      { type: 'info', text: '頻道名稱雖然可改，但通常不會主動通知所有成員，建立前先定義好最省事。' },
    ],
  },
];

function PracticalGuideCard({ guide }: { guide: ChatGuide }) {
  return (
    <div className="rounded-3xl border border-border bg-background overflow-hidden shadow-sm h-full">
      <div className="p-6 border-b border-border bg-muted/20">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${guide.color}15`, color: guide.color }}>
            {guide.icon}
          </div>
          <div>
            <h3 className="font-bold text-foreground text-xl mb-2">{guide.title}</h3>
            <p className="text-sm font-semibold mb-2" style={{ color: guide.color }}>{guide.action}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{guide.details}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">操作重點</p>
          <ol className="space-y-3">
            {guide.steps.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm">
                <span className="shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5" style={{ background: `${guide.color}18`, color: guide.color }}>
                  {index + 1}
                </span>
                <span>
                  <strong className="text-foreground">{step.label}</strong>
                  <span className="text-muted-foreground"> - {step.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {guide.tips && guide.tips.length > 0 && (
          <div className="space-y-2">
            {guide.tips.map((tip, index) => {
              const style = GUIDE_TIP_STYLE[tip.type];
              return (
                <div
                  key={index}
                  className="flex gap-2 items-start rounded-xl border px-4 py-3 text-sm leading-relaxed"
                  style={{ backgroundColor: style.bg, borderColor: style.border, color: style.text }}
                >
                  <span className="font-bold shrink-0">{style.icon}</span>
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

function ChannelScenarioCard({
  channelType,
  scenarios,
}: {
  channelType: ChannelType;
  scenarios: ChannelScenario[];
}) {
  const meta = CHANNEL_META[channelType];
  const ownerScenario = scenarios.find((scenario) => scenario.role === 'Owner');
  const memberScenario = scenarios.find((scenario) => scenario.role === 'Member');

  return (
    <div className="rounded-3xl border border-border bg-background overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border bg-muted/20">
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: `${meta.color}15`, color: meta.color }}
          >
            {meta.icon}
          </div>
          <div>
            <h3 className="font-bold text-foreground text-xl leading-none">{channelType}頻道</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{meta.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        {[ownerScenario, memberScenario].map((scenario, idx) => (
          <div
            key={scenario?.role ?? idx}
            className={`p-6 ${idx === 0 ? 'lg:border-r border-border' : ''} ${idx === 0 ? 'border-b lg:border-b-0 border-border' : ''}`}
          >
            {scenario && (
              <>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      團隊角色
                    </p>
                    <div className="flex items-center gap-2">
                      {scenario.role === 'Owner' ? (
                        <Shield className="w-4 h-4" style={{ color: meta.color }} />
                      ) : (
                        <Users className="w-4 h-4" style={{ color: meta.color }} />
                      )}
                      <span className="font-bold text-foreground">
                        {scenario.role === 'Owner' ? 'Owner / 擁有者' : 'Member / 一般成員'}
                      </span>
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold"
                    style={{ background: `${meta.color}12`, color: meta.color }}
                  >
                    {scenario.summary}
                  </span>
                </div>

                <p className="text-sm text-foreground leading-relaxed mb-5">{scenario.description}</p>

                <div className="rounded-2xl border border-border bg-muted/20 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    適合情境
                  </p>
                  <div className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: meta.color }} />
                    <span className="leading-relaxed">{scenario.useCase}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 主元件 ───────────────────────────────────────────────────────────────
export default function ChatChannels() {
  const [activeTeamType, setActiveTeamType] = useState<TeamType>('公開');
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

  const visibleScenarios = CHANNEL_SCENARIOS.filter((scenario) => scenario.teamType === activeTeamType);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ══════════════════════════════════════════════════════════════
         Hero
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: getDarkModeGradient(isDark) }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: GRID }} />
        <div className="absolute left-0 top-0 w-1 h-full"
          style={{ background: `linear-gradient(to bottom, ${YELLOW}, ${PRIMARY}, transparent)` }} />

        <div className="relative z-10 container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(232,230,245,0.15)', color: '#E8E6F5' }}>
            <MessageSquare className="w-4 h-4" />
            核心概念 · 聊天與頻道
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            訊息與頻道：<br />團隊溝通的核心樞紐
          </h1>
          <p className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Microsoft Teams 提供多元的溝通方式，從私人訊息到公開頻道，靈活因應不同協作需求。
            所有對話紀錄集中管理，確保資訊透明且可追溯。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/practicalguide">
              <Button size="lg" className="px-10 font-bold h-12 shadow-lg hover:scale-105 transition-transform"
                style={{ background: YELLOW, color: '#1a1a1a', border: 'none' }}>
                開始學習
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/concepts/meetings">
              <Button size="lg" variant="outline"
                className="px-10 font-bold h-12 border-white/30 text-white hover:bg-white/10 bg-transparent">
                前往會議管理
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         訊息功能
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container max-w-5xl">
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>通訊方式</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>多元訊息，協作無礙</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              提供完整的即時通訊功能，支援各種辦公情境，讓跨部門協作更加順暢。
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-border rounded-2xl overflow-hidden shadow-sm">
            {CHAT_FEATURES.map((f, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.05}>
                <div
                  className="p-8 h-full hover:bg-muted/40 transition-colors duration-200"
                  style={{
                    borderRight: idx % 3 !== 2 ? '1px solid var(--border)' : 'none',
                    borderBottom: idx < 3 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${f.color}15`, color: f.color }}>
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         頻道類型
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-muted/30 border-b border-border">
        <div className="container max-w-5xl">
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>架構設計</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>頻道類型與權限框架</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              依據專案機密性與協作對象，選擇合適的頻道類型，在資訊透明與安全保護間取得平衡。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {CHANNEL_TYPES.map((type, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.1}>
                <div className="p-8 rounded-3xl border border-border bg-background hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ background: `${type.badgeColor}15` }}>
                    <Hash className="w-8 h-8" style={{ color: type.badgeColor }} />
                  </div>
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-5"
                    style={{ background: `${type.badgeColor}15`, color: type.badgeColor }}>
                    {type.badge}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-3">{type.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                </div>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         團隊視角的頻道權限矩陣
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container max-w-6xl">
          <MotionContainer direction="up">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>存取與安全性</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>
                從團隊類型看頻道權限
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                先判斷你的團隊是公開還是私人，再往下看 Owner 與 Member 在標準、私人、已共用頻道中的實際差異。
              </p>
            </div>
          </MotionContainer>

          {/* 團隊類型切換按鈕 */}
          <MotionContainer direction="up" delay={0.05}>
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-muted p-1.5 rounded-2xl border border-border">
                <button
                  onClick={() => setActiveTeamType('公開')}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    activeTeamType === '公開'
                      ? 'bg-background text-primary shadow-sm border border-border/50' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  公開團隊
                </button>
                <button
                  onClick={() => setActiveTeamType('私人')}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    activeTeamType === '私人'
                      ? 'bg-background text-primary shadow-sm border border-border/50' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  私人團隊
                </button>
              </div>
            </div>
          </MotionContainer>

          <MotionContainer direction="up" delay={0.08}>
            <div className="mb-10 rounded-3xl border border-border bg-muted/20 p-6">
              <div className="grid md:grid-cols-[180px_1fr] gap-6 items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>
                    目前視角
                  </p>
                  <div className="text-2xl font-extrabold text-foreground">{activeTeamType}團隊</div>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  你現在看到的是「{activeTeamType}團隊」底下的三種頻道型態。每張卡片都會同時列出
                  <strong className="text-foreground"> Owner </strong>
                  和
                  <strong className="text-foreground"> Member </strong>
                  的可見範圍、管理能力與適用場景，對照起來會比單獨切角色更直覺。
                </p>
              </div>
            </div>
          </MotionContainer>

          <div className="space-y-6">
            {(['標準', '私人', '已共用'] as ChannelType[]).map((channelType, idx) => (
              <MotionContainer key={channelType} direction="up" delay={0.1 + idx * 0.05}>
                <ChannelScenarioCard
                  channelType={channelType}
                  scenarios={visibleScenarios.filter((scenario) => scenario.channelType === channelType)}
                />
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         實戰操作
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-muted/20 border-b border-border">
        <div className="container max-w-6xl">
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>實戰操作</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>
              從發訊息到建立頻道的完整流程
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl">
              這裡承接原本入門指南中和聊天、頻道高度相關的內容，讓你在同一頁就能看懂「怎麼聊、怎麼發、怎麼管、怎麼建」。
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {PRACTICAL_CHAT_GUIDES.map((guide, index) => (
              <MotionContainer key={guide.title} direction="up" delay={index * 0.04}>
                <PracticalGuideCard guide={guide} />
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         進階功能
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-muted/30 border-b border-border flex-1">
        <div className="container max-w-5xl">
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>進階功能</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>提升溝通效能</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              善用以下進階設定，讓重要訊息不漏接，同時兼顧企業資訊安全。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {ADVANCED.map((item, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.06}>
                <div className="flex items-start gap-5 p-6 bg-background border border-border rounded-2xl hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${PRIMARY_DEEP}, ${PRIMARY_DARK})` }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID }} />
        <div className="absolute left-0 top-0 w-1 h-full"
          style={{ background: `linear-gradient(to bottom, ${YELLOW}, transparent)` }} />

        <div className="relative z-10 container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            開始建立您的第一個頻道
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
            熟悉訊息功能與頻道架構後，您已經具備建立高效溝通環境的基礎能力。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/practicalguide">
              <Button size="lg" className="px-10 font-bold h-12 shadow-lg hover:scale-105 transition-transform"
                style={{ background: YELLOW, color: '#1a1a1a', border: 'none' }}>
                返回入門指南
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/scenarios">
              <Button size="lg" variant="outline"
                className="px-10 font-bold h-12 border-white/30 text-white hover:bg-white/10 bg-transparent">
                查看實際應用情境
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
