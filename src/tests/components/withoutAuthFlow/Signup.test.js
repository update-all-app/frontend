import React from 'react';
import { rest } from 'msw';
import { screen, render, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import Signup from '../../../components/without_auth_flow/Signup';
import { BACKEND_URL } from '../../../constants';
import { Route } from 'react-router-dom';
import { 
    LOADING,
    POPULATE_USER
 } from '../../../actionTypes';
import {
    withUserContext,
    withLocalStorage,
    withRouter,
} from './helpers/renderHelpers';

describe('Signup', () => {

    describe('When the form is not entirely filled out', () => {
        describe('When first name is blank', () => {

        });

        describe('When last name is blank', () => {

        });

        describe('When the email is blank', () => {

        });

        describe('When password is blank', () => {

        });

        describe('When password confirmation is blank', () => {

        });
    });

    describe('Validations', () => {
        describe('When an email is formatted incorrectly', () => {

        });

        describe('When the password does not meet requirements', () => {

        });

        describe('When the password confirmation does not meet requirements', () => {

        });

        describe('When the username is taken', () => {

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
                )
            })
        )

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
                            {token: ''}
                        )
                    ),
                    state,
                    dispatch
                )
            )
            const firstNameInput = document.querySelector('#signup-first-name');
            fireEvent.change(firstNameInput, {
                target: {value: 'Test'}
            });
            expect(firstNameInput.value).toBe('Test');

            const lastNameInput = document.querySelector('#signup-last-name');
            fireEvent.change(lastNameInput, {
                target: {value: 'User'}
            });
            expect(lastNameInput.value).toBe('User');
            
            const emailInput = document.querySelector('#signup-email') ;
            fireEvent.change(emailInput, {
                target: {value: 'test@test.com'}
            });
            expect(emailInput.value).toBe('test@test.com');

            const passwordInput = document.querySelector('#signup-password');
            fireEvent.change(passwordInput, {
                target: {value: 'password123!'}
            });
            expect(passwordInput.value).toBe('password123!');

            const passwordConfirmationInput = document.querySelector('#signup-password-confirmation');
            fireEvent.change(passwordConfirmationInput, {
                target: {value: 'password123!'}
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
            expect(localStorage.getItem('token')).toBe('TestToken123')
            expect(localStorage.getItem('refresh_token')).toBe('RefreshToken')
            expect(localStorage.getItem('previous_refresh_token')).toBe('PreviousRefreshToken')
            expect(localStorage.getItem('expires_at')).toBeTruthy();
        });

        it('Calls dispatch with the correct args', async () => {
            const submitButton = screen.getByRole('button', {
                name: /sign up/i
            });
            fireEvent.click(submitButton);
            await screen.findByText('Payment Page');
            expect(dispatch.mock.calls[0][0]).toEqual({ type: LOADING })
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
