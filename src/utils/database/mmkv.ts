import MMKVStorage from 'react-native-mmkv-storage';

const MMKVwithIDCHapter = new MMKVStorage.Loader()
  .withInstanceID('mmkvWithIDCHapter')
  .initialize();

const MMKVwithChapterHistory = new MMKVStorage.Loader()
  .withInstanceID('mmkvWithChapterHistory')
  .initialize();

const MMKVWithToken = new MMKVStorage.Loader()
  .withInstanceID('mmkvWithToken')
  .withEncryption()
  .initialize();

const MMKVWithMangaDownload = new MMKVStorage.Loader()
  .withInstanceID('mmkvWithMangaDownload')
  .initialize();

const MMKVWithChapterDownload = new MMKVStorage.Loader()
  .withInstanceID('mmkvWithChapterDownload')
  .initialize();

export {
  MMKVwithIDCHapter,
  MMKVwithChapterHistory,
  MMKVWithToken,
  MMKVWithMangaDownload,
  MMKVWithChapterDownload,
};
