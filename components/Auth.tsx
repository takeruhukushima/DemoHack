'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { LogOut, User, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function Auth() {
  const { user, signInWithGoogle, signOut } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/login" className="flex items-center">
            <LogIn className="mr-2 h-4 w-4" />
            ログイン
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/signup" className="flex items-center">
            <UserPlus className="mr-2 h-4 w-4" />
            新規登録
          </Link>
        </Button>
        <div className="hidden md:block">
          <Button 
            onClick={signInWithGoogle} 
            variant="outline" 
            size="sm"
            className="flex items-center"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
        </div>
      </div>
    );
  }

  const router = useRouter();

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push('/profile');
  };

  return (
    <div className="flex items-center">
      <Button 
        variant="ghost" 
        className="relative h-8 w-8 rounded-full p-0"
        onClick={handleAvatarClick}
      >
        <Avatar className="h-8 w-8">
          {user.photoURL ? (
            <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
          ) : (
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          )}
        </Avatar>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </Button>
        </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar className="h-10 w-10">
            {user.photoURL ? (
              <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-none">
              {user.displayName || 'ユーザー'}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate max-w-[180px]">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="w-full cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>プロフィール</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="w-full cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>ログアウト</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
