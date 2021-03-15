import {MMKVWithToken} from '@utils/database/mmkv';
import instance from '@utils/instance';
import useSWR, {useSWRInfinite} from 'swr';
import {isData as dt, manga} from '../../../typed';
import {RouteDefault, RouteProtect} from 'utils/route';
import {ToastAndroid} from 'react-native';

interface post {
  manga: number | null;
  chapter?: number | null;
  data: string;
}

interface getToken {
  expiredAt: string;
  token: string;
}

interface country {
  city: string;
  country: string;
  lat: number;
  lon: number;
}

const saveToken = async (payload: getToken) => {
  try {
    const save: any = await MMKVWithToken.setMapAsync('token', payload);
    return save;
  } catch (e) {
    const error = new Error();
    error.message = 'failed';
    throw error;
  }
};

const getToken = async (): Promise<getToken | object | null> => {
  try {
    const token: any = await MMKVWithToken.getMapAsync('token');
    return token;
  } catch (e) {
    throw e;
  }
};

const findById = async (id: number) => {
  try {
    const token: any = await getToken();
    if (token) {
      const data = await instance.get(`/api/user/findbookid?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      return data.data;
    } else {
      const error: any = new Error('Not authorized!');
      error.status = 403;
      throw error;
    }
  } catch (e) {
    throw e;
  }
};

const useFindBookId = (id: number) => {
  const {data, error, mutate} = useSWR(`${id}`, findById);
  const isLoading = !data && !error;
  return {
    isLoading,
    mutate,
    isData: !error ? data && data.status : false,
    isError: error,
  };
};

const onLoginUser = async (email: string, password: string) => {
  try {
    const userIf = await instance.get(
      `/api/user/token?email=${email}&password=${password}`,
    );
    await saveToken(userIf.data);
    ToastAndroid.show('login success', ToastAndroid.SHORT);
    return userIf.data;
  } catch (e) {
    const error: any = new Error(e);
    error.message = 'failed';
    error.status = 404;
    throw error;
  }
};

const saveBookmarkId = async (id: number) => {
  try {
    const token: any = await getToken();
    if (token) {
      await instance.get(`/api/user/addbookid?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      return;
    }
    const error = new Error();
    error.message = 'failed token';
    throw error;
  } catch (e) {
    throw e;
  }
};

const removeBookmarkId = async (id: number) => {
  try {
    const token: any = await getToken();
    if (token) {
      await instance.get(`/api/user/delbookid?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      return;
    }
    const error = new Error();
    error.message = 'failed token';
    throw error;
  } catch (e) {
    throw e;
  }
};

const fetchAllBook = async (url: string) => {
  try {
    const token: any = await getToken();
    if (token) {
      const data = await instance.get(url, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      return data.data;
    }
    const error: any = new Error();
    error.message = 'failed token';
    error.status = 403;
    throw error;
  } catch (e) {
    throw e;
  }
};

const getIndexBook = (index: number, prev: any) => {
  if (prev && prev.total === 1) {
    return null;
  }
  if (prev && !prev.data.length) {
    return null;
  }
  return `/api/user/allbook?page=${index}`;
};

const useBook = () => {
  const {error, data, size, setSize, mutate} = useSWRInfinite(
    getIndexBook,
    fetchAllBook,
  );

  const isLoading = !data && !error;
  const isTotal = !isLoading ? data?.[0]?.total : null;
  const isContent = data ? data : [];
  const isEmpty = data ? data?.[0]?.data.length === 0 : false;

  const isData: dt = {};
  for (let i = 0; i < isContent?.length; i++) {
    const datas: manga[] = isContent[i].data;
    for (let d = 0; d < datas.length; d++) {
      isData[datas[d].slug] = datas[d];
    }
  }

  return {
    isLoading,
    isData,
    isError: error,
    isEmpty,
    isTotal,
    size,
    setSize,
    mutate,
  };
};

const onLogout = async () => {
  try {
    await MMKVWithToken.clearStore();
    return;
  } catch (e) {
    throw e;
  }
};

const onSendComment = async (t: post) => {
  try {
    const token: any = await getToken();
    if (token) {
      const post = await instance.post(
        `/api/manga/comment/${t.manga}${t.chapter ? `/${t.chapter}` : ''}`,
        {
          content: t.data,
          c_id: 0,
          delete_comment: 0,
          edited: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        },
      );
      return post.data;
    }
    const error: any = new Error();
    error.message = 'failed token';
    error.status = 403;
    throw error;
  } catch (e) {
    throw e;
  }
  //{"content":"khalis","c_id":0,"delete_comment":0,"edited":0}
  //http://localhost:3000/api/manga/comment/189
};

const getCountry = async () => {
  try {
    const country = await fetch('https://api-geolocation.zeit.sh/');
    const data = await country.json();
    return data;
  } catch (e) {
    throw e;
  }
};

const verifyCountry = (country: country) => {
  if (typeof country !== null) {
    if (
      country.country.toLowerCase() === 'indonesia' ||
      country.country.toLowerCase() === 'japan'
    ) {
      RouteDefault();
    } else {
      RouteProtect();
    }
  } else {
    RouteProtect();
  }
};

export {
  getToken,
  findById,
  useFindBookId,
  onLoginUser,
  saveToken,
  saveBookmarkId,
  removeBookmarkId,
  useBook,
  onLogout,
  onSendComment,
  getCountry,
  verifyCountry,
};
