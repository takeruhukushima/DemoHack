'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Mail, User as UserIcon, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('ログアウトに失敗しました', error);
    }
  };

  if (!user) {
    return null;
  }

  // Format the creation and last sign-in times
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '不明';
    try {
      return format(new Date(dateString), 'yyyy年MM月dd日 HH:mm', { locale: ja });
    } catch (error) {
      return '不明';
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-28 w-28 border-4 border-primary/10">
              {user.photoURL ? (
                <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
              ) : (
                <AvatarFallback className="text-3xl bg-primary/10">
                  {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                {user.displayName || 'ユーザー'}
              </h1>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </p>
              {user.metadata?.creationTime && (
                <p className="text-sm text-muted-foreground">
                  メンバー登録日: {formatDate(user.metadata.creationTime)}
                </p>
              )}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">アカウント情報</CardTitle>
              <CardDescription>アカウントの詳細情報を確認できます</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    表示名
                  </div>
                  <div className="text-base">
                    {user.displayName || '未設定'}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    メールアドレス
                  </div>
                  <div className="text-base">
                    {user.email}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    アカウント作成日
                  </div>
                  <div className="text-base">
                    {formatDate(user.metadata?.creationTime)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    最終ログイン
                  </div>
                  <div className="text-base">
                    {formatDate(user.metadata?.lastSignInTime)}
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Separator className="mb-6" />
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={handleSignOut}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    ログアウト
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
