import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layers, MessageSquare, Users, Video, FolderOpen, Puzzle, Shield, CheckCircle2, ArrowRight, Star, Lightbulb, Clock, Target } from 'lucide-react';
import { MotionContainer, HoverScale } from '@/components/MotionContainer';

const PRIMARY = '#5B5EA6';
const PRIMARY_LIGHT = '#E8E6F5';
const PRIMARY_DARK = '#4B49A1';
const CTA_BG = 'linear-gradient(135deg, #2D2B5A, #4B49A1)';

export default function CoreConcepts() {
  const coreFeatures = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: '訊息與聊天',
      color: PRIMARY,
      items: ['私人聊天（1對1）', '群組對話', '@提及特定人員', '表情回應', '訊息翻譯', '回覆與引用'],
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: '團隊與頻道',
      color: PRIMARY_DARK,
      items: ['公開頻道', '私人頻道', '共用頻道（跨組織）', '頻道組織與排序', '@團隊或頻道', '公告與釘選'],
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: '會議與通話',
      color: '#7B79C4',
      items: ['即時會議（最多1,000人）', '排程會議', '錄製會議', '螢幕共享', '語音通話', 'AI 會議摘要'],
    },
    {
      icon: <FolderOpen className="w-6 h-6" />,
      title: '檔案共同作業',
      color: PRIMARY,
      items: ['SharePoint 整合', '即時共同編輯', '版本歷程', '檔案權限管理', '離線存取', '行動裝置同步'],
    },
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: '應用程式整合',
      color: PRIMARY_DARK,
      items: ['Teams 原生 App', 'Power Automate 自動化', 'Power BI 儀表板', 'CRM 整合', '第三方應用程式', '自訂應用程式開發'],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: '安全性與合規',
      color: '#7B79C4',
      items: ['Microsoft Entra ID', '敏感性標籤', 'DLP 資料外洩防護', '稽核記錄', '待用資料加密', '條件式存取'],
    },
  ];

  const bestPractices = [
    { icon: <Star className="w-6 h-6" />, title: '命名規範', desc: '為頻道使用清晰的命名，方便成員快速找到所需資訊。使用描述性的名稱而非縮寫。' },
    { icon: <Target className="w-6 h-6" />, title: '適當的頻道數量', desc: '每個團隊的頻道數量應適量，避免過於分散導致資訊碎片化。建議每個團隊5-10個頻道。' },
    { icon: <Clock className="w-6 h-6" />, title: '善用 @提及', desc: '僅在需要時使用 @提及，避免造成通知轟炸。@個人用於緊急事項，@頻道用於公告。' },
    { icon: <Lightbulb className="w-6 h-6" />, title: '定期整理', desc: '定期檢視不再活躍的頻道，將其歸檔以保持環境整潔。關閉已完成專案的頻道。' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden" style={{ background: CTA_BG }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-12 w-72 h-72 rounded-full" style={{ background: PRIMARY_LIGHT }} />
          <div className="absolute bottom-8 right-8 w-96 h-96 rounded-full" style={{ background: PRIMARY }} />
        </div>
        <div className="container relative z-10 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8" style={{ background: `${PRIMARY_LIGHT}30`, color: '#E8E6F5' }}>
            <Layers className="w-4 h-4" />
            核心概念
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.03em' }}>
            掌握 Teams 的<br className="hidden md:block" />核心概念
          </h1>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            深入了解 Microsoft Teams 的六大核心功能，從訊息溝通到安全性合規，全面掌握這款團隊協作平台的所有關鍵能力。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/concepts/chat-channels">
              <HoverScale>
                <Button size="lg" className="px-10 font-semibold text-base" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                  開始學習
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </HoverScale>
            </Link>
            <Link href="/concepts/meetings">
              <HoverScale>
                <Button size="lg" variant="outline" className="px-10 font-semibold text-base border-white/30 text-white hover:bg-white/10 bg-transparent">
                  會議管理
                </Button>
              </HoverScale>
            </Link>
          </div>
        </div>
      </section>

      {/* 六大核心功能 */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>功能總覽</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">六大核心功能</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Teams 的所有功能都可以歸類為六大核心領域，了解這些概念是掌握 Teams 的基礎。</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, idx) => (
              <HoverScale key={idx}>
                <Card className="bg-card border-border h-full hover:shadow-md transition-all duration-300">
                  <CardContent className="pt-7 pb-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${feature.color}15`, color: feature.color }}>
                        {feature.icon}
                      </div>
                      <h3 className="font-bold text-foreground text-lg">{feature.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {feature.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: feature.color }} />
                          {item}
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

      {/* 與其他工具的比較 */}
      <section className="py-24 bg-muted/50">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>比較分析</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Teams 與其他工具的比較</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">了解 Teams 相比其他通訊工具的優勢與差異。</p>
          </div>
          <Card className="bg-card border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground">功能</th>
                    <th className="text-center p-4 font-semibold" style={{ color: PRIMARY }}>Microsoft Teams</th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">其他工具</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Microsoft 365 整合', '完全整合', '有限'],
                    ['Enterprise 安全性', 'Enterprise 等級', '基本'],
                    ['會議參與人數', '最多 1,000 人', '100 人'],
                    ['檔案儲存', 'SharePoint + OneDrive', '各別服務'],
                    ['語音通話', 'Teams 電話系統', '需額外整合'],
                    ['AI 功能', 'Copilot 整合', '有限或無'],
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium text-foreground">{row[0]}</td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1 font-medium" style={{ color: PRIMARY }}>
                          <CheckCircle2 className="w-4 h-4" />
                          {row[1]}
                        </span>
                      </td>
                      <td className="p-4 text-center text-muted-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* 最佳實踐 */}
      <section className="py-24 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>最佳實踐</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">使用 Teams 的最佳實踐</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">這些技巧幫助您更有效地使用 Teams，建立良好的協作文化。</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {bestPractices.map((practice, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.1}>
                <Card className="bg-card border-border h-full hover:shadow-sm transition">
                  <CardContent className="pt-7 flex gap-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${PRIMARY}12`, color: PRIMARY }}>
                      {practice.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg mb-2">{practice.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{practice.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* 延伸資源 */}
      <section className="py-16" style={{ background: `${PRIMARY}10` }}>
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">延伸資源</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Microsoft Teams 系統管理中心', url: 'https://admin.teams.microsoft.com', desc: '管理 Teams 設定和使用者' },
              { title: 'Teams 應用程式 SDK', url: 'https://learn.microsoft.com/zh-tw/microsoftteams/platform/', desc: '開發自訂 Teams 應用程式' },
              { title: 'Teams 安全性與合規', url: 'https://learn.microsoft.com/zh-tw/microsoftteams/security-compliance-overview', desc: '了解資料保護和合規功能' },
              { title: 'Teams 訓練課程', url: 'https://learn.microsoft.com/zh-tw/training/teams/', desc: '官方培訓課程和認證' },
            ].map((resource, idx) => (
              <a key={idx} href={resource.url} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl hover:shadow-sm transition">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: PRIMARY }} />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition">{resource.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{resource.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ background: CTA_BG }}>
        <div className="container relative z-10 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            深入了解 Teams 應用
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            掌握核心概念後，繼續學習聊天與頻道、會議管理等進階主題。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/concepts/chat-channels">
              <HoverScale>
                <Button size="lg" className="px-10 font-semibold text-base" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                  聊天與頻道
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </HoverScale>
            </Link>
            <Link href="/scenarios">
              <HoverScale>
                <Button size="lg" variant="outline" className="px-10 font-semibold text-base border-white/30 text-white hover:bg-white/10 bg-transparent">
                  應用情境
                </Button>
              </HoverScale>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
