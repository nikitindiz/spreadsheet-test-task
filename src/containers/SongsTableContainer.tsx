import React from 'react';

import API from '../api';
import SongsTable from '../components/SongsTable';
import WatchableSong from '../interfaces/WatchableSong';

interface SongsTableContainerState {
    songs: WatchableSong[];
    lastError: string | null;
    fetchStatus: 'IDLE' | 'STARTED' | 'SUCCEED' | 'FAILED';
}

export default class SongsTableContainer extends React.Component<any, SongsTableContainerState> {
    constructor(props: any) {
        super(props);

        this.state = {
            songs: [],
            lastError: null,
            fetchStatus: 'IDLE',
        };
    }

    fetchData = () => {
        this.setState({
            songs: [],
            lastError: null,
            fetchStatus: 'STARTED',
        }, () => {
            API
                .getSongs()
                .then(result => result.json())
                .then(unsortedSongs => {
                    const songs = unsortedSongs.sort((a, b) => {
                        if (a.id < b.id) return -1;
                        if (a.id > b.id) return 1;

                        return 0;
                    });

                    this.setState({
                        songs,
                        fetchStatus: 'SUCCEED',
                    })
                })
                .catch(err => {
                    this.setState({
                        lastError: err.message,
                        fetchStatus: 'FAILED',
                    })
                })
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    toggleWatch = (songId: number) => {
        const songs = [ ...this.state.songs ];
        const songIndex = songs.findIndex(({ id }) => id === songId);
        songs[songIndex] = {
            ...songs[songIndex],
            watching: !songs[songIndex].watching,
        };

        this.setState({ songs });
    };

    render() {
        const { songs, lastError, fetchStatus } = this.state;

        return (
            <>
                {fetchStatus === 'STARTED' && (
                    <div className="spinner">
                        Загружаем список треков...
                    </div>
                )}

                {fetchStatus === 'FAILED' && (
                    <div className="error-notification">
                        Failed load songs: {lastError}
                    </div>
                )}

                {fetchStatus === 'SUCCEED' && (
                    <SongsTable
                        songs={songs}
                        markSongAsWatched={this.toggleWatch}
                    />
                )}
            </>
        );
    }
}