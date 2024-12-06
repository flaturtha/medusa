import clsx from 'clsx';
import type { CustomAction, ImageField } from '@libs/types';
import { ActionList } from '@app/components/common/actions-list/ActionList';
import { Container } from '@app/components/common/container/Container';
import type { FC, ReactNode } from 'react';

export const Hero: FC<{
  title?: string;
  content?: ReactNode;
  actions?: CustomAction[];
  image?: ImageField;
  className?: string;
  backgroundClassName?: string;
  actionsClassName?: string;
}> = ({ title, content, actions, image, className, backgroundClassName, actionsClassName }) => {
  return (
    <section className={clsx('w-full relative', className)}>
      <div
        className={clsx(
          'absolute inset-0 w-full h-full z-0 bg-cover bg-top bg-no-repeat',
          backgroundClassName,
        )}
        style={{
          backgroundImage: image?.url ? `url(${image.url})` : undefined,
        }}
      />
      <Container className="relative z-10">
        <div className="relative z-10 w-full text-white">
          <div className="inline-grid gap-6 w-full">
            {title && <div className="break-words">{title}</div>}
            {typeof content === 'string' ? <div className="text-lg w-full">{content}</div> : content}
          </div>

          {!!actions?.length && (
            <ActionList actions={actions} className={clsx('mt-8 lg:mt-10 flex-col', actionsClassName)} />
          )}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
