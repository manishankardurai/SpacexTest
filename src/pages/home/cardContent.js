import React from 'react';
import LoadingSpinner from '../../Components/LoadingSpinner';

const CardContent = ({ data, isLoading }) => {
    let storageLandValue = null;
    if (typeof window.sessionStorage !== 'undefined') {
        console.log('window', window)
        storageLandValue = window.sessionStorage.getItem('landValue');
    }
    return (
        <main class="grid">

            {isLoading && <LoadingSpinner />}

            {data.length ? data.map((item, index) => {
                let filteredData = null;
                const landSuccess = item.rocket.first_stage && item.rocket.first_stage.cores;
                let successLanding = landSuccess[0].land_success === null ? 'null' : landSuccess[0].land_success.toString();
                successLanding = landSuccess.length > 1 && storageLandValue ? (storageLandValue === 'true' ? 'true' : 'false') : successLanding;
                return (
                    <article key={item.mission_name + index}>
                        <div className='top' style={{ backgroundColor: '#f1e8ece0', textAlign: 'center' }}>
                            <img src={item.links.mission_patch} alt={item.mission_name} style={{
                                width: '100px !important',
                                height: '100px'
                            }} />
                        </div>
                        <div class="text">
                            <h5 className='missionTitle'><b>{item.mission_name + '  #' + item.flight_number}</b></h5>
                            <p><b>Mission Ids:</b> {JSON.stringify(item.mission_id.length ? item.mission_id : 'No Value')}</p>
                            <p><b>Launch year: </b>{item.launch_year}</p>
                            <p><b>Successful Launch:</b> {item.launch_success != null ? item.launch_success.toString() : 'No Value'}</p>
                            <p><b>Successful Landing:</b> {successLanding}</p>
                        </div>
                    </article>
                )
            }) : (
                    <article key={'No Records'}>
                        <div class="text">
                            <h5 className='missionTitle'><b>No Records to Display</b></h5>
                        </div>
                    </article>
                )}
        </main>
    )
}

export default CardContent;