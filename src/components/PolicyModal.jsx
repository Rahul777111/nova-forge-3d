import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PolicyModal.css";

const PRIVACY = {
  title: "Privacy Policy",
  updated: "May 10, 2026",
  sections: [
    {
      heading: "1. Who We Are",
      body: "Nova Forge (\"we\", \"us\", or \"our\") is an AI product engineering studio. Our registered address is available upon request. Questions about this policy can be directed to privacy@novaforge.ai."
    },
    {
      heading: "2. What Data We Collect",
      body: "We collect information you voluntarily provide through our contact form: your name, email address, company name, and message content. We also collect standard server logs including IP address, browser type, pages visited, and timestamps when you access our website."
    },
    {
      heading: "3. How We Use Your Data",
      body: "We use your contact information solely to respond to your enquiry and to follow up on potential engagements. We do not use your data for advertising, profiling, or automated decision-making. Server logs are used for security monitoring and performance analytics only."
    },
    {
      heading: "4. Legal Basis for Processing",
      body: "For EU/EEA residents, we process your personal data on the basis of legitimate interest (responding to your business enquiry) and, where applicable, your explicit consent. You may withdraw consent at any time by contacting us."
    },
    {
      heading: "5. Data Sharing",
      body: "We do not sell, rent, or trade your personal data to third parties. We may share data with trusted service providers (such as email delivery services) solely to fulfil the purposes described above, under strict data processing agreements."
    },
    {
      heading: "6. Data Retention",
      body: "Contact form submissions are retained for up to 24 months, after which they are securely deleted. You may request deletion of your data at any time by emailing privacy@novaforge.ai."
    },
    {
      heading: "7. Cookies",
      body: "Our website uses only essential functional cookies necessary for the site to operate. We do not use tracking cookies, advertising cookies, or third-party analytics cookies without your explicit consent. You can control cookie preferences through your browser settings."
    },
    {
      heading: "8. Your Rights",
      body: "Depending on your jurisdiction, you have the right to access, correct, delete, or port your personal data. You also have the right to object to or restrict processing. To exercise any of these rights, contact us at privacy@novaforge.ai. EEA residents may also lodge a complaint with their local data protection authority."
    },
    {
      heading: "9. Security",
      body: "We implement industry-standard technical and organisational measures to protect your data, including TLS encryption in transit, access controls, and regular security reviews. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
    },
    {
      heading: "10. Changes to This Policy",
      body: "We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page. Continued use of our website after changes constitutes acceptance of the revised policy."
    },
  ]
};

const TERMS = {
  title: "Terms of Use",
  updated: "May 10, 2026",
  sections: [
    {
      heading: "1. Acceptance",
      body: "By accessing or using the Nova Forge website, you agree to be bound by these Terms of Use. If you do not agree, please discontinue use of the site immediately."
    },
    {
      heading: "2. Intellectual Property",
      body: "All content on this website, including text, graphics, logos, images, and code, is the property of Nova Forge and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent."
    },
    {
      heading: "3. Use of the Site",
      body: "You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. Prohibited conduct includes attempting to gain unauthorised access to our systems, transmitting malicious code, or using automated tools to scrape or harvest content."
    },
    {
      heading: "4. Disclaimers",
      body: "This website is provided on an \"as is\" and \"as available\" basis. Nova Forge makes no warranties, express or implied, regarding the accuracy, completeness, or fitness for a particular purpose of any content on this site."
    },
    {
      heading: "5. Limitation of Liability",
      body: "To the fullest extent permitted by law, Nova Forge shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of this website, even if we have been advised of the possibility of such damages."
    },
    {
      heading: "6. Third-Party Links",
      body: "Our website may contain links to third-party websites. These links are provided for convenience only. Nova Forge has no control over, and accepts no responsibility for, the content or practices of any third-party sites."
    },
    {
      heading: "7. Governing Law",
      body: "These Terms of Use are governed by and construed in accordance with applicable law. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the competent courts."
    },
    {
      heading: "8. Changes to Terms",
      body: "We reserve the right to modify these Terms of Use at any time. Changes take effect upon posting to the website. Your continued use of the site constitutes acceptance of the updated terms."
    },
    {
      heading: "9. Contact",
      body: "If you have any questions about these Terms of Use, please contact us at legal@novaforge.ai."
    },
  ]
};

export const POLICIES = { privacy: PRIVACY, terms: TERMS };

export default function PolicyModal({ type, onClose }) {
  const doc = POLICIES[type];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  if (!doc) return null;

  return (
    <AnimatePresence>
      <motion.div className="policy-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}>
        <motion.div className="policy-modal"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={e => e.stopPropagation()}>
          <div className="policy-modal__header">
            <div>
              <h2 className="policy-modal__title">{doc.title}</h2>
              <p className="policy-modal__updated">Last updated: {doc.updated}</p>
            </div>
            <button className="policy-modal__close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="policy-modal__body">
            {doc.sections.map((s, i) => (
              <div key={i} className="policy-modal__section">
                <h3 className="policy-modal__sh">{s.heading}</h3>
                <p className="policy-modal__sp">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="policy-modal__footer">
            <button className="btn btn--primary" onClick={onClose}>Close</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
