import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for using the ForgeHub platform.",
};

export default function TermsPage() {
  return (
    <div className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-p:text-text-muted prose-headings:text-text-primary max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using ForgeHub, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>

          <h2>2. Intellectual Property and Content</h2>
          <p>
            You retain all your ownership rights in the content, engineering files, and projects you upload to ForgeHub. By making your projects public, you grant ForgeHub a license to display that content on the platform.
          </p>

          <h2>3. Acceptable Use</h2>
          <p>
            You agree not to use ForgeHub to:
          </p>
          <ul>
            <li>Upload or share malicious code or files</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the intellectual property rights of others</li>
            <li>Harass, abuse, or harm other users</li>
          </ul>

          <h2>4. Service Modifications</h2>
          <p>
            We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice. You agree that ForgeHub shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the service.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall ForgeHub be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
        </div>
      </div>
    </div>
  );
}
