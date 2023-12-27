'use client';

// https://codesandbox.io/p/sandbox/react-hook-form-v7-controller-ts-jwyzw?file=%2Fsrc%2Findex.tsx%3A254%2C30-254%2C35
import React, { useState, useTransition } from 'react';
import { useTimeout } from 'usehooks-ts';
import { Controller, DefaultValues, useForm, SubmitHandler } from 'react-hook-form';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { NumericFormat } from 'react-number-format';

type OptionsType = {
  value?: unknown;
  label?: string;
  [key: string]: any;
};

export type FormValues = {
  example: string;
  exampleRequired: string;
  currentName: string;
  currentAmount: string;
  gender: string;
};

const defaultValues: DefaultValues<FormValues> = {
  example: '',
  exampleRequired: '',
  currentName: '',
  currentAmount: '1000',
  gender: '',
};

export default function FormTest() {
  console.log('FORMTEST');
  const [menuItems, setMenuItems] = useState<OptionsType>([]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });

  const merge = () => {
    const options = [
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' },
      { value: 'other', label: 'Other' },
    ];
    setMenuItems(options);
    reset({
      ...defaultValues,
      gender: options[0].value,
    });
  };

  useTimeout(merge, 3000);

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
        />
      </div>

      <div>
        <Controller
          render={({ field }) => (
            <Select {...field}>
              {menuItems?.map((item: any) => (
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
      </div>

      <div>
        <Controller
          render={({ field: { onChange, name, value } }) => (
            <NumericFormat
              name={name}
              value={value}
              onChange={onChange}
              customInput={TextField}
              thousandSeparator={true}
              autoComplete='off'
            />
          )}
          name='currentAmount'
          control={control}
        />
      </div>

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
