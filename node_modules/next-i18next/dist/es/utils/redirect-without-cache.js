export const redirectWithoutCache = (res, Location) => {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.setHeader('Expires', '-1');
  res.setHeader('Pragma', 'no-cache');
  res.writeHead(302, {
    Location
  });
  res.end();
};