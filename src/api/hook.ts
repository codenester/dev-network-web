import { UseQueryResult, useMutation, useQuery } from "react-query";
import apiMap from "./api-map";
import postReq, { LoginFunc, TLoginInput } from "./post-method";
import { TMe } from "../utilities/types";
import { auth } from "../main";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
type TResolve<T> = { onError?: (error: any) => void, onSuccess?: (data: T) => void }
export const useLogin = (resolve: TResolve<Response>) => useMutation(async (v: TLoginInput) => await LoginFunc(v), { onSuccess: resolve.onSuccess, retry: false, onError: resolve.onError })
export const useLogout = (resolve: TResolve<string>) => useQuery(apiMap.query.logout.name, postReq(apiMap.query.logout.url), { enabled: false, retry: false, onSuccess: resolve.onSuccess, onError: resolve.onError })
export const useRefresh = (resolve: TResolve<Response>) => useQuery(apiMap.query.refresh.name, postReq(apiMap.query.refresh.url), { enabled: false, retry: false, onSuccess: resolve.onSuccess, onError: resolve.onError })
export const useMe = (resolve: TResolve<TMe>) => useQuery(apiMap.query.me.name, postReq<TMe>(apiMap.query.me.url), { enabled: false, retry: false, onSuccess: resolve.onSuccess, onError: resolve.onError })
export const useFacebookLogin = (resolve: TResolve<any>) => {
  const res = useQuery('', () => { return '' }, { enabled: false });
  (async () => {
    try {
      res.isLoading = true
      const provider = new FacebookAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const token = await result.user.getIdToken()
      res.data = token
    } catch (e) {
      res.isLoading = false
      res.isError = true;
      res.error = e
    }
  })()
  return res
}