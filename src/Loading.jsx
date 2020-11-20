import React from 'react';
import ReactLoading from 'react-loading';
 
// const type = bars;
// const color = "#55423d";

const Loading = ({ type, color }) => (
    <section className="loading-container">
        <ReactLoading 
            className="loading"
            type="cylon" color="#55423d" 
            // height="100vh" width={100} 
        />
    </section>
);
 
export default Loading;
