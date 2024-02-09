import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
// import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class PocAwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hello = new NodejsFunction(this, 'Hello', {
      entry: path.join(__dirname, '../lambda/handler.ts'),
      functionName: 'hello',
      handler: 'handler',
      memorySize: 512,
      timeout: cdk.Duration.seconds(10),
      environment: {
        // AWS_REGION: 'us-east-1', // Defina a região AWS
        AWS_ENDPOINT: 'http://localhost:4566', // Endpoint do LocalStack
      },
    });

    const api = new apigw.RestApi(this, 'Endpoint', {
      restApiName: 'api'
    });
    cdk.Tags.of(api).add('_custom_id_', 'myid123');
    

    const hello1Integration = new apigw.LambdaIntegration(hello);
    api.root.addResource('hello1').addMethod('GET', hello1Integration);

    const hello2Integration = new apigw.LambdaIntegration(hello);
    api.root.addResource('hello2').addMethod('GET', hello2Integration);

    const hello3Integration = new apigw.LambdaIntegration(hello);
    api.root.addResource('hello3').addMethod('GET', hello3Integration);
   
  }
}
