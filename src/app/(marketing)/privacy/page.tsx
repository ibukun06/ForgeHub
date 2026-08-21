import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ForgeHub's privacy policy and data protection guidelines.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-p:text-text-muted prose-headings:text-text-primary max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Introduction</h2>
          <p>
            At ForgeHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our platform for engineering collaboration.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when registering for an account, creating a profile, uploading engineering files, or communicating with other users. This includes:
          </p>
          <ul>
            <li>Personal identification information (Name, email address)</li>
            <li>Professional information (Institution, skills, roles)</li>
            <li>User-generated content (Projects, files, comments, reviews)</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, including:
          </p>
          <ul>
            <li>Facilitating engineering collaboration and file management</li>
            <li>Displaying public profiles and projects (based on your visibility settings)</li>
            <li>Sending administrative information and updates</li>
            <li>Responding to customer service requests</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
          </p>
        </div>
      </div>
    </div>
  );
}
