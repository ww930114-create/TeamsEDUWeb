import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Video, FolderOpen, Puzzle, Users, Hash, UserPlus, Rocket, Share2, Calendar, HardDrive, BookOpen, CheckSquare, Briefcase, GraduationCap, Code, Headphones, CheckCircle2, ArrowRight } from 'lucide-react';
import { MotionContainer, HoverScale } from '@/components/MotionContainer';

const PRIMARY = '#5B5EA6';
const PRIMARY_LIGHT = '#E8E6F5';
const PRIMARY_DARK = '#4B49A1';
const CTA_BG = 'linear-gradient(135deg, #2D2B5A, #4B49A1)';

export default function Introduction() {
  const features = [
    { icon: <MessageSquare className="w-6 h-6" />, title: '訊息溝通', desc: '私人訊息、群組對話、表情回應、訊息翻譯' },
    { icon: <Video className="w-6 h-6" />, title: '視訊會議', desc: '支援最多 1,000 人同時參與、螢幕共享、AI 摘要' },
    { icon: <FolderOpen className="w-6 h-6" />, title: '檔案共同作業', desc: '與 SharePoint 和 OneDrive 無縫整合，即時共同編輯' },
    { icon: <Puzzle className="w-6 h-6" />, title: '應用程式整合', desc: '透過 Power Platform 和第三方服務擴展功能' },
  ];

  const setupSteps = [
    { num: '01', icon: <Users className="w-6 h-6" />, title: '建立團隊', desc: '在 Teams 中建立您的第一個團隊，命名並設定隱私選項' },
    { num: '02', icon: <Hash className="w-6 h-6" />, title: '新增頻道', desc: '依主題或專案建立頻道，讓討論保持井然有序' },
    { num: '03', icon: <UserPlus className="w-6 h-6" />, title: '邀請成員', desc: '新增組織內外的成員，賦予適當的權限角色' },
    { num: '04', icon: <Rocket className="w-6 h-6" />, title: '開始協作', desc: '在頻道中發布訊息、分享檔案、安排會議' },
  ];

  const integrations = [
    { icon: <Share2 className="w-5 h-5" />, title: 'SharePoint', desc: '檔案儲存與管理' },
    { icon: <Calendar className="w-5 h-5" />, title: 'Exchange', desc: '郵件與行事曆整合' },
    { icon: <HardDrive className="w-5 h-5" />, title: 'OneDrive', desc: '個人檔案儲存' },
    { icon: <BookOpen className="w-5 h-5" />, title: 'OneNote', desc: '共同筆記' },
    { icon: <CheckSquare className="w-5 h-5" />, title: 'Planner', desc: '工作任務管理' },
  ];

  const audiences = [
    { icon: <Briefcase className="w-6 h-6" />, title: '商務人士', desc: '遠距會議、跨部門協作、客戶會議、專案管理', color: PRIMARY },
    { icon: <GraduationCap className="w-6 h-6" />, title: '教育工作者', desc: '線上授課、班級管理、作業繳交、師生互動', color: PRIMARY_DARK },
    { icon: <Code className="w-6 h-6" />, title: '開發團隊', desc: '敏捷開發、程式碼審查、DevOps 整合', color: '#7B79C4' },
    { icon: <Headphones className="w-6 h-6" />, title: '前線員工', desc: '門市協調、政策更新、行動裝置支援', color: PRIMARY },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden" style={{ background: CTA_BG }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-8 w-64 h-64 rounded-full" style={{ background: PRIMARY_LIGHT }} />
          <div className="absolute bottom-12 right-16 w-80 h-80 rounded-full" style={{ background: PRIMARY }} />
        </div>
        <div className="container relative z-10 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8" style={{ background: `${PRIMARY_LIGHT}30`, color: '#E8E6F5' }}>
            <MessageSquare className="w-4 h-4" />
            Microsoft Teams 官方教學
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.03em' }}>
            開始使用<br className="hidden md:block" />Microsoft Teams
          </h1>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Microsoft Teams 是微軟的團隊協作平台，整合訊息、會議、檔案共同作業與應用程式整合於一體。無論您是商務人士、教育工作者或開發者，Teams 都能幫助您提升協作效率。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/concepts/core">
              <HoverScale>
                <Button size="lg" className="px-10 font-semibold text-base" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                  開始學習
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </HoverScale>
            </Link>
            <Link href="/concepts/chat-channels">
              <HoverScale>
                <Button size="lg" variant="outline" className="px-10 font-semibold text-base border-white/30 text-white hover:bg-white/10 bg-transparent">
                  查看核心概念
                </Button>
              </HoverScale>
            </Link>
          </div>
        </div>
      </section>

      {/* 什麼是 Teams */}
      <section className="py-24 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>基礎介紹</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">什麼是 Microsoft Teams？</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Teams 建置於 Microsoft 365 群組和 Microsoft Entra ID 之上，與 SharePoint、Exchange、OneDrive、Planner、Power BI 等服務緊密整合。
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <HoverScale key={idx}>
                <Card className="bg-card border-border h-full hover:shadow-md transition-all duration-300">
                  <CardContent className="pt-7 pb-7 text-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: `${PRIMARY}12`, color: PRIMARY }}>
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </div>
        </div>
      </section>

      {/* Teams 如何運作 */}
      <section className="py-24 bg-muted/50">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>操作指南</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Teams 如何運作</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">建立團隊是使用 Teams 的第一步。以下四個步驟帶您快速上手。</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {setupSteps.map((step, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.1}>
                <Card className="bg-card border-border h-full text-center hover:shadow-md transition">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center font-bold text-xl text-white" style={{ background: PRIMARY }}>
                      {step.num}
                    </div>
                    <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${PRIMARY}12`, color: PRIMARY }}>
                      {step.icon}
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Teams 主要功能區 */}
      <section className="py-24 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>功能架構</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Teams 主要應用程式區</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Teams 提供四個主要區域，滿足不同的協作需求。</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: <Rocket className="w-7 h-7" />, title: '活動', desc: '檢視所有通知和摘要，掌握團隊動態和重要更新', color: PRIMARY },
              { icon: <MessageSquare className="w-7 h-7" />, title: '聊天', desc: '私人訊息和群組對話，與同事即時溝通', color: PRIMARY_DARK },
              { icon: <Users className="w-7 h-7" />, title: '團隊', desc: '頻道訊息和共同作業，按主題組織討論內容', color: '#7B79C4' },
              { icon: <Video className="w-7 h-7" />, title: '會議', desc: '排程和參加視訊會議，錄製會議以供日後觀看', color: PRIMARY },
            ].map((item, idx) => (
              <HoverScale key={idx}>
                <Card className="bg-card border-border h-full hover:shadow-md transition">
                  <CardContent className="pt-7 flex gap-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${item.color}12`, color: item.color }}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </div>
        </div>
      </section>

      {/* 整合服務 */}
      <section className="py-24 bg-muted/50">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>生態系</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">與 Microsoft 365 無縫整合</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">當您建立團隊時，會自動建立以下服務，無需手動設定。</p>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {integrations.map((item, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.05}>
                <div className="flex flex-col items-center text-center p-5 bg-card border border-border rounded-xl hover:shadow-sm transition">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${PRIMARY}12`, color: PRIMARY }}>
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* 誰適合使用 */}
      <section className="py-24 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>適用對象</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">誰適合使用 Teams？</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Teams 為各類型組織和個人設計，無論您身在何處，都能找到適合的使用方式。</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((item, idx) => (
              <HoverScale key={idx}>
                <Card className="bg-card border-border h-full hover:shadow-md transition">
                  <CardContent className="pt-7 pb-7 text-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: `${item.color}12`, color: item.color }}>
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ background: CTA_BG }}>
        <div className="container relative z-10 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            準備好開始了嗎？
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            只需 30 分鐘，您就能掌握 Teams 的基礎操作，建立第一個團隊並與同事開始協作。
          </p>
          <div className="flex flex-wrap justify-center gap-5 mb-12 text-sm text-white/50">
            {['免費使用核心功能', '無需技術背景', '繁體中文全程說明'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" style={{ color: '#F2C811' }} />
                {t}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/concepts/core">
              <HoverScale>
                <Button size="lg" className="px-10 font-semibold text-base" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                  深入核心概念
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </HoverScale>
            </Link>
            <Link href="/support/faq">
              <HoverScale>
                <Button size="lg" variant="outline" className="px-10 font-semibold text-base border-white/30 text-white hover:bg-white/10 bg-transparent">
                  查看常見問題
                </Button>
              </HoverScale>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
