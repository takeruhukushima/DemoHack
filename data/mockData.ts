import { Article } from '../types/article';

// モック記事データ
export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'React 19の新機能を徹底解説',
    summary: 'React 19で追加された新機能について、実際のコード例とともに詳しく解説します。',
    content: `
# React 19の新機能を徹底解説

React 19では多くの新機能が追加されました。この記事では、特に注目すべき機能について詳しく解説します。

## 1. React Compiler

React Compilerは、React 19で新しく導入された機能です。これにより、開発者が手動で最適化を行う必要がなくなり、パフォーマンスの向上が期待できます。

### 自動最適化の仕組み

React Compilerは、コンポーネントの依存関係を自動的に分析し、不要な再レンダリングを防ぎます。これまでuseCallbackやuseMemoを使って手動で行っていた最適化が自動化されます。

## 2. Server Components

Server Componentsの改善により、サーバーサイドでのレンダリングがより効率的になりました。

### 新しいレンダリング戦略

サーバーコンポーネントとクライアントコンポーネントの境界がより明確になり、適切な使い分けができるようになりました。

## 3. Actions

新しいActionsの仕組みにより、フォームの送信やデータの更新がより簡潔に書けるようになりました。

### 使用例

\`\`\`jsx
function SubmitButton() {
  async function submit(formData) {
    'use server'
    // サーバーサイドでの処理
  }
  
  return <form action={submit}>...</form>
}
\`\`\`

この新機能により、開発効率が大幅に向上することが期待されます。
    `,
    author: {
      name: '田中太郎',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: new Date('2024-01-15'),
    tags: ['React', 'JavaScript', 'Frontend'],
    votes: {
      agree: 45,
      disagree: 8,
      neutral: 12,
      total: 65
    }
  },
  {
    id: '2',
    title: 'TypeScript 5.0の型システム完全ガイド',
    summary: 'TypeScript 5.0で強化された型システムの新機能を実例とともに紹介します。',
    content: `
# TypeScript 5.0の型システム完全ガイド

TypeScript 5.0では型システムが大幅に強化されました。この記事では、実践的な使用例と共に新機能を解説します。

## 新しい型演算子

### const assertion

const assertionを使用することで、より厳密な型推論が可能になりました。

\`\`\`typescript
const themes = ['light', 'dark'] as const;
type Theme = typeof themes[number]; // 'light' | 'dark'
\`\`\`

### satisfies operator

satisfies演算子により、型安全性を保ちながら推論を活用できます。

\`\`\`typescript
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
} satisfies Config;
\`\`\`

## パフォーマンスの改善

TypeScript 5.0では、コンパイル時間が大幅に短縮されました。特に大規模なプロジェクトでその効果を実感できます。

## まとめ

これらの新機能により、TypeScriptでの開発がより効率的で安全になりました。積極的に活用していきましょう。
    `,
    author: {
      name: '佐藤花子',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: new Date('2024-01-10'),
    tags: ['TypeScript', 'JavaScript', '型システム'],
    votes: {
      agree: 32,
      disagree: 5,
      neutral: 7,
      total: 44
    }
  },
  {
    id: '3',
    title: 'Next.js App Routerのベストプラクティス',
    summary: 'Next.js 13のApp Routerを使った開発におけるベストプラクティスをまとめました。',
    content: `
# Next.js App Routerのベストプラクティス

Next.js 13で導入されたApp Routerについて、実際のプロジェクトで得られた知見をもとにベストプラクティスをまとめました。

## ディレクトリ構造

推奨されるディレクトリ構造について説明します。

\`\`\`
app/
├── (auth)/
│   ├── login/
│   └── register/
├── dashboard/
│   ├── page.tsx
│   └── settings/
└── page.tsx
\`\`\`

## Server Components vs Client Components

適切な使い分けについて解説します。

### Server Components

- データベースへの直接アクセス
- 機密情報の処理
- SEOが重要なコンテンツ

### Client Components

- インタラクティブな機能
- ブラウザAPI の使用
- イベントハンドラーが必要な場合

## データフェッチング

App Routerでは、Server Componentsでのデータフェッチングが推奨されます。

\`\`\`tsx
async function PostList() {
  const posts = await fetch('/api/posts');
  return (
    <div>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
\`\`\`

これらのパターンを活用することで、パフォーマンスと開発効率を両立できます。
    `,
    author: {
      name: '山田次郎',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: new Date('2024-01-08'),
    tags: ['Next.js', 'React', 'SSR'],
    votes: {
      agree: 58,
      disagree: 12,
      neutral: 15,
      total: 85
    }
  },
  {
    id: '4',
    title: 'パフォーマンス最適化の落とし穴',
    summary: 'Webアプリケーションのパフォーマンス最適化でよくある間違いと、その対処法について解説します。',
    content: `
# パフォーマンス最適化の落とし穴

パフォーマンス最適化は重要ですが、間違ったアプローチは逆効果になることがあります。

## よくある間違い

### 1. 過度なメモ化

useMemoやuseCallbackを何でもかんでも使うのは間違いです。

\`\`\`jsx
// 悪い例
const expensiveValue = useMemo(() => props.value * 2, [props.value]);
\`\`\`

### 2. 不適切なコンポーネント分割

パフォーマンスのためだけに過度にコンポーネントを分割するのは保守性を損ないます。

## 正しいアプローチ

まずは測定から始めましょう。実際にボトルネックとなっている部分を特定してから最適化を行います。

### プロファイリングツールの活用

React DevToolsのProfilerを使って、実際のパフォーマンス問題を特定します。

## まとめ

パフォーマンス最適化は科学的にアプローチしましょう。推測ではなく、測定に基づいた最適化が重要です。
    `,
    author: {
      name: '鈴木一郎',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: new Date('2024-01-05'),
    tags: ['パフォーマンス', 'React', '最適化'],
    votes: {
      agree: 28,
      disagree: 18,
      neutral: 9,
      total: 55
    }
  },
  {
    id: '5',
    title: '関数型プログラミングの実践的活用法',
    summary: 'JavaScriptにおける関数型プログラミングの考え方と、実際のプロジェクトでの活用法を紹介します。',
    content: `
# 関数型プログラミングの実践的活用法

関数型プログラミングの概念をJavaScriptで実践的に活用する方法について解説します。

## 基本的な考え方

### 純粋関数

同じ入力に対して常に同じ出力を返し、副作用を持たない関数です。

\`\`\`javascript
// 純粋関数
const add = (a, b) => a + b;

// 不純関数
let counter = 0;
const increment = () => ++counter;
\`\`\`

### 不変性

データを変更せず、新しいデータを作成する考え方です。

\`\`\`javascript
// 悪い例
const updateUser = (user, name) => {
  user.name = name;
  return user;
};

// 良い例
const updateUser = (user, name) => ({
  ...user,
  name
});
\`\`\`

## 実践的な活用

### 配列操作

map、filter、reduceを組み合わせて処理パイプラインを作成します。

\`\`\`javascript
const processUsers = (users) =>
  users
    .filter(user => user.active)
    .map(user => ({ ...user, displayName: user.firstName + ' ' + user.lastName }))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
\`\`\`

## メリットとデメリット

### メリット
- 予測可能な動作
- テストしやすい
- 並行処理に強い

### デメリット
- 学習コストが高い
- パフォーマンスオーバーヘッド
- 既存コードとの統合が困難

適切に活用することで、より保守しやすいコードが書けるようになります。
    `,
    author: {
      name: '高橋美咲',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: new Date('2024-01-03'),
    tags: ['JavaScript', '関数型', 'プログラミング'],
    votes: {
      agree: 22,
      disagree: 25,
      neutral: 18,
      total: 65
    }
  }
];