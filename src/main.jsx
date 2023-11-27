import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Auth0Provider
		domain="dev-b864y2xzn2bq1zry.jp.auth0.com"
		clientId="L3Rf93YuJYjffInxJhqhp3dix1pNhETZ"
		authorizationParams={{
			redirect_uri: window.location.origin
		}}
	>
		<App />
	</Auth0Provider>
)
