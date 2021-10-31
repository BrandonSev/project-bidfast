import enquire from "enquire.js";
import json2mq from "json2mq";
import React from "react";
import {
  CarouselItem,
  Dots,
  PreviousBtn,
  NextBtn,
  DotContainer,
} from "./CarouselElements";

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: React.Children.count(props.children),
      slidesVisible: props.slidesVisible || 4,
      autoplay: false,
      index: 0,
      slidesToScroll: props.slidesToScroll || 1,
      percent: 0,
      gap: props.gap || 0,
      paused: false,
      infinite: props.infinite || false,
      child: React.Children.toArray(props.children) || [],
      transition: "left .6s ease",
      ready: true,
      dots: props.dots || true,
      arrows: props.arrow || true,
      breakpoint: null,
      responsive: props.responsive || {},
    };
    this.sliderRef = React.createRef();
    this.carouselRef = React.createRef();
    this.handleSlide = this.handleSlide.bind(this);
    this.handleAnimation = this.handleAnimation.bind(this);
  }

  handleSlide(dir) {
    if (!this.state.ready) return;
    this.setState({ ready: false, transition: "left .6s ease" });
    if (dir === 1) {
      if (!this.state.infinite) {
        if (this.state.index >= this.state.length - this.state.slidesVisible) {
          this.setState({ ready: true });
          return;
        }
        if (
          this.state.child[this.state.index + this.state.slidesVisible] ===
          undefined ||
          this.state.child[
          this.state.index +
          this.state.slidesVisible +
          this.state.slidesToScroll
            ] === undefined
        ) {
          console.log("ok");
          this.sliderRef.current.style.left =
            (this.state.length - this.state.slidesVisible) *
            (-100 / this.state.slidesVisible) +
            "%";
          this.setState({
            index: this.state.length - this.state.slidesVisible,
          });
          return;
        }
      } else {
        if (
          this.state.index ===
          this.state.child.length -
          this.state.slidesVisible * 2 -
          this.state.slidesToScroll
        ) {
          this.sliderRef.current.style.left =
            this.state.percent +
            (-100 / this.state.slidesVisible) * this.state.slidesToScroll +
            "%";
          this.setState({
            transition: "left .6s ease",
            index: 0,
          });
          return;
        }
      }
      this.setState({
        index: this.state.index + this.state.slidesToScroll,
        transition: "left .6s ease",
      });
      this.sliderRef.current.style.left =
        this.state.percent +
        (-100 / this.state.slidesVisible) * this.state.slidesToScroll +
        "%";
    }
    if (dir === -1) {
      if (!this.state.infinite) {
        if (this.state.index === 0) {
          this.setState({ ready: true });
          return;
        }
        if (
          this.state.child[
          this.state.index -
          this.state.slidesVisible +
          this.state.slidesToScroll
            ] === undefined ||
          this.state.child[this.state.index - this.state.slidesToScroll] ===
          undefined
        ) {
          this.sliderRef.current.style.left = 0 + "%";
          this.setState({ index: 0 });
          return;
        }
      } else {
        if (this.state.index === 0) {
          this.sliderRef.current.style.left =
            this.state.percent -
            (-100 / this.state.slidesVisible) * this.state.slidesToScroll +
            "%";
          this.setState({
            transition: "left .6s ease",
            index:
              this.state.child.length -
              this.state.slidesVisible * 2 -
              this.state.slidesToScroll,
          });
          return;
        }
      }
      this.setState({
        index: this.state.index - this.state.slidesToScroll,
      });
      this.sliderRef.current.style.left =
        this.state.percent -
        (-100 / this.state.slidesVisible) * this.state.slidesToScroll +
        "%";
    }
  }

  handleAnimation = () => {
    if (this.state.infinite) {
      if (
        this.state.index ===
        this.state.child.length -
        this.state.slidesVisible * 2 -
        this.state.slidesToScroll
      ) {
        this.setState({
          transition: "none",
          index:
            this.state.child.length -
            this.state.slidesVisible * 2 -
            this.state.slidesToScroll,
        });
        this.sliderRef.current.style.left =
          (this.state.child.length -
            this.state.slidesVisible * 2 +
            this.state.slidesVisible -
            this.state.slidesToScroll) *
          (-100 / this.state.slidesVisible) +
          "%";
      }

      if (
        this.state.index >=
        this.state.child.length - this.state.slidesVisible * 2 ||
        this.state.index === 0
      ) {
        this.setState({ transition: "none" });
        this.sliderRef.current.style.left =
          this.state.slidesVisible * (-100 / this.state.slidesVisible) + "%";
      }
    }
    this.setState({
      ready: true,
      percent: parseFloat(this.sliderRef.current.style.left),
    });
  };

  componentDidMount() {
    if (this.state.infinite) {
      this.setState((prevState) => ({
        child: [
          ...prevState.child.slice(-this.state.slidesVisible),
          ...prevState.child,
          ...prevState.child.slice(0, this.state.slidesVisible),
        ],
        length: this.state.child.length + 2 * this.state.slidesVisible,
      }));
    }
    if (this.state.responsive.length) {
      let breakpoints = this.state.responsive.map(
        (breakpoint) => breakpoint.breakpoint
      );
      breakpoints.sort((x, y) => x - y);
      breakpoints.forEach((brkp, idx) => {
        let bQuery;
        if (idx === 0) {
          bQuery = json2mq({ minWidth: 0, maxWidth: brkp });
        } else {
          bQuery = json2mq({
            minWidth: breakpoints[idx - 1] + 1,
            maxWidth: brkp,
          });
        }
        enquire.register(bQuery, {
          match: () => {
            this.setState({ breakpoint: brkp });
          },
        });
      });

      let query = json2mq({ minWidth: breakpoints.slice(-1)[0] });

      enquire.register(query, {
        match: () => {
          this.setState({ breakpoint: breakpoints.slice(-1)[0] });
        },
      });
    }

    this.setState({ percent: parseFloat(this.sliderRef.current.style.left) });
  }

  componentDidUpdate(prevprops, prevState) {
    if (this.state.breakpoint !== prevState.breakpoint) {
      let newprops = this.state.responsive.filter(
        (data) => data.breakpoint === this.state.breakpoint
      );
      if (this.state.infinite) {
        this.setState({
          child: [
            ...React.Children.toArray(this.props.children).slice(
              -newprops[0].settings.slidesVisible
            ),
            ...React.Children.toArray(this.props.children),
            ...React.Children.toArray(this.props.children).slice(
              0,
              newprops[0].settings.slidesVisible
            ),
          ],
          slidesVisible: newprops[0].settings.slidesVisible,
          slidesToScroll: newprops[0].settings.slidesToScroll,
          length:
            React.Children.toArray(this.props.children).length +
            2 * newprops[0].settings.slidesVisible,
        });
      } else {
        this.setState({
          slidesVisible: newprops[0].settings.slidesVisible,
          slidesToScroll: newprops[0].settings.slidesToScroll,
          length: React.Children.toArray(this.props.children).length,
        });
      }
      this.sliderRef.current.style.left =
        this.state.index * (-100 / newprops[0].settings.slidesVisible) + "%";
    }
  }

  render() {
    return (
      <div>
        <div className="carousel" ref={this.carouselRef}>
          {this.state.arrows && (
            <PreviousBtn onClick={() => this.handleSlide(-1)} />
          )}
          <div style={{ overflow: "hidden" }}>
            <div
              className="carousel__container"
              style={{
                left: this.state.infinite
                  ? this.state.slidesVisible *
                  (-100 / this.state.slidesVisible) +
                  "%"
                  : 0,
                transition: this.state.transition,
                width:
                  (this.state.length / this.state.slidesVisible) * 100 + "%",
              }}
              ref={this.sliderRef}
              onTransitionEnd={this.handleAnimation}
            >
              {this.state.child.map((item, idx) => {
                return (
                  <CarouselItem
                    key={idx}
                    style={{ width: 100 / this.state.length + "%" }}
                  >
                    {React.cloneElement(item, {
                      style: { margin: this.state.gap },
                    })}
                  </CarouselItem>
                );
              })}
            </div>
          </div>
          {this.state.arrows && <NextBtn onClick={() => this.handleSlide(1)} />}

          <DotContainer>
            {this.state.dots && (
              <Dots
                slides={this.state.child}
                index={this.state.index}
                visible={this.state.slidesVisible}
                scroll={this.state.slidesToScroll}
                infinite={this.state.infinite}
                //goTo={this.goTo}
                length={this.state.length}
              />
            )}
          </DotContainer>
        </div>
      </div>
    );
  }
}
