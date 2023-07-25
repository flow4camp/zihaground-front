import React, { Component, useState } from "react";
import { Button, useTheme } from "@chakra-ui/react";
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";
import UserCharacter from "../components/UserCharacter";
import { hatVariants, faceVariants, accVariants, clothesVariants, shoeVariants } from "../components/AssetVariants";
import { HatOptions, AccOptions, FaceOptions, ClothesOptions, ShoesOptions } from "../components/AssetOptions";
import { useUserContext } from '../context/UserContext';
import { API_URL } from '../api';

type AssetVariant = {
  id: number;
  src: string;
} | null ;      // nullable

function EditCharacter() {
  const navigate = useNavigate();   // navigator
  const { user, setUser } = useUserContext();

  // tab option 중 선택한 item state 관리
  const [selectedHat, setSelectedHat] = useState<AssetVariant>(user.hatVariants !== -1 ? hatVariants[user.hatVariants] : null);
  const [selectedAcc, setSelectedAcc] = useState<AssetVariant>(user.accVariants !== -1 ? accVariants[user.accVariants] : null);
  const [selectedFace, setSelectedFace] = useState<AssetVariant>(user.accVariants!== -1 ?  faceVariants[user.faceVariants] : faceVariants[0]);
  const [selectedClothes, setSelectedClothes] = useState<AssetVariant>(user.clothesVariants !== -1 ? clothesVariants[user.clothesVariants] : null);
  const [selectedShoe, setSelectedShoe] = useState<AssetVariant>(user.shoeVariants !== -1 ?  shoeVariants[user.shoeVariants] : null);

  // ** tab 순서: hat, acc, face, clothes, shoe (0~4) **
  const tabOptions = [<HatOptions variants={hatVariants} selectedVariant={selectedHat} setSelectedVariant={setSelectedHat} />,
    <AccOptions variants={accVariants} selectedVariant={selectedAcc} setSelectedVariant={setSelectedAcc} />,
    <FaceOptions variants={faceVariants} selectedVariant={selectedFace} setSelectedVariant={setSelectedFace} />,
    <ClothesOptions variants={clothesVariants} selectedVariant={selectedClothes} setSelectedVariant={setSelectedClothes} />,
    <ShoesOptions variants={shoeVariants} selectedVariant={selectedShoe} setSelectedVariant={setSelectedShoe} />
  ];

  // tab state 관리
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedTabOptions, setSelectedTabOptions] = useState<JSX.Element>(tabOptions[0]);

  const handleTabClick = (tab: number) => {
    setSelectedTab(tab);
    setSelectedTabOptions(tabOptions[tab]);
  };
  const theme = useTheme();
  // const itemNumbers = Array.from({ length: 36 }, (_, index) => index + 1);
  const handleCharacterEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const requestData = {
      hatVariants: selectedHat?.id ?? -1,
      accVariants: selectedAcc?.id ?? -1,
      faceVariants: selectedFace?.id ?? -1,
      clothesVariants: selectedClothes?.id ?? -1,
      shoeVariants: selectedShoe?.id ?? -1
    };

    fetch(API_URL + `/user/character/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.statusCode === 400) {
          console.log('이미 존재하는 아이디/이름입니다');
        }
        else {
          setUser(data);
          navigate('/home');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          height: "50%",
          backgroundColor: theme.colors.ziha_charcoal,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: 'relative'
        }}
      >
        <UserCharacter
          edit={true}
          selectedHat={selectedHat}
          selectedAcc={selectedAcc}
          selectedFace={selectedFace}
          selectedClothes={selectedClothes}
          selectedShoe={selectedShoe}
        />
        <ChevronLeftIcon
          boxSize={10}
          color='white'
          position='absolute'
          left={0}
          top={0}
          m={2}
          onClick={() => (navigate('/home'))}
        />
        <Button
          position='absolute'
          right={0}
          top={0}
          m={2}
          p={2}
          style={{ fontFamily: "Font-Content-Light" }}
          fontSize='md'
          bg='transparent'
          color='white'
          _active={{ backgroundColor: 'whiteAlpha.400' }}
          _focus={{ backgroundColor: 'whiteAlpha.400' }}
          onClick={handleCharacterEdit}
        >
          저장하기
        </Button>
      </div>
      <div style={styles.tabContainer}>
        <button
          style={selectedTab === 0 ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick(0)}
        >
          <img src="/icons/hat.png" style={{ width: "30px" }} alt="hat tab" />
        </button>
        <button
          style={selectedTab === 1 ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick(1)}
        >
          <img src="/icons/glasses.png" style={{ width: "30px" }} alt="accessory tab" />
        </button>
        <button
          style={selectedTab === 2 ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick(2)}
        >
          <img src="/icons/face_smile.png" style={{ width: "30px" }} alt="face tab" />
        </button>
        <button
          style={selectedTab === 3 ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick(3)}
        >
          <img src="/icons/clothes.png" style={{ width: "30px" }} alt="clothes tab" />
        </button>
        <button
          style={selectedTab === 4 ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick(4)}
        >
          <img src="/icons/shoes.png" style={{ width: "30px" }} alt="shoes tab" />
        </button>
      </div>
      {/* <div style={styles.itemContainerWrapper}>
        <div style={styles.itemContainer}>
          {itemNumbers.map((itemNumber) => (
            <div key={itemNumber} style={styles.item}>
              {itemNumber}
            </div>
          ))}
        </div>
      </div> */}
      {/* <HatOptions
        variants={hatVariants}
        selectedVariant={selectedHat}
        setSelectedVariant={setSelectedHat}
      /> */}
      {/* <AccOptions
        variants={accVariants}
        selectedVariant={selectedAcc}
        setSelectedVariant={setSelectedAcc}
      /> */}
      {selectedTabOptions}
    </div>
  );
}

interface Styles {
  container: React.CSSProperties;
  charContainer: React.CSSProperties;
  tabContainer: React.CSSProperties;
  tab: React.CSSProperties;
  activeTab: React.CSSProperties;
  // itemContainer: React.CSSProperties;
  // item: React.CSSProperties;
  // itemContainerWrapper: React.CSSProperties;
}

const styles: Styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  charContainer: {
    height: "50%",
  },
  tabContainer: {
    display: "flex",
    alignItems: "center",
  },
  tab: {
    padding: "5px 16px",
    margin: "4px 5px",
    cursor: "pointer",
    border: "none",
    background: "transparent",
  },
  activeTab: {
    padding: "5px 16px",
    margin: "4px 5px",
    cursor: "pointer",
    border: "none",
    background: "#ccc",
    borderRadius: '0.5em',
  },
  // itemContainerWrapper: {
  //   overflowY: "auto",
  // },
  // itemContainer: {
  //   display: "grid",
  //   gridTemplateColumns: "repeat(4, 1fr)",
  //   gridTemplateRows: "repeat(4, 1fr)",
  //   rowGap: "1%",
  //   justifyContent: "center",
  //   justifyItems: "center",
  // },
  // item: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: "80px",
  //   height: "80px",
  //   backgroundColor: "green",
  // },
};

export default EditCharacter;
