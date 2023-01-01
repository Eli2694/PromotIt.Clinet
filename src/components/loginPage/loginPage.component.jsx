import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './loginPage.css';

export const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <main>
      <div className='About'>
        <h1>
          Welcome to our website that showcases campaigns for various good
          causes!
        </h1>
        <p>
          On our platform, you can browse through a variety of campaigns and
          choose to support the cause by purchasing products associated with the
          campaign.
        </p>
        <p>
          All of the proceeds from the sales of these products go towards
          supporting the good cause and making a positive impact in the world.
        </p>
        <p>
          Our platform is a great way to not only find unique and interesting
          products, but also to make a difference and support important causes.
          Thank you for visiting and we hope you find a campaign that resonates
          with you.
        </p>

        <button
          type='submit'
          onClick={async () => {
            await loginWithRedirect('http://localhost:3000');
          }}
        >
          Log In     
        </button>
      </div>
    </main>
  );
};
