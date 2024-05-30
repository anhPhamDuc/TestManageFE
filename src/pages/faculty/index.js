/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFaculty } from 'store/reducers/faculty';
import { Box, TextField, TextareaAutosize, InputLabel, Typography, Button, Grid } from '@mui/material';
import MainCard from 'components/MainCard';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputField from 'components/FormControl/InputField/index';

const initialState = {
    id: '',
    name: ''
};

function Faculty(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = yup.object({
        id: yup.string().required('Nhập vào địa chỉ email!'),
        name: yup.string().required('Required')
    });
    const form = useForm({
        defaultValues: {
            id: '',
            name: ''
        },
        resolver: yupResolver(validationSchema)
    });


    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const item = await getFaculty();
            const resultAction = await dispatch(item);
            if (resultAction.payload != null) {
                const arrayOfObjects = resultAction.payload.map(item => ({
                    id: item.id,
                    name: item.name,
                    address: item.address,
                    description: item.description,
                }));
                setRows(arrayOfObjects);
            }
        })();
    }, []);

    const onSubmit = async (values) => {
        console.log("ABC: xxx" + values.id);
    };

    const handleCreate = (values) => {
        console.log("ABC: " + values.id);
        // setOpen(false);
    }

    const facultyCreate = () => {
        navigate("/facultyCreate");
    };

    const facultyEdit = (values) => {
        console.log(values.name);
        navigate("/facultyEdit/");
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <MainCard>
                <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                    <Grid item>
                        <Typography variant="h5">Danh sách Khoa</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleClickOpen} variant="contained" color="primary">Thêm mới</Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Mã khoa</TableCell>
                                <TableCell align="center">Tên khoa</TableCell>
                                <TableCell align="center">Địa chỉ</TableCell>
                                <TableCell align="center" sx={{ minWidth: 200 }}>Mô tả</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.address}</TableCell>
                                    <TableCell align="left">{row.description}</TableCell>
                                    <TableCell align="center">
                                        <EditIcon onClick={() => facultyEdit(row)} style={{ cursor: 'pointer', marginRight: 8 }} />
                                        <DeleteIcon style={{ cursor: 'pointer', marginRight: 8 }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </MainCard>

            <Dialog component="form" onSubmit={form.handleSubmit(onSubmit)} open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Typography variant="h6">Thêm mới thông tin Khoa</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <Typography>Mã khoa:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <InputField form={form} name="id" label="Nhập mã Khoa" />
                            {/* <TextField name="ID" fullWidth /> */}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography>Tên khoa:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <InputField form={form} name="name" label="Nhập tên Khoa" />

                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography>Địa chỉ:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField name="txtFacultyAddress" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography>Mô tả:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                name="txtFacultyDescription"
                                multiline
                                rows={4}
                                placeholder="Nhập mô tả"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                    {/* <Button type="submit">Ghi dữ liệu</Button> */}
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Ghi dữ liệu
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Faculty;
