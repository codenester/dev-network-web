import { useMutation, useQuery } from "react-query";
import apiMap from "./api-map";
import postReq, { login, TLoginInput, TProviderAuthKey } from "./post-method";
import { TLoginResponse, TMe } from "../utilities/types";
type TResolve<T> = { onError?: (error: any) => void, onSuccess?: (data: T) => void }
export const useLogin = (resolve: TResolve<TLoginResponse>, key?: TProviderAuthKey) => useMutation((input?: TLoginInput) => login(input, key), { retry: false, ...resolve })
export const useLogout = (resolve: TResolve<string>) => useQuery(apiMap.query.logout.name, () => postReq(apiMap.query.logout.url), { enabled: false, retry: false, ...resolve })
export const useRefresh = (resolve: TResolve<Response>) => useQuery(apiMap.query.refresh.name, () => postReq(apiMap.query.refresh.url), { enabled: false, retry: false, ...resolve })
export const useMe = (resolve: TResolve<TMe>) => useQuery(apiMap.query.me.name, () => postReq<TMe>(apiMap.query.me.url), { enabled: false, retry: false, ...resolve })