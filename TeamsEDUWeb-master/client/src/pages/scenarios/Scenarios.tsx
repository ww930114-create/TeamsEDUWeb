import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Briefcase, BookUser, Code2, ShoppingCart, Building2, Heart, BarChart3, Users, Video, MessageSquare } from 'lucide-react';
import { MotionContainer, HoverScale } from '@/components/MotionContainer';

const PRIMARY = '#5B5EA6';
const PRIMARY_LIGHT = '#E8E6F5';
const PRIMARY_DARK = '#4B49A1';

export default function Scenarios() {
  const scenarios = [
    {
      num: '01',
      icon: <Briefcase className="w-8 h-8" />,
      title: '商務與企業',
      subtitle: 'Business & Enterprise',
      description: '遠距辦公、跨部門協作、客戶會議、專案管理，全面提升企業營運效率。',
      features: ['遠距會議與螢幕共享', '跨部門頻道溝通', '檔案共同編輯', 'CRM 整合'],
      color: PRIMARY,
    },
    {
      num: '02',
      icon: <BookUser className="w-8 h-8" />,
      title: '教育培訓',
      subtitle: 'Education & Training',
      description: '線上授課、班級管理、作業繳交、師生互動，打造互動式學習環境。',
      features: ['即時線上課程', '分組討論室', '作業與測驗', '家長溝通頻道'],
      color: '#7B79C4',
    },
    {
      num: '03',
      icon: <Code2 className="w-8 h-8" />,
      title: '軟體開發',
      subtitle: 'Software Development',
      description: '敏捷開發管理、程式碼審查、DevOps 整合，讓開發團隊協作更順暢。',
      features: ['Sprint  Planning 會議', 'GitHub 整合', 'CI/CD 通知', '技術文件共享'],
      color: PRIMARY_DARK,
    },
    {
      num: '04',
      icon: <ShoppingCart className="w-8 h-8" />,
      title: '零售服務',
      subtitle: 'Retail & Service',
      description: '門市協調、客戶服務、促銷活動通知，提升前線員工的溝通效率。',
      features: ['門市即時通訊', '政策更新通知', '培訓課程', '客戶問題追蹤'],
      color: '#4B49A1',
    },
    {
      num: '05',
      icon: <Building2 className="w-8 h-8" />,
      title: '醫療保健',
      subtitle: 'Healthcare',
      description: '跨科別溝通、病患協調、遠距諮詢，符合醫療產業合規需求。',
      features: ['病患資料保護', '跨團隊會診', '預約提醒', '遠距醫療會議'],
      color: '#5B5EA6',
    },
    {
      num: '06',
      icon: <Heart className="w-8 h-8" />,
      title: '非營利組織',
      subtitle: 'Non-Profit',
      description: '志工管理、捐款者溝通、活動協調，以有限資源發揮最大影響力。',
      features: ['志工培訓', '捐款者關係管理', '活動策劃', '跨組織合作'],
      color: '#7B79C4',
    },
  ];

  const tools = [
    { icon: <Users className="w-5 h-5" />, name: 'Microsoft 365', desc: '與 Word、Excel、Outlook 無縫整合' },
    { icon: <Video className="w-5 h-5" />, name: 'Microsoft Stream', desc: '會議錄製與影片管理' },
    { icon: <MessageSquare className="w-5 h-5" />, name: 'Power Automate', desc: '自動化工作流程' },
    { icon: <BarChart3 className="w-5 h-5" />, name: 'Power BI', desc: '整合資料視覺化儀表板' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2D2B5A, #4B49A1, #5B5EA6)' }}>
        <div className="container relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: `${PRIMARY_LIGHT}30`, color: '#E8E6F5' }}>
            <Briefcase className="w-4 h-4" />
            應用情境
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Teams 在各行各業的應用
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Microsoft Teams 不只是聊天工具，它能因應不同產業和情境的需求，從企業溝通到教育培訓，從醫療協作到前線服務，全面提升團隊效率。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/introduction">
              <Button size="lg" className="px-10 font-semibold" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                從入門開始
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/concepts/core">
              <Button size="lg" variant="outline" className="px-10 font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent">
                核心概念
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 情境總覽 */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>產業應用</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">為不同產業打造的協作解決方案</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">無論您身處哪個產業，Teams 都有適合您的應用方式。以下是六個最常見的應用情境。</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scenarios.map((scenario, idx) => (
              <HoverScale key={idx}>
                <Card className="bg-card border-border h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  <CardContent className="pt-8 pb-8">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10" style={{ background: scenario.color }} />
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${scenario.color}15`, color: scenario.color }}>
                        {scenario.icon}
                      </div>
                      <div>
                        <div className="text-xs font-medium mb-1" style={{ color: scenario.color }}>{scenario.subtitle}</div>
                        <h3 className="text-xl font-bold text-foreground">{scenario.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{scenario.description}</p>
                    <div className="space-y-2">
                      {scenario.features.map((feature, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: scenario.color }} />
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

      {/* 整合工具 */}
      <section className="py-20 bg-muted/50">
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>生態系整合</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">與 Microsoft 365 無縫整合</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Teams 並非獨立運作，它與整個 Microsoft 365 生態系緊密結合，為您打造完整的協作平台。</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {tools.map((tool, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.05}>
                <div className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-sm transition">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${PRIMARY}15`, color: PRIMARY }}>
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

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #2D2B5A, #4B49A1)' }}>
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">找到最適合您的 Teams 應用方式</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">探索不同產業的成功案例，找到可以立即應用在您組織的做法。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/concepts/core">
              <Button size="lg" className="px-10 font-semibold" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                學習核心概念
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/support/faq">
              <Button size="lg" variant="outline" className="px-10 font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent">
                查看常見問題
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
