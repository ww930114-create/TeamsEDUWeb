import { Link } from 'wouter';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border pt-16 pb-8 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          
          {/* 左側：品牌與說明 */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span>CviLux Teams 教學</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              專為瀚荃 (CviLux) 員工打造的內部學習平台，從零開始，系統化掌握現代化辦公的核心功能與應用場景。
            </p>
          </div>

          {/* 第二欄：學習資源 (已合併入門指南與核心概念) */}
          <div>
            <h4 className="font-bold text-foreground mb-4">學習資源</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/practicalguide" className="hover:text-primary transition-colors">操作教學</Link>
              </li>
              <li>
                <Link href="/concepts/chat-channels" className="hover:text-primary transition-colors">聊天與頻道</Link>
              </li>
              <li>
                <Link href="/concepts/meetings" className="hover:text-primary transition-colors">會議管理</Link>
              </li>
            </ul>
          </div>

          {/* 第三欄：支援服務 */}
          <div>
            <h4 className="font-bold text-foreground mb-4">支援服務</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/support/faq" className="hover:text-primary transition-colors">常見問題</Link>
              </li>
              <li>
                <Link href="/scenarios" className="hover:text-primary transition-colors">實戰應用情境</Link>
              </li>
            </ul>
          </div>

          {/* 第四欄：官方連結 */}
          <div>
            <h4 className="font-bold text-foreground mb-4">官方連結</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="https://www.microsoft.com/zh-tw/microsoft-teams/group-chat-software" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                  Teams 官方網站 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.microsoft.com/zh-tw/microsoft-teams/download-app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                  下載 Teams <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/zh-tw/teams" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                  Teams 說明中心 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版權宣告 (加上你們公司名稱) */}
        <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>© 2026 CviLux (瀚荃). Microsoft、Teams 及相關標誌為 Microsoft Corporation 的註冊商標。</p>
        </div>
      </div>
    </footer>
  );
}
