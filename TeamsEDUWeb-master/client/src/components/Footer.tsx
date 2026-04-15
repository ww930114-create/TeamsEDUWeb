import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-foreground/[0.03] dark:bg-foreground/[0.05] border-t border-border py-12 transition-colors duration-300">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#5B5EA6' }}>
              <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8.5C8 7.67 8.67 7 9.5 7H13C14.38 7 15.5 8.12 15.5 9.5V13C15.5 14.38 14.38 15.5 13 15.5H9.5C8.67 15.5 8 14.83 8 14V8.5Z" fill="white"/>
                <path d="M18 12.5C18 11.67 18.67 11 19.5 11H20.5C22.54 11 24.17 12.63 24.17 14.67C24.17 16.71 22.54 18.33 20.5 18.33H19.5C18.67 18.33 18 17.67 18 16.83V12.5Z" fill="#E8E6F5"/>
                <path d="M7.83 12.5C7.83 11.67 8.5 11 9.33 11H10.33C12.37 11 14 12.63 14 14.67C14 16.71 12.37 18.33 10.33 18.33H9.33C8.5 18.33 7.83 17.67 7.83 16.83V12.5Z" fill="#E8E6F5"/>
                <path d="M8 18.5C8 19.33 8.67 20 9.5 20H13C14.38 20 15.5 18.88 15.5 17.5V16.33C15.5 15.6 14.93 15 14.2 15H13C11.62 15 10.5 13.88 10.5 12.5V11.33C10.5 10.6 9.93 10 9.2 10H9.5C8.67 10 8 10.67 8 11.5V18.5Z" fill="#7B79C4"/>
              </svg>
            </div>
            <span className="text-foreground">Microsoft Teams 教學</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            從零開始，系統化學習 Microsoft Teams 的核心功能與應用場景，協助個人與團隊提升協作效率。
          </p>
        </div>

        {/* Learning */}
        <div>
          <h4 className="font-semibold mb-4 text-foreground">學習資源</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/introduction" className="hover:text-primary transition">
                入門指南
              </Link>
            </li>
            <li>
              <Link href="/concepts/core" className="hover:text-primary transition">
                核心概念
              </Link>
            </li>
            <li>
              <Link href="/concepts/chat-channels" className="hover:text-primary transition">
                聊天與頻道
              </Link>
            </li>
            <li>
              <Link href="/concepts/meetings" className="hover:text-primary transition">
                會議管理
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4 text-foreground">支援服務</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/support/faq" className="hover:text-primary transition">
                常見問題
              </Link>
            </li>
            <li>
              <Link href="/scenarios" className="hover:text-primary transition">
                應用情境
              </Link>
            </li>
            <li>
              <a href="https://learn.microsoft.com/zh-tw/microsoftteams/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
                Microsoft Learn
              </a>
            </li>
          </ul>
        </div>

        {/* Official Links */}
        <div>
          <h4 className="font-semibold mb-4 text-foreground">官方連結</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="https://www.microsoft.com/zh-tw/microsoft-teams" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
                Teams 官方網站
              </a>
            </li>
            <li>
              <a href="https://teams.microsoft.com/downloads" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
                下載 Teams
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/zh-tw/office/microsoft-teams-將您的工具集中在同一處-c6d9b4f5-8d06-4b79-bd91-9f8e4e7b207b" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
                Teams 說明中心
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Microsoft Teams 教學中心. Microsoft、Teams 及相關標誌為 Microsoft Corporation 的註冊商標。</p>
      </div>
    </footer>
  );
}
