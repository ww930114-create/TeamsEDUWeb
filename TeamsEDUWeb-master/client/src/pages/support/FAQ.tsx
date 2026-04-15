import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, MessageSquare, Download, CreditCard, Users, Video, Shield, Phone, Settings, FileText, ExternalLink } from 'lucide-react';
import { MotionContainer } from '@/components/MotionContainer';

const PRIMARY = '#5B5EA6';
const PRIMARY_LIGHT = '#E8E6F5';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  icon: React.ReactNode;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: '如何下載 Microsoft Teams？',
      icon: <Download className="w-5 h-5" />,
      answer: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>Microsoft Teams 提供多平台支援，您可以透過以下方式下載：</p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              桌面版：前往 <a href="https://teams.microsoft.com/downloads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">teams.microsoft.com/downloads</a>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              網頁版：直接前往 <a href="https://teams.microsoft.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">teams.microsoft.com</a> 使用瀏覽器版本
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              行動版：在 App Store（iOS）或 Google Play（Android）搜尋「Microsoft Teams」下載行動應用程式
            </li>
          </ul>
          <p className="pt-2">Teams 基本版對一般使用者免費，無需訂閱 Microsoft 365 即可使用核心功能。</p>
        </div>
      ),
    },
    {
      question: 'Teams 是否需要付費？',
      icon: <CreditCard className="w-5 h-5" />,
      answer: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>Microsoft Teams 提供多層級方案：</p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">Teams 免費版</strong>：基本訊息、會議、檔案儲存（每個組織 10GB），適合小型團隊</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">Microsoft 365 商業版</strong>：包含 Teams 完整功能、Exchange 信箱、SharePoint 線上版、1TB OneDrive 儲存空間</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">Microsoft 365 企業版</strong>：企業級安全性、合規性管理、Teams 電話系統、无限會議錄製儲存</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">Teams 進階版</strong>：AI 會議摘要、情緒分析、進階會議控制、詳細參與分析</span>
            </li>
          </ul>
          <p className="pt-2">如只需要基本功能，Teams 免費版已足夠使用。</p>
        </div>
      ),
    },
    {
      question: '如何建立團隊或頻道？',
      icon: <Users className="w-5 h-5" />,
      answer: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>建立團隊的步驟：</p>
          <ol className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: PRIMARY }}>1</span>
              <span>在 Teams 左側點擊「建立團隊」按鈕（或使用 + 符號）</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: PRIMARY }}>2</span>
              <span>選擇團隊類型：從零建立，或從現有的 Microsoft 365 群組建立</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: PRIMARY }}>3</span>
              <span>為團隊命名（建議使用組織或專案名稱），可選擇隱私設定</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: PRIMARY }}>4</span>
              <span>新增成員（輸入姓名或 Email），設定成員角色（擁有者、成員、來賓）</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: PRIMARY }}>5</span>
              <span>建立後可新增頻道，按主題或專案組織討論內容</span>
            </li>
          </ol>
          <p className="pt-2">建立頻道：進入團隊後，點擊「...更多選項」→「新增頻道」，命名並選擇隱私權（公開或私人）。</p>
        </div>
      ),
    },
    {
      question: '什麼是頻道？與聊天的差別？',
      icon: <MessageSquare className="w-5 h-5" />,
      answer: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">頻道（Channels）</strong>是團隊內的公開討論空間，適合：</p>
          <ul className="space-y-1">
            <li>• 依主題組織的公開討論（如「行銷策略」、「產品開發」）</li>
            <li>• 所有成員都能看到歷史訊息</li>
            <li>• 適合專案進度更新、公告、全團隊公告</li>
          </ul>
          <p className="pt-2"><strong className="text-foreground">私人聊天（Chat）</strong>是一對一或小範圍對話，適合：</p>
          <ul className="space-y-1">
            <li>• 機密或敏感的討論內容</li>
            <li>• 快速協調不需要公開的話題</li>
            <li>• 非團隊成員的外部溝通</li>
          </ul>
          <p className="pt-2">簡單來說：頻道是「公開廣播」，聊天是「私人對話」。</p>
        </div>
      ),
    },
    {
      question: '如何加入會議？',
      icon: <Video className="w-5 h-5" />,
      answer: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>有多種方式加入 Teams 會議：</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">透過邀請連結</strong>：收到會議邀請中的「加入 Teams 會議」連結，點擊即可直接加入</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">透過行事曆</strong>：在 Teams 中開啟「行事曆」，找到會議後點擊「加入」按鈕</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">透過電話撥入</strong>：部分會議提供電話號碼，可使用電話撥入參與（需 Teams 電話方案）</span>
            </li>
          </ul>
          <p className="pt-2">建議在會議前先測試音訊和視訊設定（Teams 會自動提示）。首次使用時，請允許 Teams 存取麥克風和攝影機權限。</p>
        </div>
      ),
    },
    {
      question: '可以錄製會議嗎？',
      icon: <Video className="w-5 h-5" />,
      answer: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>是的，Teams 支援雲端錄製功能，但有授權限制：</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">Microsoft 365 商業版/企業版</strong>：支援會議錄製，錄製檔案自動儲存至 Microsoft Stream（OneDrive for Business）</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">Teams 進階版</strong>：提供增強的錄製管理，包括會議錄製的編輯、字幕和翻譯功能</span>
            </li>
          </ul>
          <p className="pt-2">錄製開始時，所有與會者都會收到通知。無法在與會者不知情的情況下錄製。錄製完成後，會議召集人會收到通知，可管理誰有權限觀看。</p>
        </div>
      ),
    },
    {
      question: 'Teams 的檔案存在哪裡？',
      icon: <FileText className="w-5 h-5" />,
      answer: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>Teams 的檔案儲存與 Microsoft 365 深度整合：</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">團隊頻道檔案</strong>：儲存在 SharePoint Online，每個頻道對應一個 SharePoint 資料夾</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">私人聊天檔案</strong>：儲存在 OneDrive for Business，僅訊息雙方有存取權限</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">會議錄製</strong>：儲存在 Microsoft Stream（自動關聯至 OneDrive 或 SharePoint）</span>
            </li>
          </ul>
          <p className="pt-2">的好處是所有檔案都受到 Microsoft 365 的安全性與合規性保護，包括版本歷程追蹤、勒索軟體保護等功能。</p>
        </div>
      ),
    },
    {
      question: '如何與組織外的人共同作業？',
      icon: <Users className="w-5 h-5" />,
      answer: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>Teams 支援三種外部合作方式：</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">來賓存取（Guest Access）</strong>：將組織外部人員（如合作夥伴、客戶）加入團隊成為來賓成員。他們需要 Microsoft 帳戶或 Entra 帳戶，存取範圍可由管理員控制。</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">外部存取（External Access）</strong>：讓組織外的 Teams 使用者能與您聯繫，無需加入您的團隊。</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">共用頻道（Shared Channels）</strong>：跨組織合作，雙方各自保有組織身份，在共用的頻道中共同作業。</span>
            </li>
          </ul>
          <p className="pt-2">IT 管理員可在 Teams 系統管理中心設定外部存取的權限和原則。</p>
        </div>
      ),
    },
    {
      question: '如何確保資料安全？',
      icon: <Shield className="w-5 h-5" />,
      answer: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>Teams 建立在 Microsoft 365 安全性基礎上，提供多層次保護：</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">Microsoft Entra ID</strong>：所有 Teams 存取都經過 Entra ID 驗證，支援多重要素驗證（MFA）</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">敏感性標籤</strong>：可對訊息、檔案套用敏感性標籤，控管存取和分享權限</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">資料外洩防護（DLP）</strong>：偵測並防範敏感資料（如信用卡號、個人身份資料）透過 Teams 流出</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">稽核記錄</strong>：所有管理操作都有完整稽核軌跡，可在 Microsoft Purview 合規入口網站查看</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">待用資料加密</strong>：所有資料在 Microsoft 資料中心內都經過加密保護</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: '什麼是 Teams 電話系統（Teams Phone）？',
      icon: <Phone className="w-5 h-5" />,
      answer: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>Teams 電話系統是雲端式的電話解決方案，可讓組織以軟體方式取代傳統電話系統（PBX）：</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">通話功能</strong>：直接透過 Teams 撥打和接聽外部電話號碼</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">來電轉接</strong>：設定來電轉接、輪轉接聽、語音信箱</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">自動語音應答</strong>：建立 IVR 語音選單，引導來電者至正確部門</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">電話會議</strong>：透過會議橋接同時容納大量參與者</span>
            </li>
          </ul>
          <p className="pt-2">需要 Microsoft 365 電話系統授權和通話方案（如 Microsoft 365 商務語音）才能啟用。</p>
        </div>
      ),
    },
    {
      question: '如何疑難排解 Teams 問題？',
      icon: <Settings className="w-5 h-5" />,
      answer: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>遇到問題時可嘗試以下步驟：</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">網路連線</strong>：確認網路穩定，嘗試開啟其他網站確認連線正常</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">重新啟動</strong>：完全關閉 Teams 應用程式後重新開啟（確認在系統匣中完全結束）</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">更新版本</strong>：確認 Teams 為最新版本，應用程式會自動更新，亦可手動檢查更新</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">清除快取</strong>：刪除 %appdata%\Microsoft\Teams 資料夾後重新登入</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">使用網頁版</strong>：如桌面版問題持續，可嘗試 teams.microsoft.com 網頁版</span>
            </li>
          </ul>
          <p className="pt-2">若問題仍無法解決，請聯繫您的 IT 管理員或參考 Microsoft 支援頁面。</p>
        </div>
      ),
    },
    {
      question: '什麼是 Teams 會議室（Teams Rooms）？',
      icon: <Video className="w-5 h-5" />,
      answer: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>Teams 會議室是專為會議室設計的整合解決方案，將硬體與軟體結合，提供專業的會議體驗：</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">一鍵加入</strong>：使用會議室專用觸控面板，一鍵加入 Teams 會議</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">智能攝影機</strong>：AI 驅動的發言者追蹤和框架調整</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">高品質音訊</strong>：專業級麥克風和喇叭，消除迴音和背景噪音</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
              <span><strong className="text-foreground">雙螢幕支援</strong>：一個螢幕顯示參與者，另一個顯示簡報內容</span>
            </li>
          </ul>
          <p className="pt-2">適合中大型會議室，可選用 Microsoft 認證的 Teams Rooms 設備，或使用 Teams Rooms 專業版（雲端管理）。</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2D2B5A, #4B49A1, #5B5EA6)' }}>
        <div className="container relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: `${PRIMARY_LIGHT}30`, color: '#E8E6F5' }}>
            <MessageSquare className="w-4 h-4" />
            常見問題
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            有關 Microsoft Teams 的常見問題
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            這裡整理了關於 Teams 安裝、使用、授權、安全性等最常見的問題。如果找不到您要的答案，歡迎查看 Microsoft 官方支援頁面。
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.02}>
                <Card className="bg-card border-border overflow-hidden hover:shadow-sm transition">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full text-left p-5 flex items-center gap-4 cursor-pointer"
                    style={{ background: 'transparent' }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${PRIMARY}15`, color: PRIMARY }}>
                      {faq.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-base">{faq.question}</h3>
                    </div>
                    <div className="shrink-0 transition-transform duration-200" style={{ color: PRIMARY }}>
                      {openIndex === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: openIndex === idx ? '1000px' : '0',
                      opacity: openIndex === idx ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-6 pl-5">
                      <div className="ml-14">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </Card>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">還有其他問題？</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            如果這裡沒有找到您要的答案，您可以前往 Microsoft 官方支援頁面，或聯繫您的 IT 管理員尋求協助。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://support.microsoft.com/zh-tw/office/microsoft-teams-將您的工具集中在同一處-c6d9b4f5-8d06-4b79-bd91-9f8e4e7b207b" target="_blank" rel="noopener noreferrer">
              <Button className="px-6 font-semibold" style={{ background: PRIMARY, color: '#fff', border: 'none' }}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Microsoft 支援頁面
              </Button>
            </a>
            <a href="https://learn.microsoft.com/zh-tw/microsoftteams/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="px-6 font-semibold">
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
