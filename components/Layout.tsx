"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/contexts/AuthContext';
import Auth from './Auth';

interface LayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80">
                  DemoHack
                </Link>
                <nav className="hidden md:flex space-x-1">
                  <Button
                    asChild
                    variant={pathname === '/' ? 'secondary' : 'ghost'}
                  >
                    <Link href="/">
                      記事一覧
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant={pathname === '/articles/popular' ? 'secondary' : 'ghost'}
                  >
                    <Link href="/articles/popular">
                      人気記事
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant={pathname === '/articles/new' ? 'secondary' : 'ghost'}
                  >
                    <Link href="/articles/new" className="flex items-center gap-1">
                      <span className="text-primary">✏️</span>
                      <span>投稿する</span>
                    </Link>
                  </Button>
                </nav>
              </div>
              <div className="flex items-center">
                <Auth />
              </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* フッター */}
      <footer className="border-t border-border bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">DevAgora</h3>
              <p className="text-muted-foreground text-sm">
                開発者による、開発者のための
                <br />
                民主的な知識共有プラットフォーム
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                コミュニティ
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    記事を投稿
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    人気記事
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    議論に参加
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">サポート</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    ヘルプ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    ガイドライン
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">法的情報</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    利用規約
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    プライバシーポリシー
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 DemoHack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <MainLayout>{children}</MainLayout>
    </AuthProvider>
  );
}