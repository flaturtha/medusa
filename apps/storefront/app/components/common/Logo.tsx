import { Link } from '@remix-run/react';
import { Image } from './images/Image';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link to="/" className={className}>
      <Image
        src="/images/logo-full.png"
        alt="Tales of Murder"
        className="h-12 w-auto"
      />
    </Link>
  );
}; 