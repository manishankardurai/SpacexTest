import React from 'react';
import LoadingSpinner from '../../Components/LoadingSpinner';

const CardContent = ({ data, isLoading }) => {
    return (
        <main class="grid">

            {isLoading && <LoadingSpinner />}

            {data.length ? data.map((item, index) => {
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
                            <p><b>Mission Ids:</b> {JSON.stringify(data[0].mission_id)}</p>
                            <p><b>Launch year: </b>{item.launch_year}</p>
                            <p><b>Successful Launch:</b> {item.launch_success.toString()}</p>
                            <p><b>Successful Landing:</b> </p>
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