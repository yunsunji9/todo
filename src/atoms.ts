import { atom, selector } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'todoStorage',
  storage: localStorage
});

export interface ITodoItem {
  id: number;
  text: string;
  category: string;
}

export enum ITheme {
  'Dark' = 'Dark',
  'Light' = 'Light',
}

export const themeState = atom<ITheme>({
  key: 'themeState',
  default: ITheme.Light,
  effects_UNSTABLE: [persistAtom]
})

export const todosState = atom<ITodoItem[]>({
  key: 'todosState',
  default: [
    {
      id: 1,
      text: '노마드 챌린지',
      category: 'TO_DO'
    },
    {
      id: 3,
      text: '투두',
      category: 'DOING'
    },
    {
      id: 2,
      text: '정리',
      category: 'TO_DO'
    },
    {
      id: 4,
      text: '배포',
      category: 'DONE'
    }
  ],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<string>({
  key: 'categoryState',
  default: 'TO_DO',
  effects_UNSTABLE: [persistAtom],
});

export const categoriesState = atom<string[]>({
  key: 'categoriesState',
  default: ['TO_DO', 'DOING', 'DONE'],
  effects_UNSTABLE: [persistAtom],
})

export const todoSelector = selector({
  key: 'todosSelector',
  get: ({ get }) => {
    const todos = get(todosState);
    const categories = get(categoriesState);

    const categoriesTodo = categories.map((category) => todos.filter((todo) => todo.category === category));

    const result = categories.reduce((acc: any, curr: any, idx: any) => {
      acc[curr] = categoriesTodo[idx];
      return acc;
    }, new Object);
    
    return result
  }
})
