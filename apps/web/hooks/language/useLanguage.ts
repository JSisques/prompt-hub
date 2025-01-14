import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return {
    changeLanguage,
    currentLanguage,
    languages: ['es', 'en'],
  };
};
