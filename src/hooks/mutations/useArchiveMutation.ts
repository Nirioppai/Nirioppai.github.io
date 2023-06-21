import { UseMutationParams, useMutationBase } from './useMutationBase';

export const useArchiveMutation = <
  TData extends { _id: string },
  TVariables extends string
>(
  params: UseMutationParams<TData, TVariables>
) =>
  useMutationBase<TData, TVariables>({
    updater: (oldData, newData, variables) =>
      oldData?.filter((item) => item._id !== variables) || [],
    onSuccessText: 'Entry archived',
    ...params,
  });
