import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MessageSquare, Users, Hash, AtSign, Pin, Smile, Reply, Quote, Bell, Shield } from 'lucide-react';
import { MotionContainer, HoverScale } from '@/components/MotionContainer';

const PRIMARY = '#5B5EA6';
const PRIMARY_LIGHT = '#E8E6F5';
const PRIMARY_DARK = '#4B49A1';
const YELLOW = '#F2C811';

export default function ChatChannels() {
  const chatFeatures = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: '私人訊息',
      description: '與同事一對一或小範圍即時溝通，支援文字、表情、檔案傳輸。',
      color: '#5B5EA6',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: '群組聊天',
      description: '建立群組對話，方便專案團隊或跨部門快速協調。',
      color: '#7B79C4',
    },
    {
      icon: <Hash className="w-6 h-6" />,
      title: '頻道訊息',
      description: '在頻道中與團隊成員分享資訊，所有成員都能看到歷史訊息。',
      color: '#4B49A1',
    },
    {
      icon: <AtSign className="w-6 h-6" />,
      title: '@提及',
      description: '使用 @ 提及特定人員或整個頻道，確保重要訊息被注意到。',
      color: '#E8E6F5',
    },
    {
      icon: <Reply className="w-6 h-6" />,
      title: '回覆與引用',
      description: '直接回覆特定訊息，讓對話保持井然有序，討論脈絡一目了然。',
      color: '#5B5EA6',
    },
    {
      icon: <Smile className="w-6 h-6" />,
      title: '表情符號回應',
      description: '使用表情符號快速回應訊息，讓溝通更生動多元。',
      color: '#7B79C4',
    },
  ];

  const channelTypes = [
    {
      title: '公開頻道',
      description: '組織中的任何人都能搜尋並加入，有助於資訊透明共享。',
      badge: '組織可見',
      badgeColor: '#5B5EA6',
      bgColor: '#E8E6F5',
    },
    {
      title: '私人頻道',
      description: '僅限受邀請的成員可見，適合機密專案或敏感討論。',
      badge: '僅成員可見',
      badgeColor: '#4B49A1',
      bgColor: '#E8E6F5',
    },
    {
      title: '共用頻道',
      description: '跨組織合作，與外部合作夥伴共享頻道，減少溝通障礙。',
      badge: '跨組織',
      badgeColor: '#7B79C4',
      bgColor: '#E8E6F5',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2D2B5A, #4B49A1, #5B5EA6)' }}>
        <div className="container relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: `${PRIMARY_LIGHT}30`, color: '#E8E6F5' }}>
            <MessageSquare className="w-4 h-4" />
            核心概念 · 聊天與頻道
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            訊息與頻道：<br />團隊溝通的核心樞紐
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Microsoft Teams 提供多元的溝通方式，從私人訊息到公開頻道，靈活因應不同協作需求。所有對話都有紀錄，讓您隨時回顧重要資訊。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/introduction">
              <Button size="lg" className="px-10 font-semibold" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                開始學習
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/concepts/meetings">
              <Button size="lg" variant="outline" className="px-10 font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent">
                會議管理
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 訊息類型總覽 */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>訊息功能</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">多元訊息，順暢溝通</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Teams 提供完整的訊息功能，支援各種溝通情境，讓您與團隊的協作更加順暢。</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatFeatures.map((feature, idx) => (
              <HoverScale key={idx}>
                <Card className="bg-card border-border h-full hover:shadow-md transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${feature.color}15` }}>
                      <div style={{ color: feature.color }}>{feature.icon}</div>
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </div>
        </div>
      </section>

      {/* 頻道類型 */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>頻道架構</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">頻道類型與權限設計</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto"> Teams 的頻道系統支援不同的存取權限，幫助您在資訊透明與機密保護之間取得平衡。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {channelTypes.map((type, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.1}>
                <Card className="bg-card border-border h-full text-center hover:shadow-md transition">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: type.bgColor }}>
                      <Hash className="w-7 h-7" style={{ color: type.badgeColor }} />
                    </div>
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ background: `${type.badgeColor}15`, color: type.badgeColor }}>
                      {type.badge}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-3">{type.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                  </CardContent>
                </Card>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* 進階功能 */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>進階功能</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">讓訊息更有效率</h2>
          </div>
          <div className="space-y-4">
            {[
              { icon: <Pin className="w-5 h-5" />, title: '釘選重要訊息', desc: '將重要訊息釘選至頻道頂部，方便成員快速找到關鍵資訊。', color: PRIMARY },
              { icon: <Quote className="w-5 h-5" />, title: '訊息翻譯', desc: '自動翻譯不同語言的訊息，跨國團隊溝通無障礙。', color: PRIMARY_DARK },
              { icon: <Bell className="w-5 h-5" />, title: '自訂通知', desc: '設定關鍵字通知，僅收到重要相關訊息，避免資訊過載。', color: '#7B79C4' },
              { icon: <Shield className="w-5 h-5" />, title: '訊息保全', desc: '支援敏感性標籤、資料外洩防護（DLP），確保機密資訊安全。', color: '#4B49A1' },
            ].map((item, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.05}>
                <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-sm transition">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #2D2B5A, #4B49A1)' }}>
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">掌握訊息與頻道的使用技巧</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">了解如何善用 Teams 的訊息功能，提升團隊溝通效率。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/introduction">
              <Button size="lg" className="px-10 font-semibold" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                開始學習
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/scenarios">
              <Button size="lg" variant="outline" className="px-10 font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent">
                查看應用情境
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
