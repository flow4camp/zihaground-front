import React, { useState } from "react";

type AssetVariant = {
    id: number;
    src: string;
} | null ;      // nullable

type CategoryProps = {
    variants: AssetVariant[];
    selectedVariant: AssetVariant;
    setSelectedVariant: (newItem: AssetVariant) => void;
    myList: number[];
};

export const HatOptions: React.FC<CategoryProps> = ({ variants, selectedVariant, setSelectedVariant, myList }) => {

    const [newSelectedHat, setNewSelectedHat] = useState(selectedVariant);
    const handleSelectedHat = (newSelectedHat: AssetVariant) => {
        setNewSelectedHat(newSelectedHat);
        setSelectedVariant(newSelectedHat);
    }

    return (
        <div style={styles.itemContainerWrapper}>
            <div style={styles.itemContainer}>
                <div style={newSelectedHat === null ? styles.selectedItem : styles.item}>
                    <img
                        src={require("../assets/null.png")}
                        alt="No Hat"
                        onClick={() => handleSelectedHat(null)}
                    />
                </div>
                {variants.map((variant) => (
                    myList.includes(variant!.id) && (
                    <div
                        key={variant?.id}
                        style={newSelectedHat === variant ? styles.selectedItem : styles.item}
                    >
                        <div
                            style={{
                                backgroundImage: `url(${variant?.src})`,
                                backgroundSize: "170% auto",
                                backgroundPosition: "top center",
                                width: "100px",
                                height: "100px",
                                marginTop: '40px',
                            }}
                            onClick={() => handleSelectedHat(variant)}
                        />
                    </div>
                    )
                ))}
            </div>
        </div>
    );
};

export const AccOptions: React.FC<CategoryProps> = ({ variants, selectedVariant, setSelectedVariant, myList }) => {

    const [newSelectedAcc, setNewSelectedAcc] = useState(selectedVariant);
    const handleSelectedAcc = (newSelectedAcc: AssetVariant) => {
        setNewSelectedAcc(newSelectedAcc);
        setSelectedVariant(newSelectedAcc);
    }

    return (
        <div style={styles.itemContainerWrapper}>
            <div style={styles.itemContainer}>
                <div style={newSelectedAcc === null ? styles.selectedItem : styles.item}>
                    <img
                        src={require("../assets/null.png")}
                        alt="No Accessory"
                        onClick={() => handleSelectedAcc(null)}
                    />
                </div>
                {variants.map((variant) => (
                    myList.includes(variant!.id) && (
                    <div
                        key={variant?.id}
                        // style={styles.item}
                        style={newSelectedAcc === variant ? styles.selectedItem : styles.item}
                    >
                        <div
                            style={{
                                backgroundImage: `url(${variant?.src})`,
                                backgroundSize: "120% auto",
                                backgroundPosition: "center center",
                                width: "100px",
                                height: "100px",
                                marginTop: '20px',
                                marginLeft: '10px'
                            }}
                            onClick={() => handleSelectedAcc(variant)}
                        />
                        </div>
                      )
                ))}
            </div>
        </div>
    );
};

export const FaceOptions: React.FC<CategoryProps> = ({ variants, selectedVariant, setSelectedVariant, myList }) => {

    const [newSelectedFace, setNewSelectedFace] = useState(selectedVariant);
    const handleSelectedAcc = (newSelectedFace: AssetVariant) => {
        setNewSelectedFace(newSelectedFace);
        setSelectedVariant(newSelectedFace);
    }

    return (
        <div style={styles.itemContainerWrapper}>
            <div style={styles.itemContainer}>
                {variants.map((variant) => (
                      myList.includes(variant!.id) && (
                    <div
                        key={variant?.id}
                        style={newSelectedFace === variant ? styles.selectedItem : styles.item}
                    >
                        <div
                            style={{
                                backgroundImage: `url(${variant?.src})`,
                                backgroundSize: "220% auto",
                                backgroundPosition: "center center",
                                width: "100px",
                                height: "100px",
                                marginTop: '70px',
                                marginLeft: '10px'
                            }}
                            onClick={() => handleSelectedAcc(variant)}
                        />
                        </div>
                      )
                ))}
            </div>
        </div>
    );
};

export const ClothesOptions: React.FC<CategoryProps> = ({ variants, selectedVariant, setSelectedVariant, myList }) => {

    const [newSelectedClothes, setNewSelectedClothes] = useState(selectedVariant);
    const handleSelectedClothes = (newSelectedClothes: AssetVariant) => {
        setNewSelectedClothes(newSelectedClothes);
        setSelectedVariant(newSelectedClothes);
    }

    return (
        <div style={styles.itemContainerWrapper}>
            <div style={styles.itemContainer}>
                <div style={newSelectedClothes === null ? styles.selectedItem : styles.item}>
                    <img
                        src={require("../assets/null.png")}
                        alt="No Clothes"
                        onClick={() => handleSelectedClothes(null)}
                    />
                </div>
                {variants.map((variant) => (
                      myList.includes(variant!.id) && (
                    <div
                        key={variant?.id}
                        style={newSelectedClothes === variant ? styles.selectedItem : styles.item}
                    >
                        <div
                            style={{
                                backgroundImage: `url(${variant?.src})`,
                                backgroundSize: "120% auto",
                                backgroundPosition: "bottom center",
                                width: "100px",
                                height: "100px",
                                marginTop: '10px',
                                marginLeft: '2px'
                            }}
                            onClick={() => handleSelectedClothes(variant)}
                        />
                        </div>
                      )
                ))}
            </div>
        </div>
    );
};

export const ShoesOptions: React.FC<CategoryProps> = ({ variants, selectedVariant, setSelectedVariant, myList }) => {

    const [newSelectedShoes, setNewSelectedShoes] = useState(selectedVariant);
    const handleSelectedShoes = (newSelectedShoes: AssetVariant) => {
        setNewSelectedShoes(newSelectedShoes);
        setSelectedVariant(newSelectedShoes);
    }

    return (
        <div style={styles.itemContainerWrapper}>
            <div style={styles.itemContainer}>
                <div style={newSelectedShoes === null ? styles.selectedItem : styles.item}>
                    <img
                        src={require("../assets/null.png")}
                        alt="No Shoes"
                        onClick={() => handleSelectedShoes(null)}
                    />
                </div>
                {variants.map((variant) => (
                      myList.includes(variant!.id) && (
                    <div
                        key={variant?.id}
                        style={newSelectedShoes === variant ? styles.selectedItem : styles.item}
                    >
                        <div
                            style={{
                                backgroundImage: `url(${variant?.src})`,
                                backgroundSize: "190% auto",
                                backgroundPosition: "bottom center",
                                width: "100px",
                                height: "100px",
                                marginBottom: '50px',
                            }}
                            onClick={() => handleSelectedShoes(variant)}
                        />
                    </div>
                      )
                ))}
            </div>
        </div>
    );
};

interface Styles {
    itemContainer: React.CSSProperties;
    item: React.CSSProperties;
    selectedItem: React.CSSProperties;
    itemContainerWrapper: React.CSSProperties;
}

const styles: Styles = {
    itemContainerWrapper: {
        overflowY: "auto",
    },
    itemContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        rowGap: "6%",
        justifyContent: "center",
        justifyItems: "center",
        marginTop: '2%',
    },
    item: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80px",
        height: "80px",
        backgroundColor: "#f0f0f0",
        border: 'none',
        borderRadius: '0.7em',
    },
    selectedItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80px",
        height: "80px",
        backgroundColor: "#f0f0f0",
        outline: '2px solid #5A5A5A',
        borderRadius: '0.7em',
    }
};