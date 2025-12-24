export const generateMixedId = (customerName = "GUEST") => {
  const name = customerName.trim().toUpperCase().replace(/\s+/g, "");

  const now = new Date();
  const year = now.getFullYear();

  const date =
    String(now.getDate()).padStart(2, "0") +
    String(now.getMonth() + 1).padStart(2, "0");

  const time =
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");

  const milli = String(now.getMilliseconds()).padStart(3, "0");
  let mix = "";
  for (let i = 0; i < name.length; i++) {
    mix += name[i];
    if (date[i]) mix += date[i];
  }

  return `${year}${mix}${time}${milli}`;
};
