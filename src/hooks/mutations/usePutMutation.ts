import { UseMutationParams, useMutationBase } from './useMutationBase';

export const usePutMutation = <TData extends { _id: string }, TVariables>(
  params: UseMutationParams<TData, TVariables>
) =>
  useMutationBase<TData, TVariables>({
    updater: (oldData, newData) =>
      oldData?.map((item) =>
        item._id === (newData as TData)._id ? (newData as TData) : item
      ) || [newData as TData],
    onSuccessText: 'Entry updated',
    ...params,
  });
