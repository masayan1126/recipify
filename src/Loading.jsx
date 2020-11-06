import React from 'react';
import ReactLoading from 'react-loading';
 
// const type = bars;
const color = "#EBB582";

const Loading = ({ type, color }) => (
    <section className="loading-container">
        <ReactLoading 
            className="loading"
            type="bars" color="#EBB582" 
            // height="100vh" width={100} 
        />
    </section>
);
 
export default Loading;
