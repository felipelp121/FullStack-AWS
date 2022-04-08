const amplifyConfig = {
  aws_cognito_region: process.env.REGION,
  aws_user_pools_id: process.env.POOL_ID,
  aws_user_pools_web_client_id: process.env.POOL_WEB,
};

export default amplifyConfig;
