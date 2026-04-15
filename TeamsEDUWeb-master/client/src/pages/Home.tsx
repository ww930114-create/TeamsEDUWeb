import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ArrowRight, MessageSquare, Hash, Video, Users, BookOpen, PlayCircle, Map, RefreshCw, BarChart3, BrainCircuit, FolderOpen, Puzzle, Rocket } from 'lucide-react';
import { MotionContainer, HoverScale } from '@/components/MotionContainer';

const PRIMARY = '#5B5EA6';
const PRIMARY_LIGHT = '#E8E6F5';
const PRIMARY_DARK = '#4B49A1';
const CTA_BG = 'linear-gradient(135deg, #2D2B5A, #4B49A1)';

export default function Home() {
  const learningPaths = [
    { icon: <Rocket className="w-6 h-6" />, title: '入門指南', href: '/introduction', desc: '了解 Teams 基本概念與操作介面' },
    { icon: <MessageSquare className="w-6 h-6" />, title: '聊天與頻道', href: '/concepts/chat-channels', desc: '掌握訊息與頻道的使用方法' },
    { icon: <Video className="w-6 h-6" />, title: '會議管理', href: '/concepts/meetings', desc: '舉辦專業的視訊會議' },
    { icon: <BarChart3 className="w-6 h-6" />, title: '核心概念', href: '/concepts/core', desc: '深入理解 Teams 的核心功能' },
    { icon: <Users className="w-6 h-6" />, title: '應用情境', href: '/scenarios', desc: '探索 Teams 在各產業的應用' },
  ];

  const features = [
    { icon: <MessageSquare className="w-7 h-7" />, title: '即時訊息與聊天', desc: '私人訊息、群組對話、@提及、表情回應，讓溝通更順暢' },
    { icon: <Hash className="w-7 h-7" />, title: '團隊與頻道', desc: '依主題組織頻道，資訊透明共享，成員一目了然' },
    { icon: <Video className="w-7 h-7" />, title: '視訊會議', desc: '支援最多 1,000 人同時參與，螢幕共享、錄製、AI 摘要' },
    { icon: <BrainCircuit className="w-7 h-7" />, title: 'AI 智慧助手', desc: 'Copilot 自動生成會議摘要、翻譯訊息、提升工作效率' },
    { icon: <FolderOpen className="w-7 h-7" />, title: '檔案共同作業', desc: '與 SharePoint、OneDrive 無縫整合，即時共同編輯文件' },
    { icon: <Puzzle className="w-7 h-7" />, title: '第三方整合', desc: '透過 Power Platform、CRM 等第三方應用程式擴展功能' },
  ];

  const benefits = [
    { icon: <BookOpen className="w-7 h-7" />, title: '官方內容改寫', desc: '內容取材自 Microsoft Learn 官方文件，確保資訊準確可靠' },
    { icon: <PlayCircle className="w-7 h-7" />, title: '逐步操作指引', desc: '每個功能都有詳細的步驟說明，圖文並茂易於理解' },
    { icon: <Map className="w-7 h-7" />, title: '情境式學習', desc: '從實際應用情境出發，學完即可實際應用於工作' },
    { icon: <RefreshCw className="w-7 h-7" />, title: '持續更新', desc: '跟隨 Microsoft 官方更新，及時補充新功能和操作方式' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden" style={{ background: CTA_BG }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full" style={{ background: PRIMARY_LIGHT }} />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full" style={{ background: PRIMARY }} />
        </div>
        <div className="container relative z-10 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8" style={{ background: `${PRIMARY_LIGHT}30`, color: '#E8E6F5' }}>
            <svg width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8.5C8 7.67 8.67 7 9.5 7H13C14.38 7 15.5 8.12 15.5 9.5V13C15.5 14.38 14.38 15.5 13 15.5H9.5C8.67 15.5 8 14.83 8 14V8.5Z" fill="white"/>
              <path d="M18 12.5C18 11.67 18.67 11 19.5 11H20.5C22.54 11 24.17 12.63 24.17 14.67C24.17 16.71 22.54 18.33 20.5 18.33H19.5C18.67 18.33 18 17.67 18 16.83V12.5Z" fill="#E8E6F5"/>
              <path d="M7.83 12.5C7.83 11.67 8.5 11 9.33 11H10.33C12.37 11 14 12.63 14 14.67C14 16.71 12.37 18.33 10.33 18.33H9.33C8.5 18.33 7.83 17.67 7.83 16.83V12.5Z" fill="#E8E6F5"/>
              <path d="M8 18.5C8 19.33 8.67 20 9.5 20H13C14.38 20 15.5 18.88 15.5 17.5V16.33C15.5 15.6 14.93 15 14.2 15H13C11.62 15 10.5 13.88 10.5 12.5V11.33C10.5 10.6 9.93 10 9.2 10H9.5C8.67 10 8 10.67 8 11.5V18.5Z" fill="#7B79C4"/>
            </svg>
            Microsoft Teams 官方教學
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.03em' }}>
            從零開始，掌握<br className="hidden md:block" />團隊協作的核心能力
          </h1>

          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            系統化的 Microsoft Teams 教學，從入門到進階，涵蓋訊息、會議、檔案共同作業與應用整合。內容取材自 Microsoft 官方文件，繁體中文呈現。
          </p>

          <div className="flex flex-wrap justify-center gap-5 mb-12 text-sm text-white/50">
            {['免費使用核心功能', 'Microsoft 官方內容', '繁體中文全程說明'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" style={{ color: YELLOW }} />
                {t}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/introduction">
              <HoverScale>
                <Button size="lg" className="px-12 font-semibold text-base" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                  開始學習旅程
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </HoverScale>
            </Link>
            <Link href="/concepts/core">
              <HoverScale>
                <Button size="lg" variant="outline" className="px-12 font-semibold text-base border-white/30 text-white hover:bg-white/10 bg-transparent">
                  瀏覽核心概念
                </Button>
              </HoverScale>
            </Link>
          </div>
        </div>
      </section>

      {/* 學習路徑 Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>學習路徑</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">系統化學習，從入門到精通</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">按照您的學習進度，從入門指南開始，逐步掌握 Teams 的各項核心功能。</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {learningPaths.map((path, idx) => (
              <HoverScale key={idx}>
                <Link href={path.href}>
                  <Card className="bg-card border-border h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="pt-7 pb-7 text-center">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300" style={{ background: `${PRIMARY}15`, color: PRIMARY }}>
                        {path.icon}
                      </div>
                      <h3 className="font-bold text-foreground mb-2 text-base">{path.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{path.desc}</p>
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: PRIMARY }}>
                        <ArrowRight className="w-4 h-4 inline" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </HoverScale>
            ))}
          </div>
        </div>
      </section>

      {/* Teams 核心功能 Section */}
      <section className="py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>核心功能</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Teams 能為您做什麼？</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Microsoft Teams 整合通訊、會議、檔案與應用程式，打造一站式團隊協作平台。</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <HoverScale key={idx}>
                <Card className="bg-card border-border h-full hover:shadow-md transition-all duration-300">
                  <CardContent className="pt-7">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${PRIMARY}12`, color: PRIMARY }}>
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

      {/* 教學特色 Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>為什麼選擇我們</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">為什麼選擇我們的 Teams 教學？</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">我們致力於提供最實用、最準確的 Microsoft Teams 教學內容。</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.1}>
                <Card className="bg-card border-border h-full hover:shadow-sm transition">
                  <CardContent className="pt-7 flex gap-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${PRIMARY}12`, color: PRIMARY }}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ background: CTA_BG }}>
        <div className="container relative z-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: `${PRIMARY_LIGHT}20`, color: '#E8E6F5' }}>
            <Rocket className="w-4 h-4" />
            立即開始
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            準備好開始了嗎？
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            只需 30 分鐘，您就能掌握 Teams 的基礎操作，建立第一個團隊並與同事開始協作。從入門指南出發，按照學習路徑系統性地建立完整技能。
          </p>
          <div className="flex flex-wrap justify-center gap-5 mb-12 text-sm text-white/50">
            {['免費 Teams 應用程式', '無需技術背景', '繁體中文全程說明'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" style={{ color: '#F2C811' }} />
                {t}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/introduction">
              <HoverScale>
                <Button size="lg" className="px-12 font-semibold text-base" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                  立即開始
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </HoverScale>
            </Link>
            <Link href="/support/faq">
              <HoverScale>
                <Button size="lg" variant="outline" className="px-12 font-semibold text-base border-white/30 text-white hover:bg-white/10 bg-transparent">
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
