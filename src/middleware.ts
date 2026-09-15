import { defineMiddleware } from 'astro:middleware';
import { canonicalRedirectTarget } from './lib/canonical';
import { resolveBaseUrl } from './config';

/**
 * 301-redirects every non-canonical URL (www host, http, missing trailing
 * slash) to its canonical form. The rules live in lib/canonical.ts; hosts other
 * than the production domain are left alone so `astro dev` and `wrangler dev`
 * on localhost keep working.
 */
export const onRequest = defineMiddleware((context, next) => {
  const target = canonicalRedirectTarget(context.request.url, resolveBaseUrl());
  return target ? context.redirect(target, 301) : next();
});
