'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import VoteWidget from './VoteWidget';
import { mockArticles } from '../data/mockData';
import { VoteType } from '../types/article';

interface ArticleDetailPageProps {
  articleId: string;
  onBack?: () => void;
}

export default function ArticleDetailPage({ articleId, onBack }: ArticleDetailPageProps) {
  const article = mockArticles.find(a => a.id === articleId);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">記事が見つかりませんでした。</p>
        <Button onClick={onBack} className="mt-4">
          記事一覧に戻る
        </Button>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getAgreementPercentage = () => {
    if (article.votes.total === 0) return 0;
    return Math.round((article.votes.agree / article.votes.total) * 100);
  };

  const getDisagreementPercentage = () => {
    if (article.votes.total === 0) return 0;
    return Math.round((article.votes.disagree / article.votes.total) * 100);
  };

  const getNeutralPercentage = () => {
    if (article.votes.total === 0) return 0;
    return Math.round((article.votes.neutral / article.votes.total) * 100);
  };

  const handleVote = (voteType: VoteType) => {
    console.log(`User voted ${voteType} for article ${article.id}`);
    // ここで実際のAPI呼び出しを行う
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ナビゲーション */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Button variant="ghost" onClick={onBack} className="p-0 h-auto">
          ← 記事一覧に戻る
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* メインコンテンツ */}
        <div className="lg:col-span-2 space-y-6">
          {/* 記事ヘッダー */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{article.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(article.publishedAt)}に投稿
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'text-red-500' : ''}
                >
                  {isLiked ? '❤️' : '🤍'} いいね
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? 'text-yellow-500' : ''}
                >
                  {isBookmarked ? '⭐' : '☆'} ブックマーク
                </Button>
                <Button variant="ghost" size="sm">
                  📤 共有
                </Button>
              </div>
            </div>

            {/* タグ */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* 投票サマリー */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <span>👍</span>
                  <span className="font-semibold text-green-600">{getAgreementPercentage()}%</span>
                </div>
                <p className="text-sm text-muted-foreground">{article.votes.agree} 賛成</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <span>👎</span>
                  <span className="font-semibold text-red-600">{getDisagreementPercentage()}%</span>
                </div>
                <p className="text-sm text-muted-foreground">{article.votes.disagree} 反対</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <span>🤷</span>
                  <span className="font-semibold text-gray-600">{getNeutralPercentage()}%</span>
                </div>
                <p className="text-sm text-muted-foreground">{article.votes.neutral} 中立</p>
              </div>
            </div>
          </div>

          {/* 記事コンテンツ */}
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none">
                {article.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{paragraph.substring(2)}</h1>;
                  } else if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-semibold mt-5 mb-3">{paragraph.substring(3)}</h2>;
                  } else if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-medium mt-4 mb-2">{paragraph.substring(4)}</h3>;
                  } else if (paragraph.startsWith('```')) {
                    return <pre key={index} className="bg-muted p-4 rounded-lg my-4 overflow-x-auto"><code>{paragraph.replace(/```\w*/, '').replace(/```/, '')}</code></pre>;
                  } else if (paragraph.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index} className="mb-3 leading-relaxed">{paragraph}</p>;
                  }
                })}
              </div>
            </CardContent>
          </Card>

          {/* コメントセクション（プレースホルダー） */}
          <Card>
            <CardHeader>
              <CardTitle>💬 議論・コメント</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>コメント機能は今後実装予定です。</p>
                <p className="text-sm mt-2">
                  現在は投票機能で記事への意見を表明できます。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* サイドバー */}
        <div className="space-y-6">
          {/* 投票ウィジェット */}
          <VoteWidget article={article} onVote={handleVote} />

          {/* 関連記事 */}
          <Card>
            <CardHeader>
              <CardTitle>📚 関連記事</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockArticles
                  .filter(a => a.id !== articleId)
                  .filter(a => a.tags.some(tag => article.tags.includes(tag)))
                  .slice(0, 3)
                  .map(relatedArticle => (
                    <div key={relatedArticle.id} className="space-y-1">
                      <h4 className="font-medium text-sm line-clamp-2 hover:text-primary cursor-pointer">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {relatedArticle.author.name} • {formatDate(relatedArticle.publishedAt)}
                      </p>
                      <div className="flex items-center space-x-2 text-xs">
                        <span>👍 {Math.round((relatedArticle.votes.agree / relatedArticle.votes.total) * 100)}%</span>
                        <span className="text-muted-foreground">({relatedArticle.votes.total}票)</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* 記事統計 */}
          <Card>
            <CardHeader>
              <CardTitle>📊 記事統計</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>ビュー数</span>
                  <span>1,234</span>
                </div>
                <div className="flex justify-between">
                  <span>ブックマーク</span>
                  <span>89</span>
                </div>
                <div className="flex justify-between">
                  <span>共有回数</span>
                  <span>23</span>
                </div>
                <div className="flex justify-between">
                  <span>総投票数</span>
                  <span>{article.votes.total}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>議論の活発度</span>
                    <Badge variant="secondary">
                      {article.votes.total > 50 ? '高' : article.votes.total > 20 ? '中' : '低'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>意見の分布</span>
                    <Badge variant="secondary">
                      {Math.abs(getAgreementPercentage() - getDisagreementPercentage()) < 20 ? '分散' : '偏重'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}