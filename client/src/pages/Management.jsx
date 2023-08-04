import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRequests, removeRequest, selectRequests } from '../redux/requests/requestsSlice';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import RequestManagementList from '../components/requests/RequestManagementList';
import NavBar from '../components/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Management() {
    const dispatch = useDispatch();

    const requests = useSelector(selectRequests);
    useEffect(() => {
        dispatch(fetchRequests())
    },[dispatch])

    const handleDeleteRequest = (id) => {
        dispatch(removeRequest(id))
            .then(() => {
                dispatch(fetchRequests());
            })
            notify();
    }

    const notify = () => {
        toast.success('Request removed ✅', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }

  return (
    <Container>
        <NavBar />
        <h1 className="management-title">Request Management</h1>
        <ToastContainer/>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Location</TableCell>
                    <TableCell align="right">Likes</TableCell>
                    <TableCell align="center">Dislikes</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {requests.map((request) => (
                        <RequestManagementList key={request.id} request={request} handleDeleteRequest={handleDeleteRequest}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
  )
}

const Container = styled.div`
      .management-title {
        color: rgb(0, 0, 0);
        text-align: center;
        font-size: 5pc;
        font-family: "Ultra", serif;
        /* position: relative; */
        /* bottom: 5rem; */
        background-color: transparent;
        text-shadow: 2px 2px 3px rgb(255, 205, 98);
    }
`;

export default Management;