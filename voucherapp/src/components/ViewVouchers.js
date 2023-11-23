import React, { useState, useEffect } from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Box,Dialog,DialogTitle,DialogContent,DialogActions,IconButton,MenuItem,
    Select,
    TablePagination,
} from '@mui/material';
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        whiteSpace: 'nowrap',
    },

    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    height: "2px",
}));
const ViewVouchers = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditDateModalOpen, setEditDateModalOpen] = useState(false);
    const [selectedExamIndex, setSelectedExamIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [editIndex, setEditIndex] = useState(-1);
    const [resultOptions] = useState(['Pass', 'Fail', 'Pending due to issue']);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const candidateEmail = 'dpp@gmail.com';

    useEffect(() => {
        const fetchVouchers = async () => {
            try {

                const response = await fetch(`http://localhost:8081/requests/${candidateEmail}`);
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchVouchers();
    }, []);

    const handleRequestVoucher = () => {
        navigate('/requestform', { state: { candidateEmail } });
    };

    const handleEditExamDate = (index) => {
        setSelectedExamIndex(index);
        setEditDateModalOpen(true);
    };

    const handleEditResult = (index) => {
        const currentDate = new Date();
        const enabledDate = new Date(data[index].plannedExamDate);
        if (currentDate >= enabledDate) {
            setEditIndex(index);
        } else {
            console.log('Editing is not allowed before', enabledDate);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSaveExamDate = async () => {
        try {
            const voucherToUpdate = data[selectedExamIndex];
            const voucherCode = voucherToUpdate.voucherCode;
            const formattedDate = selectedDate.toISOString().split('T')[0];

            const response = await fetch(`http://localhost:8081/requests/updateExamDate/${voucherCode}/${formattedDate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedData = [...data];
                updatedData[selectedExamIndex].plannedExamDate = formattedDate;
                setData(updatedData);
                setEditDateModalOpen(false);
            } else {
                console.error('Failed to update exam date:', response.status);
            }
        } catch (error) {
            console.error('Error updating exam date:', error);
        }
    };

    const handleCancelEditDate = () => {
        setEditDateModalOpen(false);
        setSelectedExamIndex(null);
    };

    const handleSaveResult = async (index) => {
        try {
            const voucherToUpdate = data[index];
            const updatedResult = data[index].examResult;

            const response = await axios.put(`http://localhost:8081/requests/${voucherToUpdate.voucherCode}/${updatedResult}`);
            console.log("code is", voucherToUpdate.voucherCode);
            console.log(voucherToUpdate.examResult);
            if (response.ok) {
                const updatedData = [...data];
                updatedData[index].examResult = updatedResult;
                setData(updatedData);
                setEditIndex(-1);
            } else {
                console.error('Failed to update result');
            }
        } catch (error) {
            console.error('Error updating result:', error);
        }
    };

    const handleCancelEditResult = () => {
        setEditIndex(-1);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
         <p style={{ fontSize: '18px', textAlign: 'center' }}>
                            Welcome to the Dashboard! You can check in the below table for your exam details....
                        </p>
            <div>
           
                <Button onClick={handleRequestVoucher} variant="contained" color="success" style={{ position: 'absolute', top: '20px', left: '20px', marginTop: '150px', marginLeft:'120px' ,zIndex: 1 }}>
                    Request Voucher
                </Button>
                <div className="container" style={{ marginTop: '30px', paddingTop: '80px' }}>
                    <Box>
                   
                        <TableContainer component={Paper} >
                            <Table aria-label="customized table" style={{ width: "70%", marginLeft: "10%" ,borderRadius: '12px' }}>
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell style={{ minWidth: '200px' }}>Exam Name</StyledTableCell>
                                        <StyledTableCell >Cloud Platform</StyledTableCell>
                                        <StyledTableCell >Voucher Code</StyledTableCell>
                                        <StyledTableCell >Voucher Issued Date</StyledTableCell>
                                        <StyledTableCell >Voucher Expiry Date</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: '150px' }}>Exam Date</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: '200px' }}>Result</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        <StyledTableRow>
                                            <TableCell colSpan={7} className="table-cell">
                                                Loading...
                                            </TableCell>
                                        </StyledTableRow>
                                    ) : (
                                        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((voucher, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell >{voucher.cloudExam}</StyledTableCell>
                                                <StyledTableCell >{voucher.cloudPlatform}</StyledTableCell>
                                                <StyledTableCell>{voucher.voucherCode ?? 'Pending'}</StyledTableCell>
                                                <StyledTableCell >{voucher.voucherIssueLocalDate ? voucher.voucherIssueLocalDate : 'Pending'}</StyledTableCell>
                                                <StyledTableCell >{voucher.voucherExpiryLocalDate ? voucher.voucherExpiryLocalDate : 'Pending'}</StyledTableCell>
                                                <StyledTableCell >
                                                    {voucher.plannedExamDate}
                                                    <IconButton onClick={() => handleEditExamDate(index)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </StyledTableCell>
                                                <StyledTableCell className="table-cell">
                                                    {editIndex === index ? (
                                                        <Select
                                                            value={voucher.examResult}
                                                            onChange={(e) => {
                                                                const newData = [...data];
                                                                newData[index].examResult = e.target.value;
                                                                setData(newData);
                                                            }}
                                                        >
                                                            {resultOptions.map((option, optionIndex) => (
                                                                <MenuItem key={optionIndex} value={option}>
                                                                    {option}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    ) : (
                                                        voucher.examResult
                                                    )}
                                                    {editIndex === index ? (
                                                        <>
                                                            <IconButton onClick={() => handleSaveResult(index)}>
                                                                <SaveIcon />
                                                            </IconButton>
                                                            <IconButton onClick={handleCancelEditResult}>
                                                                <CancelIcon />
                                                            </IconButton>
                                                        </>
                                                    ) : (
                                                        <IconButton onClick={() => handleEditResult(index)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    )}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                            <TablePagination style={{ width: "90%" }}
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Box>
                </div>
                <Dialog open={isEditDateModalOpen} onClose={handleCancelEditDate}>
                    <DialogTitle>Change Exam Date</DialogTitle>
                    <DialogContent sx={{ width: '300px', height: '300px' }}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            utcOffset={0}
                            minDate={new Date()}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSaveExamDate}>Save</Button>
                        <Button onClick={handleCancelEditDate}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default ViewVouchers;