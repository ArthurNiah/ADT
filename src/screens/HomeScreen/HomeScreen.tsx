import React, { useEffect, useState } from 'react';
import styles from './HomeScreen.module.scss';
import Button from '@mui/material/Button';

import smirkDog from '../../images/corgi-smirk.gif';
import cryCat from '../../images/rip-juice-cry.gif';
import happyCat from '../../images/happy-cat.gif';



const HomeScreen = () => {
    const [test, setTest] = useState<string>('Valentines')
    const [isClickedOne, setIsClickedOne] = useState<boolean>(false);
    const [isClickedTwo, setIsClickedTwo] = useState<boolean>(false);
    const [locationOne, setLocationOne] = useState<number>(5);
    const [locationTwo, setLocationTwo] = useState<number>(10);

    // Force disable buttons to prevent spam clicks
    const [isDisabledOne, setIsDisabledOne] = useState<boolean>(false);
    const [isDisabledTwo, setIsDisabledTwo] = useState<boolean>(false);
    const [isDisabledYes, setIsDisabledYes] = useState<boolean>(false);
    const [currentGif, setCurrentGif] = useState(smirkDog);

    // Hint counter
    const [hintCounter, setHintCounter] = useState<number>(0);
    const max: number = 150;

    // Yes button click tracker
    const [yesClicked, setYesClicked] = useState<boolean>(false);

    useEffect(() => {
        if (hintCounter > 4) {
            setIsDisabledOne(true);
            setIsDisabledTwo(true);
        }

        else if (hintCounter > 3) {
            setIsDisabledTwo(true);
        }
        
        else if (hintCounter <= 3 && hintCounter > 0) {
            setIsDisabledOne(true);
            setIsDisabledTwo(true);
            setIsDisabledYes(true)
            setTimeout(() => {
                setIsDisabledOne(false);
                setIsDisabledTwo(false);
                setIsDisabledYes(false);
            }, 1000)
        }

    }, [hintCounter])
    
    const changeGif = async (response: boolean) => {
        if (response) {
            setCurrentGif(happyCat);
        }
        else {
            setCurrentGif(cryCat);

            setTimeout(() => {
                setCurrentGif(smirkDog)
            },1000)
        }
    }


    const handleYes = () => {
        changeGif(true);
        setHintCounter(0);
        setYesClicked(true);
    }

    const handleNo = async (buttonNum: number) => {
        
        setHintCounter(hintCounter + 1);
        console.log(hintCounter)

        if (buttonNum === 1) {
            setLocationOne(Math.ceil(Math.random() * max));
            setIsClickedOne(true);
            changeGif(false);
            setTimeout(() => {
                setIsClickedOne(false);
            }, 1000)
        }
        else {
            setLocationTwo(Math.ceil(Math.random() * max));
            setIsClickedTwo(true);
            changeGif(false);
            setTimeout(() => {
                setIsClickedTwo(false);
            }, 1000)
        }
    }

    return (
        <div className={styles['home-screen']}>
            <div className={styles['home-screen-container']}>
                <h1 className={styles['home-screen-container-header']}>Will you be my {test}?</h1>

                {
                    hintCounter === 1 ? (<span>Hint: Click YES.</span>) 
                    : hintCounter === 2 ? (<span>Haha :^) click Yes</span>)
                    : hintCounter === 3 ? (<span>Come on...just click YES</span>)
                    : hintCounter === 4 ? (<span>ok. i am disabling one of the buttons</span>)
                    : hintCounter > 3 ? (<span>FINE! i am disabling BOTH buttons</span>)
                    : ''
                }

                <div className={styles['home-screen-container-reactive-image']}>
                    <img src={currentGif} alt="loading..." />
                </div>

                <div className={styles['home-screen-container-buttons']}>
                    {
                        yesClicked ? (
                            <div className={styles['home-screen-container-buttons-pulsating']}>
                                <span className={styles['home-screen-container-buttons-pulsating-word1']}>YIPPES</span>
                                <span className={styles['home-screen-container-buttons-pulsating-word2']}>YIPPES</span>
                                <span className={styles['home-screen-container-buttons-pulsating-word3']}>YIPPES</span>
                            </div>
                        ) :
                        (
                            <>
                                <Button
                                disabled={isDisabledYes}
                                color="success" 
                                variant="contained"
                                onClick={handleYes}
                                >
                                    YES!
                                </Button>
                                
                                <Button 
                                className={styles['shy-button']}
                                disabled={isDisabledOne}
                                color='error'
                                variant="contained"
                                onClick={() => handleNo(1)}
                                style={{ 
                                    top: `${locationOne.toString()}%`,
                                }}
                                >
                                    {isClickedOne ? ' :( ' : "No!!"}
                                </Button>
            
                                <Button 
                                className={styles['shy-button']}
                                disabled={isDisabledTwo}
                                color='error'
                                variant="contained"
                                onClick={() => handleNo(2)}
                                style={{ 
                                    top: `${locationTwo.toString()}%`,
                                }}
                                >
                                    {isClickedTwo ? ' :^((((((  ' : "hate U!"}
                                </Button>
                            </>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default HomeScreen;