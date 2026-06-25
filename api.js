import axios from "axios";

const BASE_URL =
  "http://4.224.186.213/evaluation-service/notifications";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzIxMWE2NzM1QGJ2cml0LmFjLmluIiwiZXhwIjoxNzgyMzgzMDI2LCJpYXQiOjE3ODIzODIxMjYsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxZmRhZjc5Ni01ODI3LTQ2MjItOGU3Mi1hNWZmMzgwNTIxZmMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJndXJyYWxhIG5hdnlhIiwic3ViIjoiMWIzMWFkNDgtODk4MC00N2U1LWJmOWYtNzBkODljN2EwMzBkIn0sImVtYWlsIjoiMjMyMTFhNjczNUBidnJpdC5hYy5pbiIsIm5hbWUiOiJndXJyYWxhIG5hdnlhIiwicm9sbE5vIjoiMjMyMTFhNjczNSIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6IjFiMzFhZDQ4LTg5ODAtNDdlNS1iZjlmLTcwZDg5YzdhMDMwZCIsImNsaWVudFNlY3JldCI6InJIZnNxVHJlUWJBVEtiY2sifQ.XMrDMSAXRIO5RZxDNYi0rM4nK8tRgx0YyQFLx-Q1gkU";

export const fetchNotifications = async (params) => {
  try {
    const res = await axios.get(BASE_URL, {
      params,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    console.log("API SUCCESS:", res.data);
    return res.data;
  } catch (err) {
    console.log("API ERROR FULL:", err.response?.data || err.message);
    return null;
  }
};