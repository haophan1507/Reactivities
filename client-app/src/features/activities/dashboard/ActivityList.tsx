import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

function ActivityList() {
   const { activityStore } = useStore();
   const { groupedActivities } = activityStore;
   return (
      <Fragment>
         {groupedActivities.map(([group, activities], index) => (
            <Fragment key={index}>
               <Header sub color='teal'>
                  {group}
               </Header>
               {activities.map((activity) => (
                  <ActivityListItem key={activity.id} activity={activity} />
               ))}
            </Fragment>
         ))}
      </Fragment>
   );
}

export default observer(ActivityList);
