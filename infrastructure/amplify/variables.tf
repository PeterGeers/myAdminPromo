# -----------------------------------------------------------------------------
# Variables — myAdmin Website Amplify Deployment
# -----------------------------------------------------------------------------

variable "aws_region" {
  description = "AWS region for Amplify deployment"
  type        = string
  default     = "eu-west-1"
}

variable "github_repository" {
  description = "GitHub repository URL"
  type        = string
  default     = "https://github.com/PeterGeers/myAdminPromo"
}

variable "github_access_token" {
  description = "GitHub personal access token for Amplify to access the repo"
  type        = string
  sensitive   = true
}

variable "api_base_url" {
  description = "myAdmin backend API base URL"
  type        = string
}

variable "ga4_measurement_id" {
  description = "Google Analytics 4 measurement ID (e.g. G-XXXXXXXXXX)"
  type        = string
  default     = ""
}
