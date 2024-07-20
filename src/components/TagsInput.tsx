import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

const TagInput: React.FC<{
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                setTags((prevTags) => [...prevTags, inputValue.trim()]);
                setInputValue("");
            }
        } else if (e.key === "Backspace" && !inputValue) {
            removeTag(tags.length - 1);
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <div className="mb-2">
                {tags.map((tag, index) => (
                    <Badge key={index} className="mx-1" variant='secondary'>
                        {tag}
                        <button
                            className="ml-2"
                            type="button"
                            onClick={() => removeTag(index)}
                        >
                            &times;
                        </button>
                    </Badge>
                ))}
            </div>
            <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag"
            />
        </div>
    );
};

export default TagInput;
