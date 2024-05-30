/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
// material-ui
import { Box, Grid, Stack, InputLabel, Card, Paper, Button } from '@mui/material';
import InputField from '../../components/FormControl/InputField'
import PasswordField from '../../components/FormControl/PasswordField'
import PhoneNumberField from '../../components/FormControl/PhoneNumberField'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { updateAccount } from '../../store/reducers/account'
import { useDispatch } from '../../../node_modules/react-redux/dist/react-redux';
import { useNavigate } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

// ==============================|| CHANGE ACCOUNT INFO||============================== //

function changeAccount(props) {
    const validationSchema = yup.object({
        email: yup.string().required('Nhập vào địa chỉ email!').email('Email chưa đúng định dạng'),
        oldPassword: yup.string().required('Required').min(3, 'Mat khau phai lon hon 3 ky tu'),
        newPassword: yup.string().required('Required').min(3, 'Mat khau phai lon hon 3 ky tu'),
        phoneNumber: yup.string()
            .required('Vui lòng nhập số điện thoại')
            .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, 'Số điện thoại không hợp lệ')
    });

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const showNotification = (message, type) => {
        enqueueSnackbar(message, { variant: type })
    }
    const [userName, setUserName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const items = localStorage.getItem('User');
        console.log(items);
        if (items) {
            const _accountName = JSON.parse(items).accountName;
            const _userName = JSON.parse(items).name;
            const _emailAddress = JSON.parse(items).emailAddress;
            setAccountName(_accountName);
            setUserName(_userName);
            setEmailAddress(_emailAddress);
            setLocalStorageLoaded(true);
        }
    }, []);

    const form = useForm({
        defaultValues: {
            accountName: localStorageLoaded ? accountName : '', // Sử dụng name khi localStorage đã được load
            userName: localStorageLoaded ? userName : '',
            email: '',
            oldPassword: ''
        },
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        // Cập nhật lại giá trị mặc định của accountName khi name được cập nhật từ localStorage
        if (localStorageLoaded) {
            form.setValue('userName', userName);
            form.setValue('accountName', accountName);
            form.setValue('email', emailAddress);
        }
    }, [localStorageLoaded, accountName, userName, emailAddress, form]);

    const onSubmit = async (values) => {
        if (values.oldPassword != values.newPassword) {
            showNotification("Mật khẩu cũ và mới chưa trùng nhau", "error");
        }
        else {
            // console.log(values);
            const action = updateAccount(values);
            const resultAction = await dispatch(action);
            if (resultAction.payload != null && resultAction.payload != undefined) {
                showNotification("Ghi dữ liệu thành công", "success");
                navigate('/login');
            }
            else {
                showNotification("Lỗi cập nhật dữ liệu", "error");
            }
        }
    }
    return (
        <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
            <MainCard title="Thông tin tài khoản">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <InputLabel htmlFor="firstname-signup">Tên tài khoản: *</InputLabel>
                        <InputField form={form} name="accountName" label="Tên tài khoản" readonly={true} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <InputLabel htmlFor="firstname-signup">Tên người dùng: *</InputLabel>
                        <InputField form={form} name="userName" label="Tên người dùng" readonly={true} />
                    </Grid>
                    <Grid item xs={12} md={4}></Grid>
                    <Grid item xs={12} md={4}>
                        <InputLabel htmlFor="firstname-signup">Mật khẩu mới:*</InputLabel>
                        <PasswordField form={form} name="oldPassword" label="Mật khẩu mới" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <InputLabel htmlFor="firstname-signup">Nhập lại mật khẩu: *</InputLabel>
                        <PasswordField form={form} name="newPassword" label="Nhập lại mật khẩu" />
                    </Grid>
                    <Grid item xs={12} md={4}></Grid>

                    <Grid item xs={12} md={4}>
                        <InputLabel htmlFor="firstname-signup">Số điện thoại: *</InputLabel>
                        <PhoneNumberField form={form} name="phoneNumber" label="Nhập số điện thoại" />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <InputLabel htmlFor="firstname-signup">Địa chỉ email: *</InputLabel>
                        <InputField form={form} name="email" label="Nhập địa chỉ email" />
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Ghi dữ liệu
                        </Button>
                    </Grid>
                </Grid>
            </MainCard>
        </Box>
    )
}

export default changeAccount;