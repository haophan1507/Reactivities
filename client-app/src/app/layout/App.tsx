import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { Activity } from '../models/activity';
import LoadingComponent from './LoadingComponent';
import NavBar from './NavBar';
import './styles.css';

function App() {
   const [activities, setActivities] = useState<Activity[]>([]);
   const [selectedActivity, setSelectedActivity] = useState<
      Activity | undefined
   >(undefined);
   const [editMode, setEditMode] = useState(false);
   const [loanding, setLoanding] = useState(true);
   const [submitting, setSubmitting] = useState(false);

   useEffect(() => {
      agent.Activities.list().then((res) => {
         let activities: Activity[] = [];
         res.forEach((activity) => {
            activity.date = activity.date.split('T')[0];
            activities.push(activity);
         });
         setActivities(activities);
         setLoanding(false);
      });
   }, []);

   const handdleSelectedActivity = (id: string) => {
      setSelectedActivity(activities.find((x) => x.id === id));
   };

   const handleCancelSelectActivity = () => {
      setSelectedActivity(undefined);
   };

   const handleFormOpen = (id?: string) => {
      id ? handdleSelectedActivity(id) : handleCancelSelectActivity();
      setEditMode(true);
   };

   const handleFormClose = () => {
      setEditMode(false);
   };

   const handleCreateOrEditActivity = (activity: Activity) => {
      setSubmitting(true);
      if (activity.id) {
         agent.Activities.update(activity).then(() => {
            setActivities([
               ...activities.filter((x) => x.id !== activity.id),
               activity,
            ]);
            setSelectedActivity(activity);
            setEditMode(false);
            setSubmitting(false);
         });
      } else {
         activity.id = uuid();
         agent.Activities.create(activity).then(() => {
            setActivities([...activities, activity]);
            setSelectedActivity(activity);
            setEditMode(false);
            setSubmitting(false);
         });
      }
   };

   const handleDeleteActivity = (id: string) => {
      setSubmitting(true);
      agent.Activities.delete(id).then(() => {
         setActivities([...activities.filter((x) => x.id !== id)]);
         setSubmitting(false);
      });
   };

   if (loanding) return <LoadingComponent content='Loading app' />;

   return (
      <Fragment>
         <NavBar openForm={handleFormOpen} />
         <Container style={{ marginTop: '7em' }}>
            <ActivityDashboard
               activities={activities}
               selectedActivity={selectedActivity}
               selectActivity={handdleSelectedActivity}
               cancelSelectActivity={handleCancelSelectActivity}
               editMode={editMode}
               openForm={handleFormOpen}
               closeForm={handleFormClose}
               createOrEdit={handleCreateOrEditActivity}
               deleteActivity={handleDeleteActivity}
               submitting={submitting}
            />
         </Container>
      </Fragment>
   );
}

export default App;
