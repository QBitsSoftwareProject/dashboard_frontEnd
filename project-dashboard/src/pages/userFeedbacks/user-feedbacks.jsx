import React, { useEffect, useState } from "react";
import styles from "../userFeedbacks/user-feedbacks.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getUserFeedbacks } from "../../services/adminServices/adminServices";

import checkIcon from "../../assets/images/icons/check.png";

import LoadingScreen from "../../components/ui/loadingScreen/LoadingScreen";

export default function UserFeedbacks() {
  const [loadingState, setLoadingState] = useState(true);

  const [userFeedbacks, setUserFeedbacks] = useState([]);

  useEffect(() => {
    const getFeedback = async () => {
      setLoadingState(true);
      try {
        let feedbacks = await getUserFeedbacks();
        setUserFeedbacks(feedbacks.feedback);
        setLoadingState(false);
      } catch (err) {
        console.log("error fetching user feedbacks, error:" + err.message);
      }
    };
    getFeedback();
  }, []);

  return (
    <div>
      {loadingState ? (
        <div
          style={{
            height: "90vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingScreen />
        </div>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width={250}>User comment</TableCell>
                <TableCell width={200} align="left">
                  Satisfication
                </TableCell>
                <TableCell align="center">UI (satisfied)</TableCell>
                <TableCell align="center">User privacy (satisfied)</TableCell>
                <TableCell align="center">Speed (satisfied)</TableCell>
                <TableCell align="center">Consumption (satisfied)</TableCell>
                <TableCell align="center">Design (satisfied)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userFeedbacks &&
                userFeedbacks.map((feedback, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {feedback.comment}
                    </TableCell>
                    <TableCell align="left">{feedback.satisfication}</TableCell>
                    <TableCell align="center">
                      {feedback.finterface ? (
                        <img src={checkIcon} style={{ width: "20px" }} />
                      ) : null}
                    </TableCell>
                    <TableCell align="center">
                      {feedback.privacy ? (
                        <img src={checkIcon} style={{ width: "20px" }} />
                      ) : null}
                    </TableCell>
                    <TableCell align="center">
                      {feedback.speed ? (
                        <img src={checkIcon} style={{ width: "20px" }} />
                      ) : null}
                    </TableCell>
                    <TableCell align="center">
                      {feedback.consumption ? (
                        <img src={checkIcon} style={{ width: "20px" }} />
                      ) : null}
                    </TableCell>
                    <TableCell align="center">
                      {feedback.design}
                      {feedback.design ? (
                        <img src={checkIcon} style={{ width: "20px" }} />
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
