import React, { useEffect, useState } from 'react';
import styles from './HomeScreen.module.scss';
import Button from '@mui/material/Button';
import useSound from 'use-sound';


const HomeScreen = () => {
    const [test, setTest] = useState('Valentines')
    let context = new AudioContext();
    const [locationOne, setLocationOne] = useState(5);
    const [locationTwo, setLocationTwo] = useState(10);
    const [playActive] = useSound(
        '../../sounds/holy_moly.mp3',
        { volume: 0.75 }
      );

    const max: number = 150;


    const handleYes = () => {
        context.resume().then(() => {
            playActive()
        })
        return "hello";
    }

    const handleNo = (buttonNum: number) => {
        if (buttonNum === 1) {
            console.log(Math.random())
            setLocationOne(Math.ceil(Math.random() * max));
        }
        else {
            setLocationTwo(Math.ceil(Math.random() * max));
        }
    }

    return (
        <div className={styles['home-screen']}>
            <div className={styles['home-screen-container']}>
                <h1>Will you be my {test}?</h1>

                <div className={styles['home-screen-container-buttons']}>
                    <Button
                    color="secondary" 
                    variant="contained"
                    onClick={handleYes}
                    >
                        Yes
                    </Button>

                    <Button 
                    className={styles['shy-button-1']}
                    variant="outlined"
                    onClick={() => handleNo(1)}
                    style={{ 
                        top: `${locationOne.toString()}%`,
                    }}
                    >
                        No
                    </Button>

                    <Button 
                    className={styles['shy-button-2']}
                    variant="outlined"
                    onClick={() => handleNo(2)}
                    style={{ 
                        top: `${locationTwo.toString()}%`,
                    }}
                    >
                        I HATE YOU!
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default HomeScreen;