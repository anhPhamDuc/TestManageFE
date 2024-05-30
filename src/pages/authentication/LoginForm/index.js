/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../components/FormControl/InputField';
import PasswordField from '../../../components/FormControl/PasswordField';
import { useSnackbar } from 'notistack';

LoginForm.propTypes = {};

function LoginForm(props) {
  const { enqueueSnackbar } = useSnackbar();
  const showNotification = (message, type) => {
    enqueueSnackbar(message, { variant: type })
  }

  const onSubmit = async (values) => {
    showNotification('Xin chào, ' + values.email, "success");
  };

  const validationSchema = yup.object({
    email: yup.string().required('Nhập vào địa chỉ email!').email('Email chưa đúng định dạng'),
    password: yup.string().required('Required').min(3, 'Mat khau phai lon hon 3 ky tu')
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(validationSchema)
  });

  return (
    <div>
      <Container component="main">
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >

          <Typography component="h1" variant="h5">
            ĐĂNG NHẬP HỆ THỐNG
          </Typography>
          <Box component="form" onSubmit={form.handleSubmit(onSubmit)} style={{ minWidth: '400px' }}>
            <InputField form={form} name="email" label="Tên tài khoản: " />
            <PasswordField form={form} name='password' label='Mật khẩu:' />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default LoginForm;
