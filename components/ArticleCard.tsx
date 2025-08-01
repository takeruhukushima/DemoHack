import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Article } from '../types/article';

interface ArticleCardProps {
  article: Article;
  onReadMore?: (articleId: string) => void;
}

export default function ArticleCard({ article, onReadMore }: ArticleCardProps) {
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

  const getVoteIcon = (voteType: 'agree' | 'disagree' | 'neutral') => {
    switch (voteType) {
      case 'agree':
        return '👍';
      case 'disagree':
        return '👎';
      case 'neutral':
        return '🤷';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between space-x-4">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold line-clamp-2 hover:text-primary">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {article.summary}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="flex items-center space-x-1">
              <span>👍</span>
              <span>{getAgreementPercentage()}%</span>
            </span>
            <span className="text-muted-foreground">({article.votes.total}票)</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 著者情報 */}
        <div className="flex items-center space-x-3">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">{article.author.name}</p>
            <p className="text-xs text-muted-foreground">{formatDate(article.publishedAt)}</p>
          </div>
        </div>

        {/* タグ */}
        <div className="flex flex-wrap gap-2">
          {article.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* 投票サマリー */}
        <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span>{getVoteIcon('agree')}</span>
              <span>{article.votes.agree}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>{getVoteIcon('disagree')}</span>
              <span>{article.votes.disagree}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>{getVoteIcon('neutral')}</span>
              <span>{article.votes.neutral}</span>
            </div>
          </div>
          <span className="text-muted-foreground">
            総投票: {article.votes.total}
          </span>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-between items-center pt-2">
          <Button
            variant="outline"
            onClick={() => onReadMore && onReadMore(article.id)}
            className="flex-1 mr-2"
          >
            記事を読む
          </Button>
          <Button variant="ghost" size="sm">
            💬 議論
          </Button>
          <Button variant="ghost" size="sm">
            📤 共有
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}