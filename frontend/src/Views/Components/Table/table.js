import React, {useState} from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
//importing button icon
import AddButton from '../Icon Buttons/IconButtons'
import { green } from '@material-ui/core/colors';

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
      fontSize: 14,
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
    <TableContainer component={Paper} style={{width:800}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:"var(--prim-color)"}}>
          <TableRow style={{backgroundColor:'#f1710'}}>
            <TableCell style={{color:'white'}}>Name</TableCell>
            <TableCell style={{color:'white'}} align="center">Desc</TableCell>
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
              <TableCell><button onClick={() => props.removeProject(row._id)}><DeleteIcon /></button></TableCell>
              
            </StyledTableRow>
          ))}
          <TableCell><input name="name" value={newProject.name} onChange={handleNewProjectChange} /></TableCell>
          <TableCell align="center"><input name="description" value={newProject.description} onChange={handleNewProjectChange} /></TableCell>
          <TableCell align="left"><button color="secondary" type="submit" onClick={handleFormSubmit} >Add</button></TableCell>
        </TableBody>
        
        
      
      </Table>

      
    </TableContainer>
  );
}