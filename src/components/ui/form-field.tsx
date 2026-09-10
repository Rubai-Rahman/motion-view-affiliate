'use client';

import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

type FormFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: React.ReactNode;
  labelExtra?: React.ReactNode;
  required?: boolean;
  render: (
    field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>,
  ) => React.ReactNode;
};

export function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  labelExtra,
  required = false,
  render,
}: FormFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          {(label || labelExtra) && (
            <div className="flex items-center">
              {label && (
                <FieldLabel htmlFor={name}>
                  {label}
                  {required && <span className="ml-1 text-destructive">*</span>}
                </FieldLabel>
              )}

              {labelExtra}
            </div>
          )}

          {render(field)}

          {fieldState.error && (
            <FieldDescription className="text-destructive">
              {fieldState.error.message}
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
