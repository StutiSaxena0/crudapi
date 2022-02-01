import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import moment from 'moment'
import { useSelector, useDispatch } from "react-redux";
import { deleteUsers, loadUsers, viewUsers } from "../redux/actions";
const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

}));
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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme)=>({
  table: {
    marginTop: 100,
    minWidth: 900,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Home = () => {
  const classes = useStyles();
  const buttonStyles = useButtonStyles();
  const [open, setOpen] = React.useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the user?")) {
      dispatch(deleteUsers(id));
    }
  };
  const handleView = (id) => {
    dispatch(viewUsers(id));
    // navigate('/viewdata')
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={buttonStyles.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/addUser")}
        >
          Add User
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Title</StyledTableCell>

              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell align="center">{user.title}</StyledTableCell>
                  {/* <StyledTableCell align="center">{user.email}</StyledTableCell> */}
                  <div className={buttonStyles.root}>
                    <ButtonGroup
                      variant="contained"
                      aria-label="contained primary button group"
                    >
                      <Button
                        style={{ marginRight: "5px" }}
                        color="primary"
                        onClick={() => handleView(user._id)}
                      >
                        View
                      </Button>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        // onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={open}>
                          <div className={classes.paper}>
                         
                            <p id="transition-modal-description">ID:{user._id}</p>
                            <p id="transition-modal-description">
                             Title: {user.title}
                            </p>
                            <p id="transition-modal-description">
                             Content: {user.content}
                            </p>
                            <p id="transition-modal-description">
                             Created At:
                             {moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                            </p>
                            <p id="transition-modal-description">
                             Updated At:{moment(user.updatedAt).format('MMMM Do YYYY,h:mm:ss a')}
                            </p>
                            <button onClick={handleClose}>Close </button>
                          </div>
                        </Fade>
                      </Modal>

                      <Button
                        color="secondary"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </div>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        {/* <div>
          {user.name}
        </div> */}
      </TableContainer>
    </div>
  );
};

export default Home;
