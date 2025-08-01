'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@/components/HomePage'), { ssr: false });

export default function ClientHome() {
  const router = useRouter();

  const handleArticleSelect = (articleId: string) => {
    router.push(`/articles/${articleId}`);
  };

  return <HomePage onArticleSelect={handleArticleSelect} />;
}
