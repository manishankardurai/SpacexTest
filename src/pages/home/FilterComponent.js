import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { isMobileWeb } from '../../utils/globalVars.js';
import ButtonComponent from '../../Components/Buttons.js';
import { FilterSpaceLaunchData } from '../../actions/index.js';


const FilterComponent = ({ data, filterSpaceLauch, history }) => {
    const [yearActive, setyearActive] = React.useState(null);
    const [launchActive, setlaunchActive] = React.useState(null);
    const [landActive, setlandActive] = React.useState(null);

    const [yearValue, setYearValue] = React.useState('');
    const [launchValue, setlaunchValue] = React.useState('');
    const [landValue, setlandValue] = React.useState('');

    const triggerApi = () => {
        const url = `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launchValue}&land_success=${landValue}&launch_year=${yearValue}`
        filterSpaceLauch(url);
    }

    React.useEffect(() => {
        if (yearActive != null) {
            triggerApi()
        }
    }, [yearActive]);

    React.useEffect(() => {
        if (launchActive != null) {
            triggerApi()
        }
    }, [launchActive]);

    React.useEffect(() => {
        if (landActive != null) {
            triggerApi()
        }
    }, [landActive]);


    const handleOnButtonClick = (e, value, type, index) => {
        if (type === 'launchYear') {
            setyearActive(yearActive === index ? '' : index)
            setYearValue(yearActive === index ? '' : value)
        } else if (type === 'successfulLaunch') {
            setlaunchActive(launchActive === index ? -1 : index)
            setlaunchValue(launchActive === index ? '' : value === 'True')
        } else {
            setlandActive(landActive === index ? -1 : index)
            setlandValue(landActive === index ? '' : value === 'True')
        }
    }

    const getYears = (start, end) => {
        return Array(end - start + 1).fill().map((_, idx) => {
            const className = yearActive === idx ? 'active' : '';
            return (
                <ButtonComponent
                    key={`years${idx}`}
                    className={className}
                    onClickProp={(e) => {
                        handleOnButtonClick(e,
                            start + idx, 'launchYear', idx)
                    }}
                    buttonValue={
                        start + idx}></ButtonComponent>
            )
        })
    }
    const yearsList = getYears(2006, 2020);


    const TrueFalseButton = ({ forKey }) => {
        return (
            ['True', 'False'].map((item, inx) => {
                const className = forKey === 'successfulLaunch' ?
                    (launchActive === inx ? 'active' : '') : (landActive === inx ? 'active' : '')
                return (
                    <ButtonComponent
                        className={className}
                        key={`${forKey}_${item}`}
                        onClickProp={(e) => {
                            handleOnButtonClick(e, item, forKey, inx)
                        }}
                        buttonValue={item}></ButtonComponent>
                )
            })

        )
    }
    return (
        <main class="grid">
            <article>
                <h5>Filters</h5>
                <div className='launchYear'>
                    <p className='categoryTitle'><u>Launch Year</u></p>
                    <div class="form-button">
                        {yearsList}
                    </div>
                </div>
                <div className='successfulLaunch'>
                    <p className='categoryTitle'><u>Successful Launch</u></p>
                    <div class="form-button">
                        <TrueFalseButton forKey='successfulLaunch' />
                    </div>
                </div>
                <div className='successfullanding'>
                    <p className='categoryTitle'><u>Successful Landing</u></p>
                    <div class="form-button">
                        <TrueFalseButton forKey='successfullanding' />
                    </div>
                </div>
            </article>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => ({
    filterSpaceLauch: (url) =>
        dispatch(FilterSpaceLaunchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
