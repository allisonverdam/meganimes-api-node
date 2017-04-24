let config = null;

export default () => {
        config = {
            env:{
                database: '',
                username: '',
                password: '',
                params: {
                    host: '',
                    port: 3306
                }
            },
            dev: {
                database: 'meganimes',
                username: 'root',
                password: '',
                params: {
                    host: 'localhost',
                    port: 3306
                }
            }
        }
        return config;
    }
