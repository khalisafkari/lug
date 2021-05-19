import axios from 'axios';
import perf from '@react-native-firebase/perf';
import crashlytics from '@react-native-firebase/crashlytics';

const instance = axios.create({
  baseURL: 'https://beta.lovehug.net',
});

instance.defaults.headers['x-android'] = '#LPSOZnkZKfxcqGnj&euw@xU';
instance.defaults.headers['x-token-content'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYxMzM5MTU4NTQ4NywiaWF0IjoxNjEzMzkxNTg1LCJleHAiOjE2MTU5ODM1ODV9.UHR4gRqCXtUNlgC-FphjDNMMRn8XtBOL4M_K2Ihop6w';

instance.interceptors.request.use(
  async (config: any) => {
    try {
      const httpMetric = perf().newHttpMetric(config.url, config.method);
      config.metadata = {httpMetric};
      await httpMetric.start();
    } finally {
      return config;
    }
  },
  (error) => {
    crashlytics().recordError(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async (response: any) => {
    try {
      const {httpMetric} = response.config.metadata;
      httpMetric.setHttpResponseCode(response.status);
      httpMetric.setResponseContentType(response.headers['content-type']);
      await httpMetric.stop();
    } finally {
      return response;
    }
  },
  async (error: any) => {
    try {
      const {httpMetric} = error.config.metadata;
      httpMetric.setHttpResponseCode(error.response.status);
      httpMetric.setResponseContentType(error.response.headers['content-type']);
      await httpMetric.stop();
    } finally {
      crashlytics().recordError(error);
      return Promise.reject(error);
    }
  },
);

export default instance;
