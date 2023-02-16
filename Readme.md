opentelemetry nodejs App:
To deploy application to lambda:
 1. Clone the repo, And run 
 ```
 npm i
 ```
 2. configure aws cli in system
 3. install serverless in system using npm
 ```
 npm i -g serverless
 ```
 4. Replace newrelic licence key in lambda_wrapper.js
 5. Run the following command in the directory downloaded
 ```
 serverless deploy 
 ```
 6. check the lambda in aws and test.
 7. To change APM name, change the value of following key
 ```
 [SemanticResourceAttributes.SERVICE_NAME]: "nodejs-lambda-1"
 ```