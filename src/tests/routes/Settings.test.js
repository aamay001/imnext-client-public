import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({
  adapter: new Adapter(),
});

import {Settings} from '../../routes/Settingsv2';

describe('<Settings />', () => {
  describe('should render without crashing', () => {
    it('renders without crashing', () => {
      const history = {
        replace: () => {},
      };
      shallow(
        <Settings
          store={{}}
          dispatch={() => {}}
          history={history}
        />
      );
    })
  })
})