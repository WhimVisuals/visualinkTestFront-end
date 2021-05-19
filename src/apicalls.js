const url = `http://localhost:5000`; // backend base url

export const loginUser = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/users/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send along stored cookies => token
      })
    ).json();

    return res;
  } catch (error) {
    return [];
  }
};

/**
 * Check if we are authenticated against the backend
 * by calling a PROTECTED route
 */
export const authenticateUser = async () => {
  try {
    const res = await (
      await fetch(`${url}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send in cookies (=> token)
      })
    ).json();

    return res;
  } catch (error) {
    return error;
  }
};

export const signUpUser = async (data) => {
  try {
    console.log(data)
    const res = await (
      await fetch(`${url}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();

    console.log(res);

    return res;
  } catch (error) {
    // catch route is NOT called on error responses from the backend
    // like 404 and 500
    console.log(error);
    return [];
  }
};

export const logOut = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/users/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();

    return res;
  } catch (error) {
    return [];
  }
};

export const getAllUsers = async () => {
  try {
    const res = await (
      await fetch(`${url}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send in cookies (=> token)
      })
    ).json();

    return res;
  } catch (error) {
    return error;
  }
};

export const addNewCanvas = async (data) => {
  console.log(data);
  

  try {
    const res = await (
      await fetch(`${url}/canvas`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();

    console.log(res);

    return res;
  } catch (error) {
    // catch route is NOT called on error responses from the backend
    // like 404 and 500
    console.log(error);
    return [];
  }
};

export const getMyCanvas = async () => {
  try {
    const res = await (
      await fetch(`${url}/users/mycanvas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send in cookies (=> token)
      })
    ).json();

    return res;
  } catch (error) {
    return error;
  }
};


export const verifyEmail = async (data) => {
  try {
    const res = await (
      await fetch(`${url}/users/verifyEmail`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
    ).json();

    return res;
  } catch (error) {
    return [];
  }
};