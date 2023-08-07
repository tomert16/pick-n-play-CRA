import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRequests, removeRequest, selectRequests } from '../redux/requests/requestsSlice';
import { useEffect, useState } from 'react';
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
import { fetchAllLocations, selectAllLocations } from '../redux/locations/locationsSlice';
import RequestManagementForm from '../components/requests/RequestManagementForm';

function Management() {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [formType, setFormType] = useState(true);
    

    // fetch requests
    const requests = useSelector(selectRequests);
    useEffect(() => {
        dispatch(fetchRequests())
    },[dispatch])
    // fetch locations for form dropdown
    const locations = useSelector(selectAllLocations);
    useEffect(() => {
        dispatch(fetchAllLocations());
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
        <button id="add-btn" class="full-rounded" onClick={() => setToggle(true)}>
            <span>Add Here</span>
        <div class="border full-rounded"></div></button>
        {toggle ? <div class="card">
            <div class="card-header flex j-between">
                <div style={{gap: '1rem'}} className="text-header flex">
                    <p onClick={() => setFormType(true)}>Sport</p>
                    <p onClick={() => setFormType(false)}>Field</p>
                </div>
                <button onClick={() => setToggle(false)}>X</button>
            </div>
            <div class="card-body">
                <RequestManagementForm 
                    locations={locations}
                    formType={formType}
                />
            </div> 
        </div> : null}
        <ToastContainer/>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Requester</TableCell>
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
    #add-btn {
        font-size: 16px;
        position: relative;
        bottom: 8rem;
        left: 75%;
        margin: auto;
        padding: 1em 2.5em 1em 2.5em;
        border: none;
        background: #fff;
        transition: all 0.1s linear;
        box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.1);
    }

    #add-btn:active {
        transform: scale(0.95);
    }

    #add-btn span {
        color: #464646;
    }

    #add-btn .border {
        position: absolute;
        border: 0.15em solid #fff;
        transition: all 0.3s 0.08s linear;
        top: 50%;
        left: 50%;
        width: 9em;
        height: 3em;
        transform: translate(-50%, -50%);
    }

    #add-btn:hover .border {
        display: block;
        width: 9.9em;
        height: 3.7em;
    }

    .full-rounded {
        border-radius: 2em;
    }
    .card {
        width: 350px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
        margin: 10px;
        position: relative;
        left: 41%;
        bottom: 2rem;
    }
    .card-header {
        background-color: #333;
        padding: 10px;
        text-align: center;
        height: 3rem;
        p {
            cursor: pointer;
        }
    }

    .card-header .text-header {
        margin: 0;
        font-size: 17px;
        color: rgb(255, 255, 255);
    }

    .card-body {
        padding: 16px;
        p {
            margin-top: 0.5rem;
            font-size: 1.2rem;
            font-weight: bold;
        }
    }

    .form-group {
        margin-bottom: 10px;
    }

    .form-group label {
        display: block;
        font-size: 14px;
        color: #333;
        font-weight: bold;
        margin-bottom: 1px;
    }

    .form-group input[type="text"],
    .form-group input[type="email"],
    .form-group input[type="password"] {
        width: 100%;
        padding: 8px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .btn {
        padding: 12px 24px;
        margin-left: 13px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        background-color: #333;
        color: #fff;
        text-transform: uppercase;
        transition: background-color 0.2s ease-in-out;
        cursor: pointer
    }

    .btn:hover {
        background-color: #ccc;
        color: #333;
    }
`;

export default Management;