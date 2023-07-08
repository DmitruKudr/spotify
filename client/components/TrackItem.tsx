import { ITrack } from '@/types/track';
import { Card, IconButton, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import styles from '../styles/TrackItem.module.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useAction } from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface TrackItemProps {
    track: ITrack;
    active1?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active1 = false}) => {
    const router = useRouter();
    const {playTrack, pauseTrack, setActiveTrack} = useAction();
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player);


    const play = (e: any) => {
        e.stopPropagation();
        if(!active) {
            setActiveTrack(track);
            playTrack();
        } else {
            playTrack();
        }
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                {active?._id == track._id
                    ? <PlayArrowIcon style={{color: "skyblue"}}/>
                    : <PlayArrowIcon/>
                }
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/' + track.picture} alt='track'/>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                <DeleteIcon/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;