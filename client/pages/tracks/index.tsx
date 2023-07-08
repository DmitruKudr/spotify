import MainLayout from '@/layouts/MainLayout';
import React, {useState} from 'react';
import {Grid, Card, Button, Box, TextField} from '@mui/material'
import { useRouter } from 'next/router';
import { ITrack } from '@/types/track';
import TrackList from '@/components/TrackList';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAction } from '@/hooks/useAction';
import { NextThunkDispatch, wrapper } from '@/store';
import { fetchTracks, searchTracks } from '@/store/action-creators/tracks';
import {useDispatch} from "react-redux";

const Index = () => {
    const router = useRouter();
    const {tracks, error} = useTypedSelector(state => state.tracks);

    const [query, setQuery] = useState('');

    const dispatch = useDispatch() as NextThunkDispatch;
    const [timer, setTimer] = useState<any>(null);

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);

        if(timer) {
            clearTimeout(timer);
        }
        setTimer(
            setTimeout( async () => {
                await dispatch(await searchTracks(e.target.value));
            }, 500)
        );
    }

    if(error) {
        return(
            <MainLayout>
                <h1>{error}</h1>
            </MainLayout>
        )
    }

    return (
        <MainLayout title='track list - music platform'>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Track list</h1>
                            <Button onClick={() => router.push('/tracks/create')}>
                                Upload track
                            </Button>
                        </Grid>
                    </Box>
                    <TextField 
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    <TrackList tracks={tracks} />
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
    store => async () =>
    {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(fetchTracks());

        return { props: {} }
    }
);