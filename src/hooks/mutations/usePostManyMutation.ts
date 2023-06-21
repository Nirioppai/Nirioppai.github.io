import { UseMutationParams, useMutationBase } from './useMutationBase';

export const usePostManyMutation = <TData, TVariables>(
  params: UseMutationParams<TData, TVariables>
) =>
  useMutationBase<TData, TVariables>({
    updater: (oldData, newData) => [
      ...(oldData || []),
      ...(newData as TData[]),
    ],
    onSuccessText: 'Entries added',
    ...params,
  });
