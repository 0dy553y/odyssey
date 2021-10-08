import axios, {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import Cookies from 'js-cookie';
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Catch block does not return any value since it throws an error
  return promise
    .then((response: AxiosResponse<ApiResponse<D>>) => {
      const apiResponse: ApiResponse<D> = response.data;
      if (process.env.NODE_ENV === 'development') {
        console.info(`[API] ${endpoint} : ${getResponseMessages(apiResponse)}`);
      }
      return apiResponse;
    })
    .catch((error: AxiosError<ApiResponse<D>>) => {
      const apiResponse: ApiResponse<D> | ApiResponse<EmptyPayload> =
        error.response?.data ?? DEFAULT_API_RESPONSE;
      if (process.env.NODE_ENV === 'development') {
        console.error(
          `[API] ${endpoint} : ${getResponseMessages(apiResponse)}`
        );
      }
      throw apiResponse;
    });
}

function setAuthHeaders(requestConfig: AxiosRequestConfig) {
  const rawAuthHeaders = Cookies.get('authHeaders');
  if (!rawAuthHeaders) {
    return requestConfig;
  }

  const authHeaders = JSON.parse(rawAuthHeaders);
  requestConfig.headers = {
    client: authHeaders['client'],
    'access-token': authHeaders['access-token'],
    uid: authHeaders['uid'],
    'token-type': authHeaders['token-type'],
    expiry: authHeaders['expiry'],
  };

  return requestConfig;
}

function saveAuthHeaders(resp: AxiosResponse) {
  if (resp.headers['access-token']) {
    Cookies.set(
      'authHeaders',
      JSON.stringify({
        'access-token': resp.headers['access-token'],
        client: resp.headers['client'],
        uid: resp.headers['uid'],
        'token-type': resp.headers['token-type'],
        expiry: resp.headers['expiry'],
      })
    );
  }
  return resp;
}

class BaseAPI {
  private static initialiseClient() {
    const client = axios.create({
      baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    });

    client.interceptors.request.use(
      (requestConfig) => setAuthHeaders(requestConfig),
      (error) => {
        return Promise.reject(error);
      }
    );

    client.interceptors.response.use(
      (resp) => saveAuthHeaders(resp),
      (error) => {
        return Promise.reject(error);
      }
    );

    return client;
  }

  private client = BaseAPI.initialiseClient();

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
