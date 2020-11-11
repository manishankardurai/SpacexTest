import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isMobileWeb } from '../../utils/globalVars.js';
import CardContent from './cardContent';
import FilterComponent from './FilterComponent'

class Home extends React.Component {

  render() {
    const { data } = this.props.getData;
    console.log('props', this.props)
    return (
      <>
        <header>
          <h3>SpaceX Launch Programs</h3>
        </header>

        <div class="row">
          <div className='leftSideComponent'>
            <FilterComponent />
          </div>
          <div class="rightSideComponent">
            <CardContent data={data} isLoading={this.props.loading.isLoading} />
          </div>
        </div>

        <footer>
          <h5> Developed By : Manisankar Durai</h5>
        </footer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  getData: state.getData,
  loading: state.isLoading
});
const mapDispatchToProps = () => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
