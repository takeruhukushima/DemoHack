'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function SignupPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      return setError('メールアドレスとパスワードは必須です');
    }
    
    if (password !== confirmPassword) {
      return setError('パスワードが一致しません');
    }
    
    if (password.length < 6) {
      return setError('パスワードは6文字以上で設定してください');
    }
    
    setError('');
    setLoading(true);

    try {
      // Create the user
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name if provided
      if (displayName) {
        try {
          await updateProfile(user, {
            displayName
          });
        } catch (profileError) {
          console.error('Error updating profile:', profileError);
          // Continue even if profile update fails
        }
      }
      
      // Redirect to home page after successful signup
      router.push('/');
    } catch (error: any) {
      console.error('Signup error:', error);
      
      let errorMessage = 'アカウントの作成に失敗しました';
      
      // More specific error messages
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'このメールアドレスは既に使用されています';
          break;
        case 'auth/weak-password':
          errorMessage = 'パスワードは6文字以上で設定してください';
          break;
        case 'auth/invalid-email':
          errorMessage = '無効なメールアドレス形式です';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'この認証方法は現在無効になっています';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'ネットワークエラーが発生しました。接続を確認してください';
          break;
        default:
          // Check if there's a more specific error message
          if (error.message) {
            errorMessage = error.message;
          }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            新規アカウントを作成
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            すでにアカウントをお持ちですか？{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              ログイン
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="display-name" className="sr-only">
                表示名
              </label>
              <Input
                id="display-name"
                name="displayName"
                type="text"
                autoComplete="name"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="表示名（任意）"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                メールアドレス
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                パスワード
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワード（6文字以上）"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                パスワード（確認）
              </label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワード（確認）"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? 'アカウント作成中...' : 'アカウントを作成'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
