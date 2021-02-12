import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

function RecordNotFound({ status, title }) {
  const history = useHistory();
  return (
    <Result
      status={status ? status : '404'}
      title={title ? title : 'Sorry, could not find what you are looking for.'}
    />
  );
}

export default RecordNotFound;
