import React from "react";
import { Admin, Resource, fetchUtils, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const AdminView = () => {

  const httpClient = (url, options) => {
    if (options) {
      options.credentials = "include";
    }
    return fetchUtils.fetchJson(url, options);
  };

    return (
      <Admin basename="/admin" dataProvider={jsonServerProvider('http://localhost:3050/api', httpClient)}>
        <Resource name='user/' list={ListGuesser}/>
      </Admin>
    )
}

export default AdminView;