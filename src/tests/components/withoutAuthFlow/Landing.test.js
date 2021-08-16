import React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from '../../../components/without_auth_flow/Landing';

beforeEach(() => {
    render(<Landing />);
})


describe('Landing', () => {
    it('displays the Login button', () => {
        expect(screen.getByRole('button', {
            name: /log in/i
        })).toBeInTheDocument();
    });

    it('displays the Sign Up button', () => {
        expect(screen.getByRole('button', {
            name: /sign up/i
        })).toBeInTheDocument();
    });

});
