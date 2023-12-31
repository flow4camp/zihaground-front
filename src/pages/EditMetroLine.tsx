import {
  Image,
  Text,
  Box,
  Button,
  Flex,
  useTheme,
  useToast,
  ToastProvider,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { API_URL } from "../api";
import axios from "axios";
import { useUserContext, User } from "../context/UserContext";

function EditMetroLine() {
  const navigate = useNavigate(); // navigator
  const theme = useTheme();
  const { user, setUser } = useUserContext();

  const [firstSelectedLine, setFirstSelectedLine] = useState("1호선");
  const [secondSelectedLine, setSecondSelectedLine] = useState("2호선");
  const [firstSelectedStation, setFirstSelectedStation] = useState("대전역");
  const [secondSelectedStation, setSecondSelectedStation] = useState("대전역");
  const [thirdSelectedStation, setThirdSelectedStation] = useState("대전역");

  const [isLineModalOpen, setIsLineModalOpen] = useState(false);
  const [isStationModalOpen, setIsStationModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  const [isSecondLine, setIsSecondLine] = useState(false);
  const [stationNumber, setStationNumber] = useState(1);

  const [firstBorderColor, setFirstBorderColor] = useState(
    theme.colors.line_1_color
  );
  const [secondBorderColor, setSecondBorderColor] = useState(
    theme.colors.line_2_color
  );

  const handleStationClick = (stationNum: number) => {
    setIsStationModalOpen(true);
    setStationNumber(stationNum);
  };
  const handleLineClick = (isSecondLine: boolean) => {
    setIsLineModalOpen(true);
    setIsSecondLine(isSecondLine);
  };

  const handleCloseLineModal = () => {
    setIsLineModalOpen(false);
  };
  const handleCloseStationModal = () => {
    setIsStationModalOpen(false);
  };
  const handleCloseTimeModal = () => {
    setIsTimeModalOpen(false);
  };
  const handleLineSelection = async (line: string) => {
    const subwayNum = parseInt(line[0]);
    if (isSecondLine) {
      setSecondSelectedLine(line);
      setSecondBorderColor(getLineColor(line));
      try {
        const response = await axios.put(`${API_URL}/user/${user.id}/line2`, {
          subwayNum2: subwayNum,
        });
        setUser((prevUser: User) => ({
          ...prevUser,
          subwayNum2: response.data.subwayNum2,
        }));
      } catch (error) {
        console.error("Error updating 노선", error);
      }
    } else {
      setFirstSelectedLine(line);
      setFirstBorderColor(getLineColor(line));
      try {
        const response = await axios.put(`${API_URL}/user/${user.id}/line1`, {
          subwayNum1: subwayNum,
        });
        setUser((prevUser: User) => ({
          ...prevUser,
          subwayNum1: response.data.subwayNum1,
        }));
      } catch (error) {
        console.error("Error updating 노선", error);
      }
    }
    setIsLineModalOpen(false);
  };

  useEffect(() => {
    setFirstBorderColor(theme.colors[`line_${user.subwayNum1}_color`]);
    setSecondBorderColor(theme.colors[`line_${user.subwayNum2}_color`]);
  }, [user.subwayNum1, user.subwayNum2]);

  const handleStationSelection = async (station: string) => {
    if (stationNumber === 1) {
      try {
        // Make the API request to update the station1 value for the user
        const response = await axios.put(
          `${API_URL}/user/${user.id}/station1`,
          {
            station1: station,
          }
        );
        setUser((prevUser: User) => ({
          ...prevUser,
          station1: response.data.station1,
        }));
        setFirstSelectedStation(response.data.station1);
      } catch (error) {
        console.error("Error updating station1:", error);
      }
    } else if (stationNumber === 2) {
      setSecondSelectedStation(station);
      try {
        const response = await axios.put(
          `${API_URL}/user/${user.id}/station2`,
          {
            station2: station,
          }
        );
        setUser((prevUser: User) => ({
          ...prevUser,
          station2: response.data.station2,
        }));
        setSecondSelectedStation(response.data.station2);
      } catch (error) {
        console.error("Error updating station2:", error);
      }
    } else if (stationNumber === 3) {
      setThirdSelectedStation(station);
      try {
        const response = await axios.put(
          `${API_URL}/user/${user.id}/station3`,
          {
            station3: station,
          }
        );
        setUser((prevUser: User) => ({
          ...prevUser,
          station3: response.data.station3,
        }));
        setThirdSelectedStation(response.data.station3);

        // If the API request is successful, the station1 value in the database is updated
      } catch (error) {
        console.error("Error updating station1:", error);
        // Handle error if the API request fails
      }
    }
    setIsStationModalOpen(false);
  };

  const getLineColor = (line: string) => {
    switch (line) {
      case "1호선":
        return theme.colors.line_1_color;
      case "2호선":
        return theme.colors.line_2_color;
      case "3호선":
        return theme.colors.line_3_color;
      case "4호선":
        return theme.colors.line_4_color;
      case "5호선":
        return theme.colors.line_5_color;
      case "6호선":
        return theme.colors.line_6_color;
      case "7호선":
        return theme.colors.line_7_color;
      case "8호선":
        return theme.colors.line_8_color;
      case "9호선":
        return theme.colors.line_9_color;
      default:
        return theme.colors.line_1_color;
    }
  };

  const stationOptions = [
    "서울역",
    "합정역",
    "청량리역",
    "노량진역",
    "신도림역",
    "왕십리역",
    "혜화역",
    "구로역",
    "봉천역",
    "용산역",
    "동대문",
  ];
  const metroLineOptions = [
    "1호선",
    "2호선",
    "3호선",
    "4호선",
    "5호선",
    "6호선",
    "7호선",
    "8호선",
    "9호선",
  ];

  const [firstTime, setFirstTime] = useState("20:10");
  const [secondTime, setSecondTime] = useState("20:20");
  const [thirdTime, setThirdTime] = useState("21:30");
  const handleTimeClick = (stationNum: number) => {
    // Set the correct time for the stationNum
    const selectedTime = getTimeForStation(stationNum);

    // Open the time selection modal
    setIsTimeModalOpen(true);

    if (stationNum === 1) {
      setFirstTime(selectedTime);
    } else if (stationNum === 2) {
      setSecondTime(selectedTime);
    } else if (stationNum === 3) {
      setThirdTime(selectedTime);
    }

    setStationNumber(stationNum);
  };

  const getTimeForStation = (stationNum: number) => {
    const currentTime = new Date();
    const hour = String(currentTime.getHours()).padStart(2, "0");
    const minute = String(currentTime.getMinutes()).padStart(2, "0");
    return `${hour}:${minute}`;
  };

  const handleTimeSelection = async () => {
    let updatedTime = "00:00";
    if (stationNumber === 1) {
      updatedTime = firstTime;
    } else if (stationNumber === 2) {
      updatedTime = secondTime;
    } else if (stationNumber === 3) {
      updatedTime = thirdTime;
    }

    try {
      // Update the corresponding state based on the server response
      if (stationNumber === 1) {
        const response = await axios.put(`${API_URL}/user/${user.id}/time1`, {
          firsttime: updatedTime,
        });

        setFirstTime(response.data.firsttime);
        setUser((prevUser: User) => ({
          ...prevUser,
          firsttime: response.data.firsttime,
        }));
      } else if (stationNumber === 2) {
        const response = await axios.put(`${API_URL}/user/${user.id}/time2`, {
          secondtime: updatedTime,
        });
        setSecondTime(response.data.time);
        setUser((prevUser: User) => ({
          ...prevUser,
          secondtime: response.data.secondtime,
        }));
      } else if (stationNumber === 3) {
        const response = await axios.put(`${API_URL}/user/${user.id}/time3`, {
          thirdtime: updatedTime,
        });
        setThirdTime(response.data.time);
        setUser((prevUser: User) => ({
          ...prevUser,
          thirdtime: response.data.thirdtime,
        }));
      }
    } catch (error) {
      console.error("Error updating time:", error);
    }

    setIsTimeModalOpen(false);
  };

  return (
    <Flex
      direction="column"
      style={{ backgroundColor: theme.colors.ziha_charcoal, height: "100vh" }}
    >
      <Box
        w="100%"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        }}
      >
        <Box>
          <ChevronLeftIcon
            boxSize={10}
            color="white"
            m={2}
            onClick={() => navigate("/mypage")}
          />
        </Box>

        <Text
          w="fit-content"
          p={3}
          m={2}
          fontSize="xl"
          style={{ fontFamily: "Font-Title-light", color: "white" }}
        >
          내 노선
        </Text>
      </Box>
      <Flex direction="column" justify="center" align="center" height="100%">
        <Flex
          justify="center"
          align="center"
          direction="column"
          style={{
            borderRadius: "0px",
            height: "100%",
            width: "80%",
          }}
        >
          {/* 첫번째 역 */}
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "white",
              border: "3px solid #ccc",
            }}
          ></div>
          <Text
            style={{
              fontFamily: "Font-title-light",
              color: "white",
              fontSize: "20px",
            }}
            onClick={() => handleStationClick(1)}
          >
            {user.station1}
          </Text>
          <Text
            style={{
              fontFamily: "Font-title-light",
              color: "white",
              fontSize: "17px",
            }}
            onClick={() => handleTimeClick(1)}
          >
            {user.firsttime}
          </Text>
          {/* 첫번째 노선 */}
          <Box
            style={{
              width: "0",
              height: "10%",
              border: `4px solid ${firstBorderColor}`,
              borderRadius: "20px",
            }}
          ></Box>
          <Text
            style={{
              fontFamily: "Font-title-light",
              color: "white",
              fontSize: "30px",
            }}
            onClick={() => handleLineClick(false)}
          >
            {user.subwayNum1} 호선
          </Text>
          <Box
            style={{
              width: "0",
              height: "10%",
              border: `4px solid ${firstBorderColor}`,
              borderRadius: "20px",
            }}
          ></Box>
          {/* 두번째 역 */}
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "white",
              border: "3px solid #ccc",
            }}
          ></div>
          <Text
            style={{
              fontFamily: "Font-title-light",
              color: "white",
              fontSize: "20px",
            }}
            onClick={() => handleStationClick(2)}
          >
            {user.station2}
          </Text>
          <Text
            style={{
              fontFamily: "Font-title-light",
              color: "white",
              fontSize: "17px",
            }}
            onClick={() => handleTimeClick(2)}
          >
            {user.secondtime}
          </Text>
          {/* 두번쨰 노선 */}
          <Box
            style={{
              width: "0",
              height: "10%",
              border: `4px solid ${secondBorderColor}`,
              borderRadius: "20px",
            }}
          ></Box>
          <Text
            style={{
              fontFamily: "Font-title-light",
              color: "white",
              fontSize: "30px",
            }}
            onClick={() => handleLineClick(true)}
          >
            {user.subwayNum2} 호선
          </Text>
          <Box
            style={{
              width: "0",
              height: "10%",
              border: `4px solid ${secondBorderColor}`,
              borderRadius: "20px",
            }}
          ></Box>
          {/* 마지막 도착역 */}
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "white",
              border: "3px solid #ccc",
            }}
          ></div>
          <Text
            style={{
              fontFamily: "Font-title-light",
              color: "white",
              fontSize: "20px",
            }}
            onClick={() => handleStationClick(3)}
          >
            {user.station3}
          </Text>
          <Text
            style={{
              fontFamily: "Font-title-light",
              color: "white",
              fontSize: "17px",
            }}
            onClick={() => handleTimeClick(3)}
          >
            {user.thirdtime}
          </Text>
        </Flex>
      </Flex>
      {/* 호선 선택 Modal */}
      <Modal isOpen={isLineModalOpen} onClose={handleCloseLineModal}>
        <ModalOverlay />
        <ModalContent style={{ width: "80%", opacity: "0.5" }}>
          <ModalHeader style={{ textAlign: "center" }}>
            호선 선택하기
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {metroLineOptions.map((line) => (
              <Button
                key={line}
                onClick={() => handleLineSelection(line)}
                w="100%"
              >
                {line}
              </Button>
            ))}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      {/* 역 선택 모달 */}
      <Modal isOpen={isStationModalOpen} onClose={handleCloseStationModal}>
        <ModalOverlay />
        <ModalContent style={{ width: "80%", opacity: "0.5" }}>
          <ModalHeader style={{ textAlign: "center" }}>역 선택하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {stationOptions.map((station) => (
              <Button
                key={station}
                onClick={() => handleStationSelection(station)}
                w="100%"
              >
                {station}
              </Button>
            ))}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isTimeModalOpen} onClose={handleCloseTimeModal}>
        <ModalOverlay />
        <ModalContent style={{ width: "80%", opacity: "0.5" }}>
          <ModalHeader style={{ textAlign: "center" }}>
            시간 선택하기
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify="center" align="center" direction="column">
              <Input
                type="time"
                value={
                  stationNumber === 1
                    ? firstTime
                    : stationNumber === 2
                    ? secondTime
                    : thirdTime
                }
                onChange={(e) => {
                  const timeValue = e.target.value;
                  // Set the selected time for the respective station
                  if (stationNumber === 1) {
                    setFirstTime(timeValue);
                  } else if (stationNumber === 2) {
                    setSecondTime(timeValue);
                  } else if (stationNumber === 3) {
                    setThirdTime(timeValue);
                  }
                }}
              />
              <Button onClick={handleTimeSelection}>확인</Button>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default EditMetroLine;
