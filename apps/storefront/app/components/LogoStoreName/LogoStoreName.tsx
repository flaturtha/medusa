import type { FC, PropsWithChildren } from 'react';
import { Link } from '@remix-run/react';
import clsx from 'clsx';
import { useSiteDetails } from '@app/hooks/useSiteDetails';

const LogoHeader: FC<PropsWithChildren & { primary: boolean | undefined; className: string }> = ({
  primary,
  className,
  ...rest
}) => (
  primary ? (
    <h1 className={clsx('logo-header heading-display', className)} {...rest} />
  ) : (
    <h2 className={clsx('heading-display', className)} {...rest} />
  )
);

export const LogoStoreName: FC<{ primary?: boolean; className?: string }> = ({ primary, className }) => {
  const { store, settings } = useSiteDetails();

  if (!store || !settings) return null;

  return (
    <Link
      viewTransition
      to="/"
      prefetch="viewport"
      className={clsx('logo-header flex flex-nowrap items-center justify-center', className)}
    >
      <LogoHeader 
        primary={primary} 
        className="text-xl md:text-3xl font-bold text-primary-50 hover:text-primary-100 transition-colors whitespace-nowrap"
      >
        TALES OF MURDER
      </LogoHeader>
    </Link>
  );
};
