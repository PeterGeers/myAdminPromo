---
inclusion: auto
---

# Infrastructure Safety Rules

## CRITICAL: Amplify Domain Association

The Amplify domain association (`aws_amplify_domain_association`) must NEVER be destroyed or recreated. Destroying it provisions a new CloudFront distribution, invalidates DNS, and causes website downtime that can last hours due to DNS propagation.

### Rules

1. **NEVER run `terraform apply` to change environment variables.** Use the AWS CLI instead:

   ```bash
   aws amplify update-app --app-id do5qlx6y1zid2 --region eu-west-1 --environment-variables "KEY=value,KEY2=value2"
   aws amplify start-job --app-id do5qlx6y1zid2 --branch-name main --job-type RELEASE --region eu-west-1
   ```

2. **NEVER run `terraform apply` without first running `terraform plan` and verifying that the domain association is NOT being modified.** If the plan shows any change to `aws_amplify_domain_association`, STOP and find another approach.

3. **NEVER run `terraform taint` on the domain association resource.**

4. **For env var or buildspec changes**, always prefer AWS CLI (`aws amplify update-app`) over `terraform apply`. Only use Terraform for actual infrastructure changes (new resources, new branches, etc.).

5. **The `prevent_destroy = true` lifecycle rule** is set on the domain association in `main.tf`. Do not remove it.

## Amplify App Details

- App ID: `do5qlx6y1zid2`
- Region: `eu-west-1`
- Domain: `myadmin.jabaki.nl`
- Branch: `main`
