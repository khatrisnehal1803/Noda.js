// Application-level middleware simulation
// Logs: METHOD + URL + Time

export const logRequest = (method, url) => {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  console.log(`${method} ${url}  ${time}`);
};
