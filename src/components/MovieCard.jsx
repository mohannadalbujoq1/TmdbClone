import React, { useState, useRef, useEffect } from "react";

import styled from "styled-components";
import { MdMenu, MdBookmark, MdStar, MdFavorite } from "react-icons/md";

const Card = styled.div`
  @media (min-width: 48rem) {
    padding: 0rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    position: relative;
    height: 22.8rem;
    border-width: 0.0625rem;
    border-style: solid;
    border-color: #e9e9e9;
    border-radius: 0.625rem;
    max-width: 10.9375rem;
    flex-basis: 100%;
    margin-bottom: 1.25rem;
    left: 1.25rem;
  }

  @media (max-width: 48rem) {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    padding: 0rem;
    height: auto;
    width: 100%;
    margin: 0rem;
    background-color: #ffffff;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    border-radius: 0.625rem;
    border: 0.125rem solid #e6e6e6b7;
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 75%;
  object-fit: cover;

  @media (min-width: 48rem) {
    border-top-left-radius: 0.625rem;
    border-top-right-radius: 0.625rem;
  }

  @media (max-width: 48rem) {
    width: 45%;
    height: auto;
    border-top-left-radius: 0.625rem;
    border-bottom-left-radius: 0.625rem;
    margin-right: 0.625rem;
  }
`;

const MovieTitle = styled.h3`
  margin-left: 0.625rem;
  font-size: 0.875rem;
  margin-top: 1.25rem;
  padding-right: 0.625rem;
  padding-bottom: 0.625rem;
  @media (max-width: 48rem) {
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    padding-bottom: 0;
  }
`;

const MovieOverview = styled.p`
  margin: 0.625rem;
  font-size: 0.8125rem;
  color: #161616;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  padding-bottom: 0.2rem;
  @media (min-width: 48rem) {
    display: none;
  }
`;

const MovieReleaseDateMobile = styled.div`
  color: #818181;
  text-align: left;
  font-size: 0.9375rem;
  font-weight: 400;

  @media (max-width: 48rem) {
    font-size: 0.75rem;
    font-weight: 300;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 0;
`;

const CircleProgress = styled.div`
  position: absolute;
  top: 70%;
  left: 0.625rem;
  width: 2.1875rem;
  height: 2.1875rem;

  @media (max-width: 48rem) {
    display: none;
  }
`;

const CircleProgressBefore = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
  background-color: rgba(27, 27, 27, 0.9);
`;

const CircleProgressSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 2.1875rem;
  height: 2.1875rem;
  transform-origin: 50% 50%;
  animation: fillCircle 2s ease-out forwards;
`;

const RatingText = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  line-height: 1.75rem;
  font-size: 0.625rem;
  color: #fff;
  z-index: 1;
`;

const PercentSign = styled.span`
  font-size: 0.5rem;
  vertical-align: super;
`;

const OverlayDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(0.625rem);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 7;
  border-radius: 0.625rem;
`;

const MenuContainer = styled.div`
  position: relative;
  padding: 0rem;

  @media (min-width: 48.0625rem) {
    display: block;
  }
`;

