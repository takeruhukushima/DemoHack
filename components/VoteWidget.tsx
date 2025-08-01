'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Article, VoteType } from '../types/article';

interface VoteWidgetProps {
  article: Article;
  onVote?: (voteType: VoteType) => void;
}

export default function VoteWidget({ article, onVote }: VoteWidgetProps) {
  const [userVote, setUserVote] = useState<VoteType | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (voteType: VoteType) => {
    if (userVote === voteType) {
      // 同じ投票を再度クリックした場合は投票を取り消し
      setUserVote(null);
      if (onVote) {
        onVote(voteType);
      }
      return;
    }

    setIsVoting(true);
    setUserVote(voteType);
    
    // 実際のAPIコールの代わりにタイムアウトでシミュレート
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (onVote) {
      onVote(voteType);
    }
    
    setIsVoting(false);
  };

  const getVotePercentage = (voteCount: number) => {
    if (article.votes.total === 0) return 0;
    return Math.round((voteCount / article.votes.total) * 100);
  };

  const getVoteButtonVariant = (voteType: VoteType) => {
    if (userVote === voteType) {
      return voteType === 'agree' ? 'default' : 
             voteType === 'disagree' ? 'destructive' : 'secondary';
    }
    return 'outline';
  };

  const getVoteIcon = (voteType: VoteType) => {
    switch (voteType) {
      case 'agree':
        return '👍';
      case 'disagree':
        return '👎';
      case 'neutral':
        return '🤷';
    }
  };

  const getVoteLabel = (voteType: VoteType) => {
    switch (voteType) {
      case 'agree':
        return '賛成';
      case 'disagree':
        return '反対';
      case 'neutral':
        return '中立';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>🗳️</span>
          <span>この記事について投票する</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 投票結果の表示 */}
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{article.votes.total}</p>
            <p className="text-sm text-muted-foreground">総投票数</p>
          </div>

          <div className="space-y-3">
            {(['agree', 'disagree', 'neutral'] as VoteType[]).map(voteType => {
              const count = article.votes[voteType];
              const percentage = getVotePercentage(count);
              
              return (
                <div key={voteType} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <span>{getVoteIcon(voteType)}</span>
                      <span className="font-medium">{getVoteLabel(voteType)}</span>
                    </span>
                    <Badge variant="secondary">
                      {count}票 ({percentage}%)
                    </Badge>
                  </div>
                  
                  {/* プログレスバー */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        voteType === 'agree' ? 'bg-green-500' :
                        voteType === 'disagree' ? 'bg-red-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 投票ボタン */}
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground text-center">
            あなたの意見を投票してください（1票のみ）
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {(['agree', 'disagree', 'neutral'] as VoteType[]).map(voteType => (
              <Button
                key={voteType}
                variant={getVoteButtonVariant(voteType)}
                onClick={() => handleVote(voteType)}
                disabled={isVoting}
                className="justify-start space-x-2 h-12"
              >
                <span className="text-lg">{getVoteIcon(voteType)}</span>
                <span>{getVoteLabel(voteType)}</span>
                {userVote === voteType && (
                  <Badge variant="secondary" className="ml-auto">
                    投票済み
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          
          {userVote && (
            <div className="text-sm text-center text-muted-foreground">
              投票を変更するには別のボタンをクリックしてください
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}