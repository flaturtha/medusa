import clsx from 'clsx';

export const HasSaleBadge = ({ className, endingSoon }: { className?: string; endingSoon?: boolean }) => {
  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-md border border-primary-600 bg-primary-50 px-1.5 py-0.5 text-xs font-bold text-primary-600',
        className,
      )}
    >
      {endingSoon ? <>Sale ends soon!</> : <>On sale!</>}
    </div>
  );
};
