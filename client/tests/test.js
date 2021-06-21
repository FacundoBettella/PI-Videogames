import React from 'react';
import Link from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from '../src/modules/Search';

configure({adapter: new Adapter()});

describe('<Search />', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Search />);
    })
  
    it('should render three <Link />', () => {
      expect(wrapper.find(Link)).toHaveLength(3);
    });

    it('the first Link must have the text "Tell us about your video game" and change the route to "/create".', () => {
      expect(wrapper.find(Link).at(0).prop('to')).toEqual('/create');
      expect(wrapper.find(Link).at(0).text()).toEqual('Tell us about your video game');
    });

    it('render a <form>', () => {
        expect(wrapper.find('form')).toHaveLength(1)
    });

    it('render a <option> with the text equal to "A-Z".', () => {
        expect(wrapper.find('option').at(0).text()).toEqual('A-Z');
    });

    it('render an input with property "className" called "searchInput"', () => {
        expect(wrapper.find('input[className="searchInput"]')).toHaveLength(1);
    });
})