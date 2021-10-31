import styled, { css } from "styled-components";

export const PreviousBtn = ({ onClick }) => {
  return <ButtonInner onClick={onClick} />;
};

export const NextBtn = ({ onClick }) => {
  return <ButtonInner onClick={onClick} next />;
};

export const CarouselItem = ({ style, children }) => {
  return (
    <div className="carousel__item" style={style}>
      {children}
    </div>
  );
};

export const Dots = ({
                       slides,
                       index,
                       visible,
                       scroll,
                       infinite,
                       goTo,
                       length,
                     }) => {
  const clamp = (number, lowerBound, upperBound) => {
    return Math.max(lowerBound, Math.min(number, upperBound));
  };

  return (
    <>
      {slides
        .slice(
          0,
          (length - (infinite ? 2 * visible : visible)) / scroll +
          (infinite ? 0 : 1)
        )
        .map((item, idx) => {
          let _rightBound = (idx + 1) * scroll - 1;
          let rightBound = infinite
            ? _rightBound
            : clamp(_rightBound, 0, slides.length - 1);
          let _leftBound = rightBound - (scroll - 1);
          let leftBound = infinite
            ? _leftBound
            : clamp(_leftBound, 0, slides.length - 1);
          return (
            <Dot
              active={index >= leftBound && index <= rightBound}
              index={idx}
              goTo={goTo}
            />
          );
        })}
    </>
  );
};

export const Dot = ({ active, index, goTo }) => {
  return (
    <span
      style={{
        display: "block",
        width: 6,
        height: 6,
        backgroundColor: active ? "rgba(37, 138, 255, 1)" : "rgba(0, 0, 0, .4)",
        borderRadius: 6,
        transition: ".3s ease-in",
        transitionProperty: "transform, background-color",
        transitionDelay: ".2s",
        transform: active ? "scale(1.6)" : null,
      }}
      onClick={() => goTo(index)}
    />
  );
};

const ButtonInner = styled.button`
  outline: none;
  border: 0;
  background: transparent;
  height: 32px;
  position: absolute;
  top: 45%;
  left: -32px;
  &::before,
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 16px;
    height: 2px;
    background: rgba(0, 0, 0, 1);
    transform: rotate(-45deg);
    transform-origin: bottom left;
  }
  &::after {
    transform: rotate(45deg);
    transform-origin: top left;
  }

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
  props.next &&
  css`
      left: auto;
      right: -16px;
      &::before {
        transform: rotate(45deg);
        transform-origin: bottom right;
      }
      &::after {
        transform: rotate(-45deg);
        transform-origin: top right;
      }
    `}
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10vw;
  margin: 16px 0;
`;
export const Dotss = styled.span`
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: red;
`;
export const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 0 25px;
  margin-top: 16px;
`;
