import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import ArticleDetailPage from './components/ArticleDetailPage';

// 簡単なルーティングの状態管理
type Route = 'home' | 'article';

interface AppState {
  currentRoute: Route;
  selectedArticleId?: string;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentRoute: 'home'
  });

  const navigateToArticle = (articleId: string) => {
    setAppState({
      currentRoute: 'article',
      selectedArticleId: articleId
    });
  };

  const navigateToHome = () => {
    setAppState({
      currentRoute: 'home',
      selectedArticleId: undefined
    });
  };

  const renderCurrentPage = () => {
    switch (appState.currentRoute) {
      case 'article':
        return (
          <ArticleDetailPage
            articleId={appState.selectedArticleId || ''}
            onBack={navigateToHome}
          />
        );
      case 'home':
      default:
        return <HomePage onArticleSelect={navigateToArticle} />;
    }
  };

  return (
    <Layout>
      {renderCurrentPage()}
    </Layout>
  );
}