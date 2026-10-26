import {
    useMutation,
    useQueryClient,
} from "@tanstack/solid-query"
import type {
    QueryKey,
    MutationOptions,
} from "@tanstack/solid-query"
import { toast } from "@passui/solid/toast"

type OptimisticUpdate<TOptimisticData, TVariables> = {
    queryKey: QueryKey
    /** Applied to the cache immediately, before the mutation resolves. Rolled back if it errors. */
    updater: (
        old: TOptimisticData | undefined,
        variables: TVariables
    ) => TOptimisticData
}

type MutationContext<TOptimisticData> =
    | {
          previous: TOptimisticData | undefined
          next: TOptimisticData
      }
    | undefined

import { shouldRestoreOptimisticSnapshot } from "../../shared/optimistic"
export { shouldRestoreOptimisticSnapshot } from "../../shared/optimistic"

type AppMutationOptions<TData, TVariables, TOptimisticData> =
    Omit<
        MutationOptions<
            TData,
            Error,
            TVariables,
            MutationContext<TOptimisticData>
        >,
        "onSuccess" | "onError" | "onMutate" | "onSettled"
    > & {
        /** Query keys to invalidate once the mutation settles, win or lose. */
        invalidates?: QueryKey[]
        optimisticUpdate?: OptimisticUpdate<
            TOptimisticData,
            TVariables
        >
        successMessage?:
            | string
            | ((
                  data: NoInfer<TData>,
                  variables: NoInfer<TVariables>
              ) => string)
        successDescription?:
            | string
            | ((
                  data: NoInfer<TData>,
                  variables: NoInfer<TVariables>
              ) => string | undefined)
        errorMessage?: string
        onSuccess?: (
            data: NoInfer<TData>,
            variables: NoInfer<TVariables>
        ) => void
        onError?: (
            error: Error,
            variables: NoInfer<TVariables>
        ) => void
    }

// every domain mutation hook in both infra and www builds on this instead
// of calling useMutation directly; optimisticUpdate's rollback only
// restores the snapshot if nothing else wrote to the same queryKey in the
// meantime
export function useAppMutation<
    TData,
    TVariables = void,
    TOptimisticData = unknown,
>(
    getOptions: () => AppMutationOptions<
        TData,
        TVariables,
        TOptimisticData
    >
) {
    const q = useQueryClient()
    return useMutation<
        TData,
        Error,
        TVariables,
        MutationContext<TOptimisticData>
    >(() => {
        const {
            invalidates = [],
            optimisticUpdate,
            successMessage,
            successDescription,
            errorMessage,
            onSuccess,
            onError,
            ...options
        } = getOptions()
        return {
            ...options,
            onMutate: async (variables) => {
                if (!optimisticUpdate) return undefined
                const { queryKey, updater } = optimisticUpdate
                await q.cancelQueries({ queryKey })
                const previous =
                    q.getQueryData<TOptimisticData>(queryKey)
                const next = updater(previous, variables)
                q.setQueryData<TOptimisticData>(
                    queryKey,
                    next
                )
                return { previous, next }
            },
            onSuccess: (data, variables) => {
                if (successMessage) {
                    toast.success(
                        typeof successMessage === "function"
                            ? successMessage(data, variables)
                            : successMessage,
                        {
                            description:
                                typeof successDescription ===
                                "function"
                                    ? successDescription(
                                          data,
                                          variables
                                      )
                                    : successDescription,
                        }
                    )
                }
                onSuccess?.(data, variables)
            },
            onError: (error, variables, context) => {
                if (optimisticUpdate && context) {
                    const current = q.getQueryData(
                        optimisticUpdate.queryKey
                    )
                    // only roll back if nothing else has written to this key
                    // since our optimistic value landed, otherwise this would
                    // silently discard a concurrent mutation's newer change
                    if (
                        shouldRestoreOptimisticSnapshot(
                            current,
                            context.next
                        )
                    ) {
                        q.setQueryData(
                            optimisticUpdate.queryKey,
                            context.previous
                        )
                    }
                }
                toast.error(
                    errorMessage ?? "Something went wrong",
                    {
                        description: error.message,
                    }
                )
                onError?.(error, variables)
            },
            onSettled: () => {
                for (const queryKey of invalidates) {
                    void q.invalidateQueries({ queryKey })
                }
            },
        }
    })
}
