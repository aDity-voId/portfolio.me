import { siteData } from '../../data/siteData';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-text-muted text-sm">
          &copy; {year} {siteData.name}. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <a
            href={siteData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href={siteData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteData.contact.email}`}
            className="text-text-muted hover:text-accent transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
