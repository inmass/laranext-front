import { GetRequestParams } from '@/lib/api-params';

export function buildApiParams(
  queryParams: GetRequestParams
): Record<string, string | number | boolean> {
  const {
    page,
    perPage,
    sort,
    filters,
    include,
    fields,
    noPagination,
    aditionalParams,
  } = queryParams;

  const params: Record<string, string | number> = {
    page,
    per_page: perPage || 10,
  };

  if (sort) {
    params.sort = `${sort.direction === 'asc' ? '' : '-'}${sort.key}`;
  }

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[`filter[${key}]`] = value;
      }
    });
  }

  if (include && include.length > 0) {
    params.include = include.join(',');
  }

  if (fields && fields.length > 0) {
    params.fields = fields.join(',');
  }

  if (noPagination) {
    params.no_pagination = '';
  }

  if (aditionalParams) {
    Object.entries(aditionalParams).forEach(([key, value]) => {
      params[key] = value;
    });
  }

  return params;
}
