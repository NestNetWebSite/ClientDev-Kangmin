import DOMPurify from 'dompurify';

export default function BoardMain({ bodyContent }: { bodyContent: string }) {
    const safeHtmlString = DOMPurify.sanitize(bodyContent);
    return (
        <main className='flex flex-col whitespace-pre-wrap'>
            <article className='mb-32 mt-4' dangerouslySetInnerHTML={{ __html: safeHtmlString }} />
        </main>
    );
}
