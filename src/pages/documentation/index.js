/* eslint-disable prettier/prettier */
// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const documentation = () => (
    <MainCard title="Thông tin chung">
        <Typography variant="body2">
            <div>
                <h3>Bước 1. </h3>
                Thay đổi thông tin mật khẩu trong lần đầu đăng nhập
                <h3>Bước 2. </h3>
                Chọn chức năng đăng ký đề tài. Lựa chọn đề tài trong danh sách và chọn đăng ký
                <h3>Bước 3. </h3>
                Quay lại để kiểm tra thông tin giảng viên hướng dẫn sau 5 ngày kể từ ngày kết thúc đăng ký.
            </div>
        </Typography>
    </MainCard>
);

export default documentation;
