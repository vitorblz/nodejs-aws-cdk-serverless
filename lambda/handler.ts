exports.handler = async (event: any) => {
    return {
      statusCode: 200,
      body: JSON.stringify('Hello, LocalStack!!!!'),
    };
  };