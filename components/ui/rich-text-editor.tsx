'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered,
  Link as LinkIcon,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Sparkles,
  Table as TableIcon,
  Plus,
  Trash,
  ImageIcon,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCallback, useState, useRef } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ content, onChange, placeholder, className }: RichTextEditorProps) {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
        inline: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full my-4 border-2 border-gray-300 rounded-lg overflow-hidden',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold p-3 border border-gray-300',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-3',
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[150px] p-5',
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find(item => item.type.startsWith('image/'));
        
        if (imageItem) {
          event.preventDefault();
          const file = imageItem.getAsFile();
          if (file) {
            handleImageUpload(file);
          }
          return true;
        }
        return false;
      },
    },
  });

  const openLinkDialog = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    setLinkUrl(previousUrl || '');
    setShowLinkDialog(true);
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    
    setShowLinkDialog(false);
    setLinkUrl('');
  }, [editor, linkUrl]);

  const cancelLink = useCallback(() => {
    setShowLinkDialog(false);
    setLinkUrl('');
  }, []);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      if (url && editor) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    };
    reader.readAsDataURL(file);
  }, [editor]);

  const triggerImageUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleImageUpload]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`border-2 border-gray-300 rounded-2xl bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all shadow-sm hover:shadow-md ${className}`}>
      <div className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100/50 px-3 py-2.5 flex flex-wrap gap-1.5 items-center">
        <div className="flex items-center gap-0.5 bg-white rounded-lg px-1 py-0.5 shadow-sm border border-gray-200">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`h-8 w-8 p-0 rounded-md transition-all ${editor.isActive('bold') ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md' : 'hover:bg-gray-100'}`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`h-8 w-8 p-0 rounded-md transition-all ${editor.isActive('italic') ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md' : 'hover:bg-gray-100'}`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`h-8 w-8 p-0 rounded-md transition-all ${editor.isActive('underline') ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md' : 'hover:bg-gray-100'}`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-0.5 bg-white rounded-lg px-1 py-0.5 shadow-sm border border-gray-200">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`h-8 w-8 p-0 rounded-md transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md' : 'hover:bg-gray-100'}`}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`h-8 w-8 p-0 rounded-md transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md' : 'hover:bg-gray-100'}`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`h-8 w-8 p-0 rounded-md transition-all ${editor.isActive('heading', { level: 3 }) ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md' : 'hover:bg-gray-100'}`}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`h-8 w-8 p-0 rounded-md transition-all ${editor.isActive('blockquote') ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md' : 'hover:bg-gray-100'}`}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`h-8 w-8 p-0 rounded-md transition-all ${editor.isActive('codeBlock') ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md' : 'hover:bg-gray-100'}`}
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-0.5 bg-white rounded-lg px-1 py-0.5 shadow-sm border border-gray-200">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`h-8 w-8 p-0 rounded-md transition-all ${editor.isActive('bulletList') ? 'bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-md' : 'hover:bg-gray-100'}`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`h-8 w-8 p-0 rounded-md transition-all ${editor.isActive('orderedList') ? 'bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-md' : 'hover:bg-gray-100'}`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-0.5 bg-white rounded-lg px-1 py-0.5 shadow-sm border border-gray-200">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={openLinkDialog}
            className={`h-8 w-8 p-0 rounded-md transition-all ${editor.isActive('link') ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-md' : 'hover:bg-gray-100'}`}
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={triggerImageUpload}
            className={`h-8 w-8 p-0 rounded-md transition-all hover:bg-gray-100`}
            title="Upload Image"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-0.5 bg-white rounded-lg px-1 py-0.5 shadow-sm border border-gray-200">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            className={`h-8 w-8 p-0 rounded-md transition-all ${editor.isActive('table') ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md' : 'hover:bg-gray-100'}`}
            title="Insert Table"
          >
            <TableIcon className="w-4 h-4" />
          </Button>
          {editor.isActive('table') && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                className="h-8 w-8 p-0 rounded-md hover:bg-gray-100"
                title="Add Column"
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().deleteTable().run()}
                className="h-8 w-8 p-0 rounded-md hover:bg-red-100 hover:text-red-600"
                title="Delete Table"
              >
                <Trash className="w-3.5 h-3.5" />
              </Button>
            </>
          )}
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-0.5 bg-white rounded-lg px-1 py-0.5 shadow-sm border border-gray-200">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 disabled:opacity-30"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 disabled:opacity-30"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs font-semibold text-gray-700">Rich Editor</span>
        </div>
      </div>
      
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <EditorContent editor={editor} placeholder={placeholder} />
        
        {showLinkDialog && (
          <div className="absolute top-2 left-2 right-2 z-50 bg-white border-2 border-blue-500 rounded-xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 mb-3">
              <LinkIcon className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">Insert Link</h3>
            </div>
            <div className="space-y-3">
              <Input
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setLink();
                  } else if (e.key === 'Escape') {
                    cancelLink();
                  }
                }}
                autoFocus
                className="border-2 border-gray-300 focus:border-blue-500 rounded-lg"
              />
              <div className="flex items-center gap-2 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={cancelLink}
                  className="text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={setLink}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  Insert Link
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
