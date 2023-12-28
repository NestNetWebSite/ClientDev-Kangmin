export default function isQuillEmpty(content: string): boolean
{
    return content.replace(/<(.|\n)*?>/g, '').trim().length === 0 && !content.includes("<img");
}