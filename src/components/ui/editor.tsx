    import React from 'react';
    import { useEditor, EditorContent } from '@tiptap/react';
    import StarterKit from '@tiptap/starter-kit';
    import Underline from '@tiptap/extension-underline'
    import TextAlign from '@tiptap/extension-text-align'
    import { 
    Bold, Italic, Underline as UnderlineIcon, 
    AlignLeft, AlignCenter, AlignRight, 
    Strikethrough
    } from 'lucide-react';
    import { cn } from '@/lib/utils';

    interface ToolbarButtonProps {
        onClick: () => void;
        active: boolean;
        children: React.ReactNode;
    }

    const ToolbarButton = ({ onClick, active, children }: ToolbarButtonProps) => (
    <button
        onClick={onClick}
        className={`p-2 rounded hover:bg-muted transition-colors ${
        active ? 'text-primary' : 'text-muted-foreground'
        }`}
        type="button"
    >
        {children}
    </button>
    );

    interface EditorProps {
        onChange: (value: string) => void;
        value: string;
        className?: string;
    }

    const Editor = ({ onChange, value, className }: EditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                    heading: {
                    levels: [2],
                },
                    bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                    orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            if (editor.getHTML() === '<p></p>') {
                onChange('');
                return;
            }
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[150px] p-4',
            },
        },
        immediatelyRender: false,
    });

    if (!editor) {
        return null;
    }

    return (
        <div className={cn(
            'border border-input rounded-md overflow-hidden bg-card',
            className
        )}>
            <div className="flex flex-wrap gap-1 p-2 border-b border-input bg-muted">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                >
                    <Bold size={18} />
                </ToolbarButton>
                    <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                >
                    <Italic size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={editor.isActive('strike')}
                >
                    <Strikethrough size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editor.isActive('underline')}
                >
                        <UnderlineIcon size={18} />
                </ToolbarButton>
                {/* splitter */}
                <div className="border-r border-white h-5 mx-2 my-auto"></div>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    active={editor.isActive({ textAlign: 'left' })}
                >
                    <AlignLeft size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    active={editor.isActive({ textAlign: 'center' })}
                >
                    <AlignCenter size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    active={editor.isActive({ textAlign: 'right' })}
                >
                    <AlignRight size={18} />
                </ToolbarButton>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
    };

    export default Editor;