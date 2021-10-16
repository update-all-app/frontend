import React from 'react';
import { rest } from 'msw';
import { screen, render, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import Signup from '../../../components/without_auth_flow/Signup';
import { BACKEND_URL } from '../../../constants';
import { Route } from 'react-router-dom';
import { LOADING, POPULATE_USER } from '../../../actionTypes';
import {
  withUserContext,
  withLocalStorage,
  withRouter
} from '../helpers/renderHelpers';

describe('Signup', () => {
  describe('When the component is rendered', () => {
    beforeEach(() => {
      render(withRouter(<Signup />));
    });

    it('renders the first name field', () => {
      const firstNameField = document.querySelector('#signup-first-name');
      expect(firstNameField).toBeInTheDocument();
    });

    it('renders the last name field', () => {
      const lastNameField = document.querySelector('#signup-last-name');
      expect(lastNameField).toBeInTheDocument();
    });

    it('renders the email field', () => {
      const emailField = document.querySelector('#signup-email');
      expect(emailField).toBeInTheDocument();
    });

    it('renders the password field', () => {
      const passwordField = document.querySelector('#signup-password');
      expect(passwordField).toBeInTheDocument();
    });

    it('renders the password confirmation field', () => {
      const passwordConfirmationField = document.querySelector(
        '#signup-password-confirmation'
      );
      expect(passwordConfirmationField).toBeInTheDocument();
    });

    it('renders the sign up button', () => {
      const signupButton = screen.getByRole('button', {
        name: /sign up/i
      });
      expect(signupButton).toBeInTheDocument();
    });
  });

  describe('Unsuccessful signup', () => {
    let firstNameField;
    let lastNameField;
    let emailField;
    let passwordField;
    let passwordConfirmationField;
    let signupButton;
    let server;

    const takenEmails = ['micah@shute.com'];
    beforeEach(() => {
      server = setupServer(
        rest.post(`${BACKEND_URL}/signup`, (req, res, ctx) => {
          console.log(req);
          if (takenEmails.includes((e) => JSON.parse(req.body).email)) {
            return res(
              ctx.status(422),
              ctx.json({
                message: 'Email has already been taken'
              })
            );
          }
          return res(ctx.status(200), ctx.json({}));
        })
      );
      const state = {};
      const dispatch = jest.fn();
      render(withUserContext(withRouter(<Signup />), state, dispatch));
      firstNameField = document.querySelector('#signup-first-name');
      lastNameField = document.querySelector('#signup-last-name');
      emailField = document.querySelector('#signup-email');
      passwordField = document.querySelector('#signup-password');
      passwordConfirmationField = document.querySelector(
        '#signup-password-confirmation'
      );
      signupButton = screen.getByRole('button', {
        name: /sign up/i
      });

      fireEvent.change(firstNameField, {
        target: { value: 'Micah' }
      });
      fireEvent.change(lastNameField, {
        target: { value: 'Shute' }
      });
      fireEvent.change(emailField, {
        target: { value: 'micah@shute.com' }
      });
      fireEvent.change(passwordField, {
        target: { value: 'password123!' }
      });
      fireEvent.change(passwordConfirmationField, {
        target: { value: 'password123!' }
      });
      server.listen();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => {
      server.close();
    });

    //TODO: Ensure dispatch is not called! *********

    describe('When the form is not entirely filled out', () => {
      describe('When first name is blank', () => {
        it('renders an error if the sign up button is hit', async () => {
          fireEvent.change(firstNameField, {
            target: { value: '' }
          });
          fireEvent.click(signupButton);
          const errorMessage = await screen.getByText(
            'You must enter a first name'
          );
          expect(errorMessage).toBeInTheDocument();
        });
      });

      describe('When last name is blank', () => {
        it('renders an error if the sign up button is hit', async () => {
          fireEvent.change(lastNameField, {
            target: { value: '' }
          });
          fireEvent.click(signupButton);
          const errorMessage = await screen.getByText(
            'You must enter a last name'
          );
          expect(errorMessage).toBeInTheDocument();
        });
      });

      describe('When the email is blank', () => {
        it('renders an error if the sign up button is hit', async () => {
          fireEvent.change(emailField, {
            target: { value: '' }
          });
          fireEvent.click(signupButton);
          const errorMessage = await screen.getByText('Invalid Email');
          expect(errorMessage).toBeInTheDocument();
        });
      });

      describe('When password is blank', () => {
        it('renders an error if the sign up button is hit', async () => {
          fireEvent.change(passwordField, {
            target: { value: '' }
          });
          fireEvent.click(signupButton);
          const errorMessage = await screen.getByText(
            'Password does not meet specifications'
          );
          expect(errorMessage).toBeInTheDocument();
        });
      });

      describe('When password confirmation is blank', () => {
        it('renders an error if the sign up button is hit', async () => {
          fireEvent.change(passwordConfirmationField, {
            target: { value: '' }
          });
          fireEvent.click(signupButton);
          const errorMessage = await screen.getByText(
            'Confirmation does not match password'
          );
          expect(errorMessage).toBeInTheDocument();
        });
      });
    });

    describe('Validations', () => {
      //TODO: Set up server, ensure it is not ever hit
      describe('When an email is formatted incorrectly', () => {
        it('renders an error if the sign up button is hit', async () => {
          fireEvent.change(emailField, {
            target: { value: 'myemail#email.com' }
          });
          fireEvent.click(signupButton);
          const errorMessage = await screen.getByText('Invalid Email');
          expect(errorMessage).toBeInTheDocument();
        });
      });

      describe('When the password does not meet requirements', () => {
        it('renders an error if there are not enough characters', async () => {
          fireEvent.change(passwordField, {
            target: { value: 'short' }
          });
          let errorMessage = await screen.getByText(
            'Must have at least 8 characters'
          );
          expect(errorMessage).toBeInTheDocument();
          fireEvent.click(signupButton);
          errorMessage = await screen.getByText(
            'Must have at least 8 characters'
          );
          expect(errorMessage).toBeInTheDocument();
        });

        it('renders an error if there are not enough special characters', async () => {
          fireEvent.change(passwordField, {
            target: { value: 'longerpasssword' }
          });
          let errorMessage = await screen.getByText(
            'Contains one of the charcters !,@,#,$,%,^,&'
          );
          expect(errorMessage).toBeInTheDocument();
          fireEvent.click(signupButton);
          errorMessage = await screen.getByText(
            'Contains one of the charcters !,@,#,$,%,^,&'
          );
          expect(errorMessage).toBeInTheDocument();
        });

        it('renders an error if there are not enough numbers', async () => {
          fireEvent.change(passwordField, {
            target: { value: 'noNumberPassword' }
          });
          let errorMessage = await screen.getByText(
            'Must have at least one number'
          );
          expect(errorMessage).toBeInTheDocument();
          fireEvent.click(signupButton);
          errorMessage = await screen.getByText(
            'Must have at least one number'
          );
          expect(errorMessage).toBeInTheDocument();
        });

        it('renders an error if there are not enough capital letters', () => {
          // NOT IMPLEMENTED
        });
      });

      describe('When the password confirmation does not meet requirements', () => {
        it('renders an error when the field is not blank', async () => {
          fireEvent.change(passwordConfirmationField, {
            target: { value: 'password123' }
          });
          let errorMessage = await screen.getByText(
            'Confirmation does not match password'
          );
          expect(errorMessage).toBeInTheDocument();
          fireEvent.click(signupButton);
          errorMessage = await screen.getByText(
            'Confirmation does not match password'
          );
          expect(errorMessage).toBeInTheDocument();
        });
      });

      describe('When the email is taken', () => {
        // TODO: set a valid (username taken) server response
        it('renders an error if the sign up button is hit', async () => {
          fireEvent.click(signupButton);
          const errorMessage = await screen.getByText(
            'Email has already been taken'
          );
          expect(errorMessage).toBeInTheDocument();
        });
      });
    });
  });

  describe('Correct login', () => {
    let dispatch;
    const server = setupServer(
      rest.post(`${BACKEND_URL}/signup`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            token: {
              token: 'TestToken123',
              refresh_token: 'RefreshToken',
              previous_refresh_token: 'PreviousRefreshToken',
              expires_in: '0',
              expires_at: 'ExpiresAtTime'
            },
            user: {
              name: 'Test User',
              email: 'test@test.com'
            }
          })
        );
      })
    );

    beforeAll(() => {
      server.listen();
    });

    beforeEach(() => {
      const state = {};
      dispatch = jest.fn();
      render(
        withUserContext(
          withRouter(
            withLocalStorage(
              <>
                <Signup />
                <Route path='/setup-payment'>Payment Page</Route>
              </>,
              { token: '' }
            )
          ),
          state,
          dispatch
        )
      );
      const firstNameInput = document.querySelector('#signup-first-name');
      fireEvent.change(firstNameInput, {
        target: { value: 'Test' }
      });
      expect(firstNameInput.value).toBe('Test');

      const lastNameInput = document.querySelector('#signup-last-name');
      fireEvent.change(lastNameInput, {
        target: { value: 'User' }
      });
      expect(lastNameInput.value).toBe('User');

      const emailInput = document.querySelector('#signup-email');
      fireEvent.change(emailInput, {
        target: { value: 'test@test.com' }
      });
      expect(emailInput.value).toBe('test@test.com');

      const passwordInput = document.querySelector('#signup-password');
      fireEvent.change(passwordInput, {
        target: { value: 'password123!' }
      });
      expect(passwordInput.value).toBe('password123!');

      const passwordConfirmationInput = document.querySelector(
        '#signup-password-confirmation'
      );
      fireEvent.change(passwordConfirmationInput, {
        target: { value: 'password123!' }
      });
      expect(passwordInput.value).toBe('password123!');
    });

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => {
      server.close();
    });

    it('redirects and updates localstorage', async () => {
      const submitButton = screen.getByRole('button', {
        name: /sign up/i
      });
      fireEvent.click(submitButton);

      const paymentPage = await screen.findByText('Payment Page');
      expect(paymentPage).toBeInTheDocument();
      expect(localStorage.getItem('token')).toBe('TestToken123');
      expect(localStorage.getItem('refresh_token')).toBe('RefreshToken');
      expect(localStorage.getItem('previous_refresh_token')).toBe(
        'PreviousRefreshToken'
      );
      expect(localStorage.getItem('expires_at')).toBeTruthy();
    });

    it('Calls dispatch with the correct args', async () => {
      const submitButton = screen.getByRole('button', {
        name: /sign up/i
      });
      fireEvent.click(submitButton);
      await screen.findByText('Payment Page');
      expect(dispatch.mock.calls[0][0]).toEqual({ type: LOADING });
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: POPULATE_USER,
        payload: {
          name: 'Test User',
          email: 'test@test.com',
          services: [],
          businesses: [],
          paymentStatusCurrent: false
        }
      });
    });
  });
});
