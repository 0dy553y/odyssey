import React, { useEffect, useState } from 'react';
import packageJson from '../../../../package.json';

interface CacheContextInterface {
  isLatestVersion: boolean;
  refreshCacheAndReload: () => void;
}

const CacheContext = React.createContext<CacheContextInterface | undefined>(
  undefined
);

const CacheProvider: React.FC = (props) => {
  const [isLatestVersion, setIsLatestVersion] = useState<boolean>(true);

  const refreshCacheAndReload = () => {
    // Service worker cache should be cleared with caches.delete()
    if (caches) {
      // Service worker cache should be cleared with caches.delete()
      caches
        .keys()
        .then(async function (names) {
          for (const name of names) await caches.delete(name);
        })
        .then(() => {
          window.location.reload();
        });
    }
  };

  useEffect(() => {
    fetch('/meta.json')
      .then((response) => response.json())
      .then((meta) => {
        const latestVersion = meta.version;
        const currentVersion = packageJson.version;
        const shouldForceRefresh = semverGreaterThan(
          latestVersion,
          currentVersion
        );
        if (shouldForceRefresh) {
          setIsLatestVersion(false);
        }
      });
  }, []);

  const semverGreaterThan = (versionA: string, versionB: string) => {
    const versionsA = versionA.split(/\./g);

    const versionsB = versionB.split(/\./g);
    while (versionsA.length || versionsB.length) {
      const a = Number(versionsA.shift());

      const b = Number(versionsB.shift());
      // eslint-disable-next-line no-continue
      if (a === b) continue;
      // eslint-disable-next-line no-restricted-globals
      return a > b || isNaN(b);
    }
    return false;
  };

  return (
    <CacheContext.Provider
      value={{
        isLatestVersion,
        refreshCacheAndReload,
      }}
      {...props}
    />
  );
};

const useCache = (): CacheContextInterface => {
  const context = React.useContext(CacheContext);
  if (context === undefined) {
    throw new Error(`useCache must be used within a CacheProvider`);
  }
  return context;
};

export { CacheProvider, useCache };
