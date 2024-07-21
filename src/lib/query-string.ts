export default function makeQueryString(params: Record<string, any>): string {
  const queryString = Object.entries(params)
    .filter(([_, value]) => value != null && value !== '' && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return queryString ? `?${queryString}` : '';
}

export const addSearchParam = (param: {}, searchParams?: {}) => {
  const newParams = { ...searchParams, ...param };
  return makeQueryString(newParams);
};
