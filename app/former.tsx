import React from 'react';
import { Steps } from 'antd';

const description = 'This is a description.';
const former: React.FC = () => (
  <Steps
    current={2}
    items={[
      {
        title: 'login',
      },
      {
        title: 'In Progress',
        description,
        subTitle: 'Left 00:00:08',
      },
      {
        title: 'Waiting',
        description,
      },
    ]}
  />
);

export default former;