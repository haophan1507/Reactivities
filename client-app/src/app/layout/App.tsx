import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { Route, useLocation, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import TestErrors from '../../features/errors/TestError';
import HomePage from '../../features/home/HomePage';
import LoginForm from '../../features/users/LoginForm';
import ModalContainer from '../common/modals/ModalContainer';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import NavBar from './NavBar';
import './styles.css';

function App() {
   const location = useLocation();
   const { commonStore, userStore } = useStore();

   useEffect(() => {
      if (commonStore.token) {
         userStore.getUser().finally(() => commonStore.setAppLoaded());
      } else {
         commonStore.setAppLoaded();
      }
   }, [commonStore, userStore]);

   if (!commonStore.appLoaded)
      return <LoadingComponent content='Loading app...' />;

   return (
      <Fragment>
         <ToastContainer position='bottom-right' hideProgressBar />
         <ModalContainer />
         <Route path='/' component={HomePage} exact />
         <Route
            path={'/(.+)'}
            render={() => (
               <>
                  <NavBar />
                  <Container style={{ marginTop: '7em' }}>
                     <Switch>
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
                        <Route path='/errors' component={TestErrors} />
                        <Route path='/server-error' component={ServerError} />
                        <Route path='/login' component={LoginForm} />
                        <Route component={NotFound} />
                     </Switch>
                  </Container>
               </>
            )}
         />
      </Fragment>
   );
}

export default observer(App);
