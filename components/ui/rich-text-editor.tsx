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
  const editorRef = useRef<any>(null);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      if (url && editorRef.current) {
        editorRef.current.chain().focus().setImage({ src: url }).run();
      }
    };
    reader.readAsDataURL(file);
  }, []);

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
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[400px] p-6',
        'data-placeholder': placeholder || 'Start writing your blog content...',
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

  if (editor && !editorRef.current) {
    editorRef.current = editor;
  }

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
      {/* Scoped styles for heading sizes inside the editor */}
      <style>{`
        .rich-editor-content .ProseMirror {
          color: #374151;
          line-height: 1.75;
        }
        .rich-editor-content .ProseMirror h1 {
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1.2;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
        }
        .rich-editor-content .ProseMirror h2 {
          font-size: 1.875rem;
          font-weight: 700;
          line-height: 1.3;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }
        .rich-editor-content .ProseMirror h3 {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.4;
          margin-top: 1.5rem;
          margin-bottom: 0.65rem;
          color: #111827;
        }
        .rich-editor-content .ProseMirror h4 {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.4;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: #111827;
        }
        .rich-editor-content .ProseMirror p {
          font-size: 1.1rem;
          color: #374151;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .rich-editor-content .ProseMirror ul {
          list-style-type: disc;
          padding-left: 2rem;
          margin-bottom: 1rem;
          color: #374151;
        }
        .rich-editor-content .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 2rem;
          margin-bottom: 1rem;
          color: #374151;
        }
        .rich-editor-content .ProseMirror li {
          margin-bottom: 0.35rem;
        }
        .rich-editor-content .ProseMirror blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.25rem;
          font-style: italic;
          color: #4b5563;
          margin: 1.25rem 0;
        }
        .rich-editor-content .ProseMirror pre {
          background: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          font-family: monospace;
          font-size: 0.9rem;
          margin: 1rem 0;
        }
        .rich-editor-content .ProseMirror code {
          background: #f3f4f6;
          color: #dc2626;
          padding: 0.15rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-family: monospace;
        }
        .rich-editor-content .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
        }
        .rich-editor-content .ProseMirror a:hover {
          color: #1e40af;
        }
        .rich-editor-content .ProseMirror strong {
          font-weight: 700;
        }
        .rich-editor-content .ProseMirror em {
          font-style: italic;
        }
        .rich-editor-content .ProseMirror img {
          border-radius: 0.5rem;
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
        }
        .rich-editor-content .ProseMirror hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 1.5rem 0;
        }
        .rich-editor-content .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        .rich-editor-content .ProseMirror td,
        .rich-editor-content .ProseMirror th {
          border: 1px solid #d1d5db;
          padding: 0.5rem 0.75rem;
        }
        .rich-editor-content .ProseMirror th {
          background: #f9fafb;
          font-weight: 600;
        }
        .rich-editor-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
      `}</style>
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
        <div className="rich-editor-content">
          <EditorContent editor={editor} placeholder={placeholder} />
        </div>

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
