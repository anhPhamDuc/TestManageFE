/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

function PhoneNumberField({ form, name, label, disabled, readonly }) {
    const { formState } = form;
    const { errors } = formState;
    const hasError = errors[name];

    return (
        <div>
            <Controller
                control={form.control}
                name={name}
                render={({
                    field: { onChange, onBlur, name, value },
                }) => (
                    <InputMask
                        mask="999-999-9999"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}

                    >
                        {() => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label={label}
                                id={name}
                                error={!!hasError}
                                helperText={errors[name]?.message}
                                margin='normal'
                                disabled={disabled}
                                InputProps={{
                                    readOnly: readonly // Sử dụng prop readonly được truyền vào từ component gốc
                                }}
                            />
                        )}
                    </InputMask>
                )}
            />
        </div>
    );
}

export default PhoneNumberField;