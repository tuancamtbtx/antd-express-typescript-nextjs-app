export const nextI18NextRewrites = localeSubpaths => {
  let rewrites = [];

  if (localeSubpaths !== null && typeof localeSubpaths === 'object') {
    const subpaths = Object.values(localeSubpaths);

    for (const value of subpaths) {
      rewrites = [...rewrites, {
        source: `/:lang(${value}){/}?`,
        destination: '/'
      }, {
        source: `/:lang(${value})/:path*`,
        destination: '/:path*'
      }];
    }
  }

  return rewrites;
};