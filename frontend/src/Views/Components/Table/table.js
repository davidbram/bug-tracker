import React, {useState} from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//importing button icon
import AddButton from '../Icon Buttons/IconButtons';
import { green } from '@material-ui/core/colors';
import "./table.css"
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable(props) {
 
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 16,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const [newProject, setNewProject] = useState({
    name: "",
    description: ""
  });

  function handleNewProjectChange (event) {
    const { name, value } = event.target; 
    setNewProject(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  }

  function handleFormSubmit (event) {
    event.preventDefault();
    props.addProject(newProject);
    
  }
  
  const classes = useStyles();
  return (
    <TableContainer component={Paper} style={{ width: 800 }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{ backgroundColor: 'var(--prim-color)'}}>
          <TableRow style={{ backgroundColor: '#f1710', fontSize: '16px' }}>
            <TableCell style={{ color: 'white' }}>Name</TableCell>
            <TableCell style={{ color: 'white' }} align="center">
              Description
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.length > 0 && props.data.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.description}</StyledTableCell>
              <TableCell><button style={{all:'unset'}} onClick={() => props.removeProject(row._id)}><i className="far fa-trash-alt fa-lg" aria-hidden="true"></i></button></TableCell>
              
            </StyledTableRow>
          ))}
          <TableCell><input name="name" placeholder="Enter project name" value={newProject.name} onChange={handleNewProjectChange} /></TableCell>
          <TableCell align="center"><input name="description" placeholder="Enter description" value={newProject.description} onChange={handleNewProjectChange} /></TableCell>
          <TableCell align="left"><button style={{all:'unset'}} type="submit" onClick={handleFormSubmit} ><i className="fas fa-plus-circle fa-lg"></i></button></TableCell>
        </TableBody>
        
        
      
      </Table>

      
    </TableContainer>
  );
}
