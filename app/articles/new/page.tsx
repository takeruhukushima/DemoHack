'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

// クライアントサイドでのみ読み込む
const NoteEditor = dynamic(
  () => import('@/components/NoteEditor'),
  { ssr: false }
);

export default function NewArticlePage() {
  const router = useRouter();

  const handleSave = async (title: string, content: string, tags: string[]) => {
    try {
      // TODO: APIエンドポイントに投稿する処理を実装
      console.log('Saving article:', { title, content, tags });
      
      // モックのレスポンスを想定
      const newArticleId = 'new-article-id';
      
      // 記事詳細ページにリダイレクト
      router.push(`/articles/${newArticleId}`);
    } catch (error) {
      console.error('Failed to save article:', error);
      alert('記事の保存に失敗しました');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Button>
      </div>
      
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">新しい記事を書く</CardTitle>
        </CardHeader>
        <CardContent>
          <NoteEditor 
            onSave={handleSave}
            onCancel={() => router.push('/')}
          />
        </CardContent>
      </Card>
    </div>
  );
}
