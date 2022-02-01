import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux"; 
import {addUsers} from '../redux/actions'
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const AddUser = () => {
  const classes = useStyles();
  const [state, setState] = useState({
   title:"",
   content:""
  });
  const [error, setError] = useState("");
  let navigate = useNavigate();
  let dispatch = useDispatch()
  const { title, content } = state;

 
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit=(e)=>{
    debugger
    e.preventDefault()
    if(!title || !content ) {
      setError("Please fill all the deatils");  
   } else {
     dispatch(addUsers(state));
     navigate("/");
     setError("");
   }

  }
  return (
    <div>
      <Button
        style={{ width: "100px", margnTop: "20px" }}
        variant="contained"
        color="Secondary"
        onClick={() => navigate("/")}
      >
        Go Back
      </Button>
      <h2>Add User</h2>
      {error && <h3 style={{color: "red"}}>{error}</h3>}
      <form className={classes.root}
       noValidate autoComplete="off"
       onSubmit={handleSubmit}>
        <TextField id="standard-basic"
         label="Title" 
         value={title}
          type="text" 
          name="title"
          onChange={handleInputChange}
          />
        <br />
        <TextField
          id="standard-basic"
          label="Content"
          value={content}
          type="text"
          name="content"
          onChange={handleInputChange}
        />
        <br />
        {/* <TextField
          id="standard-basic"
          label="Email"
          value={email}
          type="email"
          name="email"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Address"
          value={address}
          type="text"
          name="address"
          onChange={handleInputChange}
        /> */}
        <br />

        <Button style={{ width: "100px" }} variant="contained" color="primary"  type="submit"onChange={handleInputChange} >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
