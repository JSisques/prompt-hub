import { PropsWithChildren, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/language/i18n';

export function I18nProvider({ children }: PropsWithChildren) {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    const initI18n = async () => {
      await i18n.init();
      setIsI18nInitialized(true);
    };

    initI18n();
  }, []);

  if (!isI18nInitialized) {
    // Puedes mostrar un loading o null mientras se inicializa
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
