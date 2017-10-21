import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({
  adapter: new Adapter()
});

import {Landing} from '../../routes/Landing';

describe('<Landing />', () => {
  describe('should render without crashing', () => {
    it('renders without crashing', () => {
      shallow(<Landing />);
    });
  });
});