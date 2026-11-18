interface LinkedInPostLinkProps {
  href?: string;
  linkText?: string;
}

/** Optional boxed link to a LinkedIn post or article; hidden when `href` is empty. */
export default function LinkedInPostLink({
  href,
  linkText = "LinkedIn post",
}: LinkedInPostLinkProps) {
  const url = href?.trim();
  if (!url) return null;
  return (
    <div className="links">
      <a href={url} target="_blank" rel="noopener noreferrer">
        {linkText}
      </a>
    </div>
  );
}
