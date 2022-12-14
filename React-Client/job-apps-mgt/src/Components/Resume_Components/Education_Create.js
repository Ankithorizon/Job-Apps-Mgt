import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { makeStyles } from "@material-ui/core";

import { getCountries } from "../../services/local.service";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import moment from "moment";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  setEducation,
  edittEducation,
  removeEducation,
} from "../../slices/education";

// child component for edit wo
import Education_Edit from "./Education_Edit";

const useStyles = makeStyles((theme) => ({
  eduCrDelError: {
    color: "red",
    fontSize: "medium",
    fontWeight: "bold",
    paddingBottom: "10px",
    paddingTop: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid red",
    borderRadius: "10px",
  },
  eduCrDelSuccess: {
    color: "green",
    fontSize: "medium",
    fontWeight: "bold",
    paddingBottom: "10px",
    paddingTop: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid green",
    borderRadius: "10px",
  },
  btn: {
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid green",
    borderRadius: "10px",
    backgroundColor: "lightskyblue",
    width: "120px",
    color: "black",
    fontSize: "medium",
  },
  pageHeader: {},
  controlError: {
    color: "red",
    fontSize: "medium; ",
  },
  paper: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    // textAlign: "center",
    textAlign: "left",
    // color: theme.palette.text.secondary,
  },
  buttonPaper: {
    textAlign: "center",
  },
  pageTitle: {
    textAlign: "center",
    verticalAlign: "middle",
    marginTop: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "20px",
    border: "2px solid blue",
    borderRadius: "2px",
    backgroundColor: "lightyellow",
    color: "black",
    fontSize: "x-large; ",
  },
  btnEdit: {
    textAlign: "center",
    verticalAlign: "middle",
    color: "blue",
    fontSize: "medium",
    marginBottom: "5px",
  },
  btnDelete: {
    color: "black",
    backgroundColor: "orange",
    marginBottom: "5px",
  },
  opHeader: {
    textAlign: "center",
    verticalAlign: "middle",
    marginTop: "5px",
    paddingTop: "5px",
    paddingBottom: "5px",
    marginBottom: "5px",
    border: "2px solid blue",
    borderRadius: "2px",
    backgroundColor: "lightyellow",
    color: "black",
    fontSize: "medium",
  },
  educationList: {
    fontSize: "large",
    color: "blue",
    fontStyle: "bold",
  },
}));

const defaultValues = {
  degreeName: "",
  universityName: "",
  major: "",
  country: "",
  startDate: null,
  endDate: null,
};

