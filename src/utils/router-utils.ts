import Router, { useRouter } from 'next/router';

import replace from 'lodash/replace';

import { TODO_ANY } from '@/interfaces';

type RouteType = string;

interface IMoveToRoute {
  (route: RouteType): void;
}
interface ISwitchToRoute {
  (route: RouteType): void;
}
interface IUseRouterUtils {
  (): { currentRoute: RouteType; moveToRoute: IMoveToRoute; switchToRoute: ISwitchToRoute };
}
interface IIsomorphicRedirect {
  (route: RouteType, ctx: TODO_ANY): void;
}

const routeRegex = /\/[^/]*$/;

const cutOffLastRoute = (pathname: string) => {
  return replace(pathname, routeRegex, '');
};

const useRouterUtils: IUseRouterUtils = () => {
  const router = useRouter();

  const curPathname = router?.pathname || '';
  const currentRoute = (curPathname.match(routeRegex) || [])[0] || '';

  const moveToRoute: IMoveToRoute = (route) => {
    router.push(`${router.pathname}${route}`, `${global.window.location.pathname}${route}`);
  };

  const switchToRoute: ISwitchToRoute = (route) => {
    router.push(
      `${cutOffLastRoute(router.pathname)}${route}`,
      `${cutOffLastRoute(global.window.location.pathname)}${route}`
    );
  };

  return { currentRoute, moveToRoute, switchToRoute };
};

const isomorphicRedirect: IIsomorphicRedirect = (route, ctx) => {
  const { router } = Router;
  const isClient = !!router;
  const hasServerSideContext = ctx && ctx.req && ctx.res;

  if (!isClient && !hasServerSideContext) {
    return;
  }

  const currentRoute: RouteType = (isClient ? router?.route : ctx?.req?.url) || '';

  if (currentRoute === route) {
    return;
  }

  if (isClient) {
    Router.push(route);
  } else if (ctx.res) {
    ctx.res.writeHead(307, { Location: route });
    ctx.res.end();
  }
};

export { useRouterUtils, isomorphicRedirect };
