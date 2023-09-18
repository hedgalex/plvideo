import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { IState, useAppDispatch } from '~store/index';
import { clearErrors } from '~store/errorSlice';

export const useError = () => {
  const dispatch = useAppDispatch();
  const { errors } = useSelector((state: IState) => state.errors);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (errors?.length) {
      errors.forEach((error: string) => {
        enqueueSnackbar(error, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      });

      dispatch(clearErrors());
    }
  }, [errors, enqueueSnackbar, dispatch]);
};
