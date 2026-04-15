import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Video, Calendar, Mic, Monitor, Users, Record, MicOff, Phone, MessageSquare, Hand, Layout, Clock } from 'lucide-react';
import { MotionContainer, HoverScale } from '@/components/MotionContainer';

const PRIMARY = '#5B5EA6';
const PRIMARY_LIGHT = '#E8E6F5';
const PRIMARY_DARK = '#4B49A1';

export default function Meetings() {
  const meetingTypes = [
    {
      icon: <Video className="w-6 h-6" />,
      title: '即時會議',
      description: '立即開始或排程會議，與同事或外部人員即時面對面溝通。支援最多 1,000 人參與。',
      color: PRIMARY,
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: '排程會議',
      description: '透過 Outlook 行事曆或 Teams 行事曆預排會議，自動發送邀請和提醒。',
      color: PRIMARY_DARK,
    },
    {
      icon: <Record className="w-6 h-6" />,
      title: '雲端錄製',
      description: '自動錄製會議並儲存至 Microsoft Stream，方便無法參與的成員事後觀看。',
      color: '#7B79C4',
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: '共用螢幕',
      description: '分享整個螢幕、特定視窗或檔案，讓所有參與者同步看到您的內容。',
      color: PRIMARY,
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: '音訊控制',
      description: '麥克風和喇叭設定、背景噪音抑制，讓會議聲音更加清晰。',
      color: PRIMARY_DARK,
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: '小組會議室',
      description: '將與會者分成小組討論，模擬實體會議的分組座談形式。',
      color: '#7B79C4',
    },
  ];

  const meetingSteps = [
    {
      num: '01',
      icon: <Calendar className="w-6 h-6" />,
      title: '排程會議',
      desc: '在 Teams 行事曆中點擊「新增會議」，填寫標題、時間、受邀對象。',
    },
    {
      num: '02',
      icon: <Users className="w-6 h-6" />,
      title: '邀請參與者',
      desc: '輸入成員名稱或 Email，設定是否允許匿名參與、是否需要簡報者模式。',
    },
    {
      num: '03',
      icon: <Video className="w-6 h-6" />,
      title: '加入會議',
      desc: '在會議時間點擊「加入」，Teams 會自動測試您的音訊和視訊設定。',
    },
    {
      num: '04',
      icon: <Monitor className="w-6 h-6" />,
      title: '分享與錄製',
      desc: '使用工具列分享螢幕或檔案，並可隨時開始錄製會議歷程。',
    },
  ];

  const meetingTips = [
    { icon: <MicOff className="w-5 h-5" />, tip: '不使用麥克風時將其靜音，避免背景噪音干擾' },
    { icon: <Layout className="w-5 h-5" />, tip: '使用「並排模式」同時觀看參與者和簡報內容' },
    { icon: <MessageSquare className="w-5 h-5" />, tip: '在會議中使用聊天功能提問，不打斷主講者' },
    { icon: <Hand className="w-5 h-5" />, tip: '使用虛擬舉手功能發言請求，讓主持人知道您想說話' },
    { icon: <Phone className="w-5 h-5" />, tip: '無法使用電腦時，可透過電話撥入參與會議' },
    { icon: <Clock className="w-5 h-5" />, tip: '會議後查看 AI 自動生成的會議摘要和行動項目' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2D2B5A, #4B49A1, #5B5EA6)' }}>
        <div className="container relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: `${PRIMARY_LIGHT}30`, color: '#E8E6F5' }}>
            <Video className="w-4 h-4" />
            核心概念 · 會議管理
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            視訊會議：<br />讓每次會議都有價值
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Microsoft Teams 提供完整的會議解決方案，從排程、錄製到 AI 智慧摘要，全面提升會議效率。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/introduction">
              <Button size="lg" className="px-10 font-semibold" style={{ background: '#F2C811', color: '#1a1a1a', border: 'none' }}>
                開始學習
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/concepts/chat-channels">
              <Button size="lg" variant="outline" className="px-10 font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent">
                聊天與頻道
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 會議類型總覽 */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>會議功能</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">完整的會議體驗</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">從即時會議到錄製存檔，Teams 會議功能涵蓋您所有的視訊協作需求。</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetingTypes.map((type, idx) => (
              <HoverScale key={idx}>
                <Card className="bg-card border-border h-full hover:shadow-md transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${type.color}15` }}>
                      <div style={{ color: type.color }}>{type.icon}</div>
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{type.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </div>
        </div>
      </section>

      {/* 召開會議步驟 */}
      <section className="py-20 bg-muted/50">
        <div className="container max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>操作指南</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">召開一場 Teams 會議</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">四個步驟，輕鬆舉辦一場專業的視訊會議。</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {meetingSteps.map((step, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.1}>
                <Card className="bg-card border-border h-full text-center hover:shadow-md transition">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center font-bold text-xl text-white" style={{ background: PRIMARY }}>
                      {step.num}
                    </div>
                    <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${PRIMARY}15`, color: PRIMARY }}>
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

      {/* 會議技巧 */}
      <section className="py-20 bg-background">
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: PRIMARY }}>最佳實踐</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">會議參與技巧</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {meetingTips.map((tip, idx) => (
              <MotionContainer key={idx} direction="up" delay={idx * 0.05}>
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl hover:shadow-sm transition">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${PRIMARY}15`, color: PRIMARY }}>
                    {tip.icon}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed pt-1">{tip.tip}</p>
                </div>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Teams 進階版功能 */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, #2D2B5A, #4B49A1)` }}>
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Teams 進階版的智慧會議功能</h2>
            <p className="text-white/60">使用 Microsoft 365 進階版或 Teams 進階版，獲得更多 AI 驅動的會議功能。</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'AI 會議摘要', desc: '自動產生會議摘要與行動項目' },
              { title: '即時翻譯', desc: '支援 40+ 語言即時翻譯' },
              { title: '情緒分析', desc: '會議後自動分析參與度' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-sm text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/50">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">準備好主持您的第一場會議了嗎？</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">跟著我們的步驟，從排程到錄製，全面掌握 Teams 會議功能。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/introduction">
              <Button size="lg" className="px-10 font-semibold" style={{ background: PRIMARY, color: '#fff', border: 'none' }}>
                開始學習
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/support/faq">
              <Button size="lg" variant="outline" className="px-10 font-semibold">
                查看常見問題
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
