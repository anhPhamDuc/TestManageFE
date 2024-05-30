/* eslint-disable no-empty */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Box, TextField, Autocomplete, InputLabel, Typography, Button, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTopic, getTopicByAccount, registerTopic } from '../../store/reducers/topic'
import { useNavigate } from 'react-router-dom';

function topics(props) {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const showNotification = (message, type) => {
        enqueueSnackbar(message, { variant: type })
    }
    const form = useForm({
        defaultValues: {
            email: '',
            oldPassword: '',
            TopicID: '-1',
            NameTopic: ''
        }
    });

    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(null);

    const [studentName, setStudentName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [disableTopic, setDisableTopic] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const itemsX = localStorage.getItem('User');
            const status = JSON.parse(itemsX).status;
            // Trang thai 0 (chua hieu luc), 1 la chua update mat khau, 2 la da sua mat khau
            if (status === 1) {
                navigate('/change-account');
            }

            const item = await getTopic();
            const resultAction = await dispatch(item);
            if (resultAction.payload != null) {
                const arrayOfObjects = resultAction.payload.map(item => {
                    return {
                        id: item['id'],
                        label: item['topicName']
                    };
                });
                setOptions(arrayOfObjects);
                setValue(arrayOfObjects[0]);
            }

            const items = localStorage.getItem('User');
            if (items) {
                const accountName = JSON.parse(items).accountName;
                console.log(accountName);
                const topicRegister = getTopicByAccount(accountName);
                const result = await dispatch(topicRegister);
                if (result.payload != null) {
                    // setStudentName(result.payload.StudentName)
                    setStudentName(JSON.parse(result.payload).studentName);
                    setTeacherName(JSON.parse(result.payload).teacherName);
                    setDisableTopic(true);
                }
                else {
                    setDisableTopic(false);
                }

            }

        })()
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onSubmit = async (values) => {
        const items = localStorage.getItem('User');
        const accountN = JSON.parse(items).accountName;
        var data = {
            accountName: accountN,
            topicId: value.id
        }
        const action = registerTopic(data);
        const result = await dispatch(action);
        console.log(result.payload);

        if (result.payload == "true") {
            // Xóa dữ liệu hiện tại trong form
            form.reset();

            // Tải lại trang
            window.location.reload();
            showNotification("Đăng ký đề tài thành công", "success");

        }
        else {
            showNotification("Lỗi đăng ký", "error");
        }
    }

    return (
        <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
            <MainCard title="Danh sách đề tài">
                <Autocomplete
                    id="combo-box-demo"
                    name="TopicID"
                    disablePortal
                    options={options}
                    value={value}
                    onChange={handleChange}
                    disabled={disableTopic}
                    renderInput={(params) => <TextField {...params} label="Chọn đề tài" variant="outlined" />}
                />
                <Box sx={{ paddingTop: 2 }}>
                    {value && (
                        <InputLabel classes='Input' name="NameTopic">
                            <Typography variant="subtitle1">
                                Tên đề tài:
                            </Typography>
                            {value.label}
                        </InputLabel>
                    )}
                </Box>
                <Box sx={{ paddingTop: 2 }}>
                    {
                        studentName && (
                            <InputLabel classes='Input'>
                                <Typography variant="subtitle1">
                                    Sinh viên đăng ký:
                                </Typography>
                                {studentName}
                            </InputLabel>
                        )
                    }
                </Box>

                <Box sx={{ paddingTop: 2 }}>
                    {
                        teacherName && (
                            <InputLabel classes='Input'>
                                <Typography variant="subtitle1">
                                    Giảng viên hướng dẫn:
                                </Typography>
                                {teacherName}
                            </InputLabel>
                        )
                    }
                </Box>
                <Box sx={{ paddingTop: 2 }}>
                    <Button disabled={disableTopic} type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Đăng ký
                    </Button>
                </Box>
            </MainCard>

        </Box>
    )
}

export default topics;
