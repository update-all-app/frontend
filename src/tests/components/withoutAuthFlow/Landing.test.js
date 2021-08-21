import React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from '../../../components/without_auth_flow/Landing';

beforeEach(() => {
    render(<Landing />);
})


describe('Landing', () => {
    describe('the login button', () => {
        it('displays the Login button', () => {
            expect(screen.getByRole('button', {
                name: /log in/i
            })).toBeInTheDocument();
        });

        it('redirects to the correct page after button is pressed', () => {

        })
    });

    describe('the sign up button', () => {
        it('displays the Sign Up button', () => {
            expect(screen.getByRole('button', {
                name: /sign up/i
            })).toBeInTheDocument();
        });

        it('redirects to the correct page after button is pressed', () => {

        })
    });

    
});
