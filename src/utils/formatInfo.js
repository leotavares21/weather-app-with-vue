const formatInfo = {
  sunTime: function (hour) {
    let parts = hour.slice(0, -3).split(":");
    let hours = parseInt(parts[0]);
    let minutes = parseInt(parts[1]);

    if (hour.slice(-2) === "PM") {
      hours += 12;
    }
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    return hours + ":" + minutes;
  },
  uvIndex: function (uvIndex) {
    let uvMsg;

    if (uvIndex < 3) {
      uvMsg = `${uvIndex} Baixo`;
    } else if (uvIndex >= 3 && uvIndex < 6) {
      uvMsg = `${uvIndex} Moderado`;
    } else if (uvIndex >= 6 && uvIndex < 8) {
      uvMsg = `${uvIndex} Alto`;
    } else if (uvIndex >= 8 && uvIndex < 11) {
      uvMsg = `${uvIndex} Muito Alto`;
    } else if (uvIndex >= 11) {
      uvMsg = `${uvIndex} Extremo`;
    } else {
      uvMsg = "Valor indisponível";
    }

    return uvMsg;
  },
  airIndex: function (airIndex) {
    let airMsg;

    if (airIndex <= 3) {
      airMsg = `${airIndex} Baixo risco a saúde`;
    } else if (airIndex > 3 && airIndex <= 6) {
      airMsg = `${airIndex} Moderado risco a saúde`;
    } else if (airIndex > 6 && airIndex <= 9) {
      airMsg = `${airIndex} Alto risco a saúde`;
    } else if (airIndex >= 10) {
      airMsg = `${airIndex} Muito Alto risco a saúde`;
    } else {
      airMsg = "Valor indisponível";
    }

    return airMsg;
  },
};

export default formatInfo;
