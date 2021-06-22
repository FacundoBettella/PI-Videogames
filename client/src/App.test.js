import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Search from './modules/Search';
import store from './store/index';


test('Find the theme of the website', () => {
  render(<BrowserRouter> <App /> </BrowserRouter>); // render is provided by React Testing Library.
  const linkElement = screen.getByText(/video game database/i);
  expect(linkElement).toBeInTheDocument(); // expect is provided by Jest
});

test('Find the start button called "Welcome"', () => {
  render(<BrowserRouter> <App /> </BrowserRouter>); // render is provided by React Testing Library.
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument(); // expect is provided by Jest
});

test('Find the search input placeholder', async () => {
  render(<BrowserRouter> <Search store={store}/> </BrowserRouter>); // render is provided by React Testing Library.
  const linkElement = await screen.findByPlaceholderText(/find your videogame/i);
  expect(linkElement).toBeInTheDocument(); // expect is provided by Jest
});

test('Find the GO! text', () => {
  render(<BrowserRouter> <Search store={store}/> </BrowserRouter>); // render is provided by React Testing Library.
  const linkElement = screen.getByText(/GO!/i);
  expect(linkElement).toBeInTheDocument(); // expect is provided by Jest
});








