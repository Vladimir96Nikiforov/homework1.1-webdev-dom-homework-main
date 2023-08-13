export let date = new Date();
    let output =
      String(date.getDate()) +
      "." +
      String(date.getMonth() + 1) +
      "." +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();