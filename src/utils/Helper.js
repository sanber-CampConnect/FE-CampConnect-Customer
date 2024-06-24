export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatRupiah = (money) => {
  if (money !== undefined && !isNaN(money)) {
    return money.toLocaleString("id-ID");
  } else {
    return "0";
  }
};

export const truncateDescription = (description, charLimit = 85) => {
  if (description.length > charLimit) {
    return description.substring(0, charLimit) + "...";
  }
  return description;
};

export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("id-ID", options);
};

export const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return date.toLocaleTimeString("id-ID", options);
};
