import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Autorenew, CloudDownload, ExpandMore } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core";

import JobApplicationService from "../../services/job.application.service";
import {
  getProvinces,
  getCities,
  getAppStatus,
  getAppStatusTypeColor,
} from "../../services/local.service";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";

import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloudUpload from "@material-ui/icons/CloudUpload";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import CloseIcon from "@material-ui/icons/Close";

import Moment from "moment";

import Filter_Job_Apps from "../Child_Components/Filter_Job_Apps";

import Modal from "@material-ui/core/Modal";

// redux
import { connect } from "react-redux";
import { retrieveJobApps } from "../../slices/jobApps";

// modal
const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};
const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  pageHeader: {},
  paper: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    // textAlign: "center",
    textAlign: "left",
    // color: theme.palette.text.secondary,
  },
  pageTitle: {
    textAlign: "center",
    verticalAlign: "middle",
    marginTop: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "20px",
    border: "2px solid blueviolet",
    borderRadius: "10px",
    backgroundColor: "lightseagreen",
    color: "black",
    fontSize: "x-large; ",
  },
  followUpNotes: {
    textAlign: "left",
    verticalAlign: "middle",
    border: "4px solid purple",
    borderRadius: "10px",
  },
  jobAppContainer: {
    fontSize: "medium",
    textAlign: "left",
    verticalAlign: "middle",
    border: "2px solid blue",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "20px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  jobAppDetails: {
    padding: "5px",
  },
  btnDownload: {
    color: "black",
    backgroundColor: "lightgreen",
  },
  btnView: {
    color: "black",
    backgroundColor: "lightpink",
  },
  btnEdit: {
    color: "black",
    backgroundColor: "lightskyblue",
  },
  btnDelete: {
    color: "black",
    backgroundColor: "orange",
  },
  btnUpload: {
    color: "black",
    backgroundColor: "lightseagreen",
  },
  btnAppStatus: {
    color: "black",
    backgroundColor: "white",
  },
  appStatus: {
    padding: "5px",
  },
  searchDiv: {
    textAlign: "center",
    verticalAlign: "middle",
  },

  // modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    position: "absolute",
    width: 550,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const defaultValues = {
  contactPersonName: "",
  province: "",
  city: "",
  appliedOn: null,
};

