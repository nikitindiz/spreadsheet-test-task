import Song from "./Song";

type WatchableSong = Song & {
    watching?: Boolean
};

export default WatchableSong;

