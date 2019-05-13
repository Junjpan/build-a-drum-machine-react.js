const letsrock = {
  position: "relative",
  display: "inline-block",
  marginLeft: "30px",
  fontSize: 40 };

const padName = [
{ id: 1,
  name: "Q",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  display: "Heater-1" },

{ id: 2,
  name: "W",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  display: "Heater-2" },

{ id: 3,
  name: "E",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  display: "Heater-3" },

{ id: 4,
  name: "A",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  display: "Heater-4" },

{ id: 5,
  name: "S",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  display: "Clap" },

{ id: 6,
  name: "D",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  display: "Closed-HH" },

{ id: 7,
  name: "Z",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  display: "Kick-n'-Hat" },

{ id: 8,
  name: "X",
  src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  display: "Kick" },

{ id: 9,
  name: "C",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  display: "Snare" }];



class DrumPad extends React.Component {
  constructor(props) {
    super(props);
  }

  clickPad(msg, id) {
    const x = document.getElementById(id);
    this.props.display(msg, x);

  }

  render() {
    const padlist = padName.map((data, index) => {
      return (
        React.createElement("td", { key: index },
        React.createElement("button", { id: data.name, className: "drum-pad", onClick: this.clickPad.bind(this, data.display, data.id) }, data.name),
        React.createElement("audio", { id: data.id },
        React.createElement("source", { src: data.src, type: "audio/mpeg" }), "Your browser does not support the audio element.")));




    });
    return React.createElement("div", { className: "grid-container" }, padlist);
  }}


class Drummachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      message: "",
      color: "rgb(211, 143, 25)",
      volume: 50 };

    this.powerControl = this.powerControl.bind(this);
  }

  powerControl() {
    if (this.state.status === false) {
      this.setState({
        status: true,
        message: "WELCOME!",
        color: "#70ad1b" });
    } else {
      this.setState({
        status: false,
        message: "",
        color: "rgb(211, 143, 25)" });
    }
  }

  display(msg, x) {
    console.log(x);
    if (this.state.status === true) {
      x.play();
      x.volume = this.state.volume / 100;
      this.setState({ message: msg });}
  }

  changeVolume(e) {
    const num = e.target.value;
    if (this.state.status === true) {
      this.setState({ message: "VOLUME " + num,
        volume: num });
    }
  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "drum-machine" },
      React.createElement(DrumPad, { display: this.display.bind(this) }),
      React.createElement("div", { id: "display" }, this.state.message),
      React.createElement("br", null),
      React.createElement("div", { id: "power" },
      React.createElement("i", { className: "zmdi zmdi-power zmdi-hc-4x", onClick: this.powerControl, style: { color: this.state.color } })),

      React.createElement("input", { type: "range", id: "vol-control", min: "0", max: "100", step: "1", oninput: this.changeVolume.bind(this), onChange: this.changeVolume.bind(this) }),
      React.createElement("h5", { style: letsrock }, "Let's rock"),
      React.createElement("h8", { style: { color: "white" } }, "\xA0 FREE CODE CAMP"),
      React.createElement("h1", { id: "title" }, "DRUM MACHINE"))));



  }}

//need to  have oninput and onChange inside the input to be able to change to volume.
ReactDOM.render(React.createElement(Drummachine, null), document.getElementById("app"));