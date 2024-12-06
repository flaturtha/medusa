import clsx from 'clsx';

export const SoldOutBadge = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-md border border-primary-700 bg-primary-50 px-1.5 py-0.5 text-xs font-bold text-primary-700',
        className,
      )}
    >
      Sold out
    </div>
  );
};
