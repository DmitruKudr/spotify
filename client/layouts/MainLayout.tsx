import Navbar from '@/components/Navbar';
import Player from '@/components/Player';
import { Container } from '@mui/material';
import Head from 'next/head';
import React from 'react';

type MainLayoutProps = {
    children: React.ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
};


const MainLayout: React.FC<MainLayoutProps> = ({children, title, description, keywords}) => {
    return (
        <>
            <Head>
                <title>{title || 'music platform'}</title>
                <meta name='description' content={'music platform: leave your track here :)' + description}></meta>
                <meta name='robots' content='index, follow'></meta>
                <meta name='keywords' content={keywords || 'music, tracks, artists'} ></meta>
                <meta name='viewport' content='width-device-width, initial-scale=1'></meta>
            </Head>

            <Navbar/>
            <Container style={{margin: '90px 0'}}>
                {children}
            </Container>
            <Player/>
        </>
    );
};

export default MainLayout;