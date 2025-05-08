# AWS Migration Plan for Doppler Demo Dashboard

## Overview
This document outlines the step-by-step process for migrating the Doppler Demo Dashboard from Supabase to AWS services. The migration will be implemented using AWS CDK and will follow a phased approach to ensure minimal disruption.

**Note:** Since all critical data is already stored in Stripe, there is no need to migrate any application data from Supabase. Database migration steps have been removed. The focus is on authentication, backend services, and frontend integration.

## Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js v18 or later
- AWS CDK installed (`npm install -g aws-cdk`)
- Existing application code

## Phase 1: Infrastructure Setup

### Step 1: Initialize AWS CDK Project
```bash
mkdir aws-infrastructure
cd aws-infrastructure
cdk init app --language typescript
```

### Step 2: Create Base Infrastructure Stack
- (Optional) Create VPC with public and private subnets (if needed for Lambda networking)
- Set up security groups (if needed)
- Configure IAM roles and policies for Lambda and Cognito
- (Optional) Create S3 bucket for static assets

## Phase 2: Backend Services Migration

### Step 3: Authentication Migration (Supabase Auth → Cognito)
1. Set up Cognito User Pool
   - Configure user pool settings
   - Set up app client
   - Configure OAuth providers if needed

2. (Optional) Create User Migration Lambda
   - Only if you need to migrate users from Supabase (not required if starting fresh)

### Step 4: API Gateway & Lambda Functions
1. Create API Gateway
   - Set up REST API
   - Configure CORS
   - Set up authentication using Cognito
   - Create API endpoints

2. Create Lambda Functions
   - stripe-health-check
   - stripe-data
   - weather-api (if needed)
   - other integrations as required

3. Configure Lambda Functions
   - Set up environment variables (e.g., Stripe secret key)
   - Set up IAM roles
   - Configure memory and timeout settings

### Step 5: Stripe Integration
1. Update Lambda functions for Stripe API
2. Test Stripe webhook integration (if used)
3. Validate payment processing

## Phase 3: Frontend Migration

### Step 6: Update Frontend Configuration
1. Update Environment Variables
   - Replace Supabase URLs with AWS endpoints
   - Update authentication configuration for Cognito
   - Update API endpoints

2. Update API Calls
   - Modify API client code to use new AWS endpoints
   - Update authentication flow
   - Update data fetching logic

### Step 7: Deploy Frontend
1. (Optional) Set up S3 and CloudFront
   - Configure S3 bucket for static hosting
   - Set up CloudFront distribution
   - Configure custom domain if needed

2. Update Build Process
   - Modify build configuration
   - Set up CI/CD pipeline
   - Configure environment variables

## Phase 4: Testing and Validation

### Step 8: Testing
1. Unit Tests
   - Test Lambda functions
   - Test API endpoints
   - Test authentication flow

2. Integration Tests
   - Test end-to-end flows
   - Test payment processing
   - Test weather API integration

3. Load Testing
   - Test API Gateway limits
   - Test Lambda concurrency

### Step 9: Security Validation
1. Security Testing
   - Review IAM policies
   - Test authentication
   - Validate encryption
   - Check CORS configuration

2. Compliance Check
   - Review security groups
   - Validate VPC configuration (if used)
   - Check logging setup

## Phase 5: Deployment and Cutover

### Step 10: Production Deployment
1. Deploy Infrastructure
   - Deploy CDK stack
   - Validate all resources
   - Check monitoring setup

### Step 11: DNS and Routing
1. Update DNS
   - Configure Route 53
   - Set up health checks
   - Configure failover if needed

2. Final Validation
   - Test all features
   - Validate monitoring
   - Check error tracking

## Success Criteria for Each Phase

### Phase 1 Success Criteria
- [ ] IAM roles and policies properly configured
- [ ] (Optional) VPC and security groups configured if needed
- [ ] S3 bucket created if needed

### Phase 2 Success Criteria
- [ ] Cognito user pool created and configured
- [ ] API Gateway endpoints working
- [ ] Lambda functions deployed and accessible
- [ ] Stripe integration working
- [ ] All API endpoints responding correctly

### Phase 3 Success Criteria
- [ ] Frontend building successfully
- [ ] All API calls working
- [ ] Authentication flow working
- [ ] Static assets served correctly (if using S3/CloudFront)
- [ ] Environment variables properly configured

### Phase 4 Success Criteria
- [ ] All tests passing
- [ ] Security review completed
- [ ] Performance metrics met
- [ ] Error tracking configured
- [ ] Monitoring in place

### Phase 5 Success Criteria
- [ ] Infrastructure deployed
- [ ] DNS configured
- [ ] All features working
- [ ] Monitoring active

## Rollback Plan

### Immediate Rollback
1. Keep Supabase instance running (if still needed for fallback)
2. Maintain DNS TTL at minimum
3. Document all changes

### Rollback Steps
1. Revert DNS changes
2. Revert frontend changes
3. Restore Supabase configuration

## Monitoring and Maintenance

### Monitoring Setup
1. CloudWatch Alarms
   - API Gateway errors
   - Lambda errors
   - Cognito errors

2. Logging
   - API Gateway logs
   - Lambda logs
   - Application logs

### Maintenance Tasks
1. Regular Updates
   - Security patches
   - Dependency updates
   - Infrastructure updates

2. Backup Strategy
   - Configuration backups
   - User data backups (if any)

## Next Steps
1. Review and approve migration plan
2. Set up AWS development environment
3. Begin Phase 1 implementation
4. Schedule regular progress reviews