import React, { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "src/redux/slices/alert";

const AlertNotification = () => {
  const alerts = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [alertsType, setAlertsType] = useState();

  useEffect(() => {
    setShowAlert(alerts.status);
    setAlertsType(alerts?.type);
  }, [alerts]);

  const closeHandler = () => {
    dispatch(
      createAlert({
        type: "",
        message: "",
        status: false,
      })
    );
  };
  return (
    <>
      {showAlert && (
        <Snackbar
          open={showAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={closeHandler}
          sx={{ zIndex: "999999" }}
        >
          <Alert
            onClose={closeHandler}
            severity={alertsType}
            sx={{ width: "100%" }}
          >
            {alerts?.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default AlertNotification;
