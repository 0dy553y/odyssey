export const getFirstPathSegment = (path: string): string => {
  return `/${path.split('/')[1]}`;
};
