import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({
  adapter: new Adapter()
});

import {ProviderSearch} from '../../components/ProviderSearch';

describe('<ProviderSearch />', () => {
  describe('should render without crashing', () => {
    it('renders without crashing', () => {
      shallow(<ProviderSearch store={{}}  dispatch={()=>{}}/>);
    });
  });
});