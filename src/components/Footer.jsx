import React from "react";

import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1.25rem 10%;
  box-sizing: border-box;
  background-image: radial-gradient(
    at 70% top,
    #031d33 0%,
    rgba(3, 29, 51, 1) 30%
  );

  @media (min-width: 48.0625rem) {
    padding: 1.25rem 32%;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-top: 0.5rem;
  padding-bottom: 5rem;
  color: #fff;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
  position: relative;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.3125rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  font-weight: 300;
`;

const RoundedLink = styled.a`
  display: none;

  @media (min-width: 48.0625rem) {
    display: inline-block;
    position: absolute;
    top: 80%;
    right: 110%;
    border-color: #fff;
    background-color: #fff;
    color: rgba(3, 173, 213, 1);
    font-size: 1em;
    word-wrap: break-word;
    white-space: normal;
    border: 0.125rem solid #fff;
    border-radius: 0.3125rem;
    padding: 0.625rem 1.125rem;
    transition: linear 0.1s;
    font-weight: 700;
    text-transform: uppercase;
    width: 11.25rem;
    text-decoration: none;
  }
`;

const Header = styled.h3`
  margin-bottom: 0.3125rem;
  font-size: 1.1em;
  text-transform: uppercase;
`;

const Section = styled.section`
  text-align: center;
  margin-top: 1.25rem;
  color: white;
  opacity: 0.1;
  font-size: 0.7em;
`;

const FooterLogo = styled.img`
  display: none;

  @media (min-width: 48.0625rem) {
    display: inline-block;
    position: absolute;
    bottom: 0rem;
    right: 110%;
    font-size: 1em;
    word-wrap: break-word;
    white-space: normal;
    padding: 0.5rem 1rem;
    transition: linear 0.1s;
    font-weight: 700;
    text-transform: uppercase;
    width: 7.5rem;
    top: 0;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Nav>
        <NavItem>
          <Header>The Basics</Header>
          <NavList>
            <li>
              <NavLink href="">About TMDB</NavLink>
            </li>
            <li>
              <NavLink href="">Contact Us</NavLink>
            </li>
            <li>
              <NavLink href="">Support Forums</NavLink>
            </li>
            <li>
              <NavLink href="">API</NavLink>
            </li>
            <li>
              <NavLink href="" rel="noopener">
                System Status
              </NavLink>
            </li>
          </NavList>
          <FooterLogo
            src={`${process.env.PUBLIC_URL}/footerLogo.svg`}
            alt="Footer Logo"
          />

          <RoundedLink href="">Join the Community</RoundedLink>
        </NavItem>
        <NavItem>
          <Header>Get Involved</Header>
          <NavList>
            <li>
              <NavLink href="/bible">Contribution Bible</NavLink>
            </li>
            <li>
              <NavLink href="/movie/new">Add New Movie</NavLink>
            </li>
            <li>
              <NavLink href="/tv/new">Add New TV Show</NavLink>
            </li>
          </NavList>
        </NavItem>
        <NavItem>
          <Header>Community</Header>
          <NavList>
            <li>
              <NavLink href="/documentation/community/guidelines">
                Guidelines
              </NavLink>
            </li>
            <li>
              <NavLink href="/discuss">Discussions</NavLink>
            </li>
            <li>
              <NavLink href="/leaderboard">Leaderboard</NavLink>
            </li>
          </NavList>
        </NavItem>
        <NavItem>
          <Header>Legal</Header>
          <NavList>
            <li>
              <NavLink href="/terms-of-use">Terms of Use</NavLink>
            </li>
            <li>
              <NavLink href="/api-terms-of-use">API Terms of Use</NavLink>
            </li>
            <li>
              <NavLink href="/privacy-policy">Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink href="/dmca-policy">DMCA Policy</NavLink>
            </li>
          </NavList>
        </NavItem>
      </Nav>
      <Section>Build eca9842 (7538)</Section>
    </FooterContainer>
  );
};

export default Footer;
