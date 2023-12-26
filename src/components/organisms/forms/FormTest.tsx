'use client';

// https://codesandbox.io/p/sandbox/react-hook-form-v7-controller-ts-jwyzw?file=%2Fsrc%2Findex.tsx%3A254%2C30-254%2C35

import { Controller, DefaultValues, NestedValue, useForm, SubmitHandler } from 'react-hook-form';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const optionSamples = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other' },
];

export type FormValues = {
  example: string;
  exampleRequired: string;
  currentName: string;
  gender: string;
};

export const defaultValues: DefaultValues<FormValues> = {
  example: '',
  exampleRequired: '',
  currentName: '',
  gender: optionSamples[0].value,
};

export default function FormTest() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField {...register('example')} />
      </div>
      <div>
        <TextField {...register('exampleRequired', { required: true })} />
        {errors.exampleRequired?.type === 'required' && <p role='alert'>exampleRequired is required</p>}
      </div>

      <div>
        <Controller
          name='currentName'
          control={control}
          render={({ field }) => <TextField {...field} autoComplete='off' />}
          rules={{
            validate: {
              required: value => {
                if (value === 'SomeValue') return 'Some Message';
                if (!value) return '*Required';
              },
            },
            maxLength: 15,
          }}
          defaultValue=''
        />
        {JSON.stringify(errors.currentName)}
      </div>

      <Controller
        render={({ field }) => (
          <Select {...field}>
            {optionSamples?.map(item => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        )}
        name='gender'
        control={control}
        rules={{ required: true }}
      />

      <div>
        <Button type='submit'>Submit</Button>
      </div>
      <div>
        <Button
          onClick={() => {
            reset(defaultValues);
          }}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
