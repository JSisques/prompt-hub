import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export type FormFieldContext<T extends FieldValues> = {
  field: ControllerRenderProps<T, any>;
};
