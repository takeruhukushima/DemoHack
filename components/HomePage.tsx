'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import ArticleCard from './ArticleCard';
import { mockArticles } from '../data/mockData';

interface HomePageProps {
  onArticleSelect?: (articleId: string) => void;
}

export default function HomePage({ onArticleSelect }: HomePageProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // すべてのタグを取得
  const allTags = Array.from(new Set(mockArticles.flatMap(article => article.tags)));

  // フィルタリングとソート
  const filteredAndSortedArticles = mockArticles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || article.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'agreement':
          const agreementA = a.votes.total > 0 ? (a.votes.agree / a.votes.total) : 0;
          const agreementB = b.votes.total > 0 ? (b.votes.agree / b.votes.total) : 0;
          return agreementB - agreementA;
        case 'votes':
          return b.votes.total - a.votes.total;
        case 'controversial':
          // 賛成と反対の差が小さく、中立が少ない記事を上位に
          const controversyA = a.votes.total > 0 ? Math.abs(a.votes.agree - a.votes.disagree) / a.votes.total : 0;
          const controversyB = b.votes.total > 0 ? Math.abs(b.votes.agree - b.votes.disagree) / b.votes.total : 0;
          return controversyA - controversyB;
        case 'latest':
        default:
          return b.publishedAt.getTime() - a.publishedAt.getTime();
      }
    });

  // 統計情報の計算
  const totalArticles = mockArticles.length;
  const totalVotes = mockArticles.reduce((sum, article) => sum + article.votes.total, 0);
  const averageAgreement = mockArticles.length > 0 
    ? Math.round(mockArticles.reduce((sum, article) => {
        return sum + (article.votes.total > 0 ? (article.votes.agree / article.votes.total) : 0);
      }, 0) / mockArticles.length * 100)
    : 0;

  return (
    <div className="space-y-8">
      {/* ヒーローセクション */}
      <div className="text-center space-y-4 py-12 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
        <h1 className="text-4xl font-bold">DemoHackへようこそ</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          開発者による、開発者のための民主的な知識共有プラットフォーム
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" onClick={() => router.push('/articles/new')}>記事を投稿する</Button>
          <Button variant="outline" size="lg">コミュニティに参加</Button>
        </div>
      </div>

      {/* プラットフォーム統計 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📊</span>
            <span>コミュニティ統計</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">{totalArticles}</p>
              <p className="text-sm text-muted-foreground">投稿記事数</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">{totalVotes}</p>
              <p className="text-sm text-muted-foreground">総投票数</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">{averageAgreement}%</p>
              <p className="text-sm text-muted-foreground">平均賛成率</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* フィルターとソート */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="記事を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="並び順" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">最新順</SelectItem>
              <SelectItem value="agreement">賛成率順</SelectItem>
              <SelectItem value="votes">投票数順</SelectItem>
              <SelectItem value="controversial">議論が分かれる順</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* タグフィルター */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedTag === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setSelectedTag(null)}
        >
          すべて
        </Badge>
        {allTags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* 記事一覧 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">記事一覧</h2>
          <span className="text-sm text-muted-foreground">
            {filteredAndSortedArticles.length}件の記事
          </span>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {filteredAndSortedArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              onReadMore={onArticleSelect}
            />
          ))}
        </div>

        {filteredAndSortedArticles.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>検索条件に一致する記事が見つかりませんでした。</p>
          </div>
        )}
      </div>

      {/* コミュニティガイド */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>💡</span>
            <span>投票のガイドライン</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">👍</span>
                <span className="font-medium">賛成</span>
              </div>
              <p className="text-muted-foreground">
                記事の内容に同意し、有益だと感じる場合
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">👎</span>
                <span className="font-medium">反対</span>
              </div>
              <p className="text-muted-foreground">
                記事の内容に異議があり、問題があると感じる場合
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🤷</span>
                <span className="font-medium">中立</span>
              </div>
              <p className="text-muted-foreground">
                どちらでもない、または判断しかねる場合
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}