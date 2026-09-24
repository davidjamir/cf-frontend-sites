import type { Metadata } from 'next'
import { siteService } from "@/services/site.service"

export async function generateMetadata(): Promise<Metadata> {
    const site = await siteService.getCurrentSite();

    return {
        metadataBase: new URL(site.baseUrl),
        title: 'Contact Us',
        category: 'Contact Us',
        publisher: site.seo.title,
        openGraph: {
            siteName: site.seo.title,
            locale: "en_US",
            type: "website",
            url: `${site.baseUrl}/page/contact-us`,
            title: `Contact Us | ${site.seo.title}`,
            description: site.seo.description,
            images: [{ url: "/images/default-banner.png", alt: site.seo.title }],
        },
        alternates: {
            canonical: `page/contact-us`,
        }
    };
}

export default async function ContactPage() {
    const site = await siteService.getCurrentSite();
    const domain = site.host

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12 border border-gray-200/5 shadow-sm rounded-md">
            <article className="prose prose-neutral max-w-none">
                <h1>Contact Us</h1>

                <p>
                    If you have any questions about us, You can contact Us:
                </p>

                <ul>
                    <li>
                        By email:{" "}
                        <a href={`mailto:support@${domain}`}>
                            support@{domain}
                        </a>
                    </li>
                </ul>
            </article>
        </div>
    );
}