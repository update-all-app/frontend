import React from 'react';

const UserContext = React.createContext({ data: {}, loading: true });
UserContext.displayName = 'UserContext';

export default UserContext;
