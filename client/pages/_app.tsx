import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import {wrapper} from '../store';

const WrappedApp: FC<AppProps> = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Component {...props.pageProps} />
        </Provider>
    );
};

class MyApp extends React.Component<AppProps> {
    render() {
        const {Component, pageProps} = this.props;
        return <Component {...pageProps} />;
    }
}
  
export default wrapper.withRedux(MyApp);

//export default wrapper.withRedux(WrappedApp);