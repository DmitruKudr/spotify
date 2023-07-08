import FileUpload from '@/components/FileUpload';
import StepWrapper from '@/components/StepWrapper';
import { useInput } from '@/hooks/useInput';
import MainLayout from '@/layouts/MainLayout';
import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';

const Create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture] = useState(null);
    const [audio, setAudio] = useState(null);
    const router = useRouter();

    const name = useInput('');
    const artist = useInput('');
    const text = useInput('');

    const next = () => {
        if(activeStep !== 2) {
            setActiveStep(prev => prev + 1);
        } else {
            const formData = new FormData();

            formData.append('name', name.value);
            formData.append('artist', artist.value);
            formData.append('text', text.value);
            formData.append('audio', audio);
            formData.append('picture', picture);
            axios.post('http://localhost:5000/tracks', formData)
                .then(res => router.push('/tracks'))
                .catch(e => console.log(e));
        }
    }
    const back = () => {
        setActiveStep(prev => prev - 1);
    }

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid container direction={'column'} style={{padding: 20}}>
                        <TextField
                            {...name}
                            style={{marginTop: 10}}
                            label="Track name"
                        />
                        <TextField
                            {...artist}
                            style={{marginTop: 10}}
                            label="Author"
                        />
                        <TextField
                            {...text}
                            style={{marginTop: 10}}
                            label="Track text"
                            multiline
                            rows={3}
                        />
                    </Grid>
                }
                {activeStep === 1 &&
                    <FileUpload setFile={setPicture} accept='image/*'>
                        <Button>Upload image</Button>
                    </FileUpload>
                }
                {activeStep === 2 &&
                    <FileUpload setFile={setAudio} accept='audio/*'>
                    <Button>Upload audio</Button>
                </FileUpload>
                }
            </StepWrapper>
            <Grid container justifyContent={'space-between'}>
                <Button disabled={activeStep === 0} onClick={back}>Back</Button>
                <Button onClick={next}>Next</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;