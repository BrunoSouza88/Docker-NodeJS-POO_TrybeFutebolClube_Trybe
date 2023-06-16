export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T
};

export type ServiceResponseSameTeam = {
  status: 'SAME_TEAMS',
  data: ServiceMessage
};

export type ServiceResponseCreate<T> = {
  status: 'CREATED',
  data: T
};

export type ServiceResponse<T> =
ServiceResponseError |
ServiceResponseSuccess<T> |
ServiceResponseSameTeam |
ServiceResponseCreate<T>;
