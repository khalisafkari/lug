import {useLayoutEffect, useRef, useState} from 'react';
import {
  Navigation,
  ComponentDidDisappearEvent,
  ComponentDidAppearEvent,
} from 'react-native-navigation';
import triggerIfComponentIdMatches from './triggerIfComponentIdMatches';
import {MMKVwithIDCHapter, MMKVwithChapterHistory} from 'utils/database/mmkv';
import {manga} from '../../../typed';
import instance from 'utils/instance';
import useSWR from 'swr';
// @ts-ignore
import AppLovinMAX from 'react-native-applovin-max';

type EventHandlerComponentDidDisappearEvent = (
  event: ComponentDidDisappearEvent,
) => any;
type EventHandlerComponentDidAppearEvent = (
  event: ComponentDidAppearEvent,
) => any;

const fetcher = (url: string) => instance.get(url).then((res) => res.data);

export interface mangas extends manga {
  chapterId: number;
}

const useNavigationcomponentDidAppear = (
  handler: EventHandlerComponentDidAppearEvent,
  componentId: string,
) => {
  useLayoutEffect(() => {
    const subscribtion = Navigation.events().registerComponentDidAppearListener(
      (event) => triggerIfComponentIdMatches(handler, event, componentId),
    );
    return () => subscribtion.remove();
  }, [handler, componentId]);
};

const useNavigationcomponentDidDisappear = (
  handler: EventHandlerComponentDidDisappearEvent,
  componentId: string,
) => {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerComponentDidDisappearListener(
      (event) => triggerIfComponentIdMatches(handler, event, componentId),
    );
    return () => subscription.remove();
  }, [handler, componentId]);
};

const useChapterComponentColorDisable = (componentId: string, id: number) => {
  const status = useRef<boolean>(false);
  useNavigationcomponentDidAppear(() => {
    MMKVwithIDCHapter.getBool(`chapterId-${id}`, (error: any, _: any) => {
      if (error) {
        return;
      }
      status.current = true;
    });
  }, componentId);
  useNavigationcomponentDidDisappear(() => {
    MMKVwithIDCHapter.getBool(`chapterId-${id}`, (error: any, _: any) => {
      if (error) {
        return;
      }
      status.current = true;
    });
  }, componentId);
  return status.current;
};

const useRegisterHistory = (
  componentId: string,
  id: number,
  chapter: number,
  chapterId: number,
) => {
  const {data, error} = useSWR(`/api/manga/detail/${id}`, fetcher);

  useNavigationcomponentDidAppear(() => {
    if (!error) {
      if (data) {
        MMKVwithChapterHistory.setMap(
          `manga-${id}`,
          {
            ...data.content,
            last_chapter: chapter,
            last_update: `${new Date()}`,
            chapterId,
          },
          (err: any, _: any) => {
            if (err) {
              return;
            }
            return;
          },
        );
      }
    }
  }, componentId);
};

const useMangaHistory = (componentId: string, id: number) => {
  const [state, setState] = useState<mangas | null>();
  useNavigationcomponentDidAppear(() => {
    MMKVwithChapterHistory.getMap(`manga-${id}`, (error: any, results: any) => {
      if (error) {
        return;
      }
      setState(results);
    });
  }, componentId);
  return state;
};

const useMangaHistoryAll = (componentId: string) => {
  const [state, setstate] = useState<mangas[]>([]);
  useNavigationcomponentDidAppear(() => {
    MMKVwithChapterHistory.indexer.maps
      .getAll()
      .then((results: mangas[] | any) => {
        const todos: mangas[] = [];
        if (!results) {
          return;
        }
        for (let i = 0; i < results.length; i++) {
          todos.push(results[i][1]);
        }
        const sort = todos.sort((a, b) => {
          return (
            new Date(b.last_update).getTime() -
            new Date(a.last_update).getTime()
          );
        });
        setstate(sort);
      });
  }, componentId);
  return state;
};

const useAdsIntertitial = (component: string) => {
  const [retryAttempt, setRetryAttempt] = useState<number>(0);

  const initializeRewardedAds = () => {
    AppLovinMAX.addEventListener('OnRewardedAdLoadedEvent', () => {
      setRetryAttempt(0);
    });
    AppLovinMAX.addEventListener('OnRewardedAdLoadFailedEvent', () => {
      setRetryAttempt(retryAttempt + 1);
      var retryDelay = Math.pow(2, Math.min(6, retryAttempt));

      console.log(
        'Rewarded ad failed to load - retrying in ' + retryDelay + 's',
      );

      setTimeout(function () {
        loadRewardedAd();
      }, retryDelay * 1000);
    });
    AppLovinMAX.addEventListener('OnRewardedAdClickedEvent', () => {});
    AppLovinMAX.addEventListener('OnRewardedAdDisplayedEvent', () => {});
    AppLovinMAX.addEventListener('OnRewardedAdFailedToDisplayEvent', () => {
      loadRewardedAd();
    });
    AppLovinMAX.addEventListener('OnRewardedAdHiddenEvent', () => {
      loadRewardedAd();
    });
    AppLovinMAX.addEventListener('OnRewardedAdReceivedRewardEvent', () => {
      // Rewarded ad was displayed and user should receive the reward
    });
    loadRewardedAd();
  };

  const loadRewardedAd = () => {
    AppLovinMAX.loadRewardedAd('32e299e6aa39a5ba');
  };

  const removeListener = () => {
    AppLovinMAX.removeEventListener('OnRewardedAdLoadedEvent');
    AppLovinMAX.removeEventListener('OnRewardedAdLoadFailedEvent');
    AppLovinMAX.removeEventListener('OnRewardedAdClickedEvent');
    AppLovinMAX.removeEventListener('OnRewardedAdDisplayedEvent');
    AppLovinMAX.removeEventListener('OnRewardedAdFailedToDisplayEvent');
    AppLovinMAX.removeEventListener('OnRewardedAdHiddenEvent');
    AppLovinMAX.removeEventListener('OnRewardedAdReceivedRewardEvent');
  };

  useNavigationcomponentDidAppear(() => {
    initializeRewardedAds();
  }, component);

  useNavigationcomponentDidDisappear(() => {
    if (AppLovinMAX.isRewardedAdReady('32e299e6aa39a5ba')) {
      AppLovinMAX.showRewardedAd('32e299e6aa39a5ba');
    }
    removeListener();
  }, component);

  return;
};

export {
  useNavigationcomponentDidAppear,
  useNavigationcomponentDidDisappear,
  useChapterComponentColorDisable,
  useRegisterHistory,
  useMangaHistory,
  useMangaHistoryAll,
  useAdsIntertitial,
};
