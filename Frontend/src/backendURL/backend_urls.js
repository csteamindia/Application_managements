const URL = {
    APP_SAVE:'http://localhost:8800/api/v1/apps/save',
    APP_LIST:'http://localhost:8800/api/v1/apps',
    SINGLE_APP:'http://localhost:8800/api/v1/app',
    LOGIN:'http://localhost:8800/api/v1/users/login',
    APP_USER:'http://localhost:8800/api/v1/users/app/list',
    CREDS:'http://localhost:8800/api/v1/creds/list',
    REMOVE_CRED:'http://localhost:8800/api/v1/creds/delete/',
    USERS:'http://localhost:8800/api/v1/users/list/',
    SINGLE_USER:'http://localhost:8800/api/v1/users/list/',
    CREATE_USER:'http://localhost:8800/api/v1/users/save',
    DE_ACTIVE_USER:'http://localhost:8800/api/v1/users/delete/',
    APPLICATION_PACKAGES:'http://localhost:8800/api/v1/packages/list/byId/',
    PACKAGES:'http://localhost:8800/api/v1/packages/list/'
}

export default URL;