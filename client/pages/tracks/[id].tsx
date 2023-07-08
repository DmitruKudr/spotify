import MainLayout from '@/layouts/MainLayout';
import { ITrack } from '@/types/track';
import { Button, Grid, TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import {useState} from 'react';
import axios from "axios"
import { useInput } from '@/hooks/useInput';

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack);
    const router = useRouter();

    const username = useInput('');
    const text = useInput('');

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            });

            setTrack({...track, comments: [...track.comments, response.data]})
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <MainLayout 
            title={'music platform - ' + track.name + ' - ' + track.artist}
            keywords={`track, ${track.name}, ${track.artist}`}
        >
            <Button 
                onClick={() => router.push('/tracks')}
                variant={'outlined'}
                style={{fontSize: 32}}
            >
                To the list
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200} alt='pic'/>
                <div style={{margin: '50px'}}>
                    <h1>Trck name: {track.name}</h1>
                    <h1>Artist name: {track.artist}</h1>
                    <h1>Track listens: {track.listens}</h1>
                </div>
            </Grid>
            <h1>Text:</h1>
            <p>{track.text}</p>
            <h1>Comments:</h1>
            <Grid container>
                <TextField
                    label="your name"
                    fullWidth
                    style={{marginTop: 20}}
                    {...username}
                />
                <TextField
                    label="your comment"
                    style={{marginTop: 20}}
                    fullWidth
                    multiline
                    rows={4}
                    {...text}
                />
                <Button onClick={addComment}>
                    Send
                </Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <div key={comment._id}>
                        <div>User - {comment.username}</div>
                        <div>Comment - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/tracks/' + params?.id);

    return {
        props: {
            serverTrack: response.data
        }
    }
}