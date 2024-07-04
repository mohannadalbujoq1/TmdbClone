import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MenuItems from './MenuItems';
import { FaSearch, FaPlus } from 'react-icons/fa';

const MainContent = styled.div`
  margin-bottom: '3.75rem';
`;

const Header = styled.header`
  background-color: #022c43;
  color: #fff;
  padding: .9375rem 0;
  box-shadow: 0 .125rem .25rem rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  transition: top 0.3s;
  z-index: 1000;
`;

const Content = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  & > * {
    @media (max-width: 48rem) {
      &:first-child {
        order: 2;
      }
      &:last-child {
        order: 1;
      }
    }
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
`;

const Logo = styled.a`
  display: inline-block;
  margin-right: 1.4375rem;
  margin-left: -3.875rem;
  margin-top: .25rem;
  @media (max-width: 48rem) {
    margin-left: 25%;
  }
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  color: #FFFFFF;
  text-decoration: none;
  font-weight: 600;
  margin-right: 1.875rem;
  font-size: 14.208px;
  font-family: "Source Sans Pro", Arial, sans-serif;
  @media (max-width: 48rem) {
    display: none;
  }
`;

const Primary = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0;
  align-items: center;
  @media (max-width: 48rem) {
    display: none;
  }
`;

const SearchIcon = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 0;
  padding-right: 1.25rem;
  margin: 0;
  align-items: center;
  color: #09E8F0;
  svg {
    fill: currentColor;
    font-size: 1.35em;
  }
`;

const MenuIcon = styled.button`
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 1.25rem;
  background: none;
  border: none;
  color: inherit;
  display: none;
  @media (max-width: 48rem) {
    display: block;
  }
`;

const Menu = styled.div.attrs(({ isOpen }) => ({
}))`
  display: none;
  @media (max-width: 48rem) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 3.7125rem;
    left: 0;
    background-color: #022c43;
    width: 50%;
    padding: .625rem 1.25rem;
    box-shadow: 0 .125rem .25rem rgba(0,0,0,0.1);
    z-index: 1000;
    height: calc(100vh - 3.75rem);
    opacity: 0.9;
  }
`;

const IconWrapper = styled.span`
  svg {
    font-size: 1.5em;
    width: 1.125rem;
    height: 1.125rem;
    color: #fff;
  }
`;

const Translate = styled.div`
  width: 1.375rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: .0625rem solid #fff;
  border-radius: .1875rem;
  padding: .0625rem;
  padding-top: .1875rem;
  padding-left: .125rem;
  transition: linear 0.1s;
  color: #fff;
  font-weight: 500;
  font-size: 0.8em;
  text-transform: uppercase;
  margin-right: 2.1875rem;
  margin-left: 2.1875rem;
  @media (max-width: 48rem) {
    display: none;
  }
`;

const NavBar = ({ toggleSearchVisibility }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <MainContent>
      <Header style={{ top: navbarVisible ? '0' : '-60px' }}>
        <Content>
          <NavWrapper>
            <Logo href="/">
              <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="The Movie Database (TMDB)" width="154" height="20" />
            </Logo>
            <Primary>
              <li><Link href="/movie">Movies</Link></li>
              <li><Link href="/tv">TV Shows</Link></li>
              <li><Link href="/person">People</Link></li>
              <li><Link href="#">More</Link></li>
            </Primary>
            <MenuIcon aria-label="menu" data-testid="menu-icon" onClick={toggleMobileMenu} >
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
</MenuIcon>
          </NavWrapper>
          <Flex>
            <Primary>
              <li>
                <IconWrapper>
                  <FaPlus />
                </IconWrapper>
              </li>
              <li>
                <Translate>EN</Translate>
              </li>
            </Primary>
            <SearchIcon>
  <li onClick={toggleSearchVisibility} style={{ cursor: 'pointer' }} aria-label="search">
    <FaSearch />
  </li>
</SearchIcon>
          </Flex>
        </Content>
        <Menu isOpen={isMobileMenuOpen} data-testid="menu-items">
          <MenuItems />
        </Menu>
      </Header>
    </MainContent>
  );
};

export default NavBar;