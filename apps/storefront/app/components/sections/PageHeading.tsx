import { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface PageHeadingProps extends HTMLAttributes<HTMLHeadingElement> {}

export const PageHeading: FC<PageHeadingProps> = ({ className, ...props }) => (
  <h1 className={clsx('max-w-full break-words text-4xl font-bold md:text-6xl font-ballet', className)} {...props} />
);
