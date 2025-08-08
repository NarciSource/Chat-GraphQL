type Tokens = {
  idToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

let tokens: Tokens = {
  idToken: null,
  accessToken: null,
  refreshToken: null,
};

try {
  const AUTH_PARCEL_URL = import.meta.env.VITE_AUTH_PARCEL_URL;

  if (!AUTH_PARCEL_URL) {
    throw new Error("AUTH_PARCEL_URL is not defined");
  }

  // 동적 모듈
  const { getTokens } = await import(/* @vite-ignore */ AUTH_PARCEL_URL);

  // getTokens 호출 및 토큰 추출
  tokens = await getTokens();
} catch (error) {
  console.error("Failed to retrieve tokens:", error);
}

export const { idToken, accessToken, refreshToken } = tokens;