const Follow_Up = (props) => {
  const classes = useStyles();

  // modal
  const [modalStyle] = useState(getModalStyle());
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const [jobApps, setJobApps] = useState([]);
  // redux
  const { jobApps } = props;

  const [appStatusTypes, setAppStatusTypes] = useState([]);

  const pull_data = (data) => {
    console.log(data); // LOGS DATA FROM CHILD
  };

  const getAllJobApps = () => {
    JobApplicationService.getAllJobApps()
      .then((response) => {
        console.log(response.data);
        // setJobApps(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getAppStatusTypes = () => {
    JobApplicationService.getAppStatusTypes()
      .then((response) => {
        console.log(response.data);
        setAppStatusTypes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    // getAllJobApps();
    props.retrieveJobApps();

    getAppStatusTypes();
  }, []);

  const downloadResume = (e, jobApplicationId) => {
    console.log("download resume,,,", jobApplicationId);
  };
  const viewJobApp = (e, jobApplicationId) => {
    console.log("view job app,,,", jobApplicationId);
    handleOpen();
  };
  const editJobApp = (e, jobApplicationId) => {
    console.log("edit job app,,,", jobApplicationId);
  };
  const deleteJobApp = (e, jobApplicationId) => {
    console.log("delete job app,,,", jobApplicationId);
  };
  const uploadResume = (e, jobApplicationId) => {
    console.log("upload resume,,,", jobApplicationId);
  };
  const viewJobAppStatus = (e, jobApplicationId) => {
    console.log("view job app status,,,", jobApplicationId);
  };
  let jobAppsList =
    jobApps.length > 0 &&
    jobApps.map((item, i) => {
      return (
        <div key={i}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={1}></Grid>
            <Grid item xs={12} sm={12} md={10}>
              <div className={classes.jobAppContainer}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button
                      className={classes.btnView}
                      variant="contained"
                      type="button"
                      onClick={(e) => {
                        viewJobApp(e, item.jobApplicationId);
                      }}
                    >
                      <ViewModuleIcon />
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className={classes.btnEdit}
                      variant="contained"
                      type="button"
                      onClick={(e) => {
                        editJobApp(e, item.jobApplicationId);
                      }}
                    >
                      <EditIcon />
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className={classes.btnDelete}
                      variant="contained"
                      type="button"
                      onClick={(e) => {
                        deleteJobApp(e, item.jobApplicationId);
                      }}
                    >
                      <DeleteForeverIcon />
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className={classes.btnUpload}
                      variant="contained"
                      type="button"
                      onClick={(e) => {
                        uploadResume(e, item.jobApplicationId);
                      }}
                    >
                      <CloudUpload /> Resume
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className={classes.btnAppStatus}
                      variant="contained"
                      type="button"
                      onClick={(e) => {
                        viewJobAppStatus(e, item.jobApplicationId);
                      }}
                    >
                      <Autorenew /> App Status
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.appStatus}>
                      <span
                        style={{
                          color: getAppStatusTypeColor(item.appStatus),
                          fontWeight: "bold",
                        }}
                      >
                        [{getAppStatus(appStatusTypes, item.appStatus)}] &nbsp;{" "}
                        {Moment(item.appliedOn).format("MMMM DD, YYYY")}
                        <span>
                          &nbsp;&nbsp;@ {item.city}, {item.province}
                        </span>
                      </span>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.jobAppDetails}>
                      Contact Name : {item.contactPersonName}
                    </div>
                    <div className={classes.jobAppDetails}>
                      Contact Email : {item.contactEmail}
                    </div>
                    <div className={classes.jobAppDetails}>
                      Phone : {item.phoneNumber ? item.phoneNumber : "N/A"}
                    </div>
                    <div className={classes.jobAppDetails}>
                      <Button
                        className={classes.btnDownload}
                        variant="contained"
                        type="button"
                        onClick={(e) => {
                          downloadResume(e, item.jobApplicationId);
                        }}
                      >
                        <CloudDownload /> Resume
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.jobAppDetails}>
                      Company : {item.companyName ? item.companyName : "N/A"}
                    </div>
                    <div className={classes.jobAppDetails}>
                      Agency : {item.agencyName ? item.agencyName : "N/A"}
                    </div>
                    <div className={classes.jobAppDetails}>
                      URL : {item.webURL ? item.webURL : "N/A"}
                    </div>
                    <div className={classes.followUpNotes}>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          Follow-Up-Notes!
                        </AccordionSummary>

                        <AccordionDetails>
                          {item.followUpNotes ? item.followUpNotes : "N/A"}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={1}></Grid>
          </Grid>
        </div>
      );
    }, this);

  return (
    <div className={classes.pageHeader}>
      <Modal
        style={{ alignItems: "center", justifyContent: "center" }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.modalPaper}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={10}>
              <h2>[VIEW] Job-Application # </h2>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <Button
                className={classes.btnDelete}
                variant="contained"
                type="button"
                onClick={handleClose}
              >
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>

          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            accumsan odio enim, non pharetra est ultrices et.
          </div>
        </div>
      </Modal>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.pageTitle}>Follow-Up</div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div className={classes.searchDiv}>
            <Filter_Job_Apps func={pull_data} />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div>{jobAppsList}</div>
        </Grid>
      </Grid>
    </div>
  );
};

// export default Follow_Up;

const mapStateToProps = (state) => {
  return {
    jobApps: state.jobApps,
  };
};

export default connect(mapStateToProps, {
  retrieveJobApps,
})(Follow_Up);
