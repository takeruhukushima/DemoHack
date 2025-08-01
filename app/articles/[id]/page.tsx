'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const ArticleDetailPage = dynamic(
  () => import('@/components/ArticleDetailPage'),
  { ssr: false }
);

export default function ArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto py-8">
      <button 
        onClick={handleBack}
        className="mb-6 text-sm text-muted-foreground hover:text-foreground flex items-center"
      >
        ← 記事一覧に戻る
      </button>
      <ArticleDetailPage 
        articleId={params.id} 
        onBack={handleBack} 
      />
    </div>
  );
}
