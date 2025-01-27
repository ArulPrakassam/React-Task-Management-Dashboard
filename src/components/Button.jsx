const Button = ({ value }) => {
  const buttonColors = {
    low: {
      color: "#98C8D7",
      backgroundColor: "#a0ccda79",
    },
    medium: {
      color: "#f6d013",
      backgroundColor: "#f0d85f64",
    },

    high: {
      color: "red",
      backgroundColor: "rgba(255, 0, 0, 0.233)",
    },

    pending: {
      color: "#9DA4BE",
      backgroundColor: "#babfd168",
    },
    completed: {
      color: "green",
      backgroundColor: "rgba(0, 128, 0, 0.234)",
    },
  };
  return (
    <div className="status-btn">
      <button
        type="button"
        style={{
          color: buttonColors[value].color,
          backgroundColor: buttonColors[value].backgroundColor,
        }}
      >
        {value}
      </button>
    </div>
  );
};

export default Button;