const svgIcon = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="186" height="134" viewBox="0 0 186 134" version="1.1"><path d="M 82.665 10.981 C 73.826 12.585, 63.426 18.381, 55.371 26.191 C 45.137 36.114, 40.942 44.013, 38.521 57.919 C 34.618 80.339, 48.001 107.360, 68 117.438 C 89.260 128.151, 116.227 125.097, 132.292 110.157 C 143.301 99.919, 148.925 89.559, 151.551 74.682 C 152.747 67.903, 152.730 65.709, 151.422 58.182 C 147.570 36.013, 132.947 18.965, 112.119 12.361 C 106.508 10.582, 89.306 9.776, 82.665 10.981 M 62.500 57.945 C 55.220 60.925, 54.377 70.296, 60.987 74.764 C 64.324 77.019, 65.450 77.030, 71.120 74.865 C 73.713 73.875, 76 70.355, 76 67.354 C 76 63.925, 72.774 59.117, 69.770 58.070 C 66.232 56.836, 65.251 56.820, 62.500 57.945 M 91.500 57.908 C 88.516 59.185, 86.093 62.265, 85.473 65.566 C 84.784 69.237, 87.943 74.648, 91.584 76.032 C 100.542 79.438, 108.687 67.230, 101.950 60.497 C 99.217 57.766, 94.539 56.606, 91.500 57.908 M 118.324 59.381 C 109.678 66.656, 116.852 79.714, 127.399 75.900 C 133.310 73.763, 135.228 64.442, 130.643 60.135 C 126.878 56.597, 121.987 56.298, 118.324 59.381" stroke="none" fill="rgba(128, 128, 128, 0.438)" fill-rule="evenodd"/></svg>`
);

const MenuIcon = styled.div`
  position: absolute;
  top: 0rem;
  right: 0rem;
  cursor: pointer;
  padding: 0;
  background-image: url("data:image/svg+xml,${svgIcon}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 2rem;
  height: 2rem;
  z-index: 8;

  &:hover {
    filter: brightness(0) saturate(100%) invert(13%) sepia(100%) saturate(7000%)
      hue-rotate(240deg) brightness(90%) contrast(90%);
  }
`;

const MenuContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 2.1rem;
  right: -1.7rem;
  background-color: white;
  border: 0.0625rem solid #ccc;
  border-radius: 0.3125rem;
  padding: 0rem;
  z-index: 9;
`;

const MenuItem = styled.div`
  div {
    padding: 0.625rem 0.3125rem;
    color: grey;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.2rem 0;
    font-size: 0.85rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;

    &:hover {
      background-color: #00043b;
      color: white;
      svg {
        color: white;
      }
    }

    svg {
      color: black;
      padding: 0;
      justify-content: right;
    }
  }

  padding: 0;

  &:not(:last-child) {
    border-bottom: 0.0625rem solid #a7a7a7;
  }
`;

const MovieCard = ({ movie }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const ratingPercent = `${Math.round(movie.vote_average * 10)}`;
  const strokeDasharray = `${ratingPercent}, 100`;
  const menuContainerRef = useRef(null);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (
      menuContainerRef.current &&
      !menuContainerRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Card key={movie.id} role="article">
      <OverlayDiv isOpen={menuOpen} />
      {!menuOpen && <MenuIcon onClick={() => setMenuOpen(true)} />}
      <MenuContainer ref={menuContainerRef} isOpen={menuOpen}>
        {!menuOpen && <MenuIcon onClick={handleMenuClick} />}
        <MenuContent isOpen={menuOpen}>
          <MenuItem>
            <div>
              <MdMenu /> Add to list
            </div>
          </MenuItem>
          <MenuItem>
            <div>
              <MdFavorite /> Favorite
            </div>
          </MenuItem>
          <MenuItem>
            <div>
              <MdBookmark /> Watchlist
            </div>
          </MenuItem>
          <MenuItem>
            <div>
              <MdStar /> Your rating
            </div>
          </MenuItem>
        </MenuContent>
      </MenuContainer>
      {menuOpen && <OverlayDiv isOpen={menuOpen} />}
      <MoviePoster
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="movie poster"
      />
      <TextContainer>
        <MovieTitle>
          {movie.title}
          <MovieReleaseDateMobile>
            {new Date(movie.release_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </MovieReleaseDateMobile>
        </MovieTitle>
        <MovieOverview>{movie.overview}</MovieOverview>
      </TextContainer>
      <CircleProgress>
        <CircleProgressBefore />
        <RatingText>
          {ratingPercent}
          <PercentSign>%</PercentSign>
        </RatingText>
        <CircleProgressSvg viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={
              ratingPercent >= 70
                ? "green"
                : ratingPercent >= 40
                ? "orange"
                : "red"
            }
            strokeWidth="4"
            strokeDasharray={strokeDasharray}
          />
        </CircleProgressSvg>
      </CircleProgress>
    </Card>
  );
};

export default MovieCard;
