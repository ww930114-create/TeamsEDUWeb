import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ChevronDown, MessageSquare, ExternalLink,
  Factory, ShieldCheck, FlaskConical, Globe2, Truck,
  GraduationCap, Users, Lock, HelpCircle, Smartphone,
  Lightbulb, CheckCircle2,
} from 'lucide-react';
import { MotionContainer } from '@/components/MotionContainer';

// ── 色票 ──────────────────────────────────────
const C = {
  primary:   '#5B5EA6',
  deep:      '#3A3870',
  dark:      '#1E1C3A',
  mid:       '#4B49A1',
  soft:      '#7B79C4',
  light:     '#E8E6F5',
  accent:    '#F2C811',
};

// ── 型別 ──────────────────────────────────────
interface FAQItem {
  question: string;
  icon: React.ReactNode;
  tag: string;
  answer: React.ReactNode;
}
interface FAQCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  items: FAQItem[];
}

// ── 小元件 ────────────────────────────────────
const Dot = ({ color = C.primary }: { color?: string }) => (
  <div className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0" style={{ background: color }} />
);

const Num = ({ n, color = C.primary }: { n: number; color?: string }) => (
  <span
    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
    style={{ background: color }}
  >
    {n}
  </span>
);

const Tip = ({ color = C.primary, children }: { color?: string; children: React.ReactNode }) => (
  <div
    className="mt-4 rounded-xl p-4 flex gap-3"
    style={{ background: `${color}0D`, border: `1px solid ${color}25` }}
  >
    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color }} />
    <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{children}</p>
  </div>
);

