import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./home.css";
import { FiUsers } from "react-icons/fi";
import { BsHouse } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import API from "../../utils/API";
import NoMatch from "../../pages/NoMatch";
import moment from "moment";

export default function Home() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [cleaningData, setCleaningData] = useState({});
  const [employees, setEmployees] = useState([]);
  const [employeeArr, setEmployeesArr] = useState([]);
  const [cleanings, setCleanings] = useState([]);
  const [load, setLoad] = useState(true);
  const [loadClean, setLoadClean] = useState(true);
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const open = useRef();
  const header = useRef();
  const title = useRef();
  const body = useRef();
  const open1 = useRef();
  const header1 = useRef();
  const title1 = useRef();
  const body1 = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(async () => {
    userData;
    loadCleaning();
    try {
      const id = userData.user.id;
      await API.getUserById(id).then((res) => {
        setUser(res.data);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, [userData]);

  const loadCleaning = async (i) => {
    await API.getProperty().then((res) => {
      setCleaningData(res.data);
      console.log(res.data);
    });
  };

  const loadEmployees = async () => {
    const userRes = await API.getUser();
    let newArr = [...userRes.data];
    setEmployees({ newArr });
    //page has been loaded with all info
    setLoading(false);
    //employee info has loaded
    setLoad(false);
    handleShow();
    //not loading cleaning info on modal open
    setLoadClean(true);
  };

  const loadAPI = async (i) => {
    cleaningData.map((x) => {
      const newArr = x.employee;
      for (i = 0; i < newArr.length; i++) {
        if (newArr.length > 0) {
          newArr.map((child) => {
            const grandChild = child.cleaning;
            if (grandChild.length > 0) {
              grandChild.map((o) => {
                function pushToArray() {
                  const index = employeeArr.findIndex((e) => e._id === o._id);
                  if (index === -1) {
                    employeeArr.unshift(o);
                    console.log("new item");
                  } else {
                    console.log("matched", index, employeeArr);
                  }
                }
                pushToArray();
              });
            }
            const nice = grandChild;
            setEmployeesArr(nice);
          });
        }
      }
    });
    setLoad(true);
    setLoading(false);
    setLoadClean(false);
    handleShow();
  };

  // console.log(cleaningData, cleanings, employeeArr);

  return (
    <>
      <UserContext.Provider value={{ userData }}>
        <div className="home-screen">
          {loading === false && (
            <div className="page">
              {userData.user && userData.user.jobType === "Admin" ? (
                <div className="container-fluid">
                  <h1>Welcome {userData.user.displayName}</h1>
                  <p> Job Title: {userData.user.jobType}</p>
                  <div className="row home-row">
                    <div className="card w-50 col-12 col-md-6 card-home ">
                      <div className="card-body">
                        <h5 className="card-title card-title-home">Add an Employee</h5>
                        <p className="card-text">
                          Add a new employee. You will choose their job type by
                          clicking the button below
                        </p>
                        <div className="admin-register">
                          <Link to="/register">
                            <AiOutlineUserAdd className="admin-register" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="card w-50 col-12 col-md-6 card-home">
                      <div className="card-body">
                        <h5 className="card-title card-title-home">View all Employees</h5>
                        <p className="card-text">
                          Click the link below to view all employees
                        </p>
                        {loading === false && (
                          <div className="admin-register">
                            <FiUsers
                              className="admin-register"
                              onClick={loadEmployees}
                              onChange={handleShow}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* loading modal for viewing employees on click  */}
                  <div>
                    {load === false && loadClean === true && (
                      <Modal show={show} onHide={handleClose} ref={open}>
                        <Modal.Header closeButton ref={header}>
                          <Modal.Title
                            id="contained-modal-title-vcenter"
                            ref={title}
                          >
                            Employees
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body ref={body}>
                          {employees.newArr.map((employee) => (
                            <div key={employee._id}>
                              <h4>{employee.displayName}</h4>
                              <ul>
                                <strong>Username:</strong> "{employee.username}"
                              </ul>
                              <ul>
                                <strong>Role: </strong> {employee.jobType}{" "}
                              </ul>
                              <ul>
                                <strong>Phone Number: </strong>{" "}
                                {employee.phoneNumber}{" "}
                              </ul>
                            </div>
                          ))}
                        </Modal.Body>
                      </Modal>
                    )}
                  </div>
                  <div className="row home-row">
                    <div className="card w-50 col-12 col-md-6 card-home">
                      <div className="card-body">
                        <h5 className="card-title card-title-home">View Recent Cleanings</h5>
                        <p className="card-text">
                          Click below to view recent cleanings
                        </p>
                        {loading === false && (
                          <div className="admin-register">
                            <AiOutlineClear
                              className="admin-register"
                              onClick={loadAPI}
                              onChange={handleShow}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      {loadClean === false && load === true && (
                        <Modal ref={open1} show={show} onHide={handleClose}>
                          <Modal.Header closeButton ref={header1}>
                            <Modal.Title
                              id="contained-modal-title-vcenter"
                              ref={title1}
                            >
                              Cleanings
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body ref={body1}>
                            {employeeArr.map((cleaning) => (
                              <div key={cleaning._id}>
                                {/* <h4>{cleaning.property}</h4> */}
                                <ul>
                                  {/* {console.log(cleaning)} */}
                                  <strong>Date: </strong>{" "}
                                  {moment(cleaning.startClean).format(
                                    "DD/MM/YYYY"
                                  )}{" "}
                                </ul>
                                <ul>
                                  <strong> Name of Employee: </strong>{" "}
                                  {cleaning.name}{" "}
                                </ul>
                                <ul>
                                  {" "}
                                  <strong> Time Finished: </strong>{" "}
                                  {cleaning.stopClean}{" "}
                                </ul>
                                <ul>
                                  {" "}
                                  <strong> Notes: </strong> {cleaning.notes}
                                </ul>
                              </div>
                            ))}
                          </Modal.Body>
                        </Modal>
                      )}
                    </div>
                    <div className="card w-50 col-12 col-md-6 card-home">
                      <div className="card-body">
                        <h5 className="card-title card-title-home">Manage Properties</h5>
                        <p className="card-text">
                          Click below to add or edit properties
                        </p>
                        {loading === false && (
                          <div className="admin-register">
                            <Link to="/manage">
                              <BsHouse className="admin-register" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row home-row">
                  <div className="card w-50 col-12 col-md-6 card-home ">
                      <div className="card-body">
                        <h5 className="card-title card-title-home">View All CLeanings</h5>
                        <p className="card-text">
                          Click to direct to all cleaning info:
                        </p>
                        <div className="admin-register">
                          <Link to="/viewcleanings">
                          <AiOutlineClear className="admin-register" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="card w-50 col-12 col-md-6 card-home">
                      <div className="card-body">
                        <h5 className="card-title card-title-home">Log a Clean</h5>
                        <p className="card-text">
                          Click the button below to log a new cleaning
                        </p>
                        <div className="admin-register">
                          <Link to={"/startclean/" + user._id}>
                            <AiOutlineClear className="admin-register" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card w-50 col-12 col-md-6 card-home">
                      <div className="card-body">
                        <h5 className="card-title card-title-home">Edit a Rental</h5>
                        <p className="card-text">
                          Click the button below to edit a rental
                        </p>
                        <Link to={"/startclean/" + user._id}>
                          <div className="admin-register">
                            <AiOutlineClear className="admin-register"></AiOutlineClear>
                          </div>
                        </Link>
                      </div>
                    </div> */}
                  </div>
                </div>
              ) : userData.user && userData.user.jobType === "Employee" ? (
                <div>
                  <h1>Welcome {userData.user.displayName}</h1>
                  <p> Job Title: {userData.user.jobType}</p>
                  <div className="card w-50">
                    <div className="card-body">
                      <h5 className="card-title card-title-home">Log a Clean</h5>
                      <p className="card-text">
                        Click the button below to log a new cleaning:
                      </p>
                      <div className="admin-register">
                        <Link to={"/startclean/" + user._id}>
                          <AiOutlineClear />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : userData.user && userData.user.jobType === "Manager" ? (
                <div>
                  <h1>Welcome {userData.user.displayName}</h1>
                  <p> Job Title: {userData.user.jobType}</p>
                  <div className="row home-row">
                    <div className="card w-50 col-12 col-md-6 card-home">
                      <div className="card-body">
                        <h5 className="card-title card-title-home">View Recent Cleanings</h5>
                        <p className="card-text">
                          Click the button below to log a new cleaning:
                        </p>
                        <Link to={"/startclean/" + user._id}>
                          <AiOutlineClear className="admin-register"></AiOutlineClear>
                        </Link>
                        {loading === false && (
                          <AiOutlineClear
                            className="admin-register"
                            onClick={loadCleaning}
                            onChange={handleShow}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      {loadClean === false && load === true && (
                        <Modal show={show} onHide={handleClose} ref={open1}>
                          <Modal.Header closeButton ref={header1}>
                            <Modal.Title
                              id="contained-modal-title-vcenter"
                              ref={title1}
                            >
                              Cleanings
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body ref={body1}>
                            {cleanings.cleaningArr.map((cleaning) => (
                              <div key={cleaning._id}>
                                <h4>{cleaning.property}</h4>
                                <ul>
                                  {" "}
                                  <strong>Date: </strong>{" "}
                                  {moment(cleaning.startClean).format(
                                    "DD/MM/YYYY"
                                  )}{" "}
                                </ul>
                                <ul>
                                  <strong> Name of Employee: </strong>{" "}
                                  {cleaning.name}{" "}
                                </ul>
                                <ul>
                                  {" "}
                                  <strong> Time Finished: </strong>{" "}
                                  {cleaning.stopClean}{" "}
                                </ul>
                                <ul>
                                  {" "}
                                  <strong> Notes: </strong> {cleaning.notes}
                                </ul>
                              </div>
                            ))}
                          </Modal.Body>
                        </Modal>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <NoMatch />
                </div>
              )}
            </div>
          )}
        </div>
      </UserContext.Provider>
    </>
  );
}
