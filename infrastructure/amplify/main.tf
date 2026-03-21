terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# -----------------------------------------------------------------------------
# Amplify App — myAdmin Marketing Website (Next.js SSR)
# -----------------------------------------------------------------------------

resource "aws_amplify_app" "myadmin_website" {
  name       = "myadmin-website"
  repository = var.github_repository
  platform   = "WEB_COMPUTE" # Required for Next.js SSR/middleware

  access_token = var.github_access_token

  environment_variables = {
    AMPLIFY_MONOREPO_APP_ROOT = "frontend"
    NEXT_PUBLIC_SITE_URL      = "https://myadmin.jabaki.nl"
    NEXT_PUBLIC_API_URL       = var.api_base_url
    NEXT_PUBLIC_GA_ID         = var.ga4_measurement_id
    NEXT_PUBLIC_CSRF_SECRET   = var.csrf_secret
  }

  build_spec = file("${path.module}/buildspec.yml")

  # Auto-detect Next.js framework
  enable_branch_auto_build = true

  # Custom response headers
  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/404.html"
  }
}

# -----------------------------------------------------------------------------
# Branch — main (production)
# -----------------------------------------------------------------------------

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.myadmin_website.id
  branch_name = "main"
  framework   = "Next.js - SSR"

  enable_auto_build = true
  stage             = "PRODUCTION"

  environment_variables = {
    NEXT_PUBLIC_ENV = "production"
  }
}

# -----------------------------------------------------------------------------
# Custom Domain — myadmin.jabaki.nl
# -----------------------------------------------------------------------------

resource "aws_amplify_domain_association" "myadmin" {
  app_id      = aws_amplify_app.myadmin_website.id
  domain_name = "jabaki.nl"

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "myadmin"
  }

  lifecycle {
    prevent_destroy = true
    ignore_changes  = [certificate_settings]
  }
}
