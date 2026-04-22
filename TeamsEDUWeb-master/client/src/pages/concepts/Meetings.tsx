import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, Video, Calendar, Mic, Monitor, Users, Film, 
  MicOff, Phone, MessageSquare, Hand, Layout, Clock, 
  Shield, UserCheck, User, Settings 
} from 'lucide-react';
import { MotionContainer } from '@/components/MotionContainer';

const PRIMARY = '#5B5EA6';
const PRIMARY_LIGHT = '#E8E6F5';
const PRIMARY_DARK = '#4B49A1';
const PRIMARY_DEEP = '#2D2B5A';
const ACCENT = '#7C3AED';

const getDarkModeGradient = (isDark: boolean) => {
  if (isDark) {
    return 'linear-gradient(135deg, #3a3855 0%, #5a5995 60%, #7b7cb4 100%)';
  }
  return `linear-gradient(135deg, ${PRIMARY_DEEP}, ${PRIMARY_DARK}, ${PRIMARY})`;
};

type GuideTipType = 'info' | 'warning' | 'success';

interface MeetingGuideStep {
  label: string;
  detail: string;
}

interface MeetingGuideTip {
  type: GuideTipType;
  text: string;
}

interface MeetingGuide {
  stage: string;
  icon: React.ReactNode; 
  title: string;
  action: string;
  details: string;
  color: string;
  steps: MeetingGuideStep[];
  tips?: MeetingGuideTip[];
}

const GUIDE_TIP_STYLE: Record<GuideTipType, { bg: string; border: string; text: string; icon: string }> = {
  info: { bg: 'var(--tip-info-bg)', border: 'var(--tip-info-border)', text: 'var(--tip-info-text)', icon: 'ℹ' },
  warning: { bg: 'var(--tip-warning-bg)', border: 'var(--tip-warning-border)', text: 'var(--tip-warning-text)', icon: '⚠' },
  success: { bg: 'var(--tip-success-bg)', border: 'var(--tip-success-border)', text: 'var(--tip-success-text)', icon: '✓' },
};

