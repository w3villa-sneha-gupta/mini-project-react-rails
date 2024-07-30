const sendRequest = async ({ url, method, body, headers = {} }) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    // Set body if provided
    if (body) {
      options.body = JSON.stringify(body);
    }

    // Send the request and await the response
    const response = await fetch(url, options);

    // Check if response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Handle specific status codes
    if (response.status === 204) {
      return {
        success: true,
        message: "No Content",
      };
    }

    // Parse response as JSON
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Fetch error:', error.message);
    throw new Error('An error occurred while processing the request.');
  }
};

export default sendRequest;