const Education_Create = () => {
  const classes = useStyles();

  // redux
  const education = useSelector((state) => state.education);
  const dispatch = useDispatch();

  const [eduCrDelResponse, setEduCrDelResponse] = useState({});
  const [edu, setEdu] = useState(defaultValues);

  const [eduEditFlag, setEduEditFlag] = useState(false);
  const [eduEdit, setEduEdit] = useState({});

  const [errors, setErrors] = useState({});

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setCountries(getCountries());
  }, []);
  const renderOptionsForCountry = () => {
    return countries.map((dt, i) => {
      return (
        <MenuItem value={dt} key={i}>
          {dt}
        </MenuItem>
      );
    });
  };

  // callback from edu-edit
  const callBackEditEdu = (data) => {
    setEduEditFlag(false);
    console.log("just edited edu,,,", data);
    setErrors({});
  };

  // create
  const handleDateChange = (e, controlName) => {
    console.log(e);
    let formattedDate = moment(e).format("DD/MM/YYYY");
    console.log(formattedDate);

    setEdu({
      ...edu,
      [controlName]: e,
    });
  };

  // create
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEdu({
      ...edu,
      [name]: value,
    });
  };

  const resetForm = (e) => {
    setErrors({});
    // setEdu(defaultValues);
    setEduCrDelResponse({});
  };

  // create
  const findFormErrors = () => {
    const { degreeName, startDate, endDate, universityName, major, country } =
      edu;
    const newErrors = {};

    if (!degreeName || degreeName === "")
      newErrors.degreeName = "Degree-Name is Required!";
    if (!startDate || startDate === "")
      newErrors.startDate = "Start-Date is Required!";
    if (!endDate || endDate === "") newErrors.endDate = "End-Date is Required!";
    if (!country || country === "") newErrors.country = "Country is Required!";
    if (!universityName || universityName === "")
      newErrors.universityName = "University-Name is Required!";
    if (!major || major === "") newErrors.major = "Major is Required!";

    return newErrors;
  };

  // create
  const saveEducation = (event) => {
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      setErrors({});

      // create edu
      // save this education @ redux-store
      console.log("created edu,,,", edu);
      dispatch(setEducation(edu));

      setEduCrDelResponse({
        responseCode: 0,
        responseMessage: "Education Created @Redux-Store !",
      });
      setEdu(defaultValues);

      setTimeout(() => {
        resetForm();
      }, 2000);
    }
  };

  // make-ready for edit
  const editEducation = (e, edu) => {
    console.log("edit edu,,,", edu);
    if (edu !== null) {
      setEduEditFlag(true);
      setEduEdit({ ...edu });
    }
  };

  // delete
  const deleteEducation = (e, educ) => {
    console.log("delete edu,,,", educ);

    if (educ !== null) {
      // delete edu
      console.log("deleted edu,,,", educ);
      dispatch(removeEducation(educ));

      setEduCrDelResponse({
        responseCode: 0,
        responseMessage: "Education Deleted @Redux-Store !",
      });

      setTimeout(() => {
        resetForm();
      }, 2000);
    }
  };

  let displayAllEdus =
    education.length > 0 &&
    education.map((item, i) => {
      return (
        <div key={i}>
          <span style={{ marginTop: 20 }}>
            <Button
              className={classes.btnEdit}
              variant="contained"
              type="button"
              onClick={(e) => {
                editEducation(e, item);
              }}
            >
              <EditIcon />
            </Button>
            &nbsp;
            <Button
              className={classes.btnDelete}
              variant="contained"
              type="button"
              onClick={(e) => {
                deleteEducation(e, item);
              }}
            >
              <DeleteForeverIcon />
            </Button>
            &nbsp;
            <span className={classes.educationList}>{item.degreeName}</span>
          </span>
        </div>
      );
    }, this);
  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.pageTitle}>
            Education
            {eduEditFlag ? (
              <span>&nbsp;[Edit]</span>
            ) : (
              <span>&nbsp;[Create]</span>
            )}
          </div>
          <p></p>
          {eduCrDelResponse && eduCrDelResponse.responseCode === -1 ? (
            <div className={classes.eduCrDelError}>
              {eduCrDelResponse.responseMessage}
            </div>
          ) : (
            <span>
              {eduCrDelResponse && eduCrDelResponse.responseCode === 0 ? (
                <div className={classes.eduCrDelSuccess}>
                  {eduCrDelResponse.responseMessage}
                </div>
              ) : (
                <span></span>
              )}
            </span>
          )}
          <p></p>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
      </Grid>
      <p></p>

      <Grid container spacing={1}>
        {eduEditFlag ? (
          <Grid item xs={12} sm={12} md={12}>
            <div>
              <Education_Edit edu={eduEdit} func={callBackEditEdu} />
            </div>
          </Grid>
        ) : (
          <Grid item xs={12} sm={12} md={9}>
            <div>
              <form>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={1}></Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="degreeName-input"
                        name="degreeName"
                        label="Degree-Name"
                        type="text"
                        value={edu.degreeName}
                        onChange={handleInputChange}
                      />
                      {!edu.degreeName && errors.degreeName && (
                        <FormHelperText className={classes.controlError}>
                          {" "}
                          {errors.degreeName}
                        </FormHelperText>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Paper className={classes.paper}>
                      {" "}
                      <TextField
                        id="universityName-input"
                        name="universityName"
                        label="University-Name"
                        value={edu.universityName}
                        onChange={handleInputChange}
                      />
                      {!edu.universityName && errors.universityName && (
                        <FormHelperText className={classes.controlError}>
                          {" "}
                          {errors.universityName}
                        </FormHelperText>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={1}></Grid>

                  <Grid item xs={12} sm={12} md={1}></Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Paper className={classes.paper}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          fullWidth
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Start-Date"
                          value={edu.startDate}
                          onChange={(e) => {
                            handleDateChange(e, "startDate");
                          }}
                        />
                      </MuiPickersUtilsProvider>
                      {!edu.startDate && errors.startDate && (
                        <FormHelperText className={classes.controlError}>
                          {" "}
                          {errors.startDate}
                        </FormHelperText>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Paper className={classes.paper}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          fullWidth
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="End-Date"
                          value={edu.endDate}
                          onChange={(e) => {
                            handleDateChange(e, "endDate");
                          }}
                        />
                      </MuiPickersUtilsProvider>
                      {!edu.endDate && errors.endDate && (
                        <FormHelperText className={classes.controlError}>
                          {" "}
                          {errors.endDate}
                        </FormHelperText>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={1}></Grid>

                  <Grid item xs={12} sm={12} md={1}></Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Paper className={classes.paper}>
                      <InputLabel shrink>Country</InputLabel>
                      <Select
                        displayEmpty
                        value={edu.country}
                        name="country"
                        onChange={handleInputChange}
                        style={{ marginTop: 5 }}
                      >
                        <MenuItem value="">
                          <em>---Select Country---</em>
                        </MenuItem>
                        {renderOptionsForCountry()}
                      </Select>
                      {!edu.country && errors.country && (
                        <FormHelperText className={classes.controlError}>
                          {" "}
                          {errors.country}
                        </FormHelperText>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Paper className={classes.paper}>
                      {" "}
                      <TextField
                        id="major-input"
                        name="major"
                        label="Major"
                        value={edu.major}
                        onChange={handleInputChange}
                      />
                      {!edu.major && errors.major && (
                        <FormHelperText className={classes.controlError}>
                          {" "}
                          {errors.major}
                        </FormHelperText>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={1}></Grid>
                </Grid>

                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12}>
                    <div className={classes.buttonPaper}>
                      <Button
                        className={classes.btn}
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={(e) => {
                          saveEducation(e);
                        }}
                      >
                        <SaveIcon />
                        &nbsp;Create
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={3}>
          {!eduEditFlag && (
            <div>
              <h3>Educations</h3>
              <hr />
              <div>{displayAllEdus}</div>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Education_Create;
