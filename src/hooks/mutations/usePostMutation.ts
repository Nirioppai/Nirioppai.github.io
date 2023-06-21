import { UseMutationParams, useMutationBase } from './useMutationBase';

export const usePostMutation = <TData, TVariables>(
  params: UseMutationParams<TData, TVariables>
) =>
  useMutationBase<TData, TVariables>({
    updater: (oldData, newData) => [...(oldData || []), newData as TData],
    onSuccessText: 'Entry added',
    ...params,
  });
