import React, { useEffect, useState } from 'react';

interface MessageReviewProps {
    content: string;
    onChange: (newContent: string) => void;
}

export const MessageReview: React.FC<MessageReviewProps> = ({ content, onChange }) => {
    const [text, setText] = useState(content);

    useEffect(() => {
        setText(content);
    }, [content]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setText(val);
        onChange(val);
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-md border border-border/50">
                请检查生成的内容。您可以直接编辑文本，或者使用下方按钮进行重生成。
            </div>

            <div className="flex-1 relative">
                <textarea
                    value={text}
                    onChange={handleChange}
                    className="w-full h-full min-h-[300px] p-4 bg-muted/50 border border-border rounded-md font-mono text-sm text-foreground leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none custom-scrollbar"
                    spellCheck={false}
                    placeholder="在此编辑内容..."
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded pointer-events-none">
                    {text.length} 字符
                </div>
            </div>
        </div>
    );
};
