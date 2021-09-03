import React, { Fragment } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calender from 'react-calendar';

function ActivityFilters() {
   return (
      <Fragment>
         <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
            <Header icon='filter' attached color='teal' content='Filters' />
            <Menu.Item content='All Activities' />
            <Menu.Item content="I'm going" />
            <Menu.Item content="I'm hosting" />
         </Menu>
         <Header />
         <Calender />
      </Fragment>
   );
}

export default ActivityFilters;
