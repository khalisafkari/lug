export interface genres {
  id: number;
  name: string;
  slug: string;
  content: string;
  time: string;
}

export interface manga {
  id: number;
  name: string;
  slug: string;
  authors: string;
  trans_group: string;
  artists: string;
  magazine: string;
  released: number;
  other_name: string;
  genres: genres[];
  description: string | any;
  m_status: number;
  views: number;
  cover: string;
  last_update: string;
  post: string;
  last_chapter: number;
  submitter: number;
  group_uploader: number;
  hidden: number;
  favorite: number;
}

export interface content {
  id: number;
  name: string;
  slug: string;
  last_chapter: number;
  last_update: string;
  cover: string;
  views: number;
  post: string;
}

export interface chapter {
  id: number;
  manga: string;
  chapter: number;
  mid: number;
  views: number;
  name: string;
  last_update: string;
}

export interface manga_content {
  id: number;
  chapter: number;
  name: string;
  manga: string;
  views: number;
  last_update: string;
  content: string[];
  submitter: number;
  hidden: number;
}

export interface comments {
  id: number;
  c_id: number;
  manga: number;
  chapter: number;
  content: string;
  time: string;
  user_id: number;
  delete_comment: number;
  edited: number;
}

export interface isData {
  [key: string]: manga;
}
