import { UIMatch, useMatches } from '@remix-run/react';
import { RootLoaderResponse } from '@libs/util/server/root.server';

export const useRootLoaderData = () => {
  const matches = useMatches();
  const rootMatch = matches[0] as UIMatch<RootLoaderResponse>;

  return rootMatch.data;
};