// ── FAQ 資料 ───────────────────────────────────
const categories: FAQCategory[] = [
  {
    id: 'production', label: '跨廠生產協調', icon: <Factory className="w-4 h-4" />, color: C.primary,
    items: [
      {
        tag: 'Multi-Site Production', icon: <Factory className="w-5 h-5" />,
        question: '淡水總部要和東莞、蘇州、重慶等廠即時溝通，Teams 怎麼設定？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>建議以「廠區」為單位建立獨立頻道，整體架構如下：</p>
            <ol className="space-y-2.5">
              {[
                '建立「瀚荃製造協作」主團隊，邀請所有廠區 PMC 與主管加入。',
                '主團隊下新增各廠專屬頻道，如「#東莞廠」「#蘇州廠」「#淡水總部」，訊息集中不漏接。',
                '重要跨廠急件在「#緊急插單」頻道發文並 @提及相關負責人，手機即時收到推送。',
                '定期跨廠產能會議在 Teams 召開，會議記錄自動儲存於頻道，不靠口頭確認。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Num n={i + 1} color={C.primary} />
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <Tip color={C.primary}>
              <strong>瀚荃小提示：</strong>寮國廠若網路頻寬較低，可啟用 Teams「低頻寬模式」，關閉視訊只保留音訊與文字，仍可正常參與討論。
            </Tip>
          </div>
        ),
      },
      {
        tag: 'Incident Response', icon: <Factory className="w-5 h-5" />,
        question: '生產異常發生時，如何透過 Teams 快速通報並追蹤處理進度？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>建議建立標準化的「異常通報」流程，全程無需 Email：</p>
            <ul className="space-y-2.5">
              {[
                '在「#品質異常」頻道直接上傳現場照片／影片，說明問題描述、發生時間、影響數量。',
                '使用 Teams 內建「任務」功能指派 QE、PE 負責人，設定 Due Date，系統自動推播通知。',
                '相關人員在任務下方更新處理進度，8D 追蹤全程留存，不再靠 Email 往返。',
                '結案後標記「完成」，主管可隨時查看未結異常數，不需另外整理追蹤表。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Dot color={C.primary} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    id: 'quality', label: '品質管理稽核', icon: <ShieldCheck className="w-4 h-4" />, color: C.mid,
    items: [
      {
        tag: 'ISO / UL Compliance', icon: <ShieldCheck className="w-5 h-5" />,
        question: 'ISO 稽核季節到了，SOP 文件怎麼用 Teams 管理才不會找不到正確版本？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>Teams 整合 SharePoint Online，從根本解決版本混亂問題：</p>
            <ul className="space-y-2.5">
              {[
                '在 Teams 頻道「檔案」分頁建立統一 SOP 資料夾（依製程、廠區分類），告別各廠 NAS 各版本的惡夢。',
                'SharePoint 內建版本紀錄，每次修改自動留下版次與修改者，委員可查看任一版本歷史。',
                'SOP 更新後在頻道以「公告」格式通知，置頂顯示防止遺漏；相關人員使用任務確認已讀。',
                '稽核時直接在 Teams 連結開啟文件供委員線上瀏覽，無需列印或臨時找檔案。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Dot color={C.mid} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <Tip color={C.mid}>
              <strong>瀚荃小提示：</strong>可在文件庫設定「簽出」功能，避免多人同時修改同一份 SOP，適合 ECN 或改版期間使用。
            </Tip>
          </div>
        ),
      },
      {
        tag: 'Access Control', icon: <ShieldCheck className="w-5 h-5" />,
        question: '瀚荃有 UL 安規認證要求，Teams 上的資料有辦法做到存取權限控管嗎？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>Teams 透過 Microsoft 365 提供三層權限機制：</p>
            <ul className="space-y-2.5">
              {[
                '「私人頻道」：只有受邀成員才能看到，適合存放 UL 稽核報告、客戶機密規格書。',
                '「SharePoint 文件庫權限」：可設定特定資料夾「唯讀」，讓各廠 PE 只能閱讀、不能修改核心 SOP。',
                '「敏感性標籤」：對機密文件加上標籤，防止未授權的分享或下載。',
                'IT 管理員可在 Teams 系統管理中心統一管控所有權限，稽核紀錄完整保存。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Dot color={C.mid} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    id: 'rd', label: '研發工程協作', icon: <FlaskConical className="w-4 h-4" />, color: C.soft,
    items: [
      {
        tag: 'ECN Management', icon: <FlaskConical className="w-5 h-5" />,
        question: '工程變更通知（ECN）目前靠 Email，如何用 Teams 確保各廠 PE 都確認到位？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>Teams 任務功能可直接取代 Email ECN 流程：</p>
            <ol className="space-y-2.5">
              {[
                '研發工程師在「#工程變更」頻道發布 ECN 公告，附上更新圖面或 BOM 連結。',
                '同時為每個廠區 PE 建立獨立任務，填寫 ECN 編號與變更摘要，指定負責人與截止日期。',
                '每位 PE 確認後將任務標記「完成」，主管在任務看板即時看到哪些廠已確認、哪些尚未回應。',
                '超過截止日期未完成的任務自動標示逾期，主管直接在 Teams 追蹤，不需再發催促信。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Num n={i + 1} color={C.soft} />
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <Tip color={C.soft}>
              <strong>瀚荃小提示：</strong>搭配 Power Automate，ECN 文件上傳至 SharePoint 時可自動觸發任務建立並通知各廠 PE，省去手動逐一設定的步驟。
            </Tip>
          </div>
        ),
      },
      {
        tag: 'Cross-Strait Meeting', icon: <FlaskConical className="w-5 h-5" />,
        question: '新產品樣品確認會議要跨台灣和大陸廠，有什麼注意事項？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>跨兩岸 Teams 樣品會議建議：</p>
            <ul className="space-y-2.5">
              {[
                '樣品照片或測試數據在會議前先上傳至頻道「檔案」，讓各廠人員提前查看，會議中省去傳檔時間。',
                '使用「螢幕共享」展示 CAD 圖面，配合「白板」即時標注尺寸或問題點，避免口頭描述誤解。',
                '開會時同時開啟「會議聊天室」，讓無法開麥的人員用文字補充意見，不影響主講。',
                '會議結束後在頻道發文整理結論與 Action Item，責任與期限白紙黑字，避免事後各自表述。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Dot color={C.soft} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    id: 'sales', label: '全球業務服務', icon: <Globe2 className="w-4 h-4" />, color: C.deep,
    items: [
      {
        tag: 'Global Sales', icon: <Globe2 className="w-5 h-5" />,
        question: '瀚荃業務遍及歐、亞、美三洲，不同時區的業務如何在 Teams 上協作？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>Teams 非常適合非同步的跨時區協作：</p>
            <ul className="space-y-2.5">
              {[
                '以地區或大客戶名稱建立專屬頻道，報價單、往來記錄全部集中，交接時零斷層。',
                '使用「釘選訊息」將最新報價版本或客戶特殊需求置頂，接班業務一進頻道就掌握現況。',
                '不同時區業務留言時 @提及指定對象，對方上線時自動收到通知，不需 Email 追蹤。',
                '歐美 RFQ 緊急件留下完整背景說明，讓亞洲同仁白天上班後直接接手，無需等雙方同時在線。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Dot color={C.deep} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        tag: 'External Meeting', icon: <Globe2 className="w-5 h-5" />,
        question: '和歐美客戶開視訊會議，對方沒有 Teams 帳號可以加入嗎？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>可以，Teams 提供三種方式讓外部人員加入：</p>
            <ul className="space-y-2.5">
              {[
                '客戶點擊邀請信「加入 Teams 會議」連結，不需帳號，直接用瀏覽器以訪客身份進入，適合一次性會議。',
                '長期合作客戶可透過「來賓存取」加入頻道，直接上傳規格書或確認報價，溝通紀錄集中保存。',
                '若客戶本身也用 Teams，可透過「外部存取」跨組織直接發訊息，無需加入對方組織。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Dot color={C.deep} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <Tip color={C.deep}>
              <strong>瀚荃小提示：</strong>與客戶正式開會前，建議先發送測試連結確認訪客能順利加入，避免正式會議臨時出現技術問題影響形象。
            </Tip>
          </div>
        ),
      },
    ],
  },
  {
    id: 'supply', label: '供應鏈採購', icon: <Truck className="w-4 h-4" />, color: C.primary,
    items: [
      {
        tag: 'Supply Chain Alert', icon: <Truck className="w-5 h-5" />,
        question: '供應商交期發生異常，如何用 Teams 第一時間通知所有廠區的 PMC？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>建立「採購快報」頻道配合通知設定，是最快的標準方法：</p>
            <ol className="space-y-2.5">
              {[
                '建立「採購快報」頻道，將所有廠區 PMC 和採購同仁加入，並要求成員開啟此頻道的推播通知。',
                '採購同仁發布異常公告，一則訊息、六廠同步接收，不再需要一個個打電話。',
                '訊息中 @提及各廠 PMC，請回覆目前庫存天數與最晚需求日期，讓採購掌握各廠緊急程度。',
                '依回覆情況在頻道發起視訊討論替代料或庫存調配，決策過程全程留存紀錄。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Num n={i + 1} color={C.primary} />
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <Tip color={C.primary}>
              <strong>瀚荃小提示：</strong>如果 ERP 系統支援 Webhook，可透過 Power Automate 讓庫存低於安全庫存時自動推送警示至頻道，採購不需人工盯著 ERP。
            </Tip>
          </div>
        ),
      },
    ],
  },
  {
    id: 'training', label: '員工訓練 SOP', icon: <GraduationCap className="w-4 h-4" />, color: C.soft,
    items: [
      {
        tag: 'Training Deployment', icon: <GraduationCap className="w-5 h-5" />,
        question: '新機種量產，如何將組裝 SOP 影片統一發布給六廠三千名員工？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>Teams 整合 Microsoft Stream 和 Viva Learning，完成從發布到追蹤的完整流程：</p>
            <ol className="space-y-2.5">
              {[
                '錄製完成的 SOP 教學影片上傳至 Microsoft Stream，設定公司內部可存取並提供分享連結。',
                '在 Teams 全體員工頻道以「公告」格式發布訓練通知，附上影片連結與截止日期，員工即時收到推播。',
                '配合 Viva Learning 建立「學習課程」，員工完成觀看後點選確認，留下數位紀錄。',
                '訓練主管查看各廠完成率，ISO 稽核時直接匯出訓練完成報表，不需手動彙整。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Num n={i + 1} color={C.soft} />
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        ),
      },
      {
        tag: 'Frontline Workers', icon: <Smartphone className="w-5 h-5" />,
        question: '現場作業員幾乎不用電腦，可以在手機上用 Teams 接受訓練通知嗎？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>可以。Teams 手機版完整支援以下功能，作業員不需要電腦：</p>
            <ul className="space-y-2.5">
              {[
                '收發頻道訊息與通知，重要訓練公告即時推播至手機。',
                '觀看 Microsoft Stream 教學影片，適合在休息時間自學。',
                '上傳現場照片直接回報異常，無需回辦公室才能通報。',
                'Teams「一線員工」功能支援輪班管理，結合班表與訊息通知，貼合廠區使用情境。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Dot color={C.soft} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <Tip color={C.soft}>
              <strong>瀚荃小提示：</strong>廠區可在公共區域設置平板，以「共用裝置模式」登入 Teams，讓無個人帳號的作業員也能使用，換班時自動登出保護資安。
            </Tip>
          </div>
        ),
      },
    ],
  },
  {
    id: 'account', label: '帳號與資安', icon: <Lock className="w-4 h-4" />, color: C.mid,
    items: [
      {
        tag: 'Offboarding', icon: <Lock className="w-5 h-5" />,
        question: '員工離職時，如何確保 Teams 存取權限能立即收回且資料不流失？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>透過 Microsoft Entra ID，IT 管理員可同時做到「收權」與「保資料」：</p>
            <ul className="space-y-2.5">
              {[
                '停用帳號後，該帳號立即無法登入任何 Microsoft 365 服務，已登入裝置下次同步後自動登出。',
                '員工離開後，其頻道訊息、上傳檔案仍保留在 SharePoint，業務連續性不中斷。',
                '離職業務的客戶頻道歷史紀錄完整保留，新任業務接手後直接查看，不需翻舊信箱。',
                '所有操作有 Microsoft Purview 稽核記錄，可確認離職員工最後使用期間的存取行為。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Dot color={C.mid} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        tag: 'Multi-Region Account', icon: <Users className="w-5 h-5" />,
        question: '台灣廠和大陸廠、寮國廠的員工用同一個 Teams 嗎？帳號怎麼管理？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>有兩種架構可選，依瀚荃 IT 策略決定：</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: C.mid }} />
                <div>
                  <strong className="text-foreground">單一租用戶（推薦）：</strong>全集團統一使用一個 Microsoft 365 租用戶，所有廠區帳號集中管理，跨廠溝通最順暢，IT 管理最方便。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: C.mid }} />
                <div>
                  <strong className="text-foreground">多租用戶：</strong>大陸廠若因法規需求需獨立管理，可建立獨立租用戶，再透過「共用頻道」或「外部存取」與台灣總部連線。
                </div>
              </li>
            </ul>
            <Tip color={C.mid}>
              <strong>瀚荃小提示：</strong>建議導入前先與 Microsoft 合作夥伴確認大陸廠的網路合規問題（如需使用世紀互聯版 Microsoft 365），確保符合當地法規。
            </Tip>
          </div>
        ),
      },
    ],
  },
  {
    id: 'general', label: '其他常見問題', icon: <HelpCircle className="w-4 h-4" />, color: C.soft,
    items: [
      {
        tag: 'Notification Tips', icon: <MessageSquare className="w-5 h-5" />,
        question: 'Teams 訊息很多，容易漏看重要通知，有什麼設定可以改善？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>四個立即可用的設定技巧：</p>
            <ul className="space-y-2.5">
              {[
                '「釘選頻道」：將「採購快報」「品質異常」等重要頻道釘選在清單最上方。',
                '「活動篩選器」：在「活動」頁面篩選「@提及我的」，只看與自己直接相關的訊息。',
                '「關鍵字通知」：在設定中加入關鍵字如「停線」「急件」，出現時立即推播通知。',
                '發送重要訊息時標示「重要」（驚嘆號），收件人在活動頁面特別標注，不易遺漏。',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Dot color={C.soft} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        tag: 'Teams vs LINE', icon: <MessageSquare className="w-5 h-5" />,
        question: 'Teams 和現在用的 LINE 群組有什麼差別？為什麼要換？',
        answer: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>LINE 使用方便，但在企業環境有四個根本限制：</p>
            <ul className="space-y-3">
              {[
                ['資料歸屬', 'LINE 訊息屬於個人帳號，員工離職帶走手機就等於帶走所有溝通紀錄；Teams 訊息屬於公司，帳號停用後記錄仍在。'],
                ['檔案管理', 'LINE 傳的圖檔 7 天後自動失效；Teams 上傳的檔案永久保存在 SharePoint，版本可追溯。'],
                ['資安合規', 'LINE 無法滿足 ISO 稽核對溝通記錄的要求；Teams 有完整稽核日誌，符合企業合規需求。'],
                ['系統整合', 'Teams 可與 ERP、Power BI、SharePoint 深度整合自動化；LINE 無法做到。'],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start gap-2">
                  <Dot color={C.soft} />
                  <div><strong className="text-foreground">{title}：</strong>{desc}</div>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
    ],
  },
];

// ── 主頁面 ────────────────────────────────────
export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('production');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const currentCat = categories.find(c => c.id === activeCategory)!;

  const handleCat = (id: string) => {
    setActiveCategory(id);
    setOpenIndex(0);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>

      {/* ══════════ HERO ══════════ */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: `linear-gradient(140deg, ${C.dark} 0%, ${C.deep} 50%, ${C.mid} 100%)` }}
      >
        {/* 幾何格線裝飾 */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }} />
        {/* 右側漸層光暈 */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.soft}30 0%, transparent 70%)` }} />

        <div className="container relative z-10 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            {/* 左側文字 */}
            <div>
              {/* Tag chip */}
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{ background: `${C.accent}20`, color: C.accent, border: `1px solid ${C.accent}40` }}>
                <MessageSquare className="w-3.5 h-3.5" />
                FAQ — 瀚荃 × Teams
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
                style={{ letterSpacing: '-0.03em' }}>
                瀚荃同仁<br />
                <span style={{ color: C.accent }}>最常問</span>的問題
              </h1>
              <p className="text-white/60 max-w-md leading-relaxed text-sm md:text-base">
                從跨廠生產協調、ISO 稽核文件管理，到歐美客戶視訊會議——這裡整理了瀚荃各部門導入 Teams 最常遇到的疑問與解答。
              </p>
            </div>

            {/* 右側統計 */}
            <div className="flex gap-8 md:gap-10 shrink-0">
              {[
                { n: '8', label: '主題分類' },
                { n: '16', label: '問題解答' },
                { n: '6', label: '廠區適用' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-black" style={{ color: C.accent }}>{s.n}</div>
                  <div className="text-xs text-white/40 mt-1 tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 分類 TAB + FAQ ══════════ */}
      <section className="py-16">
        <div className="container max-w-4xl">

          {/* ── 分類選單 ── */}
          <div className="mb-10">
            <div
              className="flex flex-wrap gap-2 p-2 rounded-2xl"
              style={{ background: 'var(--muted)', border: '1px solid var(--border)' }}
            >
              {categories.map(cat => {
                const isActive = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCat(cat.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                    style={
                      isActive
                        ? {
                            background: cat.color,
                            color: '#fff',
                            boxShadow: `0 2px 12px ${cat.color}50`,
                          }
                        : {
                            background: 'transparent',
                            color: 'var(--muted-foreground)',
                          }
                    }
                  >
                    {cat.icon}
                    <span className="hidden sm:inline">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── 當前分類標題 ── */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-1 h-8 rounded-full"
              style={{ background: currentCat.color }}
            />
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: currentCat.color }}>
                {currentCat.id.toUpperCase()}
              </div>
              <div className="text-xl font-bold text-foreground">{currentCat.label}</div>
            </div>
          </div>

          {/* ── 問題列表 ── */}
          <div className="space-y-3">
            {currentCat.items.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <MotionContainer key={`${activeCategory}-${idx}`} direction="up" delay={idx * 0.05}>
                  <div
                    className="rounded-2xl overflow-hidden transition-all duration-200"
                    style={{
                      border: isOpen
                        ? `1.5px solid ${currentCat.color}50`
                        : '1.5px solid var(--border)',
                      background: 'var(--card)',
                      boxShadow: isOpen ? `0 4px 24px ${currentCat.color}14` : undefined,
                    }}
                  >
                    {/* 問題列 */}
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full text-left flex items-start gap-4 p-5 cursor-pointer bg-transparent"
                    >
                      {/* 左側色條 */}
                      <div
                        className="w-0.5 self-stretch rounded-full shrink-0 transition-all duration-200"
                        style={{ background: isOpen ? currentCat.color : 'var(--border)' }}
                      />

                      {/* 圖示 */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200"
                        style={{
                          background: isOpen ? currentCat.color : `${currentCat.color}12`,
                          color: isOpen ? '#fff' : currentCat.color,
                        }}
                      >
                        {faq.icon}
                      </div>

                      {/* 文字 */}
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-xs font-semibold tracking-widest uppercase mb-1"
                          style={{ color: currentCat.color, opacity: 0.7 }}
                        >
                          {faq.tag}
                        </div>
                        <h3 className="font-semibold text-foreground leading-snug pr-2">
                          {faq.question}
                        </h3>
                      </div>

                      {/* 展開箭頭 */}
                      <div
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5"
                        style={{
                          background: isOpen ? currentCat.color : `${currentCat.color}10`,
                          color: isOpen ? '#fff' : currentCat.color,
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* 展開內容 */}
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: isOpen ? '1400px' : '0',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div
                        className="px-5 pb-6 ml-[calc(0.125rem+2.5rem+1rem)]"
                      >
                        {/* 分隔線 */}
                        <div className="h-px mb-5" style={{ background: `${currentCat.color}20` }} />
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </MotionContainer>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ 底部 CTA ══════════ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: `linear-gradient(140deg, ${C.dark}, ${C.deep})` }}
      >
        {/* 格線裝飾 */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }} />

        <div className="container max-w-2xl text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ background: `${C.accent}20`, color: C.accent, border: `1px solid ${C.accent}40` }}
          >
            需要更多協助？
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            找不到您的問題？
          </h2>
          <p className="text-white/50 mb-8 leading-relaxed">
            可前往 Microsoft 官方說明中心，或聯繫瀚荃 IT 部門尋求協助。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://support.microsoft.com/zh-tw/teams" target="_blank" rel="noopener noreferrer">
              <Button
                className="px-8 font-bold h-11"
                style={{ background: C.accent, color: C.dark, border: 'none' }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Microsoft Teams 說明中心
              </Button>
            </a>
            <a href="https://learn.microsoft.com/zh-tw/microsoftteams/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="px-8 font-bold h-11 border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Microsoft Learn
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
