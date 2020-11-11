import React from 'react';

const LoadingSpinner = () => {
    return (
        <div
            style={{
                position: "absolute",
                zIndex: 110,
                top: 0,
                left: 0,
                width: "100%",
                height: '100%',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(255,255,255,0.8)",
            }}
        >
            <div style={{ margin: "auto" }}>
                <div className="loader"></div>
            </div>
        </div>
    )
}

export default LoadingSpinner;