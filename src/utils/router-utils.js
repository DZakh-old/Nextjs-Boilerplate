import Router from 'next/router';

import get from 'lodash/get';

export function isomorphicRedirect(route, ctx) {
  const { router } = Router;
  const isClient = !!router;
  const hasServerSideContext = ctx && ctx.req && ctx.res;

  if (!isClient && !hasServerSideContext) {
    return;
  }

  const currentRoute = (isClient ? get(router, 'route') : get(ctx, 'req.url')) || '';

  if (currentRoute === route) {
    return;
  }

  if (isClient) {
    Router.push(route);
  } else if (ctx.res) {
    ctx.res.writeHead(307, { Location: route });
    ctx.res.end();
  }
}
