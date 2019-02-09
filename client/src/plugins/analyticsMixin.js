export default function (multianalytics) {
  return {
    identify (uid, isNewUser) {
      if (uid) {
        multianalytics.identify({userId: uid, options: {newUser: isNewUser}});
      } else {
        multianalytics.trackError({description: 'Fatal error: cannot identify user.'});
      }
    },
    signin () {
      try {
        multianalytics.incrementUserProperties({ "$last_login": new Date()});
      } catch (error) {
        console.log(error);
        multianalytics.trackError({description: 'event signin failed. ' + error});
      }
    },
    setPeopleProperty (userName, properties) {
      try {
        multianalytics.setUsername(userName);
        multianalytics.setUserProperties(properties);
      } catch(error) {
        console.log(error);
        multianalytics.trackError({description: 'event setPeopleProperty failed. ' + error});
      }
    },
    onUserClick (input) {
      if (input === true) {
        multianalytics.trackEvent({action: 'User click'})
      } else {
        multianalytics.trackError({description: 'Fatal error'})
      }
    }
  }
}