// components/form-field.tsx
'use client';

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

type FormFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: React.ReactNode;
  labelExtra?: React.ReactNode; // e.g. "Forgot password?" link
  render: (field: {
    value: any;
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    name: string;
    ref: React.Ref<any>;
  }) => React.ReactNode;
};

export function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  labelExtra,
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
              {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
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