// 按照「身分」嚴格分類的動態資料
const ROLES_GUIDE_DATA = [
  {
    id: 'organizer',
    name: '籌辦人 (Organizer)',
    icon: <Shield className="w-5 h-5" />,
    color: PRIMARY,
    desc: '會議的造物主。只有你能建立會議、修改時間、發送邀請，並擁有管理會議的絕對最高權限。',
    warning: '籌辦人的身分「無法轉讓」。如果你準備離職或長期請假，你建立的定期會議必須由接手的人重新發送邀請，否則沒人能修改會議時間。',
    guides: [
      {
        stage: '會前準備',
        icon: <Calendar className="w-5 h-5" />,
        title: '發送邀請與規則設定',
        action: '建立會議並嚴格設定「會議選項」。',
        details: '不要只發時間！發出邀請後，務必點擊「會議選項」設定等候室規則與指派助手。',
        color: PRIMARY,
        steps: [
          { label: '送出邀請函', detail: '在 Teams 或 Outlook 行事曆排定時間並送出。' },
          { label: '指派共同籌辦人', detail: '從「會議選項」中指定信任的同事當副手。' },
          { label: '預設分組討論室', detail: '如果需要工作坊，會前就能先把房間開好、人分好。' },
        ],
        tips: [{ type: 'warning' as GuideTipType, text: '50 人以上的大會，請在會議選項把「誰可以簡報」設為特定人員，不然會天下大亂。' }]
      },
      {
        stage: '會中與會後',
        icon: <Users className="w-5 h-5" />,
        title: '全面掌控與會後收尾',
        action: '強制結束會議與抓取名單。',
        details: '你有權限把所有人踢下線，並掌握確切的出席數據。',
        color: PRIMARY_DARK,
        steps: [
          { label: '強制結束會議', detail: '離開會議時點選「結束會議」，一鍵把所有人踢出會議室。' },
          { label: '下載出席報告', detail: '會後在聊天區或行事曆，可下載 CSV 格式的完整出席名單。' },
        ]
      }
    ]
  },
  {
    id: 'co-organizer',
    name: '共同籌辦人 (Co-organizer)',
    icon: <Settings className="w-5 h-5" />,
    color: '#7B79C4',
    desc: '主辦人的最強輔助。當主辦人斷線、遲到或請假時，你能接手幾乎所有的會議管理工作。',
    warning: '限制條件極嚴：你必須與主辦人同屬一個組織 (或是同組織的 Guest)。且主辦人必須在「送出邀請後」才能將你設為此身分。',
    guides: [
      {
        stage: '會前準備',
        icon: <UserCheck className="w-5 h-5" />,
        title: '權限確認與輔助設定',
        action: '確認自己已被加入共同名單。',
        details: '你無法更改會議時間或標題，但你可以幫忙調整會議的軟體設定。',
        color: '#7B79C4',
        steps: [
          { label: '檢查會議選項', detail: '確認大門（等候室）設定正確，誰可以直接進來。' },
          { label: '協助分組討論室', detail: '若主辦人授權，你可幫忙分配人員到各個討論房間。' }
        ]
      },
      {
        stage: '會中操作',
        icon: <Shield className="w-5 h-5" />,
        title: '代班主持與場控',
        action: '放行人員與維持會議秩序。',
        details: '主辦人講話時，你就是負責看門和維持秩序的管理員。',
        color: PRIMARY_DARK,
        steps: [
          { label: '管理等候室', detail: '審核並允許外部客戶或遲到的人進場。' },
          { label: '鎖定會議', detail: '人員到齊後可鎖定會議，禁止任何人再偷偷溜進來。' },
          { label: '更改參與者角色', detail: '會中臨時把某個「出席者」升級為「簡報者」讓他分享畫面。' }
        ]
      }
    ]
  },
  {
    id: 'presenter',
    name: '簡報者 (Presenter)',
    icon: <Monitor className="w-5 h-5" />,
    color: ACCENT,
    desc: '負責上台報告的人。你能分享畫面、啟動錄影，並控制麥克風。',
    warning: '簡報者的權限非常大，可以直接把別人靜音甚至把人踢出會議，請不要手滑按錯。',
    guides: [
      {
        stage: '會中展示',
        icon: <Monitor className="w-5 h-5" />,
        title: '分享畫面與展示內容',
        action: '精準分享畫面，避免洩漏隱私。',
        details: '最常出包的就是這步。強烈建議只分享單一視窗，不要分享全螢幕。',
        color: ACCENT,
        steps: [
          { label: '分享特定視窗', detail: '不要分享整個桌面，避免 Line 訊息跳出來被全公司看光。' },
          { label: 'PowerPoint Live', detail: '完美簡報方案。觀眾可自己往前翻閱，你還能看講者備忘稿。' },
          { label: '包含電腦音效', detail: '如果要播 YouTube 影片，務必打開分享面板右上角的音效開關。' }
        ]
      },
      {
        stage: '會中操作',
        icon: <Film className="w-5 h-5" />,
        title: '錄製與基本場控',
        action: '負責留下紀錄並控制會場噪音。',
        details: '除了報告，你也能幫忙主辦人控制會場雜音。',
        color: PRIMARY,
        steps: [
          { label: '啟動錄製與轉錄', detail: '開講前，由「更多」選單啟動錄影（記得先口頭告知大家）。' },
          { label: '靜音其他參與者', detail: '如果有人忘記關麥傳出狗叫聲，你可以直接從名單把他靜音。' }
        ]
      }
    ]
  },
  {
    id: 'attendee',
    name: '出席者 (Attendee)',
    icon: <User className="w-5 h-5" />,
    color: '#1D4ED8',
    desc: '乖乖聽講的平民。跨部門大會或教育訓練，除了講者以外的人都必須是這個身分。',
    warning: '你無法分享螢幕、無法錄影、也無法把別人靜音。如果需要分享畫面，請舉手請主辦人幫你「升等」。',
    guides: [
      {
        stage: '會前與進場',
        icon: <Video className="w-5 h-5" />,
        title: '安靜進場與設備檢查',
        action: '先靜音，再進場。',
        details: '大型會議中，主辦人可能會設定「強制靜音」，這是正常現象。',
        color: '#1D4ED8',
        steps: [
          { label: '進場前靜音', detail: '在預備畫面就把麥克風關掉，避免引發全場回音災難。' },
          { label: '等候准入', detail: '如果卡在等候室，請耐心等候主辦人放行，不要一直打電話催。' }
        ]
      },
      {
        stage: '會中互動',
        icon: <Hand className="w-5 h-5" />,
        title: '守規矩的發言方式',
        action: '善用舉手與聊天室，不打斷節奏。',
        details: '超過 10 人的會議，不要直接開麥克風插話，請善用內建互動工具。',
        color: PRIMARY_DARK,
        steps: [
          { label: '虛擬舉手', detail: '點擊工具列的舉手，主辦人看到後會依序點名讓你發言。' },
          { label: '表情回應', detail: '用愛心、讚或鼓掌來回應講者，既有參與感又不干擾會議。' },
          { label: '聊天室發問', detail: '把問題打在側邊聊天室，講者告一段落時自然會看見並回覆。' }
        ]
      }
    ]
  }
];

