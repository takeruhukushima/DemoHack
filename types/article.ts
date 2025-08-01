// 投票の種類
export type VoteType = 'agree' | 'disagree' | 'neutral';

// 記事の投票データ
export interface ArticleVotes {
  agree: number;
  disagree: number;
  neutral: number;
  total: number;
}

// ユーザーの投票状態
export interface UserVote {
  articleId: string;
  voteType: VoteType;
  timestamp: Date;
}

// 記事の型定義
export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: Date;
  tags: string[];
  votes: ArticleVotes;
}