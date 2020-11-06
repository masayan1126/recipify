import React,{useCallback, useState, useEffect} from 'react';
import RecipeVideo from "./RecipeVideo";

const RecipeVideos = () => {

    const selectArtistName = "AKLO"
    let videoIdList = [];
    
    const fetchMusic = async () => {
        const res = await
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selectArtistName} 曲&key=AIzaSyDENmeM9nK1AYLgE1xWl9ZUezZPTvXJYls&maxResults=3`);
        const json = await res.json();
        const itemes = await json.items;
        console.log(res);
        const videoIds = await itemes.map((item) => item.id.videoId)

        videoIds.forEach(videoId => {
            videoIdList.push(videoId);
        });
    }

    useEffect(() => {
        fetchMusic()
    }, [])
    
    console.log(videoIdList);

    return(
        <section>
            <RecipeVideo videoIdList={videoIdList} fetchMusic={fetchMusic} />
            
        </section>
    )
}
export default RecipeVideos