const MEETING_SHORTCUTS = [
  { action: '靜音/取消靜音', keys: ['Ctrl', 'Shift', 'M'] },
  { action: '開啟/關閉鏡頭', keys: ['Ctrl', 'Shift', 'O'] },
  { action: '分享螢幕', keys: ['Ctrl', 'Shift', 'E'] },
  { action: '舉手', keys: ['Ctrl', 'Shift', 'K'] },
  { action: '開啟聊天面板', keys: ['Ctrl', 'Shift', 'C'] },
  { action: '開啟出席者清單', keys: ['Ctrl', 'Shift', 'Y'] },
  { action: '掛斷/結束通話', keys: ['Ctrl', 'Shift', 'H'] },
];

function MeetingGuideCard({ guide }: { guide: MeetingGuide }) {
  return (
    <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm h-full flex flex-col relative">
      <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-xs font-bold tracking-widest text-white z-10" style={{ background: guide.color }}>
        {guide.stage}
      </div>
      <div className="p-6 border-b border-border bg-muted/20 pt-8">
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

      <div className="p-6 space-y-5 flex-1 flex flex-col">
        <div className="flex-1">
          <ol className="space-y-3">
            {guide.steps.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5" style={{ background: `${guide.color}18`, color: guide.color }}>
                  {idx + 1}
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
          <div className="space-y-2 pt-4 border-t border-border/50">
            {guide.tips.map((tip, idx) => {
              const style = GUIDE_TIP_STYLE[tip.type];
              return (
                <div
                  key={idx}
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

export default function Meetings() {
  const [activeRole, setActiveRole] = useState<string>('organizer');
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

  const currentRoleData = ROLES_GUIDE_DATA.find(r => r.id === activeRole) || ROLES_GUIDE_DATA[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ background: getDarkModeGradient(isDark) }}>
        <div className="container relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: `${PRIMARY_LIGHT}30`, color: '#E8E6F5' }}>
            <Video className="w-4 h-4" />
            M365 核心技能 · 會議管理
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            視訊會議完全指南：<br />選對身分，做對的事
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            別再把所有人都設成簡報者了！根據你在這場會議扮演的角色，查看你專屬的操作步驟與權限限制，徹底杜絕亂切畫面與誤踢人員的災難。
          </p>
        </div>
      </section>

      {/* 第一步：動態身分切換器與專屬步驟 */}
      <section className="py-20 bg-background border-b border-border min-h-150">
        <div className="container max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">第一步：確認你這場會議是什麼角色？</h2>
            <p className="text-muted-foreground">點擊下方按鈕切換身分，獲取該角色專屬的操作步驟與防呆警告。</p>
          </div>

          {/* 身分切換標籤 */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {ROLES_GUIDE_DATA.map(role => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 border-2 
                  ${activeRole === role.id 
                    ? 'bg-foreground text-background border-foreground shadow-lg scale-105' 
                    : 'bg-card text-foreground/70 border-border hover:border-primary/40'}`}
              >
                <span style={{ color: activeRole === role.id ? 'inherit' : role.color }}>{role.icon}</span>
                {role.name}
              </button>
            ))}
          </div>

          {/* 動態內容顯示區 */}
          <MotionContainer key={currentRoleData.id} direction="up" className="space-y-6">
            {/* 權限說明與警告框 */}
            <div className="bg-muted/30 border border-border rounded-2xl p-6 md:p-8 shadow-sm">
               <h3 className="text-2xl font-bold mb-3 flex items-center gap-2" style={{ color: currentRoleData.color }}>
                 {currentRoleData.icon} {currentRoleData.name} 的核心職責
               </h3>
               <p className="text-foreground/80 mb-5 leading-relaxed text-lg">{currentRoleData.desc}</p>
               
               {currentRoleData.warning && (
                 <div className="flex gap-4 p-5 rounded-xl items-start" style={{ backgroundColor: 'var(--tip-warning-bg)', border: '1px solid var(--tip-warning-border)', color: 'var(--tip-warning-text)' }}>
                   <div className="font-bold text-xl mt-0.5">⚠</div>
                   <div>
                     <p className="font-bold mb-1">絕對禁忌與限制</p>
                     <p className="text-sm leading-relaxed">{currentRoleData.warning}</p>
                   </div>
                 </div>
               )}
            </div>

            {/* 專屬操作卡片 (這就是他們的第二步、第三步) */}
            <div className="grid lg:grid-cols-2 gap-6">
              {currentRoleData.guides.map((guide, idx) => (
                 <MeetingGuideCard key={idx} guide={guide} />
              ))}
            </div>
          </MotionContainer>

        </div>
      </section>

      {/* 第二步：所有人適用的基本防呆與快捷鍵 */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>全體通用</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">第二步：不論身份，人人都該懂的基本操作</h2>
            <p className="text-muted-foreground">不管你是主辦人還是聽眾，這些防呆守則都能讓你開會看起來更專業。</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 禮儀與防呆 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" /> 基本功與防呆守則
              </h3>
              {[
                '不發言時務必靜音，別讓大家聽你敲鍵盤和咳嗽，這是基本的會議禮儀。',
                '分享整個桌面前，請先開啟系統的「專注模式」關閉 Line 或私人通訊軟體通知。',
                '會議中想補充資訊，多用聊天室丟連結，不要直接開麥克風硬插話。',
                '連線不穩一直卡頓時，先關閉自己的視訊鏡頭可以大幅度節省頻寬。'
              ].map((tip, idx) => (
                <div key={idx} className="flex gap-3 p-4 bg-background rounded-xl border border-border shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-sm">!</div>
                  <p className="text-sm text-foreground leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>

            {/* 快捷鍵 */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Layout className="w-5 h-5 text-primary" /> 鍵盤流必背快捷鍵
              </h3>
              <div className="rounded-2xl border border-border bg-card p-2 space-y-1 shadow-sm">
                {MEETING_SHORTCUTS.map((shortcut) => (
                  <div key={shortcut.action} className="flex items-center justify-between rounded-xl p-3 hover:bg-muted/50 transition">
                    <span className="text-sm font-medium text-foreground">{shortcut.action}</span>
                    <div className="flex items-center gap-1.5">
                      {shortcut.keys.map((key) => (
                        <span key={`${shortcut.action}-${key}`} className="px-2 py-1 text-xs font-mono font-bold rounded-md border border-border bg-background text-foreground shadow-sm">
                          {key}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 第三步：Teams 進階版功能 */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, ${PRIMARY_DEEP}, ${PRIMARY_DARK})` }}>
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-white/70">加碼選修</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">第三步：把會議紀錄的爛攤子丟給 AI</h2>
            <p className="text-white/70">如果公司有採購 Teams Premium 進階授權，開完會你根本連會議紀錄都不用自己打。</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: 'AI 智慧摘要 (Intelligent Recap)', desc: '系統會自動生成各項重點結論、時間軸標記，甚至會直接列出你個人的專屬待辦事項。' },
              { title: '即時字幕與翻譯', desc: '跨國會議救星，聽不懂外語也沒差，支援超過 40 種語言的即時雙向翻譯字幕。' },
              { title: '進階機密防護', desc: '強制在畫面上蓋上與會者 Email 的浮水印，完全防止手機翻拍外流機密。' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/10" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
