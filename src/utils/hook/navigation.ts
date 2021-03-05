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

export {
  useNavigationcomponentDidAppear,
  useNavigationcomponentDidDisappear,
  useChapterComponentColorDisable,
  useRegisterHistory,
  useMangaHistory,
  useMangaHistoryAll,
};
