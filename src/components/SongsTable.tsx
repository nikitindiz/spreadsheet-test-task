import React from 'react';

import WatchableSong from '../interfaces/WatchableSong';
import EyeIcon from './EyeIcon';

import './SongsTable.css';

interface SongTableProps {
    songs: WatchableSong[];
    markSongAsWatched: (songId: number) => void;
}

export default class SongsTable extends React.Component<SongTableProps> {
    render() {
        const { songs = [], markSongAsWatched } = this.props;

        return (
            <table className="songs-table">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td colSpan={2}>Композиция</td>
                    </tr>
                </thead>
                <tbody>
                    {songs.map(({ id, band, name, watching }) => (
                        <tr onClick={() => markSongAsWatched(id)}>
                            <td>{id}</td>
                            <td>{band} - {name}</td>
                            <td>{watching ? <EyeIcon /> : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}