import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsInfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsInfrastructureQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // Reference the existing Stripe secret in Secrets Manager
    const stripeSecret = secretsmanager.Secret.fromSecretCompleteArn(
      this,
      'StripeSecret',
      'arn:aws:secretsmanager:us-east-1:714378673377:secret:stripe/secret-nmQB5S'
    );

    // Simple Lambda function
    const helloLambda = new lambda.Function(this, 'HelloLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Hello from Lambda!' })
          };
        };
      `),
    });

    // API Gateway to expose the Lambda
    new apigateway.LambdaRestApi(this, 'HelloApi', {
      handler: helloLambda,
      proxy: true,
    });

    // Stripe Health Check Lambda (from asset)
    const stripeHealthCheckLambda = new lambda.Function(this, 'StripeHealthCheckLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/stripe-health-check'),
      environment: {
        STRIPE_SECRET_ARN: stripeSecret.secretArn,
      },
    });
    stripeSecret.grantRead(stripeHealthCheckLambda);

    // Stripe Data Lambda (from asset)
    const stripeDataLambda = new lambda.Function(this, 'StripeDataLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/stripe-data'),
      environment: {
        STRIPE_SECRET_ARN: stripeSecret.secretArn,
      },
    });
    stripeSecret.grantRead(stripeDataLambda);

    // API Gateway for Stripe Health Check
    new apigateway.LambdaRestApi(this, 'StripeHealthCheckApi', {
      handler: stripeHealthCheckLambda,
      proxy: true,
    });

    // API Gateway for Stripe Data
    new apigateway.LambdaRestApi(this, 'StripeDataApi', {
      handler: stripeDataLambda,
      proxy: true,
    });
  }
}
