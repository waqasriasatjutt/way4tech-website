// www.way4tech.com serves the same site as way4tech.com, which splits ranking
// signals between two hosts. Send every www request to the apex with a 301.
export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  if (url.hostname === 'www.way4tech.com') {
    url.hostname = 'way4tech.com';
    return Response.redirect(url.toString(), 301);
  }
  return next();
};
