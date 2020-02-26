/*******************************************************************************
 *
 *    Copyright 2019 Adobe. All rights reserved.
 *    This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License. You may obtain a copy
 *    of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software distributed under
 *    the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *    OF ANY KIND, either express or implied. See the License for the specific language
 *    governing permissions and limitations under the License.
 *
 ******************************************************************************/

import React from 'react';
import { string } from 'prop-types';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { CartProvider, CartInitializer } from '../Minicart';
import { CheckoutProvider } from '../Checkout';
import UserContextProvider from '../../context/UserContext';

const App = props => {
    const { uri, storeView = 'default' } = props;

    const client = new ApolloClient({
        uri,
        headers: { Store: storeView }
    });

    return (
        <ApolloProvider client={client}>
            <CartProvider>
                <UserContextProvider>
                    <CartInitializer>
                        <CheckoutProvider>{props.children}</CheckoutProvider>
                    </CartInitializer>
                </UserContextProvider>
            </CartProvider>
        </ApolloProvider>
    );
};

App.propTypes = {
    uri: string.isRequired,
    storeView: string
};

export default App;
