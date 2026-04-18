interface LinkedInPostLinkProps {
  href?: string;
}

/** Optional link to a LinkedIn post or article; hidden when `href` is empty. */
export default function LinkedInPostLink({ href }: LinkedInPostLinkProps) {
  const url = href?.trim();
  if (!url) return null;
  return (
    <p className="mt-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-accent hover:underline"
      >
        LinkedIn post
      </a>
    </p>
  );
}
