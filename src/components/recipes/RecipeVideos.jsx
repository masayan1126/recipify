import React,{useCallback, useState, useEffect} from 'react';
import RecipeVideo from "./RecipeVideo";

const RecipeVideos = () => {

    const selectArtistName = "AKLO"
    const videoIdList = [];
    
    const fetchMusic = async function () {
        const res = await
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selectArtistName} 曲&key=AIzaSyDENmeM9nK1AYLgE1xWl9ZUezZPTvXJYls&maxResults=5`);
        const json = await res.json();
        const itemes = await json.items;
        const videoIds = itemes.map((item) => item.id.videoId)
        // const videoIds = await itemes.id;
        videoIds.forEach(videoId => {
            videoIdList.push(videoId);
        });
    }
    
    // useEffect(() => {
    fetchMusic()
    // }, [])

    return(
        <section>
            <RecipeVideo videoIdList={videoIdList} />
            
        </section>
    )
}
export default RecipeVideos