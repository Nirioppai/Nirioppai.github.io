import { useSnackbar } from 'notistack';
import {
  MutationFunction,
  MutationOptions,
  QueryClient,
  QueryKey,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from 'react-query';

export interface UseMutationParams<TData, TVariables>
  extends MutationOptions<TData, unknown, TVariables, unknown> {
  queryKey: QueryKey;
  mutationFn: MutationFunction<TData, TVariables>;
  onSuccess?: (data: TData) => void;
  onSuccessText?: string;
  onSuccessAction?: (
    data: TData,
    otherData: { queryClient: QueryClient }
  ) => void;
  disableErrorSnackbar?: boolean;
  onError?: (error: unknown) => void;
}

interface UseMutationBaseParams<TData, TVariables>
  extends UseMutationParams<TData, TVariables> {
  updater: (
    oldData: TData[] | undefined,
    newData: TData | TData[],
    variables: TVariables
  ) => TData[];
}

export const useMutationBase = <TData, TVariables>({
  queryKey,
  mutationFn,
  onSuccess,
  onSuccessText,
  onSuccessAction,
  disableErrorSnackbar,
  onError,
  updater,
  ...rest
}: UseMutationBaseParams<TData, TVariables>): UseMutationResult<
  TData,
  unknown,
  TVariables,
  unknown
> => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(mutationFn, {
    onSuccess: (data, variables) => {
      onSuccess
        ? onSuccess(data)
        : queryClient.setQueryData<TData[]>(queryKey, (oldData) =>
            updater(oldData, data, variables)
          );
      if (onSuccessText) enqueueSnackbar(onSuccessText, { variant: 'success' });
      onSuccessAction?.(data, { queryClient });
    },
    onError: (err: any) => {
      if (!disableErrorSnackbar)
        enqueueSnackbar(err?.message || 'Something went wrong.', {
          variant: 'error',
        });
      onError?.(err);
    },
    ...rest,
  });
};
