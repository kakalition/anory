export type BaseUseCase = (
  payload: any,
  onSuccess: (() => void) | null,
  onFailed: (() => void) | null
) => void;
