import { useQueryClient } from '@tanstack/react-query';
import { revalidateAllData } from 'app/lib/server.util';

const useClearCacheData = (): (() => void) => {
  const queryClient = useQueryClient();

  const clearData = (): void => {
    revalidateAllData();
    queryClient.clear();
  };

  return clearData;
};

export default useClearCacheData;
