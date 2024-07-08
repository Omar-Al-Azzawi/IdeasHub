"use client";

import {
    EditorProvider,
    useCurrentEditor,
    useEditor,
    EditorContent,
} from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import {
    Bold,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    Link,
    Link2Off,
    List,
    ListOrdered,
    Redo,
    RemoveFormatting,
    Undo,
    Strikethrough,
    Heading5,
    Heading6,
    Heading4,
} from "lucide-react";

type MenuBarProps = {
    editor: Editor;
};

type RichTextEditor = {
    onChange: (content: any) => void;
    content?: string
};

const MenuBar = ({ editor }: MenuBarProps) => {
    if (!editor) {
        return null;
    }

    return (
        <>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={
                    editor.isActive("bold")
                        ? "bg-teal-500 p-1 rounded-md text-white"
                        : "p-1"
                }
            >
                <Bold />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={
                    editor.isActive("italic")
                        ? "bg-teal-500 p-1 rounded-md text-white"
                        : "p-1"
                }
            >
                <Italic />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={
                    editor.isActive("strike")
                        ? "bg-teal-500 p-1 rounded-md text-white"
                        : "p-1"
                }
            >
                <Strikethrough />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={
                    editor.isActive("code")
                        ? "bg-teal-500 p-1 rounded-md text-white"
                        : "p-1"
                }
            >
                <Code />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().clearNodes().run()}
            >
                <RemoveFormatting />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={
                    editor.isActive("heading", { level: 1 })
                        ? "bg-teal-500 p-1 rounded-md text-white"
                        : "p-1"
                }
            >
                <Heading1 />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={
                    editor.isActive("heading", { level: 2 })
                        ? "bg-teal-500 p-1 rounded-md text-white"
                        : "p-1"
                }
            >
                <Heading2 />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={
                    editor.isActive("heading", { level: 3 })
                        ? "bg-teal-500 p-1 rounded-md text-white"
                        : "p-1"
                }
            >
                <Heading3 />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={
                    editor.isActive("heading", { level: 4 })
                        ? "bg-teal-500 p-1 rounded-md text-white"
                        : "p-1"
                }
            >
                <Heading4 />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={
                    editor.isActive("heading", { level: 5 })
                        ? "bg-teal-500 p-1 rounded-md text-white"
                        : "p-1"
                }
            >
                <Heading5 />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={
                    editor.isActive("heading", { level: 6 })
                        ? "bg-teal-500 p-1 rounded-md text-white"
                        : "p-1"
                }
            >
                <Heading6 />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={
                    editor.isActive("bulletList")
                        ? "bg-teal-500 p-1 rounded-md text-white"
                        : "p-1"
                }
            >
                <List />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={
                    editor.isActive("orderedList")
                        ? "bg-teal-500 p-1 rounded-md text-white"
                        : "p-1"
                }
            >
                <ListOrdered />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
            >
                <Undo />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
            >
                <Redo />
            </button>
        </>
    );
};

const RichTextEditor = ({ onChange, content }: RichTextEditor) => {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class:
                    "focus w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]",
            },
        },
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
        ],
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
        content: content,
    });

    if (!editor) {
        return null;
    }

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </>
    );
};

export default RichTextEditor;
