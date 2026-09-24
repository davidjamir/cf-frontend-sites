import type { Metadata } from 'next'
import { siteService } from "@/services/site.service"

export async function generateMetadata(): Promise<Metadata> {
    const site = await siteService.getCurrentSite();

    return {
        metadataBase: new URL(site.baseUrl),
        title: 'Terms and Conditions',
        category: 'Terms and Conditions',
        publisher: site.seo.title,
        openGraph: {
            siteName: site.seo.title,
            locale: "en_US",
            type: "website",
            url: `${site.baseUrl}/page/terms-and-conditions`,
            title: `Terms and Conditions | ${site.seo.title}`,
            description: site.seo.description,
            images: [{ url: "/images/default-banner.png", alt: site.seo.title }],
        },
        alternates: {
            canonical: `page/terms-and-conditions`,
        }
    };
}

export default async function TermsPage() {
    const site = await siteService.getCurrentSite();
    const domain = site.host

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 border border-gray-200/5 shadow-sm rounded-md">
            <article className="prose prose-neutral max-w-none">
                <h1>Terms and Conditions</h1>

                <p>
                    The words of which the initial letter is capitalized have meanings
                    defined under the following conditions. The following definitions
                    shall have the same meaning regardless of whether they appear in
                    singular or in plural.
                </p>

                <h2>Definitions</h2>

                <p>For the purposes of these Terms and Conditions:</p>

                <ul>
                    <li>
                        <strong>Affiliate</strong> means an entity that controls, is
                        controlled by or is under common control with a party.
                    </li>

                    <li>
                        <strong>Country</strong> refers to: Florida, United States.
                    </li>

                    <li>
                        <strong>Company</strong> (referred to as either “the Company”,
                        “We”, “Us” or “Our”) refers to The Daily Sports.
                    </li>

                    <li>
                        <strong>Device</strong> means any device that can access the Service
                        such as a computer, cellphone or tablet.
                    </li>

                    <li>
                        <strong>Service</strong> refers to the Website.
                    </li>

                    <li>
                        <strong>Terms and Conditions</strong> (also referred as “Terms”)
                        mean these Terms and Conditions that form the entire agreement
                        between You and the Company.
                    </li>

                    <li>
                        <strong>Third-party Social Media Service</strong> means any
                        third-party services or content made available by the Service.
                    </li>

                    <li>
                        <strong>Website</strong> refers to The Daily Sports, accessible from{" "}
                        <a
                            href={`https://${domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://{domain}
                        </a>
                    </li>

                    <li>
                        <strong>You</strong> means the individual accessing or using the
                        Service.
                    </li>
                </ul>

                <h2>Acknowledgment</h2>

                <p>
                    These are the Terms and Conditions governing the use of this Service
                    and the agreement that operates between You and the Company.
                </p>

                <p>
                    Your access to and use of the Service is conditioned on Your
                    acceptance of and compliance with these Terms and Conditions.
                </p>

                <p>
                    By accessing or using the Service You agree to be bound by these Terms
                    and Conditions.
                </p>

                <p>
                    You represent that you are over the age of 18. The Company does not
                    permit those under 18 to use the Service.
                </p>

                <p>
                    Your access to and use of the Service is also conditioned on Your
                    acceptance of and compliance with the Privacy Policy of the Company.
                </p>

                <h2>Links to Other Websites</h2>

                <p>
                    Our Service may contain links to third-party websites or services that
                    are not owned or controlled by the Company.
                </p>

                <p>
                    The Company has no control over and assumes no responsibility for the
                    content, privacy policies or practices of any third-party websites or
                    services.
                </p>

                <p>
                    We strongly advise You to read the terms and privacy policies of any
                    third-party websites You visit.
                </p>

                <h2>Termination</h2>

                <p>
                    We may terminate or suspend Your access immediately, without prior
                    notice or liability, for any reason whatsoever.
                </p>

                <p>
                    Upon termination, Your right to use the Service will cease
                    immediately.
                </p>

                <h2>Limitation of Liability</h2>

                <p>
                    Notwithstanding any damages that You might incur, the entire liability
                    of the Company and any of its suppliers shall be limited to the amount
                    actually paid by You through the Service or 100 USD if You haven’t
                    purchased anything through the Service.
                </p>

                <p>
                    To the maximum extent permitted by law, in no event shall the Company
                    or its suppliers be liable for any special, incidental, indirect or
                    consequential damages whatsoever.
                </p>

                <p>
                    Some states do not allow the exclusion of implied warranties or
                    limitation of liability for incidental damages, so some limitations
                    may not apply.
                </p>

                <h2>“AS IS” and “AS AVAILABLE” Disclaimer</h2>

                <p>
                    The Service is provided to You “AS IS” and “AS AVAILABLE” without
                    warranty of any kind.
                </p>

                <p>
                    The Company expressly disclaims all warranties, whether express,
                    implied, statutory or otherwise.
                </p>

                <p>
                    Without limiting the foregoing, neither the Company nor its providers
                    make any representation regarding the operation, availability or
                    accuracy of the Service.
                </p>

                <p>
                    Some jurisdictions do not allow the exclusion of certain warranties,
                    so some exclusions may not apply to You.
                </p>

                <h2>Governing Law</h2>

                <p>
                    The laws of the Country, excluding its conflict of law rules, shall
                    govern these Terms and Your use of the Service.
                </p>

                <h2>Disputes Resolution</h2>

                <p>
                    If You have any concern or dispute about the Service, You agree to
                    first try to resolve the dispute informally by contacting the Company.
                </p>

                <h2>For European Union (EU) Users</h2>

                <p>
                    If You are a European Union consumer, You will benefit from any
                    mandatory provisions of the law of the country in which You are
                    resident.
                </p>

                <h2>United States Legal Compliance</h2>

                <p>
                    You represent and warrant that You are not located in a country
                    subject to United States embargoes and are not listed on any United
                    States prohibited parties list.
                </p>

                <h2>Severability and Waiver</h2>

                <h3>Severability</h3>

                <p>
                    If any provision of these Terms is held to be unenforceable or
                    invalid, such provision will be modified to accomplish its objectives
                    to the greatest extent possible under applicable law.
                </p>

                <h3>Waiver</h3>

                <p>
                    Failure to exercise a right or require performance of an obligation
                    under these Terms shall not affect a party’s ability to exercise such
                    right later.
                </p>

                <h2>Translation Interpretation</h2>

                <p>
                    These Terms and Conditions may have been translated if made available
                    on the Service.
                </p>

                <p>
                    You agree that the original English text shall prevail in the case of
                    a dispute.
                </p>

                <h2>Changes to These Terms and Conditions</h2>

                <p>
                    We reserve the right to modify or replace these Terms at any time.
                </p>

                <p>
                    If a revision is material, We will make reasonable efforts to provide
                    at least 30 days notice before new terms take effect.
                </p>

                <p>
                    By continuing to access or use Our Service after revisions become
                    effective, You agree to be bound by the revised terms.
                </p>

                <h2>Contact Us</h2>

                <p>
                    If you have any questions about these Terms and Conditions, You can
                    contact us:
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