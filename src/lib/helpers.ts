export function asset(path: string): string {
  // You could add more logic here, like checking for external URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // In development, we can use the path as is
  if (process.env.NODE_ENV === 'development') {
    return `/${cleanPath}`;
  }

  // In production, you might want to add a CDN URL
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || '';
  return `${cdnUrl}/${cleanPath}`;
}

export function getAppName(): string {
  return process.env.NEXT_PUBLIC_APP_NAME || 'Laravel';
}
