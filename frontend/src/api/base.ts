import axios, {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {
  ApiPromise,
  ApiResponse,
  EmptyPayload,
  StatusMessageType,
} from '../types/api';

const DEFAULT_API_RESPONSE: ApiResponse<EmptyPayload> = Object.freeze({
  payload: { data: {} },
  messages: [
    {
      content: 'Request failed. Please check your Internet connection.',
      type: StatusMessageType.Error,
    },
  ],
});

function getResponseMessages<D>(
  response: ApiResponse<D> | ApiResponse<EmptyPayload>
): string {
  return response.messages.map((message) => message.content).join('; ');
}

function processRequest<D>(
  endpoint: string,
  promise: AxiosPromise<ApiResponse<D>>
): ApiPromise<D> {
  // @ts-ignore: Catch block does not return any value since it throws an error
  return promise
    .then((response: AxiosResponse<ApiResponse<D>>) => {
      const apiResponse: ApiResponse<D> = response.data;
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.info(`[API] ${endpoint} : ${getResponseMessages(apiResponse)}`);
      }
      return apiResponse;
    })
    .catch((error: AxiosError<ApiResponse<D>>) => {
      const apiResponse: ApiResponse<D> | ApiResponse<EmptyPayload> =
        error.response?.data ?? DEFAULT_API_RESPONSE;
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(
          `[API] ${endpoint} : ${getResponseMessages(apiResponse)}`
        );
      }
      throw apiResponse;
    });
}

class BaseAPI {
  private client = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  });

  private clientGet<D, R>(
    url: string,
    params?: AxiosRequestConfig<D>
  ): AxiosPromise<ApiResponse<R>> {
    return this.client.get(url, params);
  }

  private clientPost<D, R>(url: string, data: D): AxiosPromise<ApiResponse<R>> {
    return this.client.post(url, data);
  }

  private clientPut<D, R>(url: string, data: D): AxiosPromise<ApiResponse<R>> {
    return this.client.put(url, data);
  }

  private clientPatch<D, R>(
    url: string,
    data: D
  ): AxiosPromise<ApiResponse<R>> {
    return this.client.patch(url, data);
  }

  private clientDelete<R>(url: string): AxiosPromise<ApiResponse<R>> {
    return this.client.delete(url);
  }

  protected get<D, R>(
    url: string,
    params?: AxiosRequestConfig<D>
  ): ApiPromise<R> {
    return processRequest(url, this.clientGet(url, params));
  }

  protected post<D, R>(url: string, data: D): ApiPromise<R> {
    return processRequest(url, this.clientPost(url, data));
  }

  protected put<D, R>(url: string, data: D): ApiPromise<R> {
    return processRequest(url, this.clientPut(url, data));
  }

  protected patch<D, R>(url: string, data: D): ApiPromise<R> {
    return processRequest(url, this.clientPatch(url, data));
  }

  protected delete<R>(url: string): ApiPromise<R> {
    return processRequest(url, this.clientDelete<R>(url));
  }
}

export default BaseAPI;
