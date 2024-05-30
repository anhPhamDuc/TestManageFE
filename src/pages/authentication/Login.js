/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
// Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../../components/FormControl/InputField';
import PasswordField from '../../components/FormControl/PasswordField';
import { useSnackbar } from 'notistack';
import Loadable from 'components/Loadable';
import { lazy } from 'react';
import { Redirect } from 'react-router';
import { useNavigate } from 'react-router-dom'
import { login, logout } from '../../store/reducers/account'
import { useDispatch } from '../../../node_modules/react-redux/dist/react-redux';
import { useEffect, useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// ================================|| LOGIN ||================================ //


function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const showNotification = (message, type) => {
    enqueueSnackbar(message, { variant: type })
  }

  const validationSchema = yup.object({
    email: yup.string().required('Nhập vào tên tài khoản!'),
    password: yup.string().required('Chưa nhập mật khẩu').min(3, 'Mat khau phai lon hon 3 ky tu')
  });

  useEffect(() => {
    console.log('logOut');
    localStorage.removeItem("User");
    const item = logout();
    dispatch(item);
  }, [])

  const onSubmit = async (values) => {
    // Kiểm tra tài khoản
    values.TypeAccount = valueType;
    values.Name = values.email;
    values.Password = values.password;
    const action = login(values);
    const resultAction = await dispatch(action);
    if (resultAction.payload != null) {
      showNotification('Xin chào, ' + values.email, "success");
      // Redirect to Home page
      navigate('/dashboard/default');
    }
    else {
      showNotification('Tài khoản hoặc mật khẩu chưa chính xác', "error");
    }
  };
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const [valueType, setValueType] = useState('0');
  const handleChange = (event) => {
    setValueType(event.target.value);
  };
  return (
    <AuthWrapper>
      <Box component="form" style={{ minWidth: '400px' }} onSubmit={form.handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">HỆ THỐNG THI TRẮC NGHIỆM</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <InputField form={form} name="email" label="Tên tài khoản" />
            <PasswordField form={form} name='password' label='Mật khẩu' />

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Chọn loại tài khoản:</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={valueType}
                onChange={handleChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="Sinh viên" />
                <FormControlLabel value="1" control={<Radio />} label="Giảng viên" />

              </RadioGroup>
            </FormControl>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Đăng nhập
            </Button>
          </Grid>
        </Grid>
      </Box>


    </AuthWrapper>
  );
}

export default Login;
