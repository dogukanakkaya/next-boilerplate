import Link from 'next/link';

export default function Breadcrumb({ items }: Props) {
    return (
        <ul className="flex mb-5">
            {
                items.map(item => (
                    <li key={item.name} className="after:content-['/'] last:after:content-[] after:mx-3">
                        {item.href ? <Link href={item.href}><a className="text-gray-400 font-semibold hover:text-gray-300 transition-color duration-200">{item.name}</a></Link> : <span>{item.name}</span>}
                    </li>
                ))
            }
        </ul>
    );
}

interface Props {
    items: {
        name: string;
        href?: string;
    }[]
}
