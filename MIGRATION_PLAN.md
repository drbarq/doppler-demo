# AWS Migration Plan for Doppler Demo Dashboard

## Overview
This document outlines the step-by-step process for migrating the Doppler Demo Dashboard from Supabase to AWS services. The migration will be implemented using AWS CDK and will follow a phased approach to ensure minimal disruption.

## Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js v18 or later
- AWS CDK installed (`npm install -g aws-cdk`)
- Existing application code and database dump

## Phase 1: Infrastructure Setup

### Step 1: Initialize AWS CDK Project
```bash
mkdir aws-infrastructure
cd aws-infrastructure
cdk init app --language typescript
```

### Step 2: Create Base Infrastructure Stack
- Create VPC with public and private subnets
- Set up security groups
- Configure IAM roles and policies
- Create S3 bucket for static assets

### Step 3: Database Migration (Supabase → RDS)
1. Create RDS PostgreSQL instance
   - Use AWS CDK to provision RDS
   - Configure security groups and VPC settings
   - Set up parameter groups for PostgreSQL 15
   - Enable encryption at rest

2. Database Migration
   - Export data from Supabase
   - Create migration scripts
   - Import data to RDS
   - Validate data integrity

### Step 4: Authentication Migration (Supabase Auth → Cognito)
1. Set up Cognito User Pool
   - Configure user pool settings
   - Set up app client
   - Configure OAuth providers if needed
   - Set up user migration

2. Create User Migration Lambda
   - Write Lambda function to migrate users
   - Set up IAM roles
   - Test user migration

## Phase 2: Backend Services Migration

### Step 5: API Gateway Setup
1. Create API Gateway
   - Set up REST API
   - Configure CORS
   - Set up authentication using Cognito
   - Create API endpoints

2. Create Base API Structure
   - /health
   - /stripe
   - /weather
   - /products

### Step 6: Lambda Functions Migration
1. Create Lambda Functions
   - stripe-health-check
   - stripe-data
   - weather-api
   - products-api

2. Configure Lambda Functions
   - Set up environment variables
   - Configure VPC access
   - Set up IAM roles
   - Configure memory and timeout settings

### Step 7: Stripe Integration
1. Update Stripe Integration
   - Modify Lambda functions for Stripe API
   - Update environment variables
   - Test Stripe webhook integration
   - Validate payment processing

## Phase 3: Frontend Migration

### Step 8: Update Frontend Configuration
1. Update Environment Variables
   - Replace Supabase URLs with AWS endpoints
   - Update authentication configuration
   - Update API endpoints

2. Update API Calls
   - Modify API client code
   - Update authentication flow
   - Update data fetching logic

### Step 9: Deploy Frontend
1. Set up S3 and CloudFront
   - Configure S3 bucket for static hosting
   - Set up CloudFront distribution
   - Configure custom domain if needed

2. Update Build Process
   - Modify build configuration
   - Set up CI/CD pipeline
   - Configure environment variables

## Phase 4: Testing and Validation

### Step 10: Testing
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
   - Test database performance

### Step 11: Security Validation
1. Security Testing
   - Review IAM policies
   - Test authentication
   - Validate encryption
   - Check CORS configuration

2. Compliance Check
   - Review security groups
   - Validate VPC configuration
   - Check logging setup

## Phase 5: Deployment and Cutover

### Step 12: Production Deployment
1. Deploy Infrastructure
   - Deploy CDK stack
   - Validate all resources
   - Check monitoring setup

2. Data Migration
   - Run final data sync
   - Validate data integrity
   - Check data consistency

### Step 13: DNS and Routing
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
- [ ] VPC and security groups properly configured
- [ ] RDS instance running and accessible
- [ ] Database migration completed successfully
- [ ] Cognito user pool created and configured
- [ ] User migration completed successfully

### Phase 2 Success Criteria
- [ ] API Gateway endpoints working
- [ ] Lambda functions deployed and accessible
- [ ] Stripe integration working
- [ ] Weather API integration working
- [ ] All API endpoints responding correctly

### Phase 3 Success Criteria
- [ ] Frontend building successfully
- [ ] All API calls working
- [ ] Authentication flow working
- [ ] Static assets served correctly
- [ ] Environment variables properly configured

### Phase 4 Success Criteria
- [ ] All tests passing
- [ ] Security review completed
- [ ] Performance metrics met
- [ ] Error tracking configured
- [ ] Monitoring in place

### Phase 5 Success Criteria
- [ ] Infrastructure deployed
- [ ] Data migration completed
- [ ] DNS configured
- [ ] All features working
- [ ] Monitoring active

## Rollback Plan

### Immediate Rollback
1. Keep Supabase instance running
2. Maintain DNS TTL at minimum
3. Keep database backup
4. Document all changes

### Rollback Steps
1. Revert DNS changes
2. Restore database from backup
3. Revert frontend changes
4. Restore Supabase configuration

## Monitoring and Maintenance

### Monitoring Setup
1. CloudWatch Alarms
   - API Gateway errors
   - Lambda errors
   - RDS performance
   - Cognito errors

2. Logging
   - API Gateway logs
   - Lambda logs
   - RDS logs
   - Application logs

### Maintenance Tasks
1. Regular Updates
   - Security patches
   - Dependency updates
   - Infrastructure updates

2. Backup Strategy
   - Database backups
   - Configuration backups
   - User data backups

## Next Steps
1. Review and approve migration plan
2. Set up AWS development environment
3. Begin Phase 1 implementation
4. Schedule regular progress reviews