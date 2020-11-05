import React,{useCallback, useState, useEffect} from 'react';
import YouTube from 'react-youtube';

const RecipeVideo = (props) => {

    
    useEffect(() => {
        props.fetchMusic()
    }, [])
    
    console.log(props.videoIdList);
    
    return (
        <div>
                {props.videoIdList.map(videoId => (
                    <YouTube
                        videoId={videoId}                  // defaults -> null
                        // videoId={`${videoId}`}                  // defaults -> null
                        // id={string}                       // defaults -> null
                        // className={string}                // defaults -> null
                        // containerClassName={string}       // defaults -> ''
                        // opts={obj}                        // defaults -> {}
                        // onReady={func}                    // defaults -> noop
                        // onPlay={func}                     // defaults -> noop
                        // onPause={func}                    // defaults -> noop
                        // onEnd={func}                      // defaults -> noop
                        // onError={func}                    // defaults -> noop
                        // onStateChange={func}              // defaults -> noop
                        // onPlaybackRateChange={func}       // defaults -> noop
                        // onPlaybackQualityChange={func}    // defaults -> noop
                    />
                ))}
         
        </div>
    )
}
export default RecipeVideo