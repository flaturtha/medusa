import { type FC, Fragment, useState } from 'react';
import clsx from 'clsx';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import { useSiteDetails } from '@app/hooks/useSiteDetails';
import { IconButton } from '@app/components/common/buttons';
import { URLAwareNavLink } from '@app/components/common/link';

export interface HeaderSideNavProps {
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  activeSection?: string | null;
}

const navigationItems = [
  {
    id: 'shop',
    label: 'SHOP',
    url: '/products',
    new_tab: false,
    submenu: [
      {
        id: 'collections',
        label: 'BROWSE COLLECTIONS',
        url: '/collections',
        new_tab: false,
      },
      {
        id: 'featured',
        label: 'FEATURED TITLES',
        url: '/featured',
        new_tab: false,
      },
    ],
  },
  {
    id: 'mission',
    label: 'OUR MISSION',
    url: '/our-mission',
    new_tab: false,
  },
  {
    id: 'murderwiki',
    label: 'MURDERWIKI',
    url: '/murderwiki',
    new_tab: false,
  },
  {
    id: 'free-novel',
    label: 'GET A FREE NOVEL',
    url: '/free-novel',
    new_tab: false,
    highlight: true,
  },
];

export const HeaderSideNav: FC<HeaderSideNavProps> = ({ open, setOpen, activeSection }) => {
  return (
    <Transition.Root show={!!open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary-700/75 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-200"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-primary-700 text-primary-50">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-display tracking-wider">NAVIGATION</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <IconButton
                            icon={XMarkIcon}
                            onClick={() => setOpen(false)}
                            className="-m-2 text-primary-50 hover:text-primary-100"
                            aria-label="Close panel"
                          />
                        </div>
                      </div>

                      <div className="flex flex-grow flex-col overflow-y-auto pb-4">
                        <div className="mt-5 flex flex-grow flex-col">
                          <nav className="flex-1 space-y-1" aria-label="Sidebar">
                            {navigationItems.map((item) => (
                              <div key={item.id}>
                                {item.submenu ? (
                                  <Disclosure>
                                    {({ open }) => (
                                      <>
                                        <Disclosure.Button
                                          className={clsx(
                                            'group flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-sm font-normal',
                                            'text-primary-50 hover:bg-primary-600/50 hover:text-primary-100'
                                          )}
                                        >
                                          <span>{item.label}</span>
                                          <ChevronDownIcon
                                            className={clsx(
                                              'ml-2 h-5 w-5 transition-transform',
                                              open && 'rotate-180'
                                            )}
                                          />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="space-y-1 px-4">
                                          {item.submenu.map((subItem) => (
                                            <URLAwareNavLink
                                              key={subItem.id}
                                              {...subItem}
                                              onClick={() => setOpen(false)}
                                              className="block rounded-md py-2 pl-4 text-sm text-primary-50 hover:bg-primary-600/50 hover:text-primary-100"
                                            >
                                              {subItem.label}
                                            </URLAwareNavLink>
                                          ))}
                                        </Disclosure.Panel>
                                      </>
                                    )}
                                  </Disclosure>
                                ) : (
                                  <URLAwareNavLink
                                    {...item}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                      clsx(
                                        'group flex items-center rounded-md px-4 py-3 text-sm font-normal',
                                        item.highlight
                                          ? 'bg-primary-600/50 text-primary-50 hover:text-primary-100'
                                          : isActive
                                          ? 'bg-primary-600/50 text-primary-100'
                                          : 'text-primary-50 hover:bg-primary-600/50 hover:text-primary-100'
                                      )
                                    }
                                  >
                                    <span className="flex-1">{item.label}</span>
                                  </URLAwareNavLink>
                                )}
                              </div>
                            ))}
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
