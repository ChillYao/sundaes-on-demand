import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertBanner = ({ message, variant }) => {
  const alertMessage = message || 'An unexpected error happend';
  const alertVariant = variant || 'danger';
  return (
    <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
