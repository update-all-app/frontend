import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Landing from '../../../components/without_auth_flow/Landing';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Landing', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Landing />
        <Route path='/login'>This is the login page</Route>
        <Route path='/signup'>This is the signup page</Route>
      </MemoryRouter>
    );
  });

  describe('the login button', () => {
    it('displays the Login button', () => {
      expect(
        screen.getByRole('button', {
          name: /log in/i
        })
      ).toBeInTheDocument();
    });

    it('redirects to the correct page after button is pressed', async () => {
      const loginButton = screen.getByRole('button', {
        name: /log in/i
      });
      expect(screen.queryByText('This is the login page')).toBeNull();
      fireEvent.click(loginButton);
      expect(screen.getByText('This is the login page')).toBeInTheDocument();
    });
  });

  describe('the sign up button', () => {
    it('displays the Sign Up button', () => {
      expect(
        screen.getByRole('button', {
          name: /sign up/i
        })
      ).toBeInTheDocument();
    });

    it('redirects to the correct page after button is pressed', () => {
      const signupButton = screen.getByRole('button', {
        name: /sign up/i
      });
      expect(screen.queryByText('This is the signup page')).toBeNull();
      fireEvent.click(signupButton);
      expect(screen.getByText('This is the signup page')).toBeInTheDocument();
    });
  });
});
