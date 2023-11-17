"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  instance,
  signIn as doSignIn,
  signOut as doSignOut,
  refreshToken as doRefreshToken,
  getMe,
  verifyToken,
} from "../api";
import {
  AuthProviders,
  ObtainPairResponse,
  RefreshPairResponse,
  UserResponse,
} from "../api/types";
import axios from "axios";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";
import { getCookie } from "../helpers";

export interface Credentials {
  access: string;
  refresh: string;
}

export type Session =
  | {
      state: "loading";
    }
  | { state: "authenticating" }
  | { state: "unauthenticated" }
  | {
      state: "authenticated";
      credentials: Credentials;
    };

export type User = UserResponse;

export interface Auth {
  session: Session;
  user: User;
  next: string | null;
  authenticated: boolean;
  signIn: (
    args: AuthProviders,
    onSuccess: () => void,
    onFail: () => void,
  ) => void;
  signOut: () => void;
}

export const AuthContext = createContext<Auth>({
  session: { state: "loading" },
  user: {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  },
  next: null,
  authenticated: false,
  signIn(): void {},
  signOut(): void {},
});

const AuthProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const nullUser = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  };
  const [session, setSession] = useState<Session>({
    state: "loading",
  });
  const [next, setNext] = useState<string | null>(null);
  const [user, setUser] = useState<User>(nullUser);
  const [authenticated, setAuthenticated] =
    useState<boolean>(false);

  const searchParams = useSearchParams();

  const initSession = (auth: ObtainPairResponse) => {
    const { access, refresh } = auth;
    instance.defaults.headers.common[
      "authorization"
    ] = `Bearer ${access}`;
    setSession({
      state: "authenticated",
      credentials: {
        access,
        refresh,
      },
    });
  };

  const refreshSession = (auth: RefreshPairResponse) => {
    const { access, refresh } = auth;
    instance.defaults.headers.common[
      "authorization"
    ] = `Bearer ${access}`;
    setSession({
      state: "authenticated",
      credentials: {
        access,
        refresh,
      },
    });
  };

  const clearSession = () => {
    if (session.state === "authenticated")
      doSignOut({
        access: session.credentials.access,
        refresh: session.credentials.refresh,
      }).then(() => {
        delete instance.defaults.headers.common[
          "authorization"
        ];
        setSession({ state: "unauthenticated" });
        setUser(nullUser);
      });
  };

  const refreshToken = useCallback(async () => {
    const refresh = getCookie("refresh");
    if (refresh) {
      const authResponse = await doRefreshToken({
        refresh: refresh,
      });
      if (authResponse.status === 200) {
        refreshSession(authResponse.data);
        getMe().then((res) => {
          setUser(res.data);
        });
      } else {
        setSession({ state: "unauthenticated" });
      }
    }
  }, []);

  // This first effect runs only once in the application lifecycle.
  // It adds an interceptor to set the auth state back to unauthenticated
  // whenever we receive a 401 response.
  useEffect(() => {
    const handle = instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          !axios.isCancel(error) &&
          error.response.status === 401
        ) {
          setSession({
            state: "unauthenticated",
          });
        }
        return Promise.reject(error);
      },
    );
    return () =>
      instance.interceptors.response.eject(handle);
  }, []);

  // This second effect runs when the auth state changes.
  // It makes a request to the /api/users/auth endpoint if the auth state is loading.
  // If the response is a 401, the interceptor set up in the previous effect
  // will set the auth state to unauthenticated.
  useEffect(() => {
    if (session.state !== "loading") {
      return;
    }
    const access = getCookie("access");
    const refresh = getCookie("refresh");
    if (access && refresh) {
      instance.defaults.headers.common[
        "authorization"
      ] = `Bearer ${access}`;
      verifyToken({ token: access })
        .then(() => {
          setSession({
            state: "authenticated",
            credentials: {
              access,
              refresh,
            },
          });
          getMe().then((res) => {
            setUser(res.data);
          });
        })
        .catch(() => {
          refreshToken();
        });
    } else {
      setSession({ state: "unauthenticated" });
    }
  }, [session.state, refreshToken]);

  useEffect(() => {
    const referrer = searchParams.get("referrer");
    setNext(referrer);
  }, [searchParams]);

  useEffect(() => {
    setAuthenticated(session.state === "authenticated");
  }, [session.state]);

  const signIn = (
    args: AuthProviders,
    onSuccess: () => void,
    onFail: () => void,
  ) => {
    setSession({ state: "authenticating" });
    doSignIn(args)
      .then((authResponse) => {
        if (authResponse.status === 200) {
          initSession(authResponse.data);
        } else {
          setSession({ state: "unauthenticated" });
        }
      })
      .then(onSuccess)
      .then(() => {
        getMe().then((res) => {
          setUser(res.data);
        });
      })
      .catch(onFail);
  };

  const signOut = () => {
    clearSession();
  };

  const auth = {
    session,
    user,
    next,
    authenticated,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={auth}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const useCurrentUser = () => {
  const auth = useAuth();
  if (auth.session.state !== "authenticated") {
    throw Error("not signed in");
  }
  return { user: auth.user };
};

export default AuthProvider;
