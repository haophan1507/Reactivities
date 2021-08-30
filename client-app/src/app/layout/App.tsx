import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/HomePage';
import NavBar from './NavBar';
import './styles.css';

function App() {
   const location = useLocation();

   return (
      <Fragment>
         <Route path='/' component={HomePage} exact />
         <Route
            path={'/(.+)'}
            render={() => (
               <>
                  <NavBar />
                  <Container style={{ marginTop: '7em' }}>
                     <Route
                        path='/activities'
                        component={ActivityDashboard}
                        exact
                     />
                     <Route
                        path='/activities/:id'
                        component={ActivityDetails}
                     />
                     <Route
                        key={location.key}
                        path={['/createActivity', '/manage/:id']}
                        component={ActivityForm}
                     />
                  </Container>
               </>
            )}
         />
      </Fragment>
   );
}

export default observer(App);
