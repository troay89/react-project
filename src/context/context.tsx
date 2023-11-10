import React, { createContext, useContext, useEffect, useState } from 'react';
import { CharacterI, ContentI, SEARCH_VALUE } from '../models/models';
import { useSearchParams } from 'react-router-dom';

interface AuthContextProps {
  content: ContentI | null;
  setContent: React.Dispatch<React.SetStateAction<ContentI | null>>;
  contentCharacter: CharacterI | null;
  setContentCharacter: React.Dispatch<React.SetStateAction<CharacterI | null>>;
  searchCharacter: string | null;
  searchPage: string | null;
  sendSearch: (search: string) => void;
  sendNumberPage: (numberPage: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: AuthProviderProps): React.ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState<null | ContentI>(null);
  const [contentCharacter, setContentCharacter] = useState<null | CharacterI>(
    null
  );

  const searchCharacter = searchParams.get('character');
  const searchPage = searchParams.get('page');

  useEffect(() => {
    if (!searchCharacter && !searchPage) {
      searchParams.set('character', localStorage.getItem(SEARCH_VALUE) ?? '');
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  }, [searchCharacter, searchPage, searchParams, setSearchParams]);

  const sendSearch = (search: string) => {
    searchParams.set('character', search.trim());
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const sendNumberPage = (numberPage: string) => {
    searchParams.set('page', numberPage.toString());
    setSearchParams(searchParams);
  };

  return (
    <AuthContext.Provider
      value={{
        searchCharacter,
        searchPage,
        content,
        contentCharacter,
        setContentCharacter,
        setContent,
        sendSearch,
        sendNumberPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useDate = (): AuthContextProps | null => {
  return useContext(AuthContext);
};

export { AuthProvider, useDate };
export type { AuthContextProps };
