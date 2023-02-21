import { useMutation, useQuery } from "react-query";
import apiMap from "./api-map";
import postReq, { LoginFunc, TLoginInput } from "./post-method";
import { TMe } from "../utilities/types";
type TResolve<T> = { onError?: (error: any) => void, onSuccess?: (data: T) => void }
export const useLogin = (resolve: TResolve<Response>) => useMutation(async (v: TLoginInput) => await LoginFunc(v), { onSuccess: resolve.onSuccess, retry: false, onError: resolve.onError })
export const useLogout = (resolve: TResolve<string>) => useQuery(apiMap.query.logout.name, postReq(apiMap.query.logout.url), { enabled: false, retry: false, onSuccess: resolve.onSuccess, onError: resolve.onError })
export const useRefresh = (resolve: TResolve<Response>) => useQuery(apiMap.query.refresh.name, postReq(apiMap.query.refresh.url), { enabled: false, retry: false, onSuccess: resolve.onSuccess, onError: resolve.onError })
export const useMe = (resolve: TResolve<TMe>) => useQuery(apiMap.query.me.name, postReq<TMe>(apiMap.query.me.url), { enabled: false, retry: false, onSuccess: resolve.onSuccess, onError: resolve.onError })