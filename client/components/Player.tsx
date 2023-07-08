import React, { useEffect } from 'react';
import { Card, IconButton, Grid } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUp from '@mui/icons-material/VolumeUp';
import styles from '../styles/Player.module.scss'
import { ITrack } from '@/types/track';
import TrackProgress from './TrackProgress';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAction } from '@/hooks/useAction';

let audio: any;

const Player = () => {
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player);
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration} = useAction();

    useEffect(() => {
        if(!audio) {
            audio = new Audio();
        } else {
            setAudio();
            play();
        }
    }, [active])

    const setAudio = () => {
        if(active) {
            audio.src = 'http://localhost:5000/' + active.audio;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration));
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime));
            }
        }
    }

    const play = () => {
        if(pause) {
            playTrack();
            audio.play();
        } else {
            pauseTrack();
            audio.pause();
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value));
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value));
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {!pause
                    ? <PauseIcon/>
                    : <PlayArrowIcon/>
                }
            </IconButton>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration}  onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}} />
            <TrackProgress left={volume} right={100}  onChange={changeVolume}/>
        </div>
    );
};

export default Player;