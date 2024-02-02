export const getPage = (page: number, limit: number) => (page - 1) * limit;

export const totalPages = (count: number, limit: number) =>
  Math.ceil(count / limit);
