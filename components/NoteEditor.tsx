'use client';

"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { ImageExtension } from '@/lib/tiptap-extensions/image';
import { useCallback, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { X, Bold, Italic, List, ListOrdered, Link, Image as ImageIcon } from 'lucide-react';

interface NoteEditorProps {
  onSave?: (title: string, content: string, tags: string[]) => void;
  onCancel?: () => void;
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
}

export default function NoteEditor({ 
  onSave, 
  onCancel, 
  initialTitle = '', 
  initialContent = '',
  initialTags = []
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialTags);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      Placeholder.configure({
        placeholder: 'ここに本文を書く...',
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
    immediatelyRender: false,
    // SSR対策
    onUpdate: ({ editor }) => {
      // エディタの更新処理があればここに記述
    },
    // エディタがマウントされた後に実行
    onSelectionUpdate: ({ editor }) => {
      // 選択範囲の更新処理があればここに記述
    },
  });

  const addTag = useCallback(() => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  }, [tagInput, tags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  }, [tags]);

  const handleSubmit = useCallback(async () => {
    if (!editor || !title.trim()) return;
    
    setIsSubmitting(true);
    try {
      const content = editor.getHTML();
      await onSave?.(title, content, tags);
      
      // エディタをリセット
      setTitle('');
      editor.commands.clearContent();
      setTags([]);
    } finally {
      setIsSubmitting(false);
    }
  }, [editor, onSave, tags, title]);

  if (!editor) {
    return <div>エディタを読み込んでいます...</div>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
            className="text-2xl font-bold border-none shadow-none focus-visible:ring-0"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ツールバー */}
        <div className="flex flex-wrap gap-2 p-2 border rounded-t-lg bg-muted/50">
          <Button
            type="button"
            variant={editor.isActive('bold') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('italic') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="h-8 w-8 p-0"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              const previousUrl = editor.getAttributes('link').href;
              const url = window.prompt('URLを入力してください', previousUrl);
              
              if (url === null) return;
              
              if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run();
                return;
              }
              
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            }}
            className="h-8 w-8 p-0"
          >
            <Link className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              const url = window.prompt('画像のURLを入力してください');
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
            className="h-8 w-8 p-0"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
        
        {/* エディタエリア */}
        <div className="border-x border-b rounded-b-lg">
          <EditorContent editor={editor} className="min-h-[300px]" />
        </div>
        
        {/* タグ入力 */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="タグを追加"
              className="max-w-xs"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={addTag}
            >
              追加
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} className="flex items-center gap-1">
                {tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
        
        {/* アクションボタン */}
        <div className="flex justify-end space-x-2 pt-4">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
          )}
          <Button 
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim() || isSubmitting}
          >
            {isSubmitting ? '投稿中...' : '投稿する'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